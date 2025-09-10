import React from "react";

export default function Footer() {
  return (
    <footer style={{
      marginTop: 36,
      padding: "24px 28px",
      borderRadius: 12,
      background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
      boxShadow: "0 8px 30px rgba(2,6,23,0.03)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div style={{ color: "#374151" }}>
        <strong>EventSphere</strong> — built with ❤️. Demo project.
      </div>

      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <a href="#" style={{ color: "#374151", textDecoration: "none" }}>Privacy</a>
        <a href="#" style={{ color: "#374151", textDecoration: "none" }}>Terms</a>
        <small style={{ color: "#6b7280" }}>© {new Date().getFullYear()}</small>
      </div>
    </footer>
  );
}
