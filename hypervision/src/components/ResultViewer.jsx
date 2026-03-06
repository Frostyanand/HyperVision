"use client";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function ResultViewer({ originalUrl, result }) {
    if (!result) return null;

    if (result.device === "Compare") {
        const cpuSrc = result.cpu_image_url.startsWith("http") ? result.cpu_image_url : `${API_BASE}${result.cpu_image_url}`;
        const gpuSrc = result.gpu_image_url.startsWith("http") ? result.gpu_image_url : `${API_BASE}${result.gpu_image_url}`;
        return (
            <div className="image-compare">
                <div className="img-panel">
                    <span className="img-label" style={{ color: "#84A5F2" }}>
                        CPU — {result.cpu_time}s
                    </span>
                    <img src={cpuSrc} alt="CPU Processed" />
                </div>
                <div className="img-panel">
                    <span className="img-label" style={{ color: "#FF6600" }}>
                        GPU — {result.gpu_time}s
                    </span>
                    <img src={gpuSrc} alt="GPU Processed" />
                </div>
            </div>
        );
    }

    const processedSrc = result.image_url.startsWith("http")
        ? result.image_url
        : `${API_BASE}${result.image_url}`;

    return (
        <div className="image-compare">
            <div className="img-panel">
                <span className="img-label" style={{ color: "#475569" }}>
                    Original
                </span>
                {originalUrl && <img src={originalUrl} alt="Original" />}
            </div>
            <div className="img-panel">
                <span className="img-label" style={{
                    color: result.device === "GPU" ? "#FF6600" : "#84A5F2",
                }}>
                    {result.device} — {result.operation}
                </span>
                <img src={processedSrc} alt="Processed" />
            </div>
        </div>
    );
}
