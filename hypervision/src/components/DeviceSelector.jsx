"use client";

export default function DeviceSelector({ selected, onSelect }) {
    const buttons = [
        { id: "cpu", label: "CPU", icon: "🖥️", activeClass: "active-cpu" },
        { id: "gpu", label: "GPU (CUDA)", icon: "⚡", activeClass: "active-gpu" },
        { id: "compare", label: "Compare", icon: "⚖️", activeClass: "active-compare" },
    ];

    return (
        <div className="device-toggle">
            {buttons.map((btn) => (
                <button
                    key={btn.id}
                    className={`device-btn ${selected === btn.id ? btn.activeClass : ""}`}
                    onClick={() => onSelect(btn.id)}
                >
                    <span style={{ fontSize: "1.2rem", display: "block", marginBottom: 2 }}>
                        {btn.icon}
                    </span>
                    {btn.label}
                </button>
            ))}
        </div>
    );
}
