"use server";

import { redirect } from "next/navigation";
import { getApiUrl } from "../../lib/env";
import type { LoginResponseDto } from "@repo/api-contracts";
import { cookies } from "next/headers";
import { loginSchema, registerSchema } from "../../lib/auth-schemas";
import type { FormActionState } from "../../lib/form-state";

export type LoginFields = "email" | "password";
export type RegisterFields = "email" | "password" | "name";

export type LoginActionState = FormActionState<LoginFields>;
export type RegisterActionState = FormActionState<RegisterFields>;

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
      errors: parsed.error.flatten().fieldErrors,
      values,
    };
  }

  const result = await postApi<LoginResponseDto>("/v1/auth/login", parsed.data);

  if (!result) {
    return {
      error: "Prihlaseni se nepodarilo.",
      errors: {},
      values,
    };
  }
  await setAccessTokenCookie(result.accessToken);

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
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
  };

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      values,
    };
  }

  const result = await postApi("/v1/auth/register", parsed.data);

  if (!result) {
    return {
      error: "Registrace se nepodarila.",
      errors: {},
      values,
    };
  }

  redirect("/login?message=registered");
}

async function postApi<TResponse>(
  path: string,
  body: unknown,
): Promise<TResponse | null> {
  const response = await fetch(`${getApiUrl()}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return null;
  }

  return response.json() as Promise<TResponse>;
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
