import type { Ref, ComputedRef } from 'vue';

export type Validator = (value: string, values?: Record<string, any>) => true | string;
export type ValidationSchema = Record<string, Validator[]>;

export interface FieldState {
  value: string | number;
  errors: string[];
  touched: boolean;
  dirty: boolean;
}

export interface FormState {
  values: Record<string, any>;
  errors: Record<string, string[]>;
  touched: Record<string, boolean>;
  dirty: Record<string, boolean>;
}

export interface DefineFieldOptions {
  props?: (context: FieldContext) => Record<string, any>;
}

export interface FieldContext {
  errors: string[];
  touched: boolean;
  dirty: boolean;
}

export interface UseFormOptions {
  validationSchema: ValidationSchema;
  initialValues?: Record<string, any>;
}

export interface UseFormReturn {
  values: Record<string, any>;
  errors: Record<string, string[]>;
  defineField: <T = any>(name: string, options?: DefineFieldOptions) => [Ref<T>, ComputedRef<Record<string, any>>];
  handleSubmit: (callback: (values: Record<string, any>) => void | Promise<void>) => (event?: Event) => Promise<void>;
  resetForm: () => void;
  validate: () => boolean;
}
