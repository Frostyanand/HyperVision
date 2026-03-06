"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* SVG Logo Mark — a custom prism/bolt shape */
function LogoMark() {
    return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 8L14 2L24 8V20L14 26L4 20V8Z" fill="#244ED1" />
            <path d="M14 2L24 8V20L14 14V2Z" fill="#3b63e0" />
            <path d="M15.5 10L12 15.5H15L13.5 21L19 14H15.5L17 10H15.5Z" fill="#FF6600" />
        </svg>
    );
}

export default function Navbar() {
    const pathname = usePathname();
    const links = [
        { label: "Home", path: "/" },
        { label: "Process", path: "/process" },
        { label: "Raw Compute", path: "/matrix" },
        { label: "About", path: "/about" },
    ];

    return (
        <header style={{
            position: "sticky", top: 0, zIndex: 100,
            background: "rgba(243, 246, 251, 0.82)",
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid #e8ecf4",
            height: 56,
        }}>
            <div style={{
                maxWidth: 1120, margin: "0 auto", padding: "0 32px",
                height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                {/* Logo */}
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <LogoMark />
                    <span style={{
                        fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 17,
                        color: "#0f172a", letterSpacing: "-0.01em",
                    }}>HyperVision</span>
                </Link>

                {/* Nav Links */}
                <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
                    {links.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link key={item.path} href={item.path} style={{
                                fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14,
                                color: isActive ? "#244ED1" : "#64748b",
                                position: "relative", paddingBottom: 2,
                                transition: "color 0.2s ease",
                                borderBottom: isActive ? "1.5px solid #244ED1" : "1.5px solid transparent",
                            }}>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* CTA */}
                <Link href="/process" style={{
                    padding: "8px 20px", borderRadius: 7,
                    background: "#FF6600", color: "#fff",
                    fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13,
                    transition: "background 0.2s ease",
                }}>
                    Get Started
                </Link>
            </div>
        </header>
    );
}
