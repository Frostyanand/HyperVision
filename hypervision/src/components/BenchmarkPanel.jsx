"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

export default function BenchmarkPanel({ result }) {
    if (!result) return null;

    const cpuTime = result.cpu_time;
    const gpuTime = result.gpu_time;

    const chartData = [];
    if (cpuTime != null) {
        chartData.push({ name: "CPU", time: cpuTime, fill: "#84A5F2" });
    }
    if (gpuTime != null) {
        chartData.push({ name: "GPU", time: gpuTime, fill: "#FF6600" });
    }

    const stats = [
        {
            label: "Processing Time",
            value: `${result.processing_time.toFixed(4)}s`,
            color: "#0f172a",
        },
        {
            label: "Device",
            value: result.device,
            color: result.device === "GPU" ? "#FF6600"
                : result.device === "CPU" ? "#84A5F2"
                    : "#244ED1",
        },
        {
            label: "Speedup",
            value: result.speedup != null ? `${result.speedup}×` : "N/A",
            color: "#10b981",
        },
        {
            label: "Resolution",
            value: result.resolution,
            color: "#0f172a",
        },
    ];

    if (cpuTime != null) {
        stats.push({
            label: "CPU Time",
            value: `${cpuTime.toFixed(4)}s`,
            color: "#84A5F2",
        });
    }
    if (gpuTime != null) {
        stats.push({
            label: "GPU Time",
            value: `${gpuTime.toFixed(4)}s`,
            color: "#FF6600",
        });
    }

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: 10,
                    padding: "10px 16px",
                    fontSize: 14,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}>
                    <p style={{ fontWeight: 700, color: "#0f172a", marginBottom: 2 }}>
                        {payload[0].payload.name}
                    </p>
                    <p style={{ color: payload[0].payload.fill, fontWeight: 600 }}>
                        {payload[0].value.toFixed(4)}s
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div>
            {/* Stats row */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: 12,
                marginBottom: 28,
            }}>
                {stats.map((s) => (
                    <div className="stat-card" key={s.label}>
                        <div className="stat-value" style={{ color: s.color }}>
                            {s.value}
                        </div>
                        <div className="stat-label">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Bar chart */}
            <div style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: 16,
                padding: 24,
                height: 260,
            }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barCategoryGap="35%">
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis
                            dataKey="name"
                            tick={{ fill: "#475569", fontSize: 13, fontWeight: 600 }}
                            axisLine={{ stroke: "#e2e8f0" }}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fill: "#64748b", fontSize: 12 }}
                            axisLine={{ stroke: "#e2e8f0" }}
                            tickLine={false}
                            label={{
                                value: "Time (s)",
                                angle: -90,
                                position: "insideLeft",
                                fill: "#64748b",
                                fontSize: 12,
                            }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(36,78,209,0.04)" }} />
                        <Bar dataKey="time" radius={[8, 8, 0, 0]} maxBarSize={80}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
