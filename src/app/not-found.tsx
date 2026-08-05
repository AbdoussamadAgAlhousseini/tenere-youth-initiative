import Link from "next/link";

// Global fallback for unmatched, non-localized paths.
export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          gap: "1rem",
        }}
      >
        <h1 style={{ fontSize: "2rem" }}>404 — Page not found</h1>
        <Link href="/" style={{ color: "#2E7D5B" }}>
          ← Home
        </Link>
      </body>
    </html>
  );
}
