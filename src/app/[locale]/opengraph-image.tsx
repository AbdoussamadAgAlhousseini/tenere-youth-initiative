import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const alt = "Tenere Youth Initiative";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === "en";
  const tagline = isEn
    ? "Empowering young people of pastoralist and nomadic communities"
    : "Renforcer le pouvoir des jeunes des communautés pastorales et nomades";
  const motto = isEn ? siteConfig.motto.en : siteConfig.motto.fr;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(135deg, #F4EBDD 0%, #E9D8BF 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Brand mark + name */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              width: "88px",
              height: "88px",
              borderRadius: "22px",
              background: "#1D4E38",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Sun mark */}
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "9999px",
                background: "#B5651D",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{ fontSize: "40px", fontWeight: 700, color: "#1C1917" }}
            >
              Tenere
            </div>
            <div
              style={{
                fontSize: "20px",
                letterSpacing: "4px",
                color: "#734018",
                textTransform: "uppercase",
              }}
            >
              Youth Initiative
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "58px",
            fontWeight: 700,
            color: "#1C1917",
            lineHeight: 1.15,
            maxWidth: "1000px",
          }}
        >
          {tagline}
        </div>

        {/* Motto */}
        <div
          style={{
            fontSize: "26px",
            fontStyle: "italic",
            color: "#2E7D5B",
          }}
        >
          {motto}
        </div>
      </div>
    ),
    { ...size },
  );
}
