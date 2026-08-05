import type { ReactNode } from "react";
import "./globals.css";

// The locale layout renders <html>; this root layout is a passthrough
// required by Next.js App Router.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
