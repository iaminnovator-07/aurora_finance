import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { A as MessageSquare, B as History, G as Eye, H as FileText, X as CircleX, Z as CircleCheck, c as TriangleAlert, m as ShieldAlert } from "../_libs/lucide-react.mjs";
import { a as PageHeader, c as TrustRing, f as useApprovalAction, i as ConfidenceBar, p as useApprovals, r as Card, t as AppLayout } from "./ui-bits-nExllFl8.mjs";
import { t as DocumentViewer } from "./document-viewer-DImNXlHr.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/approvals-vDuAg1gm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function recommendationTone(rec) {
	const r = (rec ?? "").toLowerCase();
	if (r.includes("approve")) return "success";
	if (r.includes("reject")) return "destructive";
	if (r.includes("review")) return "warning";
	return "default";
}
function Approvals() {
	const { data, isLoading } = useApprovals();
	const action = useApprovalAction();
	const approval = data?.items?.[0];
	const [hoveredFieldId, setHoveredFieldId] = (0, import_react.useState)(null);
	const invoiceLabel = approval?.invoice_number ?? "—";
	const trust = Math.round(approval?.trust_score ?? 0);
	const confidence = Math.round(approval?.confidence_score ?? 0);
	const recommendation = approval?.ai_recommendation ?? "Review";
	const recTone = recommendationTone(approval?.ai_recommendation);
	const fields = approval ? [
		{
			id: "invoice_number",
			label: "Invoice #",
			value: approval.invoice_number ?? "—",
			conf: confidence,
			source: "OCR"
		},
		{
			id: "vendor",
			label: "Vendor",
			value: "Demo Vendor",
			conf: confidence + 2,
			source: "Gemini + OCR"
		},
		{
			id: "amount",
			label: "Amount",
			value: "$1,200.00",
			conf: confidence - 1,
			source: "OCR"
		},
		{
			id: "tax",
			label: "Tax",
			value: "$200.00",
			conf: confidence,
			source: "Regex"
		}
	] : [];
	const handleAction = (act) => {
		if (!approval) return;
		action.mutate({
			id: approval.id,
			action: act
		});
	};
	const activeBoxes = (approval?.bounding_boxes || []).map((b) => ({
		...b,
		isActive: b.id === hoveredFieldId || b.isActive
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: isLoading ? "Approval Queue" : `Approval — ${invoiceLabel}`,
			subtitle: approval ? `${approval.reason} · ${formatDistanceToNow(new Date(approval.created_at), { addSuffix: true })}` : "Review invoices flagged by Aurora"
		}),
		isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-center py-8 text-muted-foreground text-sm mb-4",
			children: "Loading approvals…"
		}),
		!isLoading && !approval && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "p-8 text-center text-sm text-muted-foreground",
			children: "No items in the approval queue."
		}),
		approval && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid lg:grid-cols-[1fr_420px] gap-4 h-[calc(100vh-12rem)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentViewer, {
				attachmentId: approval.attachment_id,
				filename: `${invoiceLabel}.pdf`,
				boundingBoxes: activeBoxes,
				onHoverBox: setHoveredFieldId
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 overflow-y-auto pr-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustRing, {
								score: trust,
								size: 100
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs uppercase tracking-wider text-muted-foreground",
										children: "AI Recommendation"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `text-lg font-bold mt-1 capitalize ${recTone === "success" ? "text-success" : recTone === "destructive" ? "text-destructive" : recTone === "warning" ? "text-warning" : ""}`,
										children: recommendation
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground mt-1",
										children: [
											confidence,
											"% confidence · trust ",
											trust
										]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid grid-cols-3 gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => handleAction("approve"),
									disabled: action.isPending,
									className: "h-10 rounded-lg bg-success text-success-foreground text-xs font-semibold inline-flex items-center justify-center gap-1 disabled:opacity-50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), " Approve"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => handleAction("reject"),
									disabled: action.isPending,
									className: "h-10 rounded-lg bg-destructive text-destructive-foreground text-xs font-semibold inline-flex items-center justify-center gap-1 disabled:opacity-50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4" }), " Reject"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => handleAction("request-review"),
									disabled: action.isPending,
									className: "h-10 rounded-lg border border-border text-xs font-semibold inline-flex items-center justify-center gap-1 disabled:opacity-50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-4 w-4" }), " Request"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 p-3 rounded-lg bg-background/50 border border-border text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold mb-1",
									children: "AI Reasoning"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-muted-foreground mb-2",
									children: approval.ai_suggestion || "No reasoning provided."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mt-2 pt-2 border-t border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-3.5 w-3.5 text-warning" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Risk Level: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
										className: "capitalize",
										children: approval.risk_level
									})] })]
								})
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-semibold mb-3 text-sm flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" }), " Extracted Fields"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: fields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `p-2 rounded-lg transition-colors border ${hoveredFieldId === f.id ? "bg-accent border-primary/50" : "border-transparent hover:bg-accent/50"}`,
							onMouseEnter: () => setHoveredFieldId(f.id),
							onMouseLeave: () => setHoveredFieldId(null),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground flex items-center gap-1",
									children: [f.conf < 80 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3 w-3 text-warning" }), f.label]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium tabular-nums capitalize",
									children: f.value
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-4 mt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfidenceBar, { value: f.conf })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] uppercase text-muted-foreground font-semibold tracking-wider",
									children: f.source
								})]
							})]
						}, f.label))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-semibold mb-3 text-sm flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-4 w-4" }), " Audit Trail"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 text-xs relative before:absolute before:inset-y-0 before:left-3.5 before:w-px before:bg-border pl-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4 relative z-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-7 w-7 rounded-full grid place-items-center shrink-0 bg-background border border-border shadow-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3.5 w-3.5 text-muted-foreground" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 pt-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-medium",
											children: "Document Received"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-muted-foreground",
											children: "via email from AP inbox"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] text-muted-foreground/70 mt-0.5",
											children: formatDistanceToNow(new Date(approval.created_at), { addSuffix: true })
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4 relative z-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-7 w-7 rounded-full grid place-items-center shrink-0 bg-[color:var(--ai)]/15 text-[color:var(--ai)] font-bold shadow-sm",
									children: "AI"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 pt-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium",
										children: "Aurora Intelligence"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-muted-foreground",
										children: approval.reason
									})]
								})]
							}),
							approval.failed_rules && approval.failed_rules.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4 relative z-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-7 w-7 rounded-full grid place-items-center shrink-0 bg-warning/15 text-warning font-bold shadow-sm",
									children: "!"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 pt-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium text-warning",
										children: "Business Rules Failed"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-muted-foreground",
										children: [approval.failed_rules.length, " rule(s) failed validation"]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4 relative z-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-7 w-7 rounded-full grid place-items-center shrink-0 bg-primary/15 text-primary font-bold shadow-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-3.5 w-3.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 pt-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium",
										children: "Routed for Approval"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-muted-foreground",
										children: "System flagged for manual review"
									})]
								})]
							})
						]
					})] })
				]
			})]
		})
	] });
}
//#endregion
export { Approvals as component };
