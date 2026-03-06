"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

/* Inline SVGs for consistent Premium UI */
function IconArrowLeft({ size = 16, color = "currentColor" }) {
    return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>);
}
function IconPlay({ size = 16, color = "currentColor" }) {
    return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>);
}
function IconActivity({ size = 20, color = "#244ED1" }) {
    return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>);
}

export default function MatrixBenchmarkPage() {
    const [dimension, setDimension] = useState(4000); // Default N=4000
    const [iterations, setIterations] = useState(10); // Default loops=10
    const [running, setRunning] = useState(false);
    const [calculatingGpu, setCalculatingGpu] = useState(false);
    const [calculatingCpu, setCalculatingCpu] = useState(false);
    const [gpuRes, setGpuRes] = useState(null);
    const [cpuRes, setCpuRes] = useState(null);
    const [error, setError] = useState(null);

    // Run benchmark race
    const handleRun = async () => {
        setRunning(true);
        setError(null);
        setGpuRes(null);
        setCpuRes(null);
        setCalculatingGpu(true);
        setCalculatingCpu(true);

        const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

        // Fire both requests concurrently using direct backend URL instead of Next proxy
        // This avoids Next.js router proxy ping dropping long computations
        const pGpu = axios.post(`${API_BASE}/matrix/multiply`, { n: dimension, iterations: iterations, device: "gpu" }, { timeout: 0 })
            .then(res => {
                setGpuRes(res.data);
                setCalculatingGpu(false);
            })
            .catch(err => {
                console.error(err);
                setError("GPU computation failed or timed out.");
                setCalculatingGpu(false);
            });

        const pCpu = axios.post(`${API_BASE}/matrix/multiply`, { n: dimension, iterations: iterations, device: "cpu" }, { timeout: 0 })
            .then(res => {
                setCpuRes(res.data);
                setCalculatingCpu(false);
            })
            .catch(err => {
                console.error(err);
                setError("CPU computation failed or timed out.");
                setCalculatingCpu(false);
            });

        await Promise.allSettled([pGpu, pCpu]);
        setRunning(false);
    };

    // Helper to format large numbers
    const formatNumber = (num) => {
        if (num >= 1e9) return (num / 1e9).toFixed(1) + " Billion";
        if (num >= 1e6) return (num / 1e6).toFixed(1) + " Million";
        return num.toLocaleString();
    };

    const hasAnyResult = calculatingGpu || calculatingCpu || gpuRes || cpuRes;
    const isFinished = !calculatingGpu && !calculatingCpu && gpuRes && cpuRes;

    return (
        <div style={{ background: "#F3F6FB", minHeight: "100vh", paddingBottom: 80 }}>
            {/* ═══ Header ═══ */}
            <section style={{ maxWidth: 1120, margin: "0 auto", padding: "72px 32px 40px", textAlign: "center" }}>
                <p style={{
                    fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12,
                    letterSpacing: "0.12em", textTransform: "uppercase", color: "#244ED1",
                    marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                }}>
                    <span style={{ width: 20, height: 1, background: "#244ED1", display: "inline-block" }} />
                    Raw Compute
                    <span style={{ width: 20, height: 1, background: "#244ED1", display: "inline-block" }} />
                </p>
                <h1 style={{
                    fontFamily: "'Outfit',sans-serif", fontSize: "clamp(2rem, 4vw, 2.8rem)",
                    fontWeight: 800, color: "#0f172a", lineHeight: 1.12, letterSpacing: "-0.02em",
                    marginBottom: 18, maxWidth: 640, margin: "0 auto 18px",
                }}>
                    Matrix Multiplication Playground
                </h1>
                <p style={{ fontSize: 16, color: "#64748b", lineHeight: 1.7, maxWidth: 540, margin: "0 auto" }}>
                    The ultimate test of parallel processing. Multiply two massive matrices and watch the GPU absolutely obliterate the CPU in a live race.
                </p>
            </section>

            {/* ═══ Main Interface ═══ */}
            <section style={{ maxWidth: 800, margin: "0 auto", padding: "0 32px" }}>

                {/* Control Panel */}
                <div style={{
                    background: "#fff", borderRadius: 16, padding: "32px 40px",
                    boxShadow: "0 8px 30px rgba(15, 23, 42, 0.04)", border: "1px solid #e2e8f0",
                    marginBottom: 40,
                }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
                        <div>
                            <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 18, color: "#0f172a", marginBottom: 6 }}>
                                Set Benchmark Constraints
                            </h3>
                            <p style={{ fontSize: 13, color: "#64748b" }}>
                                Separate Memory Load (RAM) from Compute Load (Time).
                            </p>
                        </div>
                        <div style={{
                            fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 24, color: "#244ED1",
                            background: "#F3F6FB", padding: "8px 16px", borderRadius: 8,
                        }}>
                            {formatNumber(2 * (dimension ** 3) * iterations)} Ops
                        </div>
                    </div>

                    <div style={{ marginBottom: 32 }}>
                        {/* Matrix Dimension Slider */}
                        <div style={{ marginBottom: 32 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                                <span style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>Matrix Dimension (Memory Size)</span>
                                <span style={{ fontSize: 13, fontWeight: 700, color: "#244ED1" }}>{dimension.toLocaleString()} × {dimension.toLocaleString()}</span>
                            </div>
                            <input
                                type="range"
                                min="100"
                                max="10000"
                                step="100"
                                value={dimension}
                                onChange={(e) => setDimension(parseInt(e.target.value))}
                                disabled={running}
                                style={{
                                    width: "100%", cursor: running ? "not-allowed" : "cursor",
                                    accentColor: "#244ED1", height: 6,
                                }}
                            />
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>
                                <span>100</span>
                                <span>~1.2 GB RAM at Max</span>
                                <span>10,000</span>
                            </div>
                        </div>

                        {/* Iterations Slider */}
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                                <span style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>Compute Loops (Sustained Load)</span>
                                <span style={{ fontSize: 13, fontWeight: 700, color: "#FF6600" }}>{iterations}x Iterations</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="100"
                                step="1"
                                value={iterations}
                                onChange={(e) => setIterations(parseInt(e.target.value))}
                                disabled={running}
                                style={{
                                    width: "100%", cursor: running ? "not-allowed" : "cursor",
                                    accentColor: "#FF6600", height: 6,
                                }}
                            />
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>
                                <span>1</span>
                                <span>Time Multiplier</span>
                                <span>100</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleRun}
                        disabled={running}
                        style={{
                            width: "100%", padding: "16px", borderRadius: 10,
                            background: running ? "#cbd5e1" : "#FF6600", color: "#fff",
                            fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 15,
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                            cursor: running ? "not-allowed" : "pointer",
                            transition: "background 0.2s ease", border: "none"
                        }}
                    >
                        {running ? (
                            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <IconActivity size={18} color="#fff" /> Racing GPU vs CPU...
                            </span>
                        ) : (
                            <>
                                <IconPlay size={18} color="#fff" /> Start Hardware Race
                            </>
                        )}
                    </button>
                    {error && <p style={{ color: "#ef4444", fontSize: 13, marginTop: 12, textAlign: "center" }}>{error}</p>}
                </div>

                {/* Results Panel */}
                {hasAnyResult && (
                    <div className="fade-in" style={{
                        background: "#0f172a", borderRadius: 16, padding: "40px",
                        boxShadow: "0 20px 50px rgba(15, 23, 42, 0.15)", border: "1px solid #1e293b",
                        position: "relative", overflow: "hidden"
                    }}>
                        <div style={{ textAlign: "center", marginBottom: 32 }}>
                            <p style={{ color: "#64748b", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                                Live Race Results
                            </p>
                            <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 22, color: "#fff" }}>
                                {formatNumber(2 * (dimension ** 3) * iterations)} Floating Point Operations
                            </h3>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: isFinished ? 40 : 10 }}>
                            {/* CPU Card */}
                            <div style={{
                                background: "#1e293b", borderRadius: 12, padding: "24px",
                                border: calculatingCpu ? "1px solid #84A5F2" : "1px solid #334155",
                                opacity: calculatingCpu ? 0.8 : 1
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                                    <div style={{
                                        width: 8, height: 8, borderRadius: "50%",
                                        background: calculatingCpu ? "transparent" : "#84A5F2",
                                        border: "2px solid #84A5F2",
                                        animation: calculatingCpu ? "pulse 1s infinite" : "none"
                                    }} />
                                    <span style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>CPU Time</span>
                                </div>

                                {calculatingCpu ? (
                                    <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 24, fontWeight: 600, color: "#84A5F2", display: "flex", alignItems: "center", gap: 12 }}>
                                        <div className="spinner-blue" style={{ width: 20, height: 20, border: "3px solid rgba(132, 165, 242, 0.2)", borderTopColor: "#84A5F2", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                                        Calculating...
                                    </div>
                                ) : cpuRes ? (
                                    <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 36, fontWeight: 800, color: "#fff", lineHeight: 1 }}>
                                        {cpuRes.cpu_time.toFixed(3)}<span style={{ fontSize: 20, color: "#64748b", marginLeft: 4 }}>s</span>
                                    </div>
                                ) : (
                                    <div style={{ color: "#475569" }}>Failed</div>
                                )}
                            </div>

                            {/* GPU Card */}
                            <div style={{
                                background: "#1e293b", borderRadius: 12, padding: "24px",
                                border: calculatingGpu ? "1px solid #FF6600" : "1px solid #334155",
                                position: "relative"
                            }}>
                                {/* Glow effect when finished */}
                                {gpuRes && !calculatingGpu && (
                                    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at top right, rgba(255,102,0,0.1), transparent 70%)", borderRadius: 12, pointerEvents: "none" }} />
                                )}

                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                                    <div style={{
                                        width: 8, height: 8, borderRadius: "50%",
                                        background: calculatingGpu ? "transparent" : "#FF6600",
                                        border: "2px solid #FF6600",
                                        animation: calculatingGpu ? "pulse 1s infinite" : "none"
                                    }} />
                                    <span style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>GPU Time</span>
                                </div>

                                {calculatingGpu ? (
                                    <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 24, fontWeight: 600, color: "#FF6600", display: "flex", alignItems: "center", gap: 12 }}>
                                        <div className="spinner-orange" style={{ width: 20, height: 20, border: "3px solid rgba(255, 102, 0, 0.2)", borderTopColor: "#FF6600", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                                        Parallelizing...
                                    </div>
                                ) : gpuRes ? (
                                    <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 36, fontWeight: 800, color: "#FF6600", lineHeight: 1 }}>
                                        {gpuRes.gpu_time.toFixed(3)}<span style={{ fontSize: 20, color: "#64748b", marginLeft: 4 }}>s</span>
                                    </div>
                                ) : (
                                    <div style={{ color: "#475569" }}>Failed</div>
                                )}
                            </div>
                        </div>

                        {/* Final Speedup Badge (Only shows when CPU finally finishes) */}
                        <div style={{
                            height: isFinished ? "auto" : 0, opacity: isFinished ? 1 : 0,
                            overflow: "hidden", transition: "all 0.5s ease"
                        }}>
                            {isFinished && cpuRes && gpuRes && (
                                <div style={{
                                    background: "rgba(34, 197, 94, 0.1)", border: "1px solid rgba(34, 197, 94, 0.2)",
                                    borderRadius: 12, padding: "32px", textAlign: "center"
                                }}>
                                    <p style={{ color: "#22c55e", fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                                        GPU Speedup Multiplier
                                    </p>
                                    <div style={{ fontFamily: "'Outfit',sans-serif", fontSize: 56, fontWeight: 800, color: "#22c55e", lineHeight: 1 }}>
                                        {(cpuRes.cpu_time / gpuRes.gpu_time).toFixed(1)}×
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* CSS animations */}
                        <style>{`
                            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                            @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
                        `}</style>
                    </div>
                )}
            </section>
        </div>
    );
}
