import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { C as Plus, V as GripVertical, r as Zap } from "../_libs/lucide-react.mjs";
import { a as PageHeader, n as Badge, r as Card, t as AppLayout } from "./ui-bits-nExllFl8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rules-Bs4lbNR_.js
var import_jsx_runtime = require_jsx_runtime();
var rules = [
	{
		name: "Auto-approve under $1,000",
		when: "amount < 1000 AND vendor.trust > 85",
		then: "approve + push ERP",
		on: true
	},
	{
		name: "Flag duplicate within 30d",
		when: "similar(invoice) > 0.95",
		then: "queue: needs_review",
		on: true
	},
	{
		name: "Reject unknown domain + urgent keywords",
		when: "vendor.unknown AND subject matches /urgent|wire/i",
		then: "reject + alert security",
		on: true
	},
	{
		name: "Multi-level approval > $10k",
		when: "amount > 10000",
		then: "request approval: manager → CFO",
		on: true
	},
	{
		name: "Hold if PO mismatch",
		when: "po.amount != invoice.amount",
		then: "queue: waiting_approval",
		on: false
	}
];
function Rules() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Business Rules",
		subtitle: "Define when Aurora acts autonomously vs. escalates.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: "h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium inline-flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " New rule"]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid lg:grid-cols-[1fr_360px] gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "!p-0 overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "divide-y divide-border",
				children: rules.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 flex items-center gap-3 hover:bg-accent/30",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, { className: "h-4 w-4 text-muted-foreground cursor-grab" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-semibold",
									children: r.name
								}), r.on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "success",
									children: "Active"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Paused" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
										className: "text-foreground/80",
										children: "When"
									}),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
										className: "px-1 py-0.5 rounded bg-muted text-[11px]",
										children: r.when
									}),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
										className: "text-foreground/80 ml-2",
										children: "→"
									}),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
										className: "px-1 py-0.5 rounded bg-muted text-[11px]",
										children: r.then
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "relative inline-flex items-center cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								defaultChecked: r.on,
								className: "sr-only peer"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 h-5 bg-muted rounded-full peer peer-checked:bg-primary transition relative after:absolute after:top-0.5 after:left-0.5 after:bg-white after:h-4 after:w-4 after:rounded-full after:transition-all peer-checked:after:translate-x-5" })]
						})
					]
				}, i))
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "font-semibold mb-3 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4 w-4 text-warning" }), " Rule Impact (30d)"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Auto-approvals"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold",
							children: "1,842"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Duplicates blocked"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold",
							children: "38"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Fraud rejected"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-destructive",
							children: "12"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Escalations"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold",
							children: "214"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 p-3 rounded-xl border border-[color:var(--ai)]/30 bg-[color:var(--ai)]/5 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
						className: "text-[color:var(--ai)]",
						children: "Aurora suggests"
					}),
					" a new rule: ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "\"Auto-approve recurring SaaS subscriptions from verified vendors under $500\"" }),
					" — would have auto-cleared 84 invoices this month.",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "mt-2 text-[color:var(--ai)] font-semibold hover:underline",
						children: "Review suggestion →"
					})
				]
			})
		] })]
	})] });
}
//#endregion
export { Rules as component };
