"use server";

import { redirect } from "next/navigation";
import { getApiUrl } from "../../lib/env";
import type { LoginResponseDto } from "@repo/api-contracts";
import { cookies } from "next/headers";

import type { FormActionState } from "../../lib/form-state";

export type LoginFields = "email" | "password";
export type RegisterFields = "email" | "password" | "name";

export type LoginActionState = FormActionState<LoginFields>;
export type RegisterActionState = FormActionState<RegisterFields>;



export async function loginAction(_prevState: LoginActionState, formData: FormData): Promise<LoginActionState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const errors: LoginActionState['errors'] = {};

  if (!email) {
    errors.email = ["Email is required"];
  }

  if (!password) {
    errors.password = ["Password is required"];
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const response = await fetch(`${ getApiUrl() }/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return {
      error: "Prihlaseni se nepodarilo.",
      errors: {},
    };
  }

  const result = (await response.json()) as LoginResponseDto;

  const cookieStore = await cookies();

  cookieStore.set("accessToken", result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60,
  });

  redirect("/dashboard");
}

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");

  redirect("/login");
}

export async function registerAction(_prevState: RegisterActionState, formData: FormData): Promise<RegisterActionState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const errors: RegisterActionState['errors'] = {};

  if (!name) {
    errors.name = ["Name is required"];
  }

  if (!email) {
    errors.email = ["Email is required"];
  }

  if (!password) {
    errors.password = ["Password is required"];
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const response = await fetch(`${ getApiUrl() }/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    return {
      error: "Registrace se nepodarila.",
      errors: {},
    };
  }

  redirect("/login?message=registered");
}
