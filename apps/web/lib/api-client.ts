import "server-only";

import type { ApiErrorResponse } from "@repo/api-contracts";
import { getApiUrl } from "./env";
import { cookies } from "next/headers";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

type ApiResult<TResponse> =
  | { ok: true; data: TResponse }
  | { ok: false; error: ApiErrorResponse | null };

type SendRequestOptions = {
  method: HttpMethod;
  path: string;
  body?: unknown;
  accessToken?: string;
};

async function sendRequest<TResponse>({
  method,
  path,
  body,
  accessToken,
}: SendRequestOptions): Promise<ApiResult<TResponse>> {
  const headers: Record<string, string> = {};

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${getApiUrl()}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    const error = (await response
      .json()
      .catch(() => null)) as ApiErrorResponse | null;

    return { ok: false, error };
  }

  return {
    ok: true,
    data: (await response.json()) as TResponse,
  };
}

export async function sendPublicRequest<TResponse>(
  options: Omit<SendRequestOptions, "accessToken">,
): Promise<ApiResult<TResponse>> {
  return sendRequest<TResponse>(options);
}

export async function sendAuthenticatedRequest<TResponse>(
  options: Omit<SendRequestOptions, "accessToken">,
): Promise<ApiResult<TResponse>> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return sendRequest<TResponse>({
    ...options,
    accessToken,
  });
}
