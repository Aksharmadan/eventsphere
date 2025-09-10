import React from "react";

export default function Home() {
  return (
    <div style={{ padding: "20px 0" }}>
      {/* Hero section */}
      <section style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        background: "linear-gradient(90deg, #fce7f3, #ede9fe)",
        padding: "40px 32px",
        borderRadius: 18,
        boxShadow: "0 12px 28px rgba(0,0,0,0.05)",
        marginBottom: 48
      }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.2, margin: 0, color: "#111827" }}>
            Discover amazing campus events 🎉
          </h1>
          <p style={{ marginTop: 14, fontSize: 18, color: "#374151", maxWidth: 500 }}>
            Explore tech talks, cultural fests, sports days — register in one click.
          </p>

          <div style={{ marginTop: 22, display: "flex", gap: 14 }}>
            <a href="/signup" style={{
              background: "#facc15",
              color: "#422006",
              padding: "12px 18px",
              borderRadius: 10,
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
            }}>Get started</a>
            <a href="/dashboard" style={{
              background: "#fff",
              color: "#6d28d9",
              padding: "12px 18px",
              borderRadius: 10,
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
            }}>Browse events</a>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <img
            alt="students at event"
            src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&q=60"
            style={{
              width: "100%",
              maxWidth: 420,
              borderRadius: 14,
              objectFit: "cover",
              boxShadow: "0 12px 24px rgba(0,0,0,0.12)"
            }}
          />
        </div>
      </section>

      {/* Event categories */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20, color: "#111827" }}>Popular categories</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))",
          gap: 22
        }}>
          {[
            {
              title: "🎤 Tech Events",
              desc: "Hackathons, workshops, and guest lectures.",
              img: "https://source.unsplash.com/800x600/?technology,conference"
            },
            {
              title: "🎭 Cultural Fest",
              desc: "Music, dance, drama and endless fun activities.",
              img: "https://source.unsplash.com/800x600/?festival,culture"
            },
            {
              title: "🏆 Sports Meets",
              desc: "Athletics, football, cricket, basketball & more.",
              img: "https://source.unsplash.com/800x600/?sports,stadium"
            }
          ].map((c) => (
            <div key={c.title} style={{
              background: "#fff",
              borderRadius: 14,
              boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column"
            }}>
              <img src={c.img} alt={c.title} style={{ width: "100%", height: 160, objectFit: "cover" }} />
              <div style={{ padding: 16 }}>
                <h3 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 700 }}>{c.title}</h3>
                <p style={{ margin: 0, color: "#4b5563" }}>{c.desc}</p>
                <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#6b7280", fontSize: 14 }}>34 attending</span>
                  <a href="/events" style={{
                    background: "#fef3c7",
                    color: "#92400e",
                    padding: "8px 12px",
                    borderRadius: 8,
                    fontWeight: 700,
                    textDecoration: "none"
                  }}>View</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA bottom */}
      <section style={{
        background: "linear-gradient(90deg,#ecfccb,#d9f99d)",
        padding: "32px 28px",
        borderRadius: 16,
        textAlign: "center",
        boxShadow: "0 8px 22px rgba(0,0,0,0.06)"
      }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 10 }}>Ready to experience your campus like never before?</h2>
        <p style={{ fontSize: 16, color: "#374151", marginBottom: 18 }}>Join thousands of students discovering, hosting and enjoying events.</p>
        <a href="/signup" style={{
          background: "#f472b6",
          color: "#fff",
          padding: "12px 20px",
          borderRadius: 10,
          fontWeight: 700,
          textDecoration: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,0.10)"
        }}>🚀 Join Now</a>
      </section>
    </div>
  );
}
