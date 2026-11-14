import { ImageResponse } from "next/og";
import { siteContent as site } from "@/lib/content";

export const alt = `${site.name}: ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#0b0d12",
        color: "#f4f5f7",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, color: "#5eead4" }}
      >
        <div style={{ width: 14, height: 14, borderRadius: 14, background: "#5eead4" }} />
        {site.status}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3, color: "#5eead4" }}>
          {site.name}
        </div>
        <div style={{ fontSize: 48, marginTop: 12, lineHeight: 1.2, maxWidth: 980 }}>
          {site.headline}
        </div>
      </div>
      <div style={{ display: "flex", gap: 28, fontSize: 28, color: "#9aa3b2" }}>
        <span>Spring Boot</span>
        <span>Kafka</span>
        <span>Angular / React</span>
        <span>AWS · Kubernetes</span>
      </div>
    </div>,
    size,
  );
}
