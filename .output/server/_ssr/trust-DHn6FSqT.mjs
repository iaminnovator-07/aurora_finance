import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { O as Network, U as FilePenLine, X as CircleX, Z as CircleCheck, f as Shield, x as Repeat } from "../_libs/lucide-react.mjs";
import { a as PageHeader, c as TrustRing, n as Badge, r as Card, t as AppLayout, w as useTrustCheck, y as useEmails } from "./ui-bits-nExllFl8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trust-DHn6FSqT.js
var import_jsx_runtime = require_jsx_runtime();
function Trust() {
	const { data: emails } = useEmails();
	const firstEmail = emails?.items?.[0];
	const { data: trust, isLoading } = useTrustCheck(firstEmail?.id);
	const checks = trust ? [
		{
			label: "SPF",
			ok: trust.checks?.spf === "pass" || trust.checks?.spf === "pass_strict",
			detail: String(trust.checks?.spf ?? "checking")
		},
		{
			label: "DKIM",
			ok: trust.checks?.dkim === "pass",
			detail: String(trust.checks?.dkim ?? "checking")
		},
		{
			label: "DMARC",
			ok: String(trust.checks?.dmarc ?? "").includes("pass"),
			detail: String(trust.checks?.dmarc ?? "checking")
		},
		{
			label: "Identity Score",
			ok: trust.identity_score >= 70,
			detail: `${trust.identity_score} / 100`,
			icon: FilePenLine
		},
		{
			label: "Duplicate Detection",
			ok: trust.duplicate_score >= 80,
			detail: `Duplicate score: ${trust.duplicate_score}`,
			icon: Repeat
		},
		{
			label: "Vendor Reputation",
			ok: trust.vendor_reputation_score >= 70,
			detail: `Reputation: ${trust.vendor_reputation_score}`,
			icon: Network
		}
	] : [];
	const timeline = (trust?.reasoning_timeline ?? []).map((e, i) => ({
		t: e.step ?? `step ${i}`,
		w: e.detail ?? e.w ?? "Check",
		d: e.score != null ? `${e.score} pts` : e.d ?? "",
		tone: (e.score ?? 0) >= 70 ? "success" : (e.score ?? 0) >= 50 ? "warning" : "primary"
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Trust Engine",
			subtitle: "How Aurora scores every invoice for fraud and risk."
		}),
		isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-sm text-muted-foreground mb-4",
			children: "Computing trust score…"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid lg:grid-cols-[360px_1fr] gap-4 mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "grid place-items-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustRing, {
						score: Math.round(trust?.overall_score ?? 0),
						size: 180
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-wider text-muted-foreground",
								children: "Risk level"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `text-2xl font-bold capitalize ${trust?.risk_level === "low" ? "text-success" : trust?.risk_level === "medium" ? "text-warning" : "text-destructive"}`,
								children: trust?.risk_level ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground mt-1",
								children: firstEmail?.subject ?? "Select email in Inbox"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 w-full grid grid-cols-3 gap-2 text-[11px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-2 rounded-lg bg-success/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-bold text-success",
									children: Math.round(trust?.overall_score ?? 0)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-muted-foreground",
									children: "Trust"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-2 rounded-lg bg-primary/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-bold text-primary",
									children: Math.round(trust?.identity_score ?? 0)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-muted-foreground",
									children: "Identity"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-2 rounded-lg bg-[color:var(--ai)]/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-bold text-[color:var(--ai)]",
									children: Math.round(trust?.content_score ?? 0)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-muted-foreground",
									children: "Content"
								})]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "font-semibold mb-4 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4 w-4 text-primary" }), " Verification Checks"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid sm:grid-cols-2 gap-3",
				children: checks.map((c) => {
					const Icon = c.icon ?? CircleCheck;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3 rounded-xl border border-border bg-background/30 flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `h-9 w-9 rounded-lg grid place-items-center shrink-0 ${c.ok ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`,
							children: c.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm font-semibold flex items-center gap-1",
								children: [
									c.label,
									" ",
									c.ok && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: "success",
										children: "Pass"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] text-muted-foreground truncate",
								children: c.detail
							})]
						})]
					}, c.label);
				})
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-semibold mb-4",
			children: "Reasoning Timeline"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative pl-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-2 top-1 bottom-1 w-px bg-border" }),
				timeline.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mb-4 last:mb-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute -left-[18px] top-1 h-3 w-3 rounded-full ring-4 ring-background ${e.tone === "success" ? "bg-success" : e.tone === "warning" ? "bg-warning" : "bg-primary"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-medium",
							children: e.w
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] text-muted-foreground",
							children: e.t
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: e.tone,
							children: e.d
						})]
					})]
				}, i)),
				timeline.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Process an email to see trust reasoning."
				})
			]
		})] })
	] });
}
//#endregion
export { Trust as component };
