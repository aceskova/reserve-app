import { z } from "zod";
import {
  AUTH_EMAIL_MAX_LENGTH,
  AUTH_NAME_MAX_LENGTH,
  AUTH_NAME_MIN_LENGTH,
  AUTH_PASSWORD_MAX_LENGTH,
  AUTH_PASSWORD_MIN_LENGTH,
} from "@repo/api-contracts";

const AUTH_FORM_MESSAGES = {
  invalidEmail: "Zadej platny email.",
  emailTooLong: "Email je prilis dlouhy.",
  passwordRequired: "Heslo je povinne.",
  passwordTooShort: `Heslo musi mit alespon ${AUTH_PASSWORD_MIN_LENGTH} znaku.`,
  passwordTooLong: "Heslo je prilis dlouhe.",
  nameTooShort: `Jmeno musi mit alespon ${AUTH_NAME_MIN_LENGTH} znaky.`,
  nameTooLong: "Jmeno je prilis dlouhe.",
} as const;

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(
    z
      .email({ message: AUTH_FORM_MESSAGES.invalidEmail })
      .max(AUTH_EMAIL_MAX_LENGTH, { message: AUTH_FORM_MESSAGES.emailTooLong }),
  );

const passwordSchema = z
  .string()
  .min(AUTH_PASSWORD_MIN_LENGTH, {
    message: AUTH_FORM_MESSAGES.passwordTooShort,
  })
  .max(AUTH_PASSWORD_MAX_LENGTH, {
    message: AUTH_FORM_MESSAGES.passwordTooLong,
  });

const nameSchema = z
  .string()
  .trim()
  .min(AUTH_NAME_MIN_LENGTH, {
    message: AUTH_FORM_MESSAGES.nameTooShort,
  })
  .max(AUTH_NAME_MAX_LENGTH, { message: AUTH_FORM_MESSAGES.nameTooLong });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});
