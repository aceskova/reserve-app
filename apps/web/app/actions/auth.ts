"use server";

import { redirect } from "next/navigation";
import { getApiUrl } from "../../lib/env";
import type { LoginResponseDto } from "@repo/api-contracts";
import { cookies } from "next/headers";

export type LoginActionState = {
  error?: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
};

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
    return { error: "Prihlaseni se nepodarilo." };
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

