import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Wieman Systems",
  description:
    "How Wieman Systems LLC handles personal information and client data. Your data stays in your own accounts; we never sell it or train AI models on it.",
  // The root layout canonicalizes to the homepage; this page must claim its
  // own URL (on the www host, matching metadataBase) or search engines fold
  // it into "/".
  alternates: { canonical: "https://www.wiemansystems.com/privacy" },
  openGraph: {
    title: "Privacy Policy — Wieman Systems",
    description:
      "How Wieman Systems LLC handles personal information and client data.",
    url: "https://www.wiemansystems.com/privacy",
    siteName: "Wieman Systems",
    type: "website",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
