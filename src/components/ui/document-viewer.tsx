import { useEffect, useState, useRef } from "react";
import { API_BASE, getStoredAuth } from "@/lib/api/config";
import { ZoomIn, ZoomOut, RotateCw, Download, FileText, Loader2 } from "lucide-react";
import { Card } from "../app-layout";

export type BoundingBox = {
  id: string;
  label: string;
  color: string;
  top: number; // percentage
  left: number; // percentage
  width: number; // percentage
  height: number; // percentage
  isActive?: boolean;
  error_details?: {
    severity: string;
    root_cause: string;
    suggested_fix: string;
    business_impact: string;
  };
};

interface DocumentViewerProps {
  attachmentId: string | null;
  filename?: string;
  contentType?: string;
  boundingBoxes?: BoundingBox[];
  onHoverBox?: (id: string | null) => void;
}

export function DocumentViewer({ attachmentId, filename = "Document", contentType = "application/pdf", boundingBoxes = [], onHoverBox }: DocumentViewerProps) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    
    async function loadDocument() {
      setLoading(true);
      setError(false);
      try {
        const auth = getStoredAuth();
        const headers: HeadersInit = {};
        if (auth?.access_token) {
          headers["Authorization"] = `Bearer ${auth.access_token}`;
        }
        const res = await fetch(`${API_BASE}/documents/${attachmentId}/view`, { headers });
        if (!res.ok) throw new Error("Failed to load document");
        
        const blob = await res.blob();
        if (!active) return;
        
        const url = URL.createObjectURL(blob);
        setBlobUrl(url);
      } catch (e) {
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    }
    
    if (attachmentId) {
      loadDocument();
    } else {
      setBlobUrl(null);
    }
    
    return () => {
      active = false;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [attachmentId]);

  const handleDownload = () => {
    if (blobUrl) {
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const isImage = contentType.startsWith("image/");

  if (!attachmentId) {
    return (
      <Card className="!p-0 overflow-hidden flex flex-col h-full bg-slate-900 border-slate-800">
        <div className="flex-1 grid place-items-center text-slate-500 text-sm">Select a document to preview</div>
      </Card>
    );
  }

  return (
    <Card className="!p-0 overflow-hidden flex flex-col h-full bg-slate-900 border-slate-800">
      <div className="p-3 border-b border-slate-800 bg-slate-950 flex items-center justify-between text-slate-300">
        <div className="flex items-center gap-2 text-sm font-medium truncate px-2">
          <FileText className="h-4 w-4 text-primary shrink-0" />
          <span className="truncate max-w-[200px] lg:max-w-[300px]">{filename}</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={() => setZoom(z => Math.max(50, z - 25))} className="h-8 w-8 grid place-items-center rounded hover:bg-slate-800 transition" title="Zoom Out">
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="text-xs px-2 tabular-nums w-12 text-center">{zoom}%</span>
          <button onClick={() => setZoom(z => Math.min(250, z + 25))} className="h-8 w-8 grid place-items-center rounded hover:bg-slate-800 transition" title="Zoom In">
            <ZoomIn className="h-4 w-4" />
          </button>
          <div className="w-px h-4 bg-slate-800 mx-1" />
          <button onClick={() => setRotation(r => (r + 90) % 360)} className="h-8 w-8 grid place-items-center rounded hover:bg-slate-800 transition" title="Rotate">
            <RotateCw className="h-4 w-4" />
          </button>
          <button onClick={handleDownload} className="h-8 w-8 grid place-items-center rounded hover:bg-slate-800 transition" title="Download">
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 relative overflow-auto bg-slate-900/50 p-4 lg:p-8" ref={containerRef}>
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="text-sm">Loading document preview...</span>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 gap-2">
            <FileText className="h-10 w-10 opacity-20 mb-2" />
            <span className="text-sm">Preview not available</span>
            <button onClick={handleDownload} className="text-primary hover:underline text-xs mt-2">Download file</button>
          </div>
        )}
        
        {blobUrl && (
          <div className="mx-auto bg-white shadow-2xl relative transition-transform duration-200" 
               style={{ 
                 transform: `scale(${zoom / 100}) rotate(${rotation}deg)`, 
                 transformOrigin: "top center",
                 width: "100%", 
                 maxWidth: "800px",
                 minHeight: isImage ? "auto" : "1000px" 
               }}>
            
            {/* Render Document */}
            {isImage ? (
              <img src={blobUrl} alt={filename} className="w-full h-auto block" />
            ) : (
              <object data={`${blobUrl}#toolbar=0&navpanes=0`} type={contentType} className="w-full min-h-[1000px]" />
            )}

            {/* OCR Bounding Boxes Overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
              {boundingBoxes.map(box => (
                <div
                  key={box.id}
                  className="absolute border-2 transition-all duration-300 pointer-events-auto cursor-crosshair"
                  style={{
                    top: `${box.top}%`,
                    left: `${box.left}%`,
                    width: `${box.width}%`,
                    height: `${box.height}%`,
                    borderColor: box.color,
                    backgroundColor: box.isActive ? `${box.color}33` : "transparent",
                    boxShadow: box.isActive ? `0 0 15px ${box.color}66` : "none",
                    zIndex: box.isActive ? 20 : 10
                  }}
                  onMouseEnter={() => onHoverBox?.(box.id)}
                  onMouseLeave={() => onHoverBox?.(null)}
                >
                  {box.isActive && (
                    <div 
                      className="absolute bottom-full left-0 mb-1 px-2 py-1 text-xs font-bold text-white tracking-wider rounded whitespace-nowrap shadow-lg flex flex-col gap-1"
                      style={{ backgroundColor: box.color }}
                    >
                      <span className="uppercase">{box.label}</span>
                      {box.error_details && (
                        <div className="bg-black/20 p-1.5 rounded text-[10px] font-normal normal-case flex flex-col gap-0.5 mt-1 border border-white/10">
                          <div className="flex justify-between gap-4">
                            <span className="opacity-80">Severity:</span>
                            <span className="font-semibold text-red-200 capitalize">{box.error_details.severity}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="opacity-80">Root Cause:</span>
                            <span className="font-medium text-white">{box.error_details.root_cause}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="opacity-80">Fix:</span>
                            <span className="font-medium text-green-200">{box.error_details.suggested_fix}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="opacity-80">Impact:</span>
                            <span className="font-medium text-orange-200">{box.error_details.business_impact}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
          </div>
        )}
      </div>
    </Card>
  );
}
