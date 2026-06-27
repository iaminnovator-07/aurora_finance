import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { N as Mail, Q as ChartColumn, W as FileCheck, at as Activity, et as Brain, f as Shield, tt as Bot, v as ScrollText, w as Plug, y as ScanLine } from "../_libs/lucide-react.mjs";
import { a as PageHeader, i as ConfidenceBar, l as useAgentsStatus, n as Badge, r as Card, s as ThinkingDots, t as AppLayout } from "./ui-bits-nExllFl8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/agents-BCAoHVA5.js
var import_jsx_runtime = require_jsx_runtime();
var AGENT_ICONS = {
	"Mail Intelligence": Mail,
	"Trust Verification": Shield,
	"Document Understanding": Brain,
	"OCR Extraction": ScanLine,
	"Business Rules": ScrollText,
	"Invoice Generation": FileCheck,
	"ERP Integration": Plug,
	"Analytics": ChartColumn
};
function logLevelClass(lvl) {
	if (lvl === "ok") return "text-success";
	if (lvl === "warn") return "text-warning";
	if (lvl === "err") return "text-destructive";
	return "text-[color:var(--ai)]";
}
function Agents() {
	const { data, isLoading } = useAgentsStatus();
	const agents = data?.agents ?? [];
	const liveLogs = data?.live_logs ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "AI Agents",
			subtitle: "Real-time orchestration across the touchless invoice pipeline.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				tone: "ai",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-3 w-3" }),
					" ",
					data?.pipeline_running ? "Pipeline running" : "Pipeline idle"
				]
			})
		}),
		isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-center py-8 text-muted-foreground text-sm mb-4",
			children: "Loading agents…"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mb-6 relative overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-semibold mb-6",
				children: "Processing Pipeline"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 md:grid-cols-4 gap-4 relative",
				children: agents.map((a, i) => {
					const Icon = AGENT_ICONS[a.name] ?? Bot;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [i < agents.length - 1 && (i + 1) % 4 !== 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden md:block absolute top-1/2 -right-3 z-10 text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								width: "24",
								height: "2",
								className: "animate-flow",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: "0",
									y1: "1",
									x2: "24",
									y2: "1",
									stroke: "var(--primary)",
									strokeWidth: "1.5",
									strokeDasharray: "4 4"
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `glass rounded-2xl p-4 hover-glow ${a.status === "thinking" ? "border-[color:var(--ai)]/40" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `h-9 w-9 rounded-lg grid place-items-center ${a.status === "active" ? "bg-success/15 text-success" : a.status === "thinking" ? "bg-[color:var(--ai)]/15 text-[color:var(--ai)]" : "bg-muted text-muted-foreground"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
									}), a.status === "thinking" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThinkingDots, {}) : a.status === "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "relative flex h-2 w-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-success" })]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-muted-foreground/40" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-semibold",
									children: a.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] text-muted-foreground mt-0.5 truncate",
									children: a.task
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex items-center justify-between text-[10px] text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["⏱ ", a.time] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-semibold text-foreground",
										children: [a.conf, "%"]
									})]
								})
							]
						})]
					}, a.name);
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid lg:grid-cols-2 gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-semibold mb-3",
				children: "Agent Performance (24h)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: agents.slice(0, 6).map((a) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs mb-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AGENT_ICONS[a.name] ?? Bot, { className: "h-3.5 w-3.5" }),
								" ",
								a.name
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [a.conf, "%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfidenceBar, { value: a.conf })] }, a.name);
				})
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-semibold mb-3",
				children: "Live Logs"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "font-mono text-[11px] space-y-1.5 max-h-72 overflow-y-auto",
				children: [liveLogs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-muted-foreground py-4 text-center",
					children: "No agent logs yet."
				}), liveLogs.map((log, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: log.time
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: logLevelClass(log.level),
							children: [
								"[",
								log.level.toUpperCase(),
								"]"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground/80",
							children: log.message
						})
					]
				}, i))]
			})] })]
		})
	] });
}
//#endregion
export { Agents as component };
