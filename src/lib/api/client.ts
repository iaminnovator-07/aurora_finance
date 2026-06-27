import { API_BASE, AUTH_STORAGE_KEY, type StoredAuth } from "./config";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public reason?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type ApiEnvelope<T> = {
  success: boolean;
  message?: string;
  data: T;
  confidence?: number;
};

export function getStoredAuth(): StoredAuth | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredAuth) : null;
  } catch {
    return null;
  }
}

export function setStoredAuth(auth: StoredAuth | null) {
  if (typeof window === "undefined") return;
  if (auth) localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
  else localStorage.removeItem(AUTH_STORAGE_KEY);
}

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const auth = getStoredAuth();
  if (!auth?.refresh_token) return null;
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh_token: auth.refresh_token }),
        });
        if (!res.ok) return null;
        const json = (await res.json()) as ApiEnvelope<{
          access_token: string;
          refresh_token: string;
        }>;
        const updated = {
          ...auth,
          access_token: json.data.access_token,
          refresh_token: json.data.refresh_token,
        };
        setStoredAuth(updated);
        return updated.access_token;
      } catch {
        return null;
      } finally {
        refreshPromise = null;
      }
    })();
  }
  return refreshPromise;
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  retry = true,
): Promise<T> {
  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  // Hackathon Demo Mode: No Authorization header needed.
  
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(
      json.message || json.reason || `Request failed (${res.status})`,
      res.status,
      json.code,
      json.reason,
    );
  }

  if (json && typeof json === "object" && "data" in json) {
    return (json as ApiEnvelope<T>).data;
  }
  return json as T;
}

export const api = {
  get: <T>(path: string) => apiRequest<T>(path),
  post: <T>(path: string, body?: unknown) =>
    apiRequest<T>(path, {
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body ?? {}),
    }),
  postForm: <T>(path: string, form: FormData) =>
    apiRequest<T>(path, { method: "POST", body: form }),
};

function getMockDataForPath(path: string) {
  if (path.includes("/emails")) {
    return { items: [], total: 0 };
  }
  if (path.includes("/exceptions")) {
    return { columns: { needs_review: [], waiting_approval: [], rejected: [], resolved: [] } };
  }
  if (path.includes("/analytics/dashboard")) {
    return {
      processed_today: 124,
      touchless_percentage: 84.5,
      hours_saved_today: 18,
      pending_review: 5,
      fraud_alerts: 1,
      trust_avg: 92,
      ai_accuracy: 98.2,
      throughput_trend: [],
      vendor_breakdown: [],
      approval_breakdown: [],
      recent_invoices: [],
    };
  }
  if (path.includes("/agents/status")) {
    return {
      agents: [
        { name: "Mail Intelligence", status: "active", task: "Watching Inbox", time: "12ms", conf: 100 },
        { name: "OCR Extraction", status: "idle", task: "Standby", time: "-", conf: 100 },
      ],
      pipeline_running: true,
      live_logs: [],
    };
  }
  if (path.includes("/invoices")) {
    return { items: [], total: 0 };
  }
  if (path.includes("/clients")) {
    return { items: [], total: 0 };
  }
  if (path.includes("/approvals")) {
    return { items: [], total: 0 };
  }
  return {};
}
