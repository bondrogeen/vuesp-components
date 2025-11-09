import type { Ref, ComputedRef } from 'vue';

export type Validator = (value: unknown, values?: Record<string, unknown>) => true | string;
export type ValidationSchema = Record<string, Validator[]>;

export interface FieldState {
  value: unknown;
  errors: string[];
  touched: boolean;
  dirty: boolean;
}

export interface FormState {
  values: Record<string, unknown>;
  errors: Record<string, string[]>;
  touched: Record<string, boolean>;
  dirty: Record<string, boolean>;
}

export interface DefineFieldOptions {
  props?: (context: FieldContext) => Record<string, unknown>;
}

export interface FieldContext {
  errors: string[];
  touched: boolean;
  dirty: boolean;
}

export interface UseFormOptions {
  validationSchema: ValidationSchema;
  initialValues?: Record<string, unknown>;
}

export interface UseFormReturn {
  values: Record<string, unknown>;
  errors: Record<string, string[]>;
  defineField: <T = unknown>(name: string, options?: DefineFieldOptions) => [Ref<T>, ComputedRef<Record<string, unknown>>];
  handleSubmit: (callback: (values: Record<string, unknown>) => void | Promise<void>) => (event?: Event) => Promise<void>;
  resetForm: () => void;
  validate: () => boolean;
}
