"use server";

import { z } from "zod";
import type { FormActionState } from "../../lib/form-state";
import { trainingSessionSchema } from "../../lib/training-session-schema";
import { sendAuthenticatedRequest } from "../../lib/api-client";
import {
  TRAINING_SESSION_ERROR_CODES,
  type ApiErrorResponse,
  type CreateTrainingSessionRequestDto,
  type CreateTrainingSessionResponseDto,
} from "@repo/api-contracts";
import { redirect } from "next/navigation";

const TRAINING_SESSION_ACTION_MESSAGES = {
  generic: "Lekci se nepodařilo vytvořit.",
  forbidden: "Nemáš oprávnění vytvářet lekce.",
  invalidTimeRange: "Konec lekce musí být po začátku.",
} as const;

export type CreateTrainingSessionField =
  | "title"
  | "description"
  | "startsAt"
  | "endsAt"
  | "durationOption"
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
    durationOption: String(formData.get("durationOption") ?? ""),
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

  const startsAt = new Date(parsed.data.startsAt);

  const endsAt =
    parsed.data.durationOption === "custom"
      ? new Date(parsed.data.endsAt!)
      : addMinutes(startsAt, Number(parsed.data.durationOption));

  const body: CreateTrainingSessionRequestDto = {
    title: parsed.data.title,
    description: parsed.data.description,
    startsAtUtc: startsAt.toISOString(),
    endsAtUtc: endsAt.toISOString(),
    capacity: parsed.data.capacity,
    priceCents: parsed.data.price * 100,
    currency: parsed.data.currency,
  };

  const result =
    await sendAuthenticatedRequest<CreateTrainingSessionResponseDto>({
      method: "POST",
      path: "/v1/training-sessions",
      body,
    });

  if (!result.ok) {
    return mapCreateTrainingSessionApiError(result.error, values);
  }

  redirect("/training-sessions");
}

function mapCreateTrainingSessionApiError(
  error: ApiErrorResponse | null,
  values: CreateTrainingSessionActionState["values"],
): CreateTrainingSessionActionState {
  if (error?.code === TRAINING_SESSION_ERROR_CODES.INVALID_TIME_RANGE) {
    return {
      values,
      errors: {
        endsAt: [TRAINING_SESSION_ACTION_MESSAGES.invalidTimeRange],
      },
    };
  }

  if (error?.code === TRAINING_SESSION_ERROR_CODES.FORBIDDEN) {
    return {
      values,
      errors: {},
      error: TRAINING_SESSION_ACTION_MESSAGES.forbidden,
    };
  }

  return {
    values,
    errors: {},
    error: TRAINING_SESSION_ACTION_MESSAGES.generic,
  };
}

function addMinutes(date: Date, minutes: number) {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() + minutes);

  return result;
}
