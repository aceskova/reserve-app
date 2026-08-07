import { z } from "zod";
import {
  TRAINING_SESSION_CURRENCY_LENGTH,
  TRAINING_SESSION_DESCRIPTION_MAX_LENGTH,
  TRAINING_SESSION_TITLE_MAX_LENGTH,
} from "@repo/api-contracts";

const TRAINING_SESSION_FORM_MESSAGES = {
  titleRequired: "Název lekce je povinný.",
  titleTooLong: "Název lekce je příliš dlouhý.",
  descriptionTooLong: "Popis lekce je příliš dlouhý.",
  startsAtRequired: "Začátek lekce je povinný.",
  endsAtRequired: "Konec lekce je povinný.",
  invalidDate: "Zadej platné datum a čas.",
  invalidTimeRange: "Konec lekce musí být po začátku.",
  capacityRequired: "Kapacita je povinná.",
  capacityInvalid: "Kapacita musí být celé číslo větší než 0.",
  priceRequired: "Cena je povinná.",
  priceInvalid: "Cena musí být celé číslo větší nebo rovno 0.",
  currencyInvalid: "Měna musí mít 3 znaky.",
} as const;

const durationOptionSchema = z.enum(["45", "60", "90", "custom"]);

const titleSchema = z
  .string()
  .trim()
  .min(1, { message: TRAINING_SESSION_FORM_MESSAGES.titleRequired })
  .max(TRAINING_SESSION_TITLE_MAX_LENGTH, {
    message: TRAINING_SESSION_FORM_MESSAGES.titleTooLong,
  });

const descriptionSchema = z
  .string()
  .trim()
  .max(TRAINING_SESSION_DESCRIPTION_MAX_LENGTH, {
    message: TRAINING_SESSION_FORM_MESSAGES.descriptionTooLong,
  })
  .transform((value) => (value === "" ? undefined : value));

function isValidDateTimeLocal(value: string) {
  return !Number.isNaN(new Date(value).getTime());
}

const startsAtSchema = z
  .string()
  .min(1, { message: TRAINING_SESSION_FORM_MESSAGES.startsAtRequired })
  .refine(isValidDateTimeLocal, {
    message: TRAINING_SESSION_FORM_MESSAGES.invalidDate,
  });

const endsAtSchema = z.string().optional();

const capacitySchema = z
  .string()
  .min(1, { message: TRAINING_SESSION_FORM_MESSAGES.capacityRequired })
  .transform((value) => Number(value))
  .refine((value) => Number.isInteger(value) && value >= 1, {
    message: TRAINING_SESSION_FORM_MESSAGES.capacityInvalid,
  });

const priceSchema = z
  .string()
  .min(1, { message: TRAINING_SESSION_FORM_MESSAGES.priceRequired })
  .transform((value) => Number(value))
  .refine((value) => Number.isInteger(value) && value >= 0, {
    message: TRAINING_SESSION_FORM_MESSAGES.priceInvalid,
  });

const currencySchema = z
  .string()
  .trim()
  .toUpperCase()
  .length(TRAINING_SESSION_CURRENCY_LENGTH, {
    message: TRAINING_SESSION_FORM_MESSAGES.currencyInvalid,
  });

export const trainingSessionSchema = z
  .object({
    title: titleSchema,
    description: descriptionSchema,
    startsAt: startsAtSchema,
    endsAt: endsAtSchema,
    durationOption: durationOptionSchema,
    capacity: capacitySchema,
    price: priceSchema,
    currency: currencySchema,
  })
  .superRefine((data, context) => {
    if (data.durationOption !== "custom") {
      return;
    }

    if (!data.endsAt) {
      context.addIssue({
        code: "custom",
        path: ["endsAt"],
        message: TRAINING_SESSION_FORM_MESSAGES.endsAtRequired,
      });
      return;
    }

    if (!isValidDateTimeLocal(data.endsAt)) {
      context.addIssue({
        code: "custom",
        path: ["endsAt"],
        message: TRAINING_SESSION_FORM_MESSAGES.invalidDate,
      });
      return;
    }

    if (new Date(data.endsAt).getTime() <= new Date(data.startsAt).getTime()) {
      context.addIssue({
        code: "custom",
        path: ["endsAt"],
        message: TRAINING_SESSION_FORM_MESSAGES.invalidTimeRange,
      });
    }
  });
