import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as Building2, H as FileText, N as Mail, S as RefreshCw, Y as Clock, Z as CircleCheck, d as Sparkles, et as Brain, f as Shield, l as TrendingUp, m as ShieldAlert, r as Zap, rt as ArrowUpRight, tt as Bot, y as ScanLine } from "../_libs/lucide-react.mjs";
import { c as TrustRing, g as useDashboard, i as ConfidenceBar, l as useAgentsStatus, n as Badge, o as StatCard, r as Card, s as ThinkingDots, t as AppLayout } from "./ui-bits-nExllFl8.mjs";
import { a as YAxis, c as Line, d as Pie, f as Cell, i as LineChart, l as CartesianGrid, m as Tooltip, n as PieChart, o as XAxis, p as ResponsiveContainer, r as BarChart, s as Area, t as AreaChart, u as Bar } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-Cxi0PMEO.js
var import_jsx_runtime = require_jsx_runtime();
var AGENT_ICONS = {
	"Mail Intelligence": Mail,
	"Trust Verification": Shield,
	"Document Understanding": Brain,
	"OCR Extraction": ScanLine
};
function statusTone(status) {
	if (status === "auto_approved" || status === "approved" || status === "dispatched") return "success";
	if (status === "in_review" || status === "draft") return "warning";
	if (status === "rejected" || status === "flagged") return "destructive";
	return "default";
}
function Dashboard() {
	const { data: dash, isLoading, refetch } = useDashboard();
	const { data: agentsData } = useAgentsStatus();
	const trend = dash?.throughput_trend ?? [];
	const vendors = dash?.vendor_breakdown ?? [];
	const approval = dash?.approval_breakdown ?? [];
	const recent = dash?.recent_invoices ?? [];
	const agents = agentsData?.agents?.slice(0, 4) ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-3xl glass p-8 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 opacity-60",
				style: { background: "var(--gradient-glow)" }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative grid lg:grid-cols-[1fr_auto] gap-8 items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-2 text-xs font-medium text-[color:var(--ai)] bg-[color:var(--ai)]/10 border border-[color:var(--ai)]/20 px-3 py-1 rounded-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }),
							" Aurora is online · ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThinkingDots, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => refetch(),
								className: "ml-1 opacity-70 hover:opacity-100",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3 w-3" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-4 text-3xl lg:text-4xl font-bold tracking-tight",
						children: ["Welcome back, ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gradient",
							children: "Anya"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-muted-foreground max-w-xl",
						children: [
							"Aurora processed ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", {
								className: "text-foreground",
								children: [dash?.processed_today ?? "—", " invoices"]
							}),
							" today —",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", {
								className: "text-success",
								children: [dash?.touchless_percentage?.toFixed(1) ?? "—", "% touchless"]
							}),
							", saving your team an estimated ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", {
								className: "text-success",
								children: [dash?.hours_saved_today ?? "—", " hours"]
							}),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/approvals",
							className: "inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover-glow",
							children: ["Review Queue ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/copilot",
							className: "inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border text-sm font-medium hover:bg-accent",
							children: "Open Copilot"
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden lg:flex items-center gap-6 px-6 py-5 rounded-2xl border border-border bg-background/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustRing, {
						score: Math.round(dash?.trust_avg ?? 0),
						size: 110
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-wider text-muted-foreground",
							children: "Tenant Trust"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-2xl font-bold",
							children: (dash?.trust_avg ?? 0) >= 70 ? "Healthy" : "Review"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-success mt-1",
							children: "Live from database"
						})
					] })]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Processed",
					value: String(dash?.processed_today ?? "—"),
					delta: "Today",
					icon: FileText,
					tone: "primary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Auto Approved",
					value: String(dash?.auto_approved ?? "—"),
					delta: `${dash?.touchless_percentage?.toFixed(1) ?? "—"}% touchless`,
					icon: CircleCheck,
					tone: "success"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Pending Review",
					value: String(dash?.pending_review ?? "—"),
					delta: "Live queue",
					icon: Clock,
					tone: "warning"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Fraud Alerts",
					value: String(dash?.fraud_alerts ?? "—"),
					delta: "Spam flagged",
					icon: ShieldAlert,
					tone: "destructive"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Trust Avg.",
					value: String(Math.round(dash?.trust_avg ?? 0)),
					delta: "All invoices",
					icon: Shield,
					tone: "ai"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "AI Accuracy",
					value: `${dash?.ai_accuracy?.toFixed(1) ?? "—"}%`,
					delta: "Avg confidence",
					icon: Zap,
					tone: "ai"
				})
			]
		}),
		isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-center py-8 text-muted-foreground text-sm",
			children: "Loading dashboard…"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid lg:grid-cols-3 gap-4 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold",
						children: "Invoice Throughput"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Last 14 days · processed vs auto-approved"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "primary",
						children: "Live"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 240,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
						data: trend,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "g1",
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
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "g2",
								x1: "0",
								x2: "0",
								y1: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: "var(--success)",
									stopOpacity: .4
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "100%",
									stopColor: "var(--success)",
									stopOpacity: 0
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "var(--border)",
								strokeDasharray: "3 3",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "day",
								stroke: "var(--muted-foreground)",
								fontSize: 11,
								tickLine: false,
								axisLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								stroke: "var(--muted-foreground)",
								fontSize: 11,
								tickLine: false,
								axisLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
								background: "var(--popover)",
								border: "1px solid var(--border)",
								borderRadius: 12
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "processed",
								stroke: "var(--primary)",
								fill: "url(#g1)",
								strokeWidth: 2
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "auto",
								stroke: "var(--success)",
								fill: "url(#g2)",
								strokeWidth: 2
							})
						]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold mb-1",
					children: "Approval Breakdown"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mb-2",
					children: "From database"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 200,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieChart, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
						data: approval,
						dataKey: "value",
						innerRadius: 50,
						outerRadius: 75,
						paddingAngle: 3,
						stroke: "none",
						children: approval.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: e.color ?? "var(--primary)" }, i))
					}) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-1.5 mt-2",
					children: approval.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-2 w-2 rounded-full",
									style: { background: a.color }
								}),
								" ",
								a.name
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold tabular-nums",
							children: a.value
						})]
					}, a.name))
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid lg:grid-cols-3 gap-4 mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold mb-3",
					children: "Top Vendors"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 220,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: vendors,
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
								width: 110
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
								background: "var(--popover)",
								border: "1px solid var(--border)",
								borderRadius: 12
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "value",
								fill: "var(--primary)",
								radius: [
									0,
									8,
									8,
									0
								]
							})
						]
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold mb-3",
					children: "Fraud Trend"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: 220,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data: trend,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "var(--border)",
								strokeDasharray: "3 3",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "day",
								stroke: "var(--muted-foreground)",
								fontSize: 11,
								tickLine: false,
								axisLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								stroke: "var(--muted-foreground)",
								fontSize: 11,
								tickLine: false,
								axisLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
								background: "var(--popover)",
								border: "1px solid var(--border)",
								borderRadius: 12
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "processed",
								stroke: "var(--destructive)",
								strokeWidth: 2.5,
								dot: { r: 3 }
							})
						]
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold mb-3",
						children: "Processing Stats"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-4xl font-bold tracking-tight",
						children: [dash?.touchless_percentage?.toFixed(0) ?? "—", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-lg text-muted-foreground ml-1",
							children: "% touchless"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-success mt-1 flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3" }), " Live automation rate"]
					})
				] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid lg:grid-cols-3 gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold",
						children: "Live Invoice Queue"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "success",
						children: "Real-time"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "divide-y divide-border -mx-5",
					children: [recent.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-5 py-8 text-center text-sm text-muted-foreground",
						children: "No invoices yet — sync inbox to start processing."
					}), recent.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-5 py-3 grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 hover:bg-accent/30 transition",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-9 w-9 rounded-lg grid place-items-center bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-sm font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.id }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: statusTone(r.status),
										children: r.status.replace(/_/g, " ")
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-muted-foreground flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-3 w-3" }),
										" ",
										r.vendor
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-24",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfidenceBar, { value: r.trust })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold tabular-nums text-sm",
								children: r.amount
							})
						]
					}, r.id))]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold",
					children: "AI Agents"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					tone: "ai",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-3 w-3" }),
						" ",
						agents.filter((a) => a.status === "active").length,
						" active"
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: agents.map((a) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3 rounded-xl border border-border bg-background/30",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-8 w-8 rounded-lg grid place-items-center bg-[color:var(--ai)]/15 text-[color:var(--ai)]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AGENT_ICONS[a.name] ?? Bot, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-medium truncate",
										children: a.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] text-muted-foreground truncate",
										children: a.task
									})]
								}),
								a.status === "thinking" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThinkingDots, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-2 w-2 rounded-full ${a.status === "active" ? "bg-success" : "bg-muted-foreground/40"}` })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfidenceBar, { value: a.conf })
						})]
					}, a.name);
				})
			})] })]
		})
	] });
}
//#endregion
export { Dashboard as component };
