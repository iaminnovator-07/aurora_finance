import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { D as Paperclip, H as FileText, Q as ChartColumn, d as Sparkles, g as Send, k as Mic, q as Download } from "../_libs/lucide-react.mjs";
import { a as PageHeader, h as useCopilotChat, n as Badge, r as Card, s as ThinkingDots, t as AppLayout } from "./ui-bits-nExllFl8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/copilot-DlKgrfiJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var prompts = [
	"Show pending invoices over $10k",
	"Why was invoice INV-2378 rejected?",
	"Generate monthly fraud report",
	"Find duplicate invoices this week",
	"Which vendor has the highest fraud risk?"
];
function Copilot() {
	const chat = useCopilotChat();
	const [conversationId, setConversationId] = (0, import_react.useState)();
	const [messages, setMessages] = (0, import_react.useState)([{
		role: "ai",
		content: "Hi Anya — I'm Aurora Copilot. Ask me anything about invoices, vendors, fraud, or run a report."
	}]);
	const [input, setInput] = (0, import_react.useState)("");
	const ask = (q) => {
		if (!q.trim() || chat.isPending) return;
		setMessages((m) => [...m, {
			role: "user",
			content: q
		}]);
		setInput("");
		chat.mutate({
			message: q,
			conversation_id: conversationId
		}, {
			onSuccess: (res) => {
				setConversationId(res.conversation_id);
				setMessages((m) => [...m, {
					role: "ai",
					content: res.reply,
					data: res.data
				}]);
			},
			onError: () => {
				setMessages((m) => [...m, {
					role: "ai",
					content: "Sorry, I couldn't reach Aurora right now. Please try again."
				}]);
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "AI Copilot",
		subtitle: "Ask Aurora in natural language.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
			tone: "ai",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), " Aurora v2.3"]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid lg:grid-cols-[1fr_300px] gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "!p-0 flex flex-col h-[calc(100vh-14rem)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 overflow-y-auto p-5 space-y-4",
				children: [messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `flex gap-3 ${m.role === "user" ? "justify-end" : ""}`,
					children: [m.role === "ai" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-8 w-8 rounded-lg grid place-items-center shrink-0",
						style: { background: "var(--gradient-aurora)" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-white" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `max-w-[75%] ${m.role === "user" ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-2.5" : "text-sm"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm whitespace-pre-wrap",
							children: m.content
						}), m.data && Object.keys(m.data).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 rounded-xl border border-border overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
								className: "text-xs p-3 overflow-x-auto bg-muted/30",
								children: JSON.stringify(m.data, null, 2)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2 p-2 border-t border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "text-xs px-3 py-1.5 rounded-lg bg-primary text-primary-foreground inline-flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-3 w-3" }), " Visualize"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "text-xs px-3 py-1.5 rounded-lg border border-border inline-flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3 w-3" }), " Export CSV"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "text-xs px-3 py-1.5 rounded-lg border border-border",
										children: "Open queue"
									})
								]
							})]
						})]
					})]
				}, i)), chat.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-8 w-8 rounded-lg grid place-items-center shrink-0",
						style: { background: "var(--gradient-aurora)" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-white" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm text-muted-foreground inline-flex items-center gap-2",
						children: ["Aurora is thinking ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThinkingDots, {})]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-border p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end gap-2 rounded-2xl border border-border bg-background/60 p-2 focus-within:ring-2 focus-within:ring-ring",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "h-9 w-9 grid place-items-center rounded-lg hover:bg-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 1,
							value: input,
							onChange: (e) => setInput(e.target.value),
							onKeyDown: (e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									ask(input);
								}
							},
							placeholder: "Ask Aurora… e.g. show pending invoices > $10k",
							className: "flex-1 bg-transparent text-sm focus:outline-none resize-none py-2 px-1",
							disabled: chat.isPending
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "h-9 w-9 grid place-items-center rounded-lg hover:bg-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => ask(input),
							disabled: chat.isPending,
							className: "h-9 w-9 grid place-items-center rounded-lg bg-primary text-primary-foreground disabled:opacity-50",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
						})
					]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-semibold text-sm mb-3",
				children: "Suggested prompts"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: prompts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => ask(p),
					disabled: chat.isPending,
					className: "w-full text-left text-xs p-2.5 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition disabled:opacity-50",
					children: p
				}, p))
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-semibold text-sm mb-3",
				children: "Recent"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 text-xs",
				children: [messages.filter((m) => m.role === "user").slice(-3).reverse().map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => ask(r.content),
					disabled: chat.isPending,
					className: "w-full text-left p-2 rounded-lg hover:bg-accent flex items-center gap-2 text-muted-foreground hover:text-foreground disabled:opacity-50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3.5 w-3.5" }),
						" ",
						r.content
					]
				}, i)), messages.filter((m) => m.role === "user").length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-muted-foreground p-2",
					children: "No recent queries yet."
				})]
			})] })]
		})]
	})] });
}
//#endregion
export { Copilot as component };
