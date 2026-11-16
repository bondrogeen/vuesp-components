import type { Ref, ComputedRef } from 'vue';

export type TValidator = (value: string, values?: Record<string, unknown>) => true | string;
export type TValidationSchema = Record<string, TValidator[]>;
export type TValidationSchemaFn = (values: Record<string, unknown>) => TValidationSchema;

export interface IFieldState {
  value: string | number;
  errors: string[];
  touched: boolean;
  dirty: boolean;
}

export interface IFormState {
  values: Record<string, unknown>;
  errors: Record<string, string[]>;
  touched: Record<string, boolean>;
  dirty: Record<string, boolean>;
}

export interface IDefineFieldOptions {
  props?: (context: IFieldContext) => Record<string, unknown>;
}

export interface IFieldContext {
  errors: string[];
  touched: boolean;
  dirty: boolean;
}

export interface IUseFormOptions {
  validationSchema: TValidationSchema | TValidationSchemaFn;
  initialValues?: Record<string, unknown>;
}

export interface IUseFormReturn {
  values: Record<string, unknown>;
  errors: Record<string, string[]>;
  isValid: Ref<boolean>;
  defineField: <T = unknown>(name: string, options?: IDefineFieldOptions) => [Ref<T>, ComputedRef<Record<string, unknown>>];
  handleSubmit: (callback: (values: Record<string, unknown>) => void | Promise<void>) => (event?: Event) => Promise<void>;
  resetForm: () => void;
  validate: () => boolean;
  updateSchema: (newSchema: TValidationSchema) => void;
}