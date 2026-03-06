"use client";
import { useState, useCallback } from "react";
import axios from "axios";
import ImageUploader from "@/components/ImageUploader";
import OperationSelector from "@/components/OperationSelector";
import DeviceSelector from "@/components/DeviceSelector";
import ResultViewer from "@/components/ResultViewer";
import BenchmarkPanel from "@/components/BenchmarkPanel";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function ProcessPage() {
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [operation, setOperation] = useState("grayscale");
    const [device, setDevice] = useState("cpu");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [gpuInfo, setGpuInfo] = useState(null);

    const handleImageSelect = useCallback((file) => {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        setResult(null);
        setError(null);
    }, []);

    const fetchGpuInfo = useCallback(async () => {
        try { const res = await axios.get(`${API_BASE}/gpu-info`); setGpuInfo(res.data); }
        catch { setGpuInfo(null); }
    }, []);
    useState(() => { fetchGpuInfo(); });

    const handleProcess = useCallback(async () => {
        if (!imageFile) { setError("Upload an image first."); return; }
        setLoading(true); setError(null); setResult(null);
        const fd = new FormData();
        fd.append("image", imageFile); fd.append("operation", operation); fd.append("device", device);
        try {
            const res = await axios.post(`${API_BASE}/process`, fd, { headers: { "Content-Type": "multipart/form-data" } });
            setResult(res.data);
        } catch (err) {
            setError(err.response?.data?.detail || err.message || "Processing failed.");
        } finally { setLoading(false); }
    }, [imageFile, operation, device]);

    return (
        <div style={{ background: "#F3F6FB", minHeight: "100vh", padding: "32px 32px 80px" }}>
            <div style={{ maxWidth: 1120, margin: "0 auto" }}>

                {/* Page title — left-aligned, not centered */}
                <div style={{ marginBottom: 36 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div>
                            <h1 style={{
                                fontFamily: "'Outfit',sans-serif", fontSize: 26, fontWeight: 800,
                                color: "#0f172a", marginBottom: 4,
                            }}>
                                Workspace
                            </h1>
                            <p style={{ fontSize: 14, color: "#94a3b8" }}>
                                Upload · Configure · Process · Benchmark
                            </p>
                        </div>

                        {gpuInfo && (
                            <div style={{
                                display: "flex", alignItems: "center", gap: 8,
                                padding: "5px 14px", borderRadius: 6,
                                background: gpuInfo.cuda_available ? "#fff" : "#fef2f2",
                                border: `1px solid ${gpuInfo.cuda_available ? "#e8ecf4" : "#fecaca"}`,
                                fontSize: 12, fontWeight: 600,
                                color: gpuInfo.cuda_available ? "#475569" : "#dc2626",
                            }}>
                                <span style={{
                                    width: 6, height: 6, borderRadius: "50%",
                                    background: gpuInfo.cuda_available ? "#10b981" : "#ef4444",
                                }} />
                                {gpuInfo.cuda_available
                                    ? `${gpuInfo.gpu_name} · ${gpuInfo.vram_total_mb} MB`
                                    : "CPU Only"}
                            </div>
                        )}
                    </div>
                </div>

                {/* Two-column layout: sidebar + main */}
                <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 20, alignItems: "start" }}>

                    {/* ── Left sidebar ── */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                        {/* Upload */}
                        <div className="glass-card" style={{ padding: 20 }}>
                            <p className="section-label">Upload</p>
                            <ImageUploader onImageSelect={handleImageSelect} />
                        </div>

                        {/* Target */}
                        <div className="glass-card" style={{ padding: 20 }}>
                            <p className="section-label">Target</p>
                            <DeviceSelector selected={device} onSelect={setDevice} />
                        </div>

                        {/* Process Button */}
                        <button
                            className="btn-primary"
                            onClick={handleProcess}
                            disabled={loading || !imageFile}
                            style={{ width: "100%", padding: "14px" }}
                        >
                            {loading ? (
                                <><span className="spinner" /> Processing…</>
                            ) : (
                                "Process Image"
                            )}
                        </button>

                        {error && (
                            <div style={{
                                background: "#fef2f2", border: "1px solid #fecaca",
                                borderRadius: 8, padding: "10px 14px",
                                color: "#dc2626", fontSize: 13, lineHeight: 1.5,
                            }}>
                                {error}
                            </div>
                        )}
                    </div>

                    {/* ── Main area ── */}
                    <div className="glass-card" style={{ padding: 22 }}>
                        <p className="section-label">Operation</p>
                        <OperationSelector selected={operation} onSelect={setOperation} />
                    </div>
                </div>

                {/* ── Results ── */}
                {result && (
                    <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 20 }}>
                        <div className="glass-card" style={{ padding: 24 }}>
                            <p className="section-label">Output</p>
                            <ResultViewer originalUrl={imagePreview} result={result} />
                        </div>
                        <div className="glass-card" style={{ padding: 24 }}>
                            <p className="section-label">Benchmark</p>
                            <BenchmarkPanel result={result} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
