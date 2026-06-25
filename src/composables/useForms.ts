import type { Ref, ComputedRef } from 'vue';
import type { 
  UseFormOptions, 
  UseFormReturn, 
  DefineFieldOptions, 
  FieldContext,
  ValidationSchema,
  ValidationSchemaFn 
} from '@/composables/types';
import { reactive, computed, ref, watch } from 'vue';

export function useForm(options: UseFormOptions): UseFormReturn {
  const { validationSchema: schemaOrFn, initialValues = {} } = options;

  const isSchemaFn = typeof schemaOrFn === 'function';
  
  const currentSchema = ref<ValidationSchema>(
    isSchemaFn ? schemaOrFn(initialValues) : schemaOrFn
  );

  const updateSchema = (newSchema: ValidationSchema) => {
    currentSchema.value = newSchema;
    
    const schemaFields = Object.keys(newSchema);
    const currentFields = Object.keys(values);
    
    schemaFields.forEach(field => {
      if (!(field in values)) {
        values[field] = initialValues[field] ?? '';
        errors[field] = [];
        touched[field] = false;
        dirty[field] = false;
      }
    });
    
    currentFields.forEach(field => {
      if (!schemaFields.includes(field)) {
        delete values[field];
        delete errors[field];
        delete touched[field];
        delete dirty[field];
      }
    });
    
    collectDependencies();
  };

  const values = reactive<Record<string, unknown>>({});
  const errors = reactive<Record<string, string[]>>({});
  const touched = reactive<Record<string, boolean>>({});
  const dirty = reactive<Record<string, boolean>>({});

  const fieldDependencies = new Map<string, Set<string>>();

  const initializeFields = () => {
    Object.keys(currentSchema.value).forEach((field) => {
      values[field] = initialValues[field] ?? '';
      errors[field] = [];
      touched[field] = false;
      dirty[field] = false;
    });
  };

  const getSchema = (): ValidationSchema => {
    if (isSchemaFn) {
      return (schemaOrFn as ValidationSchemaFn)(values);
    }
    return currentSchema.value;
  };

  const validateField = (fieldName: string, value: unknown): boolean => {
    const schema = getSchema();
    const validators = schema[fieldName] || [];
    const fieldErrors: string[] = [];

    for (const validator of validators) {
      const result = validator(value as string, values);
      if (result !== true) {
        fieldErrors.push(result);
      }
    }

    errors[fieldName] = fieldErrors;
    return fieldErrors.length === 0;
  };

  const validateFieldWithDependencies = (fieldName: string, value: unknown): void => {
    const schema = getSchema();
    if (!schema[fieldName]) return;

    validateField(fieldName, value);

    const dependents = fieldDependencies.get(fieldName);
    if (dependents) {
      dependents.forEach((dependentField) => {
        if (schema[dependentField]) {
          validateField(dependentField, values[dependentField]);
        }
      });
    }
  };

  const collectDependencies = () => {
    fieldDependencies.clear();
    const schema = getSchema();
    
    Object.keys(schema).forEach((field) => {
      const validators = schema[field] || [];
      validators.forEach((validator) => {
        if (typeof validator === 'function' && validator.name === 'sameAs') {
          const match = validator.toString().match(/['"](.*?)['"]/);
          if (match) {
            const depField = match[1];
            if (!fieldDependencies.has(depField)) {
              fieldDependencies.set(depField, new Set());
            }
            fieldDependencies.get(depField)!.add(field);
          }
        }
      });
    });
  };

  const validateForm = (): boolean => {
    const schema = getSchema();
    let isValid = true;
    Object.keys(schema).forEach((field) => {
      const fieldValid = validateField(field, values[field]);
      if (!fieldValid) {
        isValid = false;
      }
    });
    return isValid;
  };

  const defineField = <T = unknown>(
    fieldName: string, 
    options: DefineFieldOptions = {}
  ): [Ref<T>, ComputedRef<Record<string, unknown>>] => {
    const schema = getSchema();
    
    if (!schema[fieldName]) {
      console.warn(`Field "${fieldName}" not found in current validationSchema`);
    }

    const valueRef = computed<T>({
      get: () => values[fieldName] as T,
      set: (newValue: T) => {
        values[fieldName] = newValue;
        dirty[fieldName] = true;
        validateFieldWithDependencies(fieldName, newValue);
      },
    });

    const attrs = computed<Record<string, unknown>>(() => {
      const fieldContext: FieldContext = {
        errors: errors[fieldName] || [],
        touched: touched[fieldName] || false,
        dirty: dirty[fieldName] || false,
      };

      const baseAttrs = {
        message: errors[fieldName]?.[0],
        onInput: (event: Event) => {
          const target = event.target as HTMLInputElement;
          valueRef.value = target.value as T;
        },
        onBlur: () => {
          touched[fieldName] = true;
          validateFieldWithDependencies(fieldName, values[fieldName]);
        },
      };

      if (options.props) {
        const customProps = options.props(fieldContext);
        return { ...baseAttrs, ...customProps };
      }

      return baseAttrs;
    });

    return [valueRef as Ref<T>, attrs];
  };

  const handleSubmit = (callback: (values: Record<string, unknown>) => void | Promise<void>) => {
    return async (event?: Event): Promise<void> => {
      if (event) {
        event.preventDefault();
      }
      
      const schema = getSchema();
      Object.keys(schema).forEach((field) => {
        touched[field] = true;
      });
      const isValid = validateForm();
      if (isValid) {
        await callback(values);
      }
    };
  };

  const resetForm = (): void => {
    const schema = getSchema();
    Object.keys(schema).forEach((field) => {
      values[field] = initialValues[field] || '';
      errors[field] = [];
      touched[field] = false;
      dirty[field] = false;
    });
  };

  initializeFields();
  collectDependencies();

  if (isSchemaFn) {
    watch(
      () => values,
      () => {
        const newSchema = (schemaOrFn as ValidationSchemaFn)(values);
        const oldSchema = currentSchema.value;
        
        const newKeys = Object.keys(newSchema);
        const oldKeys = Object.keys(oldSchema);
        
        if (newKeys.length !== oldKeys.length || 
            newKeys.some(key => !oldKeys.includes(key))) {
          updateSchema(newSchema);
        }
      },
      { deep: true }
    );
  }

  return {
    values,
    errors,
    defineField,
    handleSubmit,
    resetForm,
    validate: validateForm,
    updateSchema,
  };
}