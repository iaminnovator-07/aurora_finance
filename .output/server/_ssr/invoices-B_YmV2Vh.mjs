import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as RefreshCw, _ as Search } from "../_libs/lucide-react.mjs";
import { a as PageHeader, i as ConfidenceBar, n as Badge, r as Card, t as AppLayout, x as useInvoices } from "./ui-bits-nExllFl8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/invoices-B_YmV2Vh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUS_FILTERS = [
	"All",
	"auto_approved",
	"in_review",
	"flagged",
	"dispatched"
];
function statusLabel(s) {
	return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
function statusTone(s) {
	if (s === "auto_approved" || s === "approved" || s === "dispatched") return "success";
	if (s === "in_review" || s === "draft") return "warning";
	if (s === "rejected" || s === "flagged") return "destructive";
	return "default";
}
function Invoices() {
	const [filter, setFilter] = (0, import_react.useState)("All");
	const [search, setSearch] = (0, import_react.useState)("");
	const { data, isLoading, refetch } = useInvoices(filter === "All" ? void 0 : filter, search || void 0);
	const rows = data?.items ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Invoices",
		subtitle: "All invoices captured by Aurora across channels.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => refetch(),
			className: "h-10 px-3 rounded-xl border border-border text-sm inline-flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4" }), " Refresh"]
		}) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "!p-0 overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 border-b border-border flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex-1 max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: search,
					onChange: (e) => setSearch(e.target.value),
					className: "w-full h-10 pl-10 pr-3 rounded-lg bg-muted/40 border border-border text-sm",
					placeholder: "Search invoices…"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1 text-xs",
				children: STATUS_FILTERS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setFilter(t),
					className: `px-3 py-1.5 rounded-md capitalize ${filter === t ? "bg-primary/15 text-primary" : "hover:bg-accent text-muted-foreground"}`,
					children: t === "All" ? t : statusLabel(t)
				}, t))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-8 text-center text-sm text-muted-foreground",
				children: "Loading invoices…"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "text-xs uppercase tracking-wider text-muted-foreground bg-muted/30",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-left px-5 py-3 font-medium",
							children: "Invoice"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-left px-5 py-3 font-medium",
							children: "Vendor"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-left px-5 py-3 font-medium",
							children: "Date"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-right px-5 py-3 font-medium",
							children: "Amount"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-left px-5 py-3 font-medium w-44",
							children: "Trust"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-left px-5 py-3 font-medium",
							children: "Status"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: 6,
					className: "px-5 py-8 text-center text-muted-foreground",
					children: "No invoices found. Process emails from the Inbox."
				}) }), rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-border hover:bg-accent/30 transition",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-3 font-medium",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/approvals",
								className: "hover:text-primary",
								children: r.invoice_number
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-3",
							children: r.vendor_name ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-3 text-muted-foreground",
							children: r.issue_date ?? new Date(r.created_at).toLocaleDateString()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-3 text-right tabular-nums font-semibold",
							children: r.total_amount ? `$${Number(r.total_amount).toLocaleString()}` : "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfidenceBar, { value: r.trust_score ?? 0 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-5 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: statusTone(r.status),
								children: statusLabel(r.status)
							})
						})
					]
				}, r.id))] })]
			})
		})]
	})] });
}
//#endregion
export { Invoices as component };
