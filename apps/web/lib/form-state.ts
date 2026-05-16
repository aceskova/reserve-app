export type FormActionState<TFields extends string = string> = {
  error?: string;
  errors: Partial<Record<TFields, string[]>>;
};

export function createInitialFormState<
  TFields extends string,
>(): FormActionState<TFields> {
  return {
    errors: {},
  };
}
