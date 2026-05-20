import "server-only";

import type { MeResponseDto, PublicUserDto } from "@repo/api-contracts";
import { getApiUrl } from "./env";
import { cookies } from "next/headers";

export async function getCurrentUser(): Promise<PublicUserDto | null> {
  const cookie = await cookies();
  const accessToken = cookie.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  const response = await fetch(`${getApiUrl()}/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const result = (await response.json()) as MeResponseDto;

  return result.user;
}
