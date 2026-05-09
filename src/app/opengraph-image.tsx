import { ImageResponse } from "next/og";

export const alt = "Approtic — We build software that thinks.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0F",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 300,
            background: "radial-gradient(ellipse, rgba(124,92,255,0.3), transparent 70%)",
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            borderRadius: "50%",
          }}
        />
        {/* Logo */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            background: "linear-gradient(135deg, #7C5CFF, #22D3EE)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Approtic
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#F5F5F7",
            fontWeight: 600,
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          We build software that thinks.
        </div>
        <div
          style={{
            fontSize: 18,
            color: "#8A8A93",
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          AI agents · Custom software · SaaS · Growth marketing
        </div>
        {/* URL badge */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 16,
            color: "#8A8A93",
          }}
        >
          approtic.in
        </div>
      </div>
    ),
    size
  );
}
