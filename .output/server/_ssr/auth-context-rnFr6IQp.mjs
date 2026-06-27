import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-context-rnFr6IQp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** API base URL — use relative path in dev (Vite proxy) or absolute in production. */
var API_BASE = "/api/v1";
var AUTH_STORAGE_KEY = "aurora_auth";
function getStoredAuth$1() {
	try {
		const raw = localStorage.getItem(AUTH_STORAGE_KEY);
		if (!raw) return null;
		return JSON.parse(raw);
	} catch {
		return null;
	}
}
var ApiError = class extends Error {
	status;
	code;
	reason;
	constructor(message, status, code, reason) {
		super(message);
		this.status = status;
		this.code = code;
		this.reason = reason;
		this.name = "ApiError";
	}
};
function getStoredAuth() {
	if (typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem(AUTH_STORAGE_KEY);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}
function setStoredAuth(auth) {
	if (typeof window === "undefined") return;
	if (auth) localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
	else localStorage.removeItem(AUTH_STORAGE_KEY);
}
var refreshPromise = null;
async function refreshAccessToken() {
	const auth = getStoredAuth();
	if (!auth?.refresh_token) return null;
	if (!refreshPromise) refreshPromise = (async () => {
		try {
			const res = await fetch(`${API_BASE}/auth/refresh`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ refresh_token: auth.refresh_token })
			});
			if (!res.ok) return null;
			const json = await res.json();
			const updated = {
				...auth,
				access_token: json.data.access_token,
				refresh_token: json.data.refresh_token
			};
			setStoredAuth(updated);
			return updated.access_token;
		} catch {
			return null;
		} finally {
			refreshPromise = null;
		}
	})();
	return refreshPromise;
}
async function apiRequest(path, options = {}, retry = true) {
	const headers = new Headers(options.headers);
	if (!headers.has("Content-Type") && !(options.body instanceof FormData)) headers.set("Content-Type", "application/json");
	const auth = getStoredAuth();
	if (auth?.access_token) headers.set("Authorization", `Bearer ${auth.access_token}`);
	const res = await fetch(`${API_BASE}${path}`, {
		...options,
		headers
	});
	if (res.status === 401 && retry && auth?.refresh_token && !path.includes("/auth/")) {
		const newToken = await refreshAccessToken();
		if (newToken) {
			headers.set("Authorization", `Bearer ${newToken}`);
			return handleResponse(await fetch(`${API_BASE}${path}`, {
				...options,
				headers
			}));
		}
	}
	return handleResponse(res);
}
async function handleResponse(res) {
	const json = await res.json().catch(() => ({}));
	if (!res.ok) throw new ApiError(json.message || json.reason || `Request failed (${res.status})`, res.status, json.code, json.reason);
	if (json && typeof json === "object" && "data" in json) return json.data;
	return json;
}
var api = {
	get: (path) => apiRequest(path),
	post: (path, body) => apiRequest(path, {
		method: "POST",
		body: body instanceof FormData ? body : JSON.stringify(body ?? {})
	}),
	postForm: (path, form) => apiRequest(path, {
		method: "POST",
		body: form
	}),
	delete: (path) => apiRequest(path, { method: "DELETE" })
};
var AuthContext = (0, import_react.createContext)(null);
function AuthProvider({ children }) {
	const defaultUser = {
		id: "hackathon-user",
		email: "demo@aurora.local",
		full_name: "Demo Admin",
		role: "admin"
	};
	const [auth, setAuth] = (0, import_react.useState)({
		access_token: "dummy",
		refresh_token: "dummy",
		user: defaultUser
	});
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setStoredAuth({
			access_token: "dummy",
			refresh_token: "dummy",
			user: defaultUser
		});
	}, []);
	const login = async (email, password) => {
		const data = await api.post("/auth/login", {
			email,
			password
		});
		const session = {
			access_token: data.tokens.access_token,
			refresh_token: data.tokens.refresh_token,
			user: data.user
		};
		setStoredAuth(session);
		setAuth(session);
	};
	const register = async (email, password, full_name) => {
		const data = await api.post("/auth/register", {
			email,
			password,
			full_name
		});
		const session = {
			access_token: data.tokens.access_token,
			refresh_token: data.tokens.refresh_token,
			user: data.user
		};
		setStoredAuth(session);
		setAuth(session);
	};
	const logout = () => {
		localStorage.removeItem(AUTH_STORAGE_KEY);
		setAuth(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			auth,
			isLoading,
			login,
			register,
			logout
		},
		children
	});
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}
//#endregion
export { useAuth as a, getStoredAuth$1 as i, AuthProvider as n, api as r, API_BASE as t };
