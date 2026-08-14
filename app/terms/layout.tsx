import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Wieman Systems",
  description:
    "The terms that govern use of the Wieman Systems website. Timelines and pricing shown are estimates; each engagement is governed by a separate signed services agreement.",
  // The root layout canonicalizes to the homepage; this page must claim its
  // own URL (on the www host, matching metadataBase) or search engines fold
  // it into "/".
  alternates: { canonical: "https://www.wiemansystems.com/terms" },
  openGraph: {
    title: "Terms of Service — Wieman Systems",
    description:
      "The terms that govern use of the Wieman Systems website.",
    url: "https://www.wiemansystems.com/terms",
    siteName: "Wieman Systems",
    type: "website",
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
