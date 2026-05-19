type FieldErrorProps = {
  errors?: string[];
};

export function FieldError({ errors }: FieldErrorProps) {
  if (!errors?.length) {
    return null;
  }

  return (
    <div className="mt-2 space-y-1">
      {errors.map((error) => (
        <p
          className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
          key={error}
        >
          {error}
        </p>
      ))}
    </div>
  );
}
