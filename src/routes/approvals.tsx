import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, Card, PageHeader } from "@/components/app-layout";
import { ConfidenceBar, TrustRing } from "@/components/ui-bits";
import { CheckCircle2, XCircle, MessageSquare, AlertTriangle, Eye, History, ShieldAlert, FileText } from "lucide-react";
import { useApprovals, useApprovalAction } from "@/lib/api/hooks";
import { formatDistanceToNow } from "date-fns";
import { DocumentViewer, type BoundingBox } from "@/components/ui/document-viewer";
import { useState } from "react";

export const Route = createFileRoute("/approvals")({ component: Approvals });

function recommendationTone(rec: string | null | undefined): "success" | "destructive" | "warning" | "default" {
  const r = (rec ?? "").toLowerCase();
  if (r.includes("approve")) return "success";
  if (r.includes("reject")) return "destructive";
  if (r.includes("review")) return "warning";
  return "default";
}

// Bounding boxes are now provided by the backend to map actual document coordinates and highlight validation errors.

function Approvals() {
  const { data, isLoading } = useApprovals();
  const action = useApprovalAction();
  const approval = data?.items?.[0];
  const [hoveredFieldId, setHoveredFieldId] = useState<string | null>(null);

  const invoiceLabel = approval?.invoice_number ?? "—";
  const trust = Math.round(approval?.trust_score ?? 0);
  const confidence = Math.round(approval?.confidence_score ?? 0);
  const recommendation = approval?.ai_recommendation ?? "Review";
  const recTone = recommendationTone(approval?.ai_recommendation);

  const fields = approval ? [
    { id: "invoice_number", label: "Invoice #", value: approval.invoice_number ?? "—", conf: confidence, source: "OCR" },
    { id: "vendor", label: "Vendor", value: "Demo Vendor", conf: confidence + 2, source: "Gemini + OCR" },
    { id: "amount", label: "Amount", value: "$1,200.00", conf: confidence - 1, source: "OCR" },
    { id: "tax", label: "Tax", value: "$200.00", conf: confidence, source: "Regex" },
  ] : [];

  const handleAction = (act: "approve" | "reject" | "request-review") => {
    if (!approval) return;
    action.mutate({ id: approval.id, action: act });
  };

  const activeBoxes = (approval?.bounding_boxes || []).map((b: BoundingBox) => ({
    ...b,
    isActive: b.id === hoveredFieldId || b.isActive // Keep error highlight active
  }));

  return (
    <AppLayout>
      <PageHeader
        title={isLoading ? "Approval Queue" : `Approval — ${invoiceLabel}`}
        subtitle={
          approval
            ? `${approval.reason} · ${formatDistanceToNow(new Date(approval.created_at), { addSuffix: true })}`
            : "Review invoices flagged by Aurora"
        }
      />

      {isLoading && (
        <div className="text-center py-8 text-muted-foreground text-sm mb-4">Loading approvals…</div>
      )}

      {!isLoading && !approval && (
        <Card className="p-8 text-center text-sm text-muted-foreground">No items in the approval queue.</Card>
      )}

      {approval && (
        <div className="grid lg:grid-cols-[1fr_420px] gap-4 h-[calc(100vh-12rem)]">
          <DocumentViewer 
            attachmentId={approval.attachment_id} 
            filename={`${invoiceLabel}.pdf`}
            boundingBoxes={activeBoxes}
            onHoverBox={setHoveredFieldId}
          />

          <div className="space-y-4 overflow-y-auto pr-2">
            <Card>
              <div className="flex items-center gap-4">
                <TrustRing score={trust} size={100} />
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">AI Recommendation</div>
                  <div className={`text-lg font-bold mt-1 capitalize ${recTone === "success" ? "text-success" : recTone === "destructive" ? "text-destructive" : recTone === "warning" ? "text-warning" : ""}`}>
                    {recommendation}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{confidence}% confidence · trust {trust}</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleAction("approve")}
                  disabled={action.isPending}
                  className="h-10 rounded-lg bg-success text-success-foreground text-xs font-semibold inline-flex items-center justify-center gap-1 disabled:opacity-50"
                >
                  <CheckCircle2 className="h-4 w-4" /> Approve
                </button>
                <button
                  onClick={() => handleAction("reject")}
                  disabled={action.isPending}
                  className="h-10 rounded-lg bg-destructive text-destructive-foreground text-xs font-semibold inline-flex items-center justify-center gap-1 disabled:opacity-50"
                >
                  <XCircle className="h-4 w-4" /> Reject
                </button>
                <button
                  onClick={() => handleAction("request-review")}
                  disabled={action.isPending}
                  className="h-10 rounded-lg border border-border text-xs font-semibold inline-flex items-center justify-center gap-1 disabled:opacity-50"
                >
                  <MessageSquare className="h-4 w-4" /> Request
                </button>
              </div>
              
              <div className="mt-4 p-3 rounded-lg bg-background/50 border border-border text-xs">
                <div className="font-semibold mb-1">AI Reasoning</div>
                <div className="text-muted-foreground mb-2">{approval.ai_suggestion || "No reasoning provided."}</div>
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border">
                  <ShieldAlert className="h-3.5 w-3.5 text-warning" />
                  <span>Risk Level: <b className="capitalize">{approval.risk_level}</b></span>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold mb-3 text-sm flex items-center gap-2"><Eye className="h-4 w-4" /> Extracted Fields</h3>
              <div className="space-y-3">
                {fields.map((f) => (
                  <div 
                    key={f.label} 
                    className={`p-2 rounded-lg transition-colors border ${hoveredFieldId === f.id ? "bg-accent border-primary/50" : "border-transparent hover:bg-accent/50"}`}
                    onMouseEnter={() => setHoveredFieldId(f.id)}
                    onMouseLeave={() => setHoveredFieldId(null)}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground flex items-center gap-1">
                        {f.conf < 80 && <AlertTriangle className="h-3 w-3 text-warning" />}{f.label}
                      </span>
                      <span className="font-medium tabular-nums capitalize">{f.value}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 mt-1">
                      <div className="flex-1"><ConfidenceBar value={f.conf} /></div>
                      <span className="text-[10px] uppercase text-muted-foreground font-semibold tracking-wider">{f.source}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold mb-3 text-sm flex items-center gap-2"><History className="h-4 w-4" /> Audit Trail</h3>
              <div className="space-y-4 text-xs relative before:absolute before:inset-y-0 before:left-3.5 before:w-px before:bg-border pl-1">
                <div className="flex gap-4 relative z-10">
                  <div className="h-7 w-7 rounded-full grid place-items-center shrink-0 bg-background border border-border shadow-sm"><FileText className="h-3.5 w-3.5 text-muted-foreground" /></div>
                  <div className="flex-1 pt-1.5">
                    <div className="font-medium">Document Received</div>
                    <div className="text-muted-foreground">via email from AP inbox</div>
                    <div className="text-[10px] text-muted-foreground/70 mt-0.5">{formatDistanceToNow(new Date(approval.created_at), { addSuffix: true })}</div>
                  </div>
                </div>
                
                <div className="flex gap-4 relative z-10">
                  <div className="h-7 w-7 rounded-full grid place-items-center shrink-0 bg-[color:var(--ai)]/15 text-[color:var(--ai)] font-bold shadow-sm">AI</div>
                  <div className="flex-1 pt-1.5">
                    <div className="font-medium">Aurora Intelligence</div>
                    <div className="text-muted-foreground">{approval.reason}</div>
                  </div>
                </div>

                {approval.failed_rules && approval.failed_rules.length > 0 && (
                  <div className="flex gap-4 relative z-10">
                    <div className="h-7 w-7 rounded-full grid place-items-center shrink-0 bg-warning/15 text-warning font-bold shadow-sm">!</div>
                    <div className="flex-1 pt-1.5">
                      <div className="font-medium text-warning">Business Rules Failed</div>
                      <div className="text-muted-foreground">{approval.failed_rules.length} rule(s) failed validation</div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 relative z-10">
                  <div className="h-7 w-7 rounded-full grid place-items-center shrink-0 bg-primary/15 text-primary font-bold shadow-sm">
                    <MessageSquare className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 pt-1.5">
                    <div className="font-medium">Routed for Approval</div>
                    <div className="text-muted-foreground">System flagged for manual review</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
