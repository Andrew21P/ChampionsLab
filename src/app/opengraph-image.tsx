import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Champions Lab - Pokémon Champions 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #0c4a6e 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              display: "flex",
            }}
          >
            ⚡
          </div>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              background: "linear-gradient(90deg, #a78bfa, #22d3ee)",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: "-2px",
            }}
          >
            Champions Lab
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "rgba(255,255,255,0.7)",
              fontWeight: 500,
            }}
          >
            Pokémon Champions 2026
          </div>
          <div
            style={{
              display: "flex",
              gap: "24px",
              marginTop: "24px",
            }}
          >
            {["Team Builder", "META Analysis", "Battle Bot", "PokéSchool"].map(
              (label) => (
                <div
                  key={label}
                  style={{
                    padding: "8px 20px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  {label}
                </div>
              )
            )}
          </div>
          <div
            style={{
              marginTop: "32px",
              fontSize: "18px",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            championslab.xyz
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
