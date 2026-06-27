import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { N as Mail, R as Key, a as Workflow, f as Shield, o as Users, w as Plug } from "../_libs/lucide-react.mjs";
import { a as PageHeader, n as Badge, r as Card, t as AppLayout } from "./ui-bits-nExllFl8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-BKT6f2NK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tabs = [
	{
		key: "rules",
		label: "Approval Matrix",
		icon: Workflow
	},
	{
		key: "roles",
		label: "Roles",
		icon: Users
	},
	{
		key: "integrations",
		label: "Integrations",
		icon: Plug
	},
	{
		key: "api",
		label: "API Keys",
		icon: Key
	},
	{
		key: "security",
		label: "Security",
		icon: Shield
	},
	{
		key: "email",
		label: "Email",
		icon: Mail
	}
];
var erps = [
	{
		name: "SAP S/4HANA",
		connected: true,
		env: "Prod · EU"
	},
	{
		name: "Oracle NetSuite",
		connected: true,
		env: "Prod"
	},
	{
		name: "Microsoft Dynamics 365",
		connected: false
	},
	{
		name: "Workday",
		connected: false
	},
	{
		name: "QuickBooks Enterprise",
		connected: true,
		env: "Prod"
	},
	{
		name: "Xero",
		connected: false
	}
];
function SettingsPage() {
	const [tab, setTab] = (0, import_react.useState)("integrations");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Settings",
		subtitle: "Configure Aurora for your enterprise."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid lg:grid-cols-[220px_1fr] gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "!p-2 h-fit",
			children: tabs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setTab(t.key),
				className: `w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition ${tab === t.key ? "bg-primary/15 text-primary font-medium" : "hover:bg-accent text-muted-foreground"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t.icon, { className: "h-4 w-4" }),
					" ",
					t.label
				]
			}, t.key))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				tab === "integrations" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold mb-1",
						children: "ERP Integrations"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mb-4",
						children: "Push approved invoices directly to your system of record."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid sm:grid-cols-2 gap-3",
						children: erps.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 rounded-xl border border-border bg-background/40 flex items-center justify-between hover-glow",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold text-sm",
								children: e.name
							}), e.connected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] text-muted-foreground",
								children: e.env
							})] }), e.connected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "success",
								children: "Connected"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "text-xs px-3 py-1.5 rounded-lg bg-primary text-primary-foreground",
								children: "Connect"
							})]
						}, e.name))
					})
				] }),
				tab === "rules" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold mb-1",
						children: "Approval Matrix"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mb-4",
						children: "Multi-level routing based on invoice amount."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-xs uppercase tracking-wider text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-2",
									children: "Amount"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left",
									children: "Approver L1"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left",
									children: "Approver L2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left",
									children: "SLA"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border",
							children: [
								[
									"< $1,000",
									"Aurora AI",
									"—",
									"Instant"
								],
								[
									"$1,000 – $10,000",
									"Team Lead",
									"—",
									"4h"
								],
								[
									"$10,000 – $50,000",
									"Finance Manager",
									"Director",
									"1d"
								],
								[
									"> $50,000",
									"Director",
									"CFO",
									"2d"
								]
							].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 font-medium",
									children: r[0]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r[1] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r[2] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r[3] })
							] }, r[0]))
						})]
					})
				] }),
				tab === "roles" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold mb-4",
					children: "Team & Roles"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: [
						{
							name: "Anya Kapoor",
							role: "Finance Lead",
							email: "anya@company.com"
						},
						{
							name: "Marco Lin",
							role: "AP Manager",
							email: "marco@company.com"
						},
						{
							name: "Sara Vega",
							role: "AP Specialist",
							email: "sara@company.com"
						},
						{
							name: "David Chen",
							role: "Controller",
							email: "david@company.com"
						}
					].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 p-3 rounded-xl border border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-9 w-9 rounded-lg grid place-items-center text-xs font-bold",
								style: { background: "var(--gradient-aurora)" },
								children: m.name.split(" ").map((n) => n[0]).join("")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-semibold",
									children: m.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: m.email
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "primary",
								children: m.role
							})
						]
					}, m.email))
				})] }),
				tab === "api" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold mb-1",
						children: "API Keys"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mb-4",
						children: "Programmatic access to Aurora's invoice & analytics APIs."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: [{
							n: "Production",
							k: "aur_live_a8x...c12f"
						}, {
							n: "Staging",
							k: "aur_test_b3k...9281"
						}].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between p-3 rounded-xl border border-border bg-background/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-semibold",
								children: k.n
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "text-xs text-muted-foreground",
								children: k.k
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "text-xs px-3 py-1.5 rounded-lg border border-border",
								children: "Rotate"
							})]
						}, k.n))
					})
				] }),
				tab === "security" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold mb-4",
					children: "Security"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: [
						["SSO (SAML 2.0)", "Okta · enforced"],
						["MFA", "Required for all admins"],
						["IP allowlist", "3 corporate ranges"],
						["Audit log retention", "7 years"],
						["SOC 2 Type II", "Compliant"]
					].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between p-3 rounded-xl border border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: k
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: v
						})]
					}, k))
				})] }),
				tab === "email" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold mb-1",
						children: "Email Channels"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mb-4",
						children: "Mailboxes Aurora monitors for invoice ingestion."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: [
							"ap@yourcompany.com",
							"invoices@yourcompany.com",
							"billing@yourcompany.com"
						].map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between p-3 rounded-xl border border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4 text-primary" }),
									" ",
									e
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "success",
								children: "Active"
							})]
						}, e))
					})
				] })
			]
		})]
	})] });
}
//#endregion
export { SettingsPage as component };
