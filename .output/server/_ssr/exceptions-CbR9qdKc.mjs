import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { C as Plus } from "../_libs/lucide-react.mjs";
import { a as PageHeader, b as useExceptions, n as Badge, r as Card, t as AppLayout } from "./ui-bits-nExllFl8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/exceptions-CbR9qdKc.js
var import_jsx_runtime = require_jsx_runtime();
var COLUMN_META = [
	{
		key: "needs_review",
		title: "Needs Review",
		tone: "warning"
	},
	{
		key: "waiting_approval",
		title: "Waiting Approval",
		tone: "primary"
	},
	{
		key: "rejected",
		title: "Rejected",
		tone: "destructive"
	},
	{
		key: "resolved",
		title: "Resolved",
		tone: "success"
	}
];
function riskTone(risk) {
	const r = risk.toLowerCase();
	if (r === "critical" || r === "high") return "destructive";
	if (r === "medium") return "warning";
	return "default";
}
function Exceptions() {
	const { data, isLoading } = useExceptions();
	const columns = data?.columns ?? {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Exception Queue",
			subtitle: "Invoices that need a human in the loop.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium inline-flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " New exception"]
			})
		}),
		isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-center py-8 text-muted-foreground text-sm mb-4",
			children: "Loading exceptions…"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4",
			children: COLUMN_META.map((col) => {
				const items = columns[col.key] ?? [];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between px-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-2 w-2 rounded-full ${col.tone === "warning" ? "bg-warning" : col.tone === "primary" ? "bg-primary" : col.tone === "destructive" ? "bg-destructive" : "bg-success"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-sm",
								children: col.title
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: items.length
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 min-h-[200px]",
						children: [items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground text-center py-8 border border-dashed border-border rounded-xl",
							children: "No items"
						}), items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "!p-4 hover-glow cursor-grab",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-semibold",
										children: it.invoice_number ?? it.invoice_id
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: riskTone(it.risk_level),
										children: it.risk_level
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground mb-3",
									children: it.reason
								}),
								it.ai_suggestion && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg p-2 border border-[color:var(--ai)]/30 bg-[color:var(--ai)]/5 text-[11px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
											className: "text-[color:var(--ai)]",
											children: "Aurora:"
										}),
										" ",
										it.ai_suggestion
									]
								})
							]
						}, it.id))]
					})]
				}, col.key);
			})
		})
	] });
}
//#endregion
export { Exceptions as component };
