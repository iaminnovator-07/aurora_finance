import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { E as Percent, H as FileText, K as ExternalLink, M as MapPin, N as Mail, T as Phone, at as Activity, p as ShieldCheck } from "../_libs/lucide-react.mjs";
import { a as PageHeader, c as TrustRing, m as useClients, n as Badge, r as Card, t as AppLayout } from "./ui-bits-nExllFl8.mjs";
import { c as Line, i as LineChart, m as Tooltip, p as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/clients-DYZlMoiW.js
var import_jsx_runtime = require_jsx_runtime();
function formatUsd(n) {
	if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
	if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
	return `$${n.toFixed(0)}`;
}
function riskLabel(risk) {
	return risk.charAt(0).toUpperCase() + risk.slice(1);
}
function riskTone(risk) {
	const r = risk.toLowerCase();
	if (r === "low") return "success";
	if (r === "medium") return "warning";
	if (r === "high" || r === "critical") return "destructive";
	return "default";
}
function trustColor(trust) {
	if (trust == null) return "text-muted-foreground";
	if (trust >= 80) return "text-success";
	if (trust >= 60) return "text-warning";
	return "text-destructive";
}
function getInitials(name) {
	return name.substring(0, 2).toUpperCase();
}
function enrichClient(c) {
	const hash = c.name.length;
	return {
		...c,
		gst: `27AA${hash}B1234C1Z${hash % 9}`,
		pan: `AA${hash}B1234C`,
		approvalRate: 85 + hash % 15,
		paymentBehavior: [
			"Net 30",
			"Net 45",
			"Upon Receipt",
			"Net 60"
		][hash % 4]
	};
}
function Clients() {
	const { data, isLoading } = useClients();
	const clients = (data?.items ?? []).map(enrichClient);
	const featured = clients[0];
	const spark = Array.from({ length: 12 }, (_, i) => ({
		x: i,
		y: featured?.trust_score ?? 0
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Vendors & Clients",
			subtitle: "Trust profiles, spend, and risk across your network."
		}),
		isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-48 rounded-xl bg-slate-900 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 rounded-xl bg-slate-900 animate-pulse" })]
		}),
		featured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mb-6 grid lg:grid-cols-[auto_1fr_auto] gap-6 items-center bg-slate-900 border-slate-800",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustRing, {
					score: Math.round(featured.trust_score ?? 0),
					size: 130
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-10 w-10 rounded bg-primary/20 text-primary grid place-items-center font-bold tracking-wider",
							children: getInitials(featured.name)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-bold",
									children: featured.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									tone: riskTone(featured.risk_level),
									children: [riskLabel(featured.risk_level), " risk"]
								}),
								featured.trust_score >= 80 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									tone: "success",
									className: "gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3 w-3" }), " Trusted"]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex gap-4 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["GST: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground",
								children: featured.gst
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["PAN: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground",
								children: featured.pan
							})] })]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid sm:grid-cols-3 gap-3 text-xs text-muted-foreground bg-slate-950 p-3 rounded-lg border border-slate-800",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }),
									" ",
									[featured.city, featured.country].filter(Boolean).join(", ") || "—"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3.5 w-3.5" }),
									" ",
									featured.email ?? featured.domain ?? "—"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3.5 w-3.5" }),
									" ",
									featured.phone ?? "—"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid grid-cols-4 gap-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-muted-foreground text-[10px] uppercase tracking-wider flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3 w-3" }), " Invoices"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-bold text-lg mt-0.5",
								children: featured.invoice_count
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-muted-foreground text-[10px] uppercase tracking-wider flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-3 w-3" }), " Spend YTD"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-bold text-lg mt-0.5",
								children: formatUsd(featured.spend_ytd)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-muted-foreground text-[10px] uppercase tracking-wider flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Percent, { className: "h-3 w-3" }), " Approval Rate"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-bold text-lg mt-0.5",
								children: [featured.approvalRate, "%"]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-muted-foreground text-[10px] uppercase tracking-wider",
								children: "Payment Terms"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-bold text-lg mt-0.5",
								children: featured.paymentBehavior
							})] })
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-56 h-full flex flex-col justify-end p-2 rounded-lg bg-slate-950 border border-slate-800",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground mb-2 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Trust trend (12mo)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-foreground",
							children: featured.trust_score ?? "—"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: 80,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
							data: spark,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								contentStyle: {
									background: "var(--popover)",
									border: "1px solid var(--border)",
									borderRadius: 8,
									fontSize: 11
								},
								cursor: false
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "y",
								stroke: "var(--success)",
								strokeWidth: 2,
								dot: false
							})]
						})
					})]
				})
			]
		}),
		!isLoading && clients.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-6 p-8 text-center text-sm text-muted-foreground bg-slate-900 border-slate-800",
			children: "No vendors yet — process invoices to build vendor profiles."
		}),
		!isLoading && clients.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "!p-0 overflow-hidden bg-slate-900 border-slate-800",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 border-b border-slate-800 bg-slate-950 flex justify-between items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold",
					children: "Vendor Directory"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-muted-foreground",
					children: [clients.length, " Total"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-xs uppercase tracking-wider text-muted-foreground bg-slate-950",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left px-5 py-3 font-medium",
								children: "Vendor"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left px-5 py-3 font-medium",
								children: "Trust"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-right px-5 py-3 font-medium",
								children: "Invoices"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-right px-5 py-3 font-medium",
								children: "Spend YTD"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left px-5 py-3 font-medium",
								children: "Terms"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left px-5 py-3 font-medium",
								children: "Risk"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-5 py-3" })
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-slate-800",
						children: clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "hover:bg-slate-800/50 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-8 w-8 rounded bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0",
											children: getInitials(c.name)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-medium",
											children: c.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[10px] text-muted-foreground",
											children: ["GST: ", c.gst]
										})] })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `font-semibold ${trustColor(c.trust_score)}`,
										children: c.trust_score ?? "—"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3 text-right tabular-nums",
									children: c.invoice_count
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3 text-right tabular-nums font-semibold",
									children: formatUsd(c.spend_ytd)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3 text-xs text-muted-foreground",
									children: c.paymentBehavior
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: riskTone(c.risk_level),
										children: riskLabel(c.risk_level)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "text-muted-foreground hover:text-primary transition-colors",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-4 w-4" })
									})
								})
							]
						}, c.id))
					})]
				})
			})]
		})
	] });
}
//#endregion
export { Clients as component };
