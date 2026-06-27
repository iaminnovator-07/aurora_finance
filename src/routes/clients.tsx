import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, Card, PageHeader } from "@/components/app-layout";
import { Badge, TrustRing } from "@/components/ui-bits";
import { ResponsiveContainer, Line, LineChart, Tooltip } from "recharts";
import { MapPin, Mail, Phone, ExternalLink, Activity, Percent, ShieldCheck, FileText } from "lucide-react";
import { useClients } from "@/lib/api/hooks";

export const Route = createFileRoute("/clients")({ component: Clients });

function formatUsd(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

function riskLabel(risk: string) {
  return risk.charAt(0).toUpperCase() + risk.slice(1);
}

function riskTone(risk: string): "success" | "warning" | "destructive" | "default" {
  const r = risk.toLowerCase();
  if (r === "low") return "success";
  if (r === "medium") return "warning";
  if (r === "high" || r === "critical") return "destructive";
  return "default";
}

function trustColor(trust: number | null) {
  if (trust == null) return "text-muted-foreground";
  if (trust >= 80) return "text-success";
  if (trust >= 60) return "text-warning";
  return "text-destructive";
}

function getInitials(name: string) {
  return name.substring(0, 2).toUpperCase();
}

// Generate some mock enterprise fields for the demo
function enrichClient(c: any) {
  const hash = c.name.length;
  return {
    ...c,
    gst: `27AA${hash}B1234C1Z${hash % 9}`,
    pan: `AA${hash}B1234C`,
    approvalRate: 85 + (hash % 15),
    paymentBehavior: ["Net 30", "Net 45", "Upon Receipt", "Net 60"][hash % 4]
  };
}

function Clients() {
  const { data, isLoading } = useClients();
  const clients = (data?.items ?? []).map(enrichClient);
  const featured = clients[0];
  const spark = Array.from({ length: 12 }, (_, i) => ({
    x: i,
    y: featured?.trust_score ?? 0,
  }));

  return (
    <AppLayout>
      <PageHeader title="Vendors & Clients" subtitle="Trust profiles, spend, and risk across your network." />

      {isLoading && (
        <div className="grid gap-4 mt-6">
          <div className="h-48 rounded-xl bg-slate-900 animate-pulse" />
          <div className="h-64 rounded-xl bg-slate-900 animate-pulse" />
        </div>
      )}

      {featured && (
        <Card className="mb-6 grid lg:grid-cols-[auto_1fr_auto] gap-6 items-center bg-slate-900 border-slate-800">
          <TrustRing score={Math.round(featured.trust_score ?? 0)} size={130} />
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded bg-primary/20 text-primary grid place-items-center font-bold tracking-wider">
                {getInitials(featured.name)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">{featured.name}</h2>
                  <Badge tone={riskTone(featured.risk_level)}>{riskLabel(featured.risk_level)} risk</Badge>
                  {featured.trust_score >= 80 && <Badge tone="success" className="gap-1"><ShieldCheck className="h-3 w-3" /> Trusted</Badge>}
                </div>
                <div className="mt-1 flex gap-4 text-xs text-muted-foreground">
                  <span>GST: <span className="font-medium text-foreground">{featured.gst}</span></span>
                  <span>PAN: <span className="font-medium text-foreground">{featured.pan}</span></span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 grid sm:grid-cols-3 gap-3 text-xs text-muted-foreground bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {[featured.city, featured.country].filter(Boolean).join(", ") || "—"}</span>
              <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {featured.email ?? featured.domain ?? "—"}</span>
              <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {featured.phone ?? "—"}</span>
            </div>
            
            <div className="mt-4 grid grid-cols-4 gap-3 text-sm">
              <div><div className="text-muted-foreground text-[10px] uppercase tracking-wider flex items-center gap-1"><FileText className="h-3 w-3" /> Invoices</div><div className="font-bold text-lg mt-0.5">{featured.invoice_count}</div></div>
              <div><div className="text-muted-foreground text-[10px] uppercase tracking-wider flex items-center gap-1"><Activity className="h-3 w-3" /> Spend YTD</div><div className="font-bold text-lg mt-0.5">{formatUsd(featured.spend_ytd)}</div></div>
              <div><div className="text-muted-foreground text-[10px] uppercase tracking-wider flex items-center gap-1"><Percent className="h-3 w-3" /> Approval Rate</div><div className="font-bold text-lg mt-0.5">{featured.approvalRate}%</div></div>
              <div><div className="text-muted-foreground text-[10px] uppercase tracking-wider">Payment Terms</div><div className="font-bold text-lg mt-0.5">{featured.paymentBehavior}</div></div>
            </div>
          </div>
          <div className="w-56 h-full flex flex-col justify-end p-2 rounded-lg bg-slate-950 border border-slate-800">
            <div className="text-xs text-muted-foreground mb-2 flex items-center justify-between">
              <span>Trust trend (12mo)</span>
              <span className="font-bold text-foreground">{featured.trust_score ?? "—"}</span>
            </div>
            <ResponsiveContainer width="100%" height={80}>
              <LineChart data={spark}>
                <Tooltip 
                  contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11 }} 
                  cursor={false}
                />
                <Line type="monotone" dataKey="y" stroke="var(--success)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {!isLoading && clients.length === 0 && (
        <Card className="mb-6 p-8 text-center text-sm text-muted-foreground bg-slate-900 border-slate-800">No vendors yet — process invoices to build vendor profiles.</Card>
      )}

      {!isLoading && clients.length > 0 && (
        <Card className="!p-0 overflow-hidden bg-slate-900 border-slate-800">
          <div className="p-4 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
            <h3 className="font-semibold">Vendor Directory</h3>
            <span className="text-xs text-muted-foreground">{clients.length} Total</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground bg-slate-950">
                <tr>
                  <th className="text-left px-5 py-3 font-medium">Vendor</th>
                  <th className="text-left px-5 py-3 font-medium">Trust</th>
                  <th className="text-right px-5 py-3 font-medium">Invoices</th>
                  <th className="text-right px-5 py-3 font-medium">Spend YTD</th>
                  <th className="text-left px-5 py-3 font-medium">Terms</th>
                  <th className="text-left px-5 py-3 font-medium">Risk</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {clients.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                          {getInitials(c.name)}
                        </div>
                        <div>
                          <div className="font-medium">{c.name}</div>
                          <div className="text-[10px] text-muted-foreground">GST: {c.gst}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3"><span className={`font-semibold ${trustColor(c.trust_score)}`}>{c.trust_score ?? "—"}</span></td>
                    <td className="px-5 py-3 text-right tabular-nums">{c.invoice_count}</td>
                    <td className="px-5 py-3 text-right tabular-nums font-semibold">{formatUsd(c.spend_ytd)}</td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{c.paymentBehavior}</td>
                    <td className="px-5 py-3"><Badge tone={riskTone(c.risk_level)}>{riskLabel(c.risk_level)}</Badge></td>
                    <td className="px-5 py-3"><button className="text-muted-foreground hover:text-primary transition-colors"><ExternalLink className="h-4 w-4" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </AppLayout>
  );
}
