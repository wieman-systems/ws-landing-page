import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Wieman Systems",
  description:
    "Wieman Systems is one builder making cutting-edge automation systems for businesses. Your data stays in your accounts, and you work directly with the person building it.",
  // The root layout canonicalizes to the homepage; this page must claim its
  // own URL (on the www host, matching metadataBase) or search engines fold
  // it into "/".
  alternates: { canonical: "https://www.wiemansystems.com/about" },
  openGraph: {
    title: "About — Wieman Systems",
    description:
      "One builder, working at the frontier — turning a business's busywork into systems that run themselves.",
    url: "https://www.wiemansystems.com/about",
    siteName: "Wieman Systems",
    type: "website",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
