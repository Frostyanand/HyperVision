import Link from "next/link";

/* ─── Inline SVG icons (no emojis) ─── */
function IconBolt({ size = 20, color = "#244ED1" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>);
}
function IconLayers({ size = 20, color = "#244ED1" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>);
}
function IconActivity({ size = 20, color = "#244ED1" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>);
}
function IconArrowRight({ size = 16, color = "currentColor" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>);
}
function IconCheck({ size = 16, color = "#244ED1" }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>);
}

const stats = [
  { value: "14", label: "Operations" },
  { value: "3", label: "AI Models" },
  { value: "54T+", label: "Max FLOPS" },
  { value: "10×", label: "Avg Speedup" },
];

export default function Home() {
  return (
    <div style={{ background: "#F3F6FB", minHeight: "100vh" }}>

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 32px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          {/* Left: copy */}
          <div className="fade-in">
            <p style={{
              fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12,
              letterSpacing: "0.12em", textTransform: "uppercase", color: "#244ED1",
              marginBottom: 20, display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{ width: 20, height: 1, background: "#244ED1", display: "inline-block" }} />
              GPU-Accelerated Image Processing
            </p>

            <h1 style={{
              fontFamily: "'Outfit',sans-serif", fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
              fontWeight: 800, color: "#0f172a", lineHeight: 1.08, letterSpacing: "-0.03em",
              marginBottom: 22,
            }}>
              Process images at<br />
              <span style={{ color: "#244ED1" }}>the speed of light.</span>
            </h1>

            <p style={{
              fontSize: 16, lineHeight: 1.7, color: "#64748b", maxWidth: 480, marginBottom: 32,
            }}>
              HyperVision benchmarks CUDA GPU acceleration against traditional CPU processing
              across 14 computer vision operations, 3 deep learning models, and extreme matrix mathematics — in real time.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Link href="/process" style={{
                padding: "12px 24px", borderRadius: 7,
                background: "#FF6600", color: "#fff",
                fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14,
                display: "inline-flex", alignItems: "center", gap: 8,
                boxShadow: "0 1px 3px rgba(255,102,0,0.15)",
                transition: "background 0.2s ease",
              }}>
                Launch Workspace <IconArrowRight size={15} color="#fff" />
              </Link>
              <Link href="/about" style={{
                fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14,
                color: "#244ED1", display: "inline-flex", alignItems: "center", gap: 6,
                transition: "color 0.2s ease",
              }}>
                How it works <IconArrowRight size={14} color="#244ED1" />
              </Link>
            </div>
          </div>

          {/* Right: GPU compute visualization */}
          <div className="fade-in-delay" style={{
            background: "#0f172a", borderRadius: 10, padding: "28px",
            overflow: "hidden", position: "relative",
            border: "1px solid #1e293b",
          }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px rgba(34,197,94,0.4)" }} />
                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>CUDA Cores Active</span>
              </div>
              <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 13, fontWeight: 700, color: "#FF6600" }}>1024 threads</span>
            </div>

            {/* GPU Core Grid — 8×6 grid of animated cells */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 4,
              marginBottom: 24,
            }}>
              {Array.from({ length: 48 }, (_, i) => {
                const row = Math.floor(i / 8);
                const col = i % 8;
                const delay = (row * 0.06 + col * 0.04);
                const hue = 220 + (col * 8);
                return (
                  <div key={i} style={{
                    aspectRatio: "1", borderRadius: 3,
                    background: `hsl(${hue}, 70%, ${35 + row * 4}%)`,
                    animation: `coreFlicker 2.5s ${delay}s ease-in-out infinite`,
                    opacity: 0.7,
                  }} />
                );
              })}
            </div>

            {/* Performance bars */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* GPU bar */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, color: "#FF6600" }}>GPU · CUDA</span>
                  <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, fontWeight: 700, color: "#e2e8f0" }}>0.084s</span>
                </div>
                <div style={{ height: 6, background: "#1e293b", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", width: "92%", borderRadius: 3,
                    background: "linear-gradient(90deg, #FF6600, #ff8533)",
                    animation: "barGrow 1.5s 0.3s ease-out both",
                  }} />
                </div>
              </div>
              {/* CPU bar */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, color: "#84A5F2" }}>CPU · Sequential</span>
                  <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 12, fontWeight: 700, color: "#e2e8f0" }}>1.234s</span>
                </div>
                <div style={{ height: 6, background: "#1e293b", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", width: "7%", borderRadius: 3,
                    background: "linear-gradient(90deg, #84A5F2, #a4bff7)",
                    animation: "barGrow 2s 0.6s ease-out both",
                  }} />
                </div>
              </div>
            </div>

            {/* Speedup badge */}
            <div style={{
              marginTop: 20, display: "flex", alignItems: "center", justifyContent: "center",
              gap: 6, padding: "8px 0",
              borderTop: "1px solid #1e293b",
            }}>
              <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: 28, fontWeight: 800, color: "#22c55e" }}>14.6×</span>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em" }}>faster</span>
            </div>

            {/* CSS animations injected via style tag */}
            <style>{`
              @keyframes coreFlicker {
                0%, 100% { opacity: 0.5; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.05); }
              }
              @keyframes barGrow {
                from { width: 0%; }
              }
            `}</style>
          </div>
        </div>

        {/* Stats strip */}
        <div className="fade-in-delay-2" style={{
          display: "flex", gap: 48, marginTop: 56, paddingTop: 32,
          borderTop: "1px solid #e2e8f0",
        }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div style={{
                fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 28,
                color: "#0f172a", lineHeight: 1,
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


      {/* ═══════════════════════ CAPABILITIES ═══════════════════════ */}
      {/* Not 3 uniform cards. Instead: left column text + right staggered items */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "60px 32px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }}>
          {/* Left: sticky heading */}
          <div style={{ position: "sticky", top: 100 }}>
            <p style={{
              fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12,
              letterSpacing: "0.12em", textTransform: "uppercase", color: "#FF6600",
              marginBottom: 14, display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{ width: 20, height: 1, background: "#FF6600", display: "inline-block" }} />
              Capabilities
            </p>
            <h2 style={{
              fontFamily: "'Outfit',sans-serif", fontSize: 32, fontWeight: 800,
              color: "#0f172a", lineHeight: 1.15, marginBottom: 16,
            }}>
              Built for serious<br />image processing.
            </h2>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.7, maxWidth: 340 }}>
              Every operation runs on both CPU and CUDA GPU, with live benchmarking
              so you can see the hardware advantage for yourself.
            </p>
          </div>

          {/* Right: staggered feature items (NOT identical cards) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              {
                icon: <IconBolt size={22} color="#244ED1" />,
                title: "CUDA Parallel Execution",
                desc: "Image matrices are loaded directly into GPU VRAM and processed across thousands of CUDA cores simultaneously, eliminating the sequential bottleneck of CPU pipelines.",
                accent: "#244ED1",
              },
              {
                icon: <IconLayers size={22} color="#FF6600" />,
                title: "Neural Network Inference",
                desc: "Three pre-trained AI models — Real-ESRGAN for super-resolution, U²-Net for background removal, and a style transfer network — all optimized for GPU tensor inference via PyTorch.",
                accent: "#FF6600",
              },
              {
                icon: <IconActivity size={22} color="#10b981" />,
                title: "Transparent Benchmarking",
                desc: "Every operation is timed with hardware-synchronized clocks. Compare mode runs both CPU and GPU paths on the same input and displays the speedup factor in real-time.",
                accent: "#10b981",
              },
            ].map((f, i) => (
              <div key={f.title} style={{
                background: "#fff", border: "1px solid #e8ecf4", borderRadius: 12,
                padding: "28px 28px 28px 24px",
                display: "flex", gap: 20, alignItems: "flex-start",
                transition: "box-shadow 0.35s ease, border-color 0.35s ease",
                marginLeft: i === 1 ? 32 : 0, /* Stagger the middle card */
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                  background: `${f.accent}08`, border: `1px solid ${f.accent}18`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>{f.icon}</div>
                <div>
                  <h3 style={{
                    fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 17,
                    color: "#0f172a", marginBottom: 6,
                  }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ HOW IT WORKS ═══════════════════════ */}
      {/* Horizontal numbered steps — not cards, just a clean numbered flow */}
      <section style={{
        borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0",
        background: "#fff", padding: "80px 32px",
      }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <p style={{
            fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12,
            letterSpacing: "0.12em", textTransform: "uppercase", color: "#244ED1",
            marginBottom: 14, textAlign: "center", display: "flex", alignItems: "center",
            justifyContent: "center", gap: 6,
          }}>
            <span style={{ width: 20, height: 1, background: "#244ED1", display: "inline-block" }} />
            Workflow
          </p>
          <h2 style={{
            fontFamily: "'Outfit',sans-serif", fontSize: 28, fontWeight: 800,
            color: "#0f172a", textAlign: "center", marginBottom: 56,
          }}>
            Three steps. Zero complexity.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1 }}>
            {[
              { num: "01", title: "Upload", desc: "Drag and drop any image — PNG, JPG, BMP, TIFF, or WebP up to 50 MB." },
              { num: "02", title: "Configure", desc: "Pick from 14 operations, select a compute target (CPU, GPU, or Compare), and press process." },
              { num: "03", title: "Analyze", desc: "View the processed output alongside live execution metrics and GPU speedup ratios." },
            ].map((step, i) => (
              <div key={step.num} style={{
                padding: "0 36px",
                borderLeft: i > 0 ? "1px solid #e8ecf4" : "none",
              }}>
                <div style={{
                  fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: 48,
                  color: "#244ED1", opacity: 0.18, lineHeight: 1, marginBottom: 12,
                }}>{step.num}</div>
                <h3 style={{
                  fontFamily: "'Outfit',sans-serif", fontWeight: 700, fontSize: 18,
                  color: "#0f172a", marginBottom: 8,
                }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ VISUAL + FEATURES LIST ═══════════════════════ */}
      {/* Asymmetric: image left, checklist right — NOT a card grid */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 64, alignItems: "center" }}>
          <div style={{
            borderRadius: 10, overflow: "hidden",
            border: "1px solid #e2e8f0",
          }}>
            <img src="/images/before_after.png" alt="Before and after processing" style={{ width: "100%" }} />
          </div>

          <div>
            <p style={{
              fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12,
              letterSpacing: "0.12em", textTransform: "uppercase", color: "#FF6600",
              marginBottom: 14, display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{ width: 20, height: 1, background: "#FF6600", display: "inline-block" }} />
              What you get
            </p>
            <h2 style={{
              fontFamily: "'Outfit',sans-serif", fontSize: 28, fontWeight: 800,
              color: "#0f172a", lineHeight: 1.2, marginBottom: 24,
            }}>
              Measurable results on<br />every single operation.
            </h2>

            {/* Checklist — not cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "14 classical CV operations — from edge detection to morphological transforms",
                "3 AI models — super-resolution, background removal, style transfer",
                "Dedicated mathematics playground for massive 10,000x10,000 Matrix compute races",
                "Side-by-side GPU vs CPU comparison with live speedup metrics",
                "Support for images up to 8K resolution with tiled GPU processing",
              ].map((text) => (
                <div key={text} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ marginTop: 3, flexShrink: 0 }}><IconCheck size={16} color="#244ED1" /></div>
                  <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6 }}>{text}</p>
                </div>
              ))}
            </div>

            <Link href="/process" style={{
              display: "inline-flex", alignItems: "center", gap: 8, marginTop: 28,
              fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14,
              color: "#244ED1", transition: "color 0.2s ease",
            }}>
              Try it yourself <IconArrowRight size={14} color="#244ED1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CTA ═══════════════════════ */}
      {/* Not a giant blue rectangle. Just a clean, minimal, text-based CTA. */}
      <section style={{
        borderTop: "1px solid #e2e8f0", padding: "72px 32px",
        textAlign: "center",
      }}>
        <h2 style={{
          fontFamily: "'Outfit',sans-serif", fontSize: 30, fontWeight: 800,
          color: "#0f172a", marginBottom: 14,
        }}>
          Ready to see the difference?
        </h2>
        <p style={{
          fontSize: 15, color: "#64748b", maxWidth: 420, margin: "0 auto 28px",
          lineHeight: 1.65,
        }}>
          Upload an image and experience GPU-accelerated processing yourself.
        </p>
        <Link href="/process" style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "13px 28px", borderRadius: 7,
          background: "#FF6600", color: "#fff",
          fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 14,
          boxShadow: "0 1px 3px rgba(255,102,0,0.15)",
        }}>
          Launch Workspace <IconArrowRight size={15} color="#fff" />
        </Link>
      </section>

      {/* ─── Footer ─── */}
      <footer style={{
        borderTop: "1px solid #e2e8f0", padding: "28px 32px",
        textAlign: "center", fontSize: 13, color: "#94a3b8",
      }}>
        © 2026 HyperVision — High Performance Computing Research
      </footer>
    </div>
  );
}
