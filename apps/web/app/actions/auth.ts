"use server";

import { redirect } from "next/navigation";
import {
  AUTH_ERROR_CODES,
  type ApiErrorResponse,
  type AuthErrorCode,
  type LoginResponseDto,
  type RegisterResponseDto,
} from "@repo/api-contracts";
import { cookies } from "next/headers";
import { loginSchema, registerSchema } from "../../lib/auth-schemas";
import type { FormActionState } from "../../lib/form-state";
import { z } from "zod";
import { sendPublicRequest } from "../../lib/api-client";

export type LoginFields = "email" | "password";
export type RegisterFields = "email" | "password" | "name";

export type LoginActionState = FormActionState<LoginFields>;
export type RegisterActionState = FormActionState<RegisterFields>;

const AUTH_API_ERROR_MESSAGES = {
  [AUTH_ERROR_CODES.EMAIL_ALREADY_EXISTS]:
    "Uživatel s tímto emailem už existuje.",
  [AUTH_ERROR_CODES.INVALID_CREDENTIALS]: "Email nebo heslo není správně.",
  [AUTH_ERROR_CODES.USER_NOT_FOUND]: "Přihlášení už není platné.",
} satisfies Record<AuthErrorCode, string>;

export async function loginAction(
  _prevState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const values = {
    email: String(formData.get("email") ?? ""),
  };

  if (!parsed.success) {
    return {
      errors: getFieldErrors<LoginFields>(parsed.error),
      values,
    };
  }

  const result = await sendPublicRequest<LoginResponseDto>({
    method: "POST",
    path: "/v1/auth/login",
    body: parsed.data,
  });

  if (!result.ok) {
    return {
      error: getAuthApiErrorMessage(result.error, "Přihlášení se nepodařilo."),
      errors: {},
      values,
    };
  }
  await setAccessTokenCookie(result.data.accessToken);

  redirect("/dashboard");
}

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");

  redirect("/login");
}

export async function registerAction(
  _prevState: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const values = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "")
      .trim()
      .toLowerCase(),
  };

  if (!parsed.success) {
    const errors = getFieldErrors<RegisterFields>(parsed.error);

    return {
      errors,
      values,
    };
  }

  const result = await sendPublicRequest<RegisterResponseDto>({
    method: "POST",
    path: "/v1/auth/register",
    body: parsed.data,
  });

  if (!result.ok) {
    return {
      error: getAuthApiErrorMessage(result.error, "Registrace se nepodařila."),
      errors: {},
      values,
    };
  }

  redirect("/login?message=registered");
}

async function setAccessTokenCookie(accessToken: string) {
  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60,
  });
}

function getFieldErrors<T extends string>(error: z.ZodError) {
  return z.flattenError(error).fieldErrors as Partial<Record<T, string[]>>;
}

function getAuthApiErrorMessage(
  error: ApiErrorResponse | null,
  fallback: string,
) {
  if (!error?.code) {
    return fallback;
  }

  if (isAuthErrorCode(error.code)) {
    return AUTH_API_ERROR_MESSAGES[error.code];
  }

  return fallback;
}

function isAuthErrorCode(code: string): code is AuthErrorCode {
  return Object.values(AUTH_ERROR_CODES).includes(code as AuthErrorCode);
}
