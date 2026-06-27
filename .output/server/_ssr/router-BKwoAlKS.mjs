import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react, r as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { n as AuthProvider } from "./auth-context-rnFr6IQp.mjs";
import { A as redirect, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BKwoAlKS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-B4D0UH7e.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass max-w-md rounded-2xl p-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-gradient",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-6 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90",
					children: "Back to Dashboard"
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass max-w-md rounded-2xl p-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: error.message
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						router.invalidate();
						reset();
					},
					className: "mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground",
					children: "Try again"
				})
			]
		})
	});
}
var Route$14 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Aurora TIA — Touchless Invoice Agent" },
			{
				name: "description",
				content: "Enterprise AI-powered touchless invoice processing platform."
			},
			{
				name: "theme-color",
				content: "#0B1020"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$14.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			theme: "dark",
			position: "bottom-right"
		})] })
	});
}
var $$splitComponentImporter$12 = () => import("./trust-DHn6FSqT.mjs");
var Route$13 = createFileRoute("/trust")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./settings-BKT6f2NK.mjs");
var Route$12 = createFileRoute("/settings")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./rules-Bs4lbNR_.mjs");
var Route$11 = createFileRoute("/rules")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./login-lU6LRp6a.mjs");
var Route$10 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./invoices-B_YmV2Vh.mjs");
var Route$9 = createFileRoute("/invoices")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./inbox-YanHL6rJ.mjs");
var Route$8 = createFileRoute("/inbox")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./exceptions-CbR9qdKc.mjs");
var Route$7 = createFileRoute("/exceptions")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./dashboard-Cxi0PMEO.mjs");
var Route$6 = createFileRoute("/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./copilot-DlKgrfiJ.mjs");
var Route$5 = createFileRoute("/copilot")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./clients-DYZlMoiW.mjs");
var Route$4 = createFileRoute("/clients")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./approvals-vDuAg1gm.mjs");
var Route$3 = createFileRoute("/approvals")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./analytics-DZfGYg0P.mjs");
var Route$2 = createFileRoute("/analytics")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./agents-BCAoHVA5.mjs");
var Route$1 = createFileRoute("/agents")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var Route = createFileRoute("/")({ beforeLoad: () => {
	throw redirect({ to: "/dashboard" });
} });
var TrustRoute = Route$13.update({
	id: "/trust",
	path: "/trust",
	getParentRoute: () => Route$14
});
var SettingsRoute = Route$12.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$14
});
var RulesRoute = Route$11.update({
	id: "/rules",
	path: "/rules",
	getParentRoute: () => Route$14
});
var LoginRoute = Route$10.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$14
});
var InvoicesRoute = Route$9.update({
	id: "/invoices",
	path: "/invoices",
	getParentRoute: () => Route$14
});
var InboxRoute = Route$8.update({
	id: "/inbox",
	path: "/inbox",
	getParentRoute: () => Route$14
});
var ExceptionsRoute = Route$7.update({
	id: "/exceptions",
	path: "/exceptions",
	getParentRoute: () => Route$14
});
var DashboardRoute = Route$6.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$14
});
var CopilotRoute = Route$5.update({
	id: "/copilot",
	path: "/copilot",
	getParentRoute: () => Route$14
});
var ClientsRoute = Route$4.update({
	id: "/clients",
	path: "/clients",
	getParentRoute: () => Route$14
});
var ApprovalsRoute = Route$3.update({
	id: "/approvals",
	path: "/approvals",
	getParentRoute: () => Route$14
});
var AnalyticsRoute = Route$2.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => Route$14
});
var AgentsRoute = Route$1.update({
	id: "/agents",
	path: "/agents",
	getParentRoute: () => Route$14
});
var rootRouteChildren = {
	IndexRoute: Route.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$14
	}),
	AgentsRoute,
	AnalyticsRoute,
	ApprovalsRoute,
	ClientsRoute,
	CopilotRoute,
	DashboardRoute,
	ExceptionsRoute,
	InboxRoute,
	InvoicesRoute,
	LoginRoute,
	RulesRoute,
	SettingsRoute,
	TrustRoute
};
var routeTree = Route$14._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
