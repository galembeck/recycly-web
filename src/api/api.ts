const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5005";

type ApiError = {
  status: number;
  message: string;
};

export type ApiException = Error & { status: number };

export function createApiException(
  status: number,
  message: string,
): ApiException {
  const err = new Error(message) as ApiException;
  err.status = status;
  return err;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const isFormData = options.body instanceof FormData;
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: isFormData
      ? { ...options.headers }
      : { "Content-Type": "application/json", ...options.headers },
  });

  if (!res.ok) {
    let message = res.statusText;
    try {
      const body = (await res.json()) as ApiError | { message?: string };
      if ("message" in body && body.message) message = body.message;
    } catch {
      // ignore parse errors
    }
    throw createApiException(res.status, message);
  }

  const text = await res.text();
  return text ? (JSON.parse(text) as T) : (undefined as T);
}

export const API = {
  get: <T>(path: string, options?: RequestInit) =>
    request<T>(path, { method: "GET", ...options }),

  post: <T>(path: string, body?: unknown, options?: RequestInit) =>
    request<T>(path, {
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...options,
    }),

  postForm: <T>(path: string, formData: FormData, options?: RequestInit) =>
    request<T>(path, { method: "POST", body: formData, ...options }),

  put: <T>(path: string, body?: unknown, options?: RequestInit) =>
    request<T>(path, {
      method: "PUT",
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...options,
    }),

  delete: <T>(path: string, options?: RequestInit) =>
    request<T>(path, { method: "DELETE", ...options }),
};
