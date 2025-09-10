import React, { useState } from "react";

export default function Dashboard() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");

  const events = [
    { id: 1, title: "Tech Conference", date: "2025-09-15", category: "Tech", attendees: 34, img: "https://source.unsplash.com/600x400/?conference,tech" },
    { id: 2, title: "Cultural Fest", date: "2025-09-20", category: "Cultural", attendees: 128, img: "https://source.unsplash.com/600x400/?festival,music" },
    { id: 3, title: "Sports Meet", date: "2025-09-25", category: "Sports", attendees: 56, img: "https://source.unsplash.com/600x400/?sports,cricket" },
  ];

  const filtered = events.filter(e =>
    e.title.toLowerCase().includes(q.toLowerCase()) &&
    (cat ? e.category === cat : true)
  );

  return (
    <div style={{ padding: 32, background: "#f9fafb", minHeight: "100vh" }}>
      <h2 style={{ fontSize: 34, fontWeight: 800, marginBottom: 20 }}>📋 Organizer Dashboard</h2>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search events..."
          style={{ padding: 10, border: "1px solid #e2e8f0", borderRadius: 10, flex: "0 0 250px" }}
        />
        <select value={cat} onChange={(e) => setCat(e.target.value)}
          style={{ padding: 10, border: "1px solid #e2e8f0", borderRadius: 10 }}>
          <option value="">All categories</option>
          <option>Tech</option>
          <option>Cultural</option>
          <option>Sports</option>
        </select>
        <button style={{
          marginLeft: "auto", background: "#a78bfa", color: "#fff",
          padding: "10px 16px", borderRadius: 10, border: "none", fontWeight: 700, cursor: "pointer"
        }}>+ Create Event</button>
      </div>

      {/* Event cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
        {filtered.map(ev => (
          <div key={ev.id} style={{
            background: "#fff", borderRadius: 14, boxShadow: "0 8px 24px rgba(0,0,0,0.06)", overflow: "hidden"
          }}>
            <img src={ev.img} alt={ev.title} style={{ width: "100%", height: 160, objectFit: "cover" }} />
            <div style={{ padding: 16 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700 }}>{ev.title}</h3>
              <p style={{ margin: "6px 0", color: "#6b7280" }}>{ev.date} • {ev.category}</p>
              <p style={{ margin: "6px 0", fontSize: 14, color: "#374151" }}>{ev.attendees} students registered</p>
              <button style={{
                marginTop: 12, padding: "8px 12px", background: "#fcd34d", border: "none",
                borderRadius: 10, fontWeight: 700, cursor: "pointer", color: "#7c2d12"
              }}>View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
