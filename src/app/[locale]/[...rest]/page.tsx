import { notFound } from "next/navigation";

// Any URL under a locale that matches no specific route falls here and renders
// the localized, styled not-found page (inside the site chrome).
export default function CatchAllNotFound() {
  notFound();
}
