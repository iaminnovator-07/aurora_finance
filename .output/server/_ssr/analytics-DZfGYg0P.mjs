import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { J as DollarSign, Y as Clock, l as TrendingUp, p as ShieldCheck } from "../_libs/lucide-react.mjs";
import { a as PageHeader, d as useAnalyticsRoi, g as useDashboard, o as StatCard, r as Card, t as AppLayout, u as useAnalyticsMonthly } from "./ui-bits-nExllFl8.mjs";
import { a as YAxis, c as Line, f as Cell, i as LineChart, l as CartesianGrid, m as Tooltip, o as XAxis, p as ResponsiveContainer, r as BarChart, s as Area, t as AreaChart, u as Bar } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analytics-DZfGYg0P.js
var import_jsx_runtime = require_jsx_runtime();
function formatUsd(n) {
	if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
	if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
	return `$${n.toFixed(0)}`;
}
function Analytics() {
	const { data: monthly, isLoading: monthlyLoading } = useAnalyticsMonthly();
	const { data: roi, isLoading: roiLoading } = useAnalyticsRoi();
	const { data: dash, isLoading: dashLoading } = useDashboard();
	const isLoading = monthlyLoading || roiLoading || dashLoading;
	const series = (monthly?.months ?? []).map((m, i) => ({
		m,
		invoices: monthly?.invoices[i] ?? 0,
		savings: monthly?.savings_usd[i] ?? 0,
		hours: monthly?.hours_saved[i] ?? 0,
		fraud: monthly?.fraud_prevented[i] ?? 0
	}));
	const depts = monthly?.by_department ?? [];
	const heat = monthly?.fraud_heatmap ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Analytics",
			subtitle: "Aurora's impact on your finance operations."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Hours Saved (mo)",
					value: roi ? String(roi.hours_saved_month) : "—",
					delta: `${dash?.touchless_percentage?.toFixed(1) ?? "—"}% touchless`,
					icon: Clock,
					tone: "success"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "$ Saved (mo)",
					value: roi ? formatUsd(roi.dollars_saved_month) : "—",
					delta: "OPEX reduction",
					icon: DollarSign,
					tone: "primary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Fraud Prevented",
					value: roi ? formatUsd(roi.fraud_prevented_ytd) : "—",
					delta: "YTD",
					icon: ShieldCheck,
					tone: "ai"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "ROI",
					value: roi ? `${roi.roi_multiplier}×` : "—",
					delta: `${dash?.processed_today ?? "—"} processed today`,
					icon: TrendingUp,
					tone: "success"
				})
			]
		}),
		isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-center py-8 text-muted-foreground text-sm mb-4",
			children: "Loading analytics…"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid lg:grid-cols-2 gap-4 mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-semibold mb-3",
				children: "Invoice Volume Trend"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: 260,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
					data: series,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
							id: "ag1",
							x1: "0",
							x2: "0",
							y1: "0",
							y2: "1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0%",
								stopColor: "var(--primary)",
								stopOpacity: .5
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "100%",
								stopColor: "var(--primary)",
								stopOpacity: 0
							})]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
							stroke: "var(--border)",
							strokeDasharray: "3 3",
							vertical: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "m",
							stroke: "var(--muted-foreground)",
							fontSize: 11,
							axisLine: false,
							tickLine: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							stroke: "var(--muted-foreground)",
							fontSize: 11,
							axisLine: false,
							tickLine: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
							background: "var(--popover)",
							border: "1px solid var(--border)",
							borderRadius: 12
						} }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							dataKey: "invoices",
							stroke: "var(--primary)",
							fill: "url(#ag1)",
							strokeWidth: 2.5
						})
					]
				})
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-semibold mb-3",
				children: "Cost Savings vs. Manual Hours"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: 260,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
					data: series,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
							stroke: "var(--border)",
							strokeDasharray: "3 3",
							vertical: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "m",
							stroke: "var(--muted-foreground)",
							fontSize: 11,
							axisLine: false,
							tickLine: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							stroke: "var(--muted-foreground)",
							fontSize: 11,
							axisLine: false,
							tickLine: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
							background: "var(--popover)",
							border: "1px solid var(--border)",
							borderRadius: 12
						} }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
							dataKey: "savings",
							stroke: "var(--success)",
							strokeWidth: 2.5,
							dot: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
							dataKey: "hours",
							stroke: "var(--ai)",
							strokeWidth: 2.5,
							dot: false
						})
					]
				})
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid lg:grid-cols-3 gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-semibold mb-3",
				children: "By Department"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: 260,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
					data: depts,
					layout: "vertical",
					margin: { left: 8 },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							type: "number",
							hide: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							dataKey: "name",
							type: "category",
							stroke: "var(--muted-foreground)",
							fontSize: 11,
							tickLine: false,
							axisLine: false,
							width: 90
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
							background: "var(--popover)",
							border: "1px solid var(--border)",
							borderRadius: 12
						} }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "value",
							radius: [
								0,
								8,
								8,
								0
							],
							children: depts.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
								fill: i === 0 ? "var(--primary)" : i === 1 ? "var(--ai)" : "var(--success)",
								fillOpacity: 1 - i * .12
							}, i))
						})
					]
				})
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold mb-3",
					children: "Fraud Heatmap"
				}), heat.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-16 text-center text-sm text-muted-foreground",
					children: "No heatmap data available."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-1",
					style: { gridTemplateColumns: "repeat(12, 1fr)" },
					children: heat.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-square rounded-sm",
						title: `${c.v.toFixed(2)}`,
						style: { background: `oklch(${.25 + c.v * .5} ${.04 + c.v * .2} ${268 - c.v * 60})` }
					}, i))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mt-3 text-[10px] text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Mon" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Wed" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Fri" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sun" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-auto flex items-center gap-1",
							children: [
								"Low ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-block h-2 w-12 rounded",
									style: { background: "linear-gradient(90deg, oklch(0.25 0.04 268), oklch(0.7 0.22 25))" }
								}),
								" High"
							]
						})
					]
				})] })]
			})]
		})
	] });
}
//#endregion
export { Analytics as component };
