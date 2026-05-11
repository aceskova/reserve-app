import "server-only";

export function getApiUrl() {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    throw new Error("API_URL is not set");
  }

  return apiUrl;
}
