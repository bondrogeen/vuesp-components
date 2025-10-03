import type { Ref, ComputedRef } from 'vue';
import type { UseFormOptions, UseFormReturn, DefineFieldOptions, FieldContext } from '@/composables/types';
import { reactive, computed } from 'vue';

export function useForm(options: UseFormOptions): UseFormReturn {
  const { validationSchema, initialValues = {} } = options;

  const values = reactive<Record<string, any>>({});
  const errors = reactive<Record<string, string[]>>({});
  const touched = reactive<Record<string, boolean>>({});
  const dirty = reactive<Record<string, boolean>>({});

  const initializeFields = () => {
    Object.keys(validationSchema).forEach((field) => {
      values[field] = initialValues[field] || '';
      errors[field] = [];
      touched[field] = false;
      dirty[field] = false;
    });
  };

  const validateField = (fieldName: string, value: any): boolean => {
    const validators = validationSchema[fieldName] || [];
    const fieldErrors: string[] = [];

    for (const validator of validators) {
      const result = validator(value, values);
      if (result !== true) {
        fieldErrors.push(result);
      }
    }

    errors[fieldName] = fieldErrors;
    return fieldErrors.length === 0;
  };

  const validateForm = (): boolean => {
    let isValid = true;
    Object.keys(validationSchema).forEach((field) => {
      const fieldValid = validateField(field, values[field]);
      if (!fieldValid) {
        isValid = false;
      }
    });
    return isValid;
  };

  const defineField = <T = any>(fieldName: string, options: DefineFieldOptions = {}): [Ref<T>, ComputedRef<Record<string, any>>] => {
    if (!validationSchema[fieldName]) {
      console.warn(`Field "${fieldName}" not found in validationSchema`);
    }

    const valueRef = computed<T>({
      get: () => values[fieldName],
      set: (newValue: T) => {
        values[fieldName] = newValue;
        dirty[fieldName] = true;
        Object.keys(validationSchema).forEach((field) => {
          validateField(field, values[field]);
        });
      },
    });

    const attrs = computed<Record<string, any>>(() => {
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
          validateField(fieldName, values[fieldName]);
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

  const handleSubmit = (callback: (values: Record<string, any>) => void | Promise<void>) => {
    return async (event?: Event): Promise<void> => {
      if (event) {
        event.preventDefault();
      }
      Object.keys(validationSchema).forEach((field) => {
        touched[field] = true;
      });
      const isValid = validateForm();
      if (isValid) {
        await callback(values);
      }
    };
  };

  const resetForm = (): void => {
    Object.keys(validationSchema).forEach((field) => {
      values[field] = initialValues[field] || '';
      errors[field] = [];
      touched[field] = false;
      dirty[field] = false;
    });
  };

  initializeFields();

  return {
    values,
    errors,
    defineField,
    handleSubmit,
    resetForm,
    validate: validateForm,
  };
}
