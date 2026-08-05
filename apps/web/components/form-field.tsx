import { FieldError } from "./field-error";

type FormFieldProps = {
  label: string;
  required?: boolean;
  errors?: string[];
  children: React.ReactNode;
};

export function FormField({
  label,
  required,
  errors,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label className="block">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}{" "}
          {required && (
            <span aria-hidden="true" className="text-red-600">
              *
            </span>
          )}
        </span>
        {children}
      </label>
      <FieldError errors={errors} />
    </div>
  );
}
