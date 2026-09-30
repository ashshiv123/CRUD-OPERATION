const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export async function apiRequest(path, options = {}) {
  const { body, headers, ...rest } = options;
  const finalHeaders = { ...(headers || {}) };
  const isFormData = body instanceof FormData;

  let finalBody = body;
  if (body && !isFormData && typeof body !== "string") {
    finalHeaders["Content-Type"] = finalHeaders["Content-Type"] || "application/json";
    finalBody = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    ...rest,
    headers: finalHeaders,
    body: finalBody,
  });

  const contentType = response.headers.get("content-type") || "";
  const hasJson = contentType.includes("application/json");
  const data = hasJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const errorMessage = data?.error || `Request failed with ${response.status}`;
    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
