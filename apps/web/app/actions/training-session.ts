import z from "zod";
import { FormActionState } from "../../lib/form-state";
import { trainingSessionSchema } from "../../lib/training-session-schema";

export type CreateTrainingSessionField =
  | "title"
  | "description"
  | "startsAt"
  | "endsAt"
  | "capacity"
  | "price"
  | "currency";

export type CreateTrainingSessionActionState =
  FormActionState<CreateTrainingSessionField>;

export async function createTrainingSessionAction(
  _prevState: CreateTrainingSessionActionState,
  formData: FormData,
): Promise<CreateTrainingSessionActionState> {
  const values = {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    startsAt: String(formData.get("startsAt") ?? ""),
    endsAt: String(formData.get("endsAt") ?? ""),
    capacity: String(formData.get("capacity") ?? ""),
    price: String(formData.get("price") ?? ""),
    currency: String(formData.get("currency") ?? ""),
  };

  const parsed = trainingSessionSchema.safeParse(values);

  if (!parsed.success) {
    return {
      values,
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  return {
    values,
    errors: {},
  };
}
