import { API_BASE_URL } from '@/lib/config';

type ApiOptions = Omit<RequestInit, 'body'> & {
  body?: BodyInit | FormData | Record<string, unknown> | null;
};

export class ApiError extends Error {
  status?: number;
  data?: unknown;
}

export async function apiRequest<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options;
  const finalHeaders = new Headers(headers || {});
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  let finalBody: BodyInit | undefined;
  if (body == null) {
    finalBody = undefined;
  } else if (typeof body === 'string' || isFormData) {
    finalBody = body as BodyInit;
  } else {
    finalHeaders.set('Content-Type', finalHeaders.get('Content-Type') || 'application/json');
    finalBody = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    ...rest,
    headers: finalHeaders,
    body: finalBody,
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const error = new ApiError(
      (data as { error?: string } | null)?.error || `Request failed with ${response.status}`
    );
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data as T;
}
