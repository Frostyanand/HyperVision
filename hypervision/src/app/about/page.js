import Link from "next/link";

/* Inline SVGs */
function IconArrowRight({ size = 16, color = "currentColor" }) {
    return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>);
}

const operations = [
    "Grayscale", "Resize", "Gaussian Blur", "Canny Edge Detection",
    "Histogram Equalization", "Sharpen", "Binary Threshold",
    "Morphological Erosion", "Morphological Dilation",
    "Morphological Opening", "Morphological Closing",
    "AI Background Removal", "AI Super-Resolution 4×", "Neural Style Transfer",
];

export default function AboutPage() {
    return (
        <div style={{ background: "#F3F6FB", minHeight: "100vh" }}>

            {/* ═══ Hero ═══ */}
            <section style={{ maxWidth: 1120, margin: "0 auto", padding: "72px 32px 0", textAlign: "center" }}>
                <p style={{
                    fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12,
                    letterSpacing: "0.12em", textTransform: "uppercase", color: "#244ED1",
                    marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                }}>
                    <span style={{ width: 20, height: 1, background: "#244ED1", display: "inline-block" }} />
                    Architecture
                    <span style={{ width: 20, height: 1, background: "#244ED1", display: "inline-block" }} />
                </p>
                <h1 style={{
                    fontFamily: "'Outfit',sans-serif", fontSize: "clamp(2rem, 4vw, 2.8rem)",
                    fontWeight: 800, color: "#0f172a", lineHeight: 1.12, letterSpacing: "-0.02em",
                    marginBottom: 18, maxWidth: 640, margin: "0 auto 18px",
                }}>
                    How HyperVision works under the hood.
                </h1>
                <p style={{ fontSize: 16, color: "#64748b", lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
                    A deep dive into the CUDA acceleration pipeline, AI model inference,
                    and benchmarking system that powers every operation.
                </p>

                {/* Three key metrics */}
                <div style={{
                    display: "flex", justifyContent: "center", gap: 56, marginTop: 48,
                    paddingBottom: 48, borderBottom: "1px solid #e2e8f0",
                }}>
                    {[
                        { value: "14", label: "CV Operations", color: "#244ED1" },
                        { value: "3", label: "AI Models", color: "#FF6600" },
                        { value: "2", label: "Compute Paths", color: "#10b981" },
                    ].map((s) => (
                        <div key={s.label}>
                            <div style={{
                                fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 32,
                                color: s.color, lineHeight: 1,
                            }}>{s.value}</div>
                            <div style={{
                                fontFamily: "'Inter',sans-serif", fontSize: 12, fontWeight: 500,
                                color: "#94a3b8", marginTop: 4, textTransform: "uppercase",
                                letterSpacing: "0.06em",
                            }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ Section 1: GPU Pipeline ═══ */}
            {/* Image right, text left — asymmetric weights */}
            <section style={{
                maxWidth: 1120, margin: "0 auto", padding: "40px 32px 80px",
            }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 0.9fr", gap: 56, alignItems: "center" }}>
                    <div>
                        <p style={{
                            fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12,
                            letterSpacing: "0.12em", textTransform: "uppercase", color: "#FF6600",
                            marginBottom: 14, display: "flex", alignItems: "center", gap: 6,
                        }}>
                            <span style={{ width: 20, height: 1, background: "#FF6600", display: "inline-block" }} />
                            Hardware
                        </p>
                        <h2 style={{
                            fontFamily: "'Outfit',sans-serif", fontSize: 26, fontWeight: 800,
                            color: "#0f172a", lineHeight: 1.2, marginBottom: 18,
                        }}>
                            Parallel execution across thousands of CUDA cores.
                        </h2>
                        <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
                            A CPU processes image pixels sequentially. For an 8K image, that means iterating
                            over 33 million pixels one at a time through each filter kernel.
                        </p>
                        <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75 }}>
                            HyperVision loads the entire image matrix into GPU VRAM using{" "}
                            <strong style={{ color: "#0f172a", fontWeight: 600 }}>NVIDIA CUDA</strong> and
                            distributes the mathematical operations across cores simultaneously —
                            turning minutes of processing into milliseconds.
                        </p>
                    </div>
                    <div style={{
                        borderRadius: 10, overflow: "hidden",
                        border: "1px solid #e2e8f0",
                    }}>
                        <img src="/images/gpu_card.png" alt="GPU architecture" style={{ width: "100%" }} />
                    </div>
                </div>
            </section>

            {/* ═══ Section 2: AI Models ═══ */}
            {/* NOT a thick blue band. White background, subtle left-border accents. */}
            <section style={{
                borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0",
                background: "#fff", padding: "80px 32px",
            }}>
                <div style={{ maxWidth: 720, margin: "0 auto" }}>
                    <p style={{
                        fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12,
                        letterSpacing: "0.12em", textTransform: "uppercase", color: "#244ED1",
                        marginBottom: 14, display: "flex", alignItems: "center", gap: 6,
                    }}>
                        <span style={{ width: 20, height: 1, background: "#244ED1", display: "inline-block" }} />
                        Deep Learning
                    </p>
                    <h2 style={{
                        fontFamily: "'Outfit',sans-serif", fontSize: 26, fontWeight: 800,
                        color: "#0f172a", lineHeight: 1.2, marginBottom: 14,
                    }}>
                        Three AI models, optimized for GPU tensor inference.
                    </h2>
                    <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.7, marginBottom: 40 }}>
                        Beyond classical computer vision, HyperVision integrates production-grade neural
                        networks that run entirely on GPU via PyTorch.
                    </p>

                    {/* AI models — left-border accent style, NOT blue cards */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                        {[
                            {
                                title: "Real-ESRGAN",
                                subtitle: "Super Resolution · 4× Upscale",
                                desc: "A Generative Adversarial Network that hallucinates ultra-high-resolution detail from low-res inputs, quadrupling pixel density in a single forward pass through the generator.",
                                color: "#244ED1",
                            },
                            {
                                title: "U²-Net",
                                subtitle: "Background Removal · Salient Object Detection",
                                desc: "Deeply nested U-shaped architecture that builds multi-scale feature maps to detect foreground subjects and generate pixel-accurate alpha masks automatically.",
                                color: "#FF6600",
                            },
                            {
                                title: "Style Transfer Network",
                                subtitle: "Neural Artistic Rendering",
                                desc: "Convolutional neural network trained on artistic styles. Extracts content features from the input image and applies learned style patterns to produce artistic renderings.",
                                color: "#10b981",
                            },
                        ].map((model) => (
                            <div key={model.title} style={{
                                paddingLeft: 20,
                                borderLeft: `2px solid ${model.color}`,
                            }}>
                                <h3 style={{
                                    fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 17,
                                    color: "#0f172a", marginBottom: 2,
                                }}>{model.title}</h3>
                                <p style={{
                                    fontSize: 12, fontWeight: 600, color: model.color,
                                    textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8,
                                }}>{model.subtitle}</p>
                                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65 }}>{model.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Section 3: Operations ═══ */}
            <section style={{ maxWidth: 720, margin: "0 auto", padding: "80px 32px" }}>
                <p style={{
                    fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12,
                    letterSpacing: "0.12em", textTransform: "uppercase", color: "#FF6600",
                    marginBottom: 14, display: "flex", alignItems: "center", gap: 6,
                }}>
                    <span style={{ width: 20, height: 1, background: "#FF6600", display: "inline-block" }} />
                    Operations
                </p>
                <h2 style={{
                    fontFamily: "'Outfit',sans-serif", fontSize: 26, fontWeight: 800,
                    color: "#0f172a", lineHeight: 1.2, marginBottom: 32,
                }}>
                    14 operations, each benchmarked on both CPU and GPU.
                </h2>

                {/* Two-column plain text list, not cards */}
                <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 40px",
                }}>
                    {operations.map((op, i) => (
                        <div key={op} style={{
                            display: "flex", alignItems: "center", gap: 10,
                            padding: "8px 0",
                            borderBottom: "1px solid #f1f5f9",
                        }}>
                            <span style={{
                                fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 12,
                                color: "#c4cfde", width: 24, flexShrink: 0,
                            }}>{String(i + 1).padStart(2, "0")}</span>
                            <span style={{ fontSize: 14, color: "#475569", fontWeight: 500 }}>{op}</span>
                            {(op.startsWith("AI") || op.startsWith("Neural")) && (
                                <span style={{
                                    fontSize: 10, fontWeight: 700, color: "#FF6600",
                                    background: "#fff7ed", padding: "1px 6px", borderRadius: 4,
                                    textTransform: "uppercase", letterSpacing: "0.04em",
                                }}>AI</span>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ Section 4: Compute Playgrounds ═══ */}
            <section style={{ maxWidth: 720, margin: "0 auto", padding: "0 32px 80px" }}>
                <p style={{
                    fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12,
                    letterSpacing: "0.12em", textTransform: "uppercase", color: "#10b981",
                    marginBottom: 14, display: "flex", alignItems: "center", gap: 6,
                }}>
                    <span style={{ width: 20, height: 1, background: "#10b981", display: "inline-block" }} />
                    Raw Mathematics
                </p>
                <h2 style={{
                    fontFamily: "'Outfit',sans-serif", fontSize: 26, fontWeight: 800,
                    color: "#0f172a", lineHeight: 1.2, marginBottom: 18,
                }}>
                    Pushing the FLOPS ceiling with Matrix racing.
                </h2>
                <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, marginBottom: 16 }}>
                    While image processing serves as a tangible demonstration of parallel computing, HyperVision also includes a dedicated raw mathematics environment. By multiplying matrices up to 10,000 × 10,000 in dimensions, we simulate massive High-Performance Computing (HPC) workloads.
                </p>
                <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75 }}>
                    This environment allows users to decouple memory constraints from core utilization by defining sustained compute loops, visually demonstrating how CUDA architecture remains completely unflinching under trillions of floating-point operations.
                </p>
            </section>

            {/* ─── CTA ─── */}
            <section style={{
                borderTop: "1px solid #e2e8f0", padding: "64px 32px",
                textAlign: "center",
            }}>
                <p style={{ fontSize: 15, color: "#64748b", marginBottom: 16 }}>
                    Built as an academic exploration of High-Performance Computing architectures.
                </p>
                <Link href="/process" style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14,
                    color: "#244ED1",
                }}>
                    Go to Workspace <IconArrowRight size={14} color="#244ED1" />
                </Link>
            </section>

            <footer style={{
                borderTop: "1px solid #e2e8f0", padding: "24px 32px",
                textAlign: "center", fontSize: 13, color: "#94a3b8",
            }}>
                © 2026 HyperVision
            </footer>
        </div>
    );
}
