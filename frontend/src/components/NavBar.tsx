import React from "react";

export default function NavBar() {
  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "18px 28px",
      background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
      borderRadius: 12,
      boxShadow: "0 6px 18px rgba(2,6,23,0.06)",
      marginBottom: 18
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 54, height: 54, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
          background: "linear-gradient(135deg,#ffffff20,#ffffff08)", boxShadow: "0 6px 16px rgba(0,0,0,0.06)"
        }}>
          🎪
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#0f172a" }}>EventSphere</div>
      </div>

      <nav style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <a href="/" style={{ color: "#3f3f46", textDecoration: "none", fontWeight: 600 }}>Home</a>
        <a href="/dashboard" style={{ color: "#3f3f46", textDecoration: "none", fontWeight: 600 }}>Dashboard</a>
        <a href="/events" style={{ color: "#3f3f46", textDecoration: "none", fontWeight: 600 }}>Events</a>
        <a href="/login" style={{ color: "#3f3f46", textDecoration: "none", fontWeight: 600 }}>Login</a>
        <a href="/signup" style={{
          padding: "8px 12px",
          borderRadius: 10,
          background: "#fee2e2",
          color: "#7f1d1d",
          textDecoration: "none",
          fontWeight: 800
        }}>Sign up</a>
      </nav>
    </header>
  );
}
