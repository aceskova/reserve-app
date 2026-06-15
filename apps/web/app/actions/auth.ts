"use server";

import { redirect } from "next/navigation";
import { getApiUrl } from "../../lib/env";
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

  const result = await postApi<LoginResponseDto>("/v1/auth/login", parsed.data);

  if (!result.ok) {
    return {
      error: getAuthApiErrorMessage(
        result.error,
        "Přihlášení se nepodařilo.",
      ),
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

  const result = await postApi<RegisterResponseDto>(
    "/v1/auth/register",
    parsed.data,
  );

  if (!result.ok) {
    return {
      error: getAuthApiErrorMessage(
        result.error,
        "Registrace se nepodařila.",
      ),
      errors: {},
      values,
    };
  }

  redirect("/login?message=registered");
}

async function postApi<TResponse>(
  path: string,
  body: unknown,
): Promise<
  | { ok: true; data: TResponse }
  | { ok: false; error: ApiErrorResponse | null }
> {
  const response = await fetch(`${getApiUrl()}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as
      | ApiErrorResponse
      | null;

    return { ok: false, error };
  }

  return {
    ok: true,
    data: (await response.json()) as TResponse,
  };
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
