"use client";
import { useState } from "react";

const OPERATIONS = [
    { id: "grayscale", label: "Grayscale", desc: "Converts the image to black and white by removing all color information." },
    { id: "resize", label: "Resize 0.5×", desc: "Downscales the image resolution by 50% using interpolation algorithms." },
    { id: "gaussian_blur", label: "Gaussian Blur", desc: "Applies a low-pass filter to smooth the image and reduce noise." },
    { id: "edge_detection", label: "Edge Detection", desc: "Uses the Canny algorithm to identify and extract boundaries of objects." },
    { id: "histogram_equalization", label: "Histogram EQ", desc: "Enhances global contrast by redistributing pixel intensity values." },
    { id: "sharpen", label: "Sharpen", desc: "Applies a high-pass filter kernel to enhance fine detail." },
    { id: "threshold", label: "Threshold", desc: "Converts to strict binary based on a pixel intensity cutoff." },
    { id: "morphological_erosion", label: "Erosion", desc: "Erodes object boundaries, removing small white noise." },
    { id: "morphological_dilation", label: "Dilation", desc: "Expands object boundaries, joining broken parts." },
    { id: "morphological_opening", label: "Opening", desc: "Erosion then dilation — removes noise, keeps shapes." },
    { id: "morphological_closing", label: "Closing", desc: "Dilation then erosion — closes small holes." },
    { id: "background_removal", label: "BG Removal", desc: "U²-Net AI model detects the subject and removes the background.", ai: true },
    { id: "super_resolution", label: "Super Res 4×", desc: "Real-ESRGAN AI hallucinates missing pixels, quadrupling resolution.", ai: true },
    { id: "style_transfer", label: "Style Transfer", desc: "Neural network repaints the image in an artistic style.", ai: true },
];

export default function OperationSelector({ selected, onSelect }) {
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <div className="operation-grid">
            {OPERATIONS.map((op) => (
                <div
                    key={op.id}
                    style={{ position: "relative" }}
                    onMouseEnter={() => setHoveredId(op.id)}
                    onMouseLeave={() => setHoveredId(null)}
                >
                    <button
                        className={`op-card ${selected === op.id ? "selected" : ""}`}
                        onClick={() => onSelect(op.id)}
                        style={{ width: "100%", height: "100%", position: "relative" }}
                    >
                        {op.label}
                        {op.ai && (
                            <span style={{
                                display: "block", marginTop: 4,
                                fontSize: 9, fontWeight: 700,
                                color: selected === op.id ? "rgba(255,255,255,0.7)" : "#FF6600",
                                textTransform: "uppercase", letterSpacing: "0.06em",
                            }}>AI</span>
                        )}
                    </button>

                    {hoveredId === op.id && (
                        <div style={{
                            position: "absolute", bottom: "calc(100% + 6px)",
                            left: "50%", transform: "translateX(-50%)",
                            width: 190, background: "#1e293b", color: "#e2e8f0",
                            fontSize: 12, lineHeight: 1.5, padding: "9px 12px",
                            borderRadius: 8, zIndex: 100, pointerEvents: "none",
                            boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                        }}>
                            {op.desc}
                            <div style={{
                                position: "absolute", top: "100%", left: "50%",
                                transform: "translateX(-50%)",
                                borderLeft: "5px solid transparent", borderRight: "5px solid transparent",
                                borderTop: "5px solid #1e293b",
                            }} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
