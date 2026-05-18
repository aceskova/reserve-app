import { z } from "zod";
import {
  AUTH_EMAIL_MAX_LENGTH,
  AUTH_NAME_MAX_LENGTH,
  AUTH_NAME_MIN_LENGTH,
  AUTH_PASSWORD_MAX_LENGTH,
  AUTH_PASSWORD_MIN_LENGTH,
} from "@repo/api-contracts";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Zadej platny email.")
    .max(AUTH_EMAIL_MAX_LENGTH, "Email je prilis dlouhy."),
  password: z
    .string()
    .min(1, "Heslo je povinne.")
    .max(AUTH_PASSWORD_MAX_LENGTH, "Heslo je prilis dlouhe."),
});

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(AUTH_NAME_MIN_LENGTH, `Jmeno musi mit alespon ${AUTH_NAME_MIN_LENGTH} znaky.`)
    .max(AUTH_NAME_MAX_LENGTH, "Jmeno je prilis dlouhe."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Zadej platny email.")
    .max(AUTH_EMAIL_MAX_LENGTH, "Email je prilis dlouhy."),
  password: z
    .string()
    .min(
      AUTH_PASSWORD_MIN_LENGTH,
      `Heslo musi mit alespon ${AUTH_PASSWORD_MIN_LENGTH} znaku.`,
    )
    .max(AUTH_PASSWORD_MAX_LENGTH, "Heslo je prilis dlouhe."),
});
