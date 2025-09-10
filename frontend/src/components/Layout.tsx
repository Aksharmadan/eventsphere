import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ padding: 20 }}>
        <NavBar />
        <div style={{ marginTop: 6 }}>{children}</div>
        <Footer />
      </div>
    </div>
  );
}
