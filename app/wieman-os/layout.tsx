import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wieman OS — The Operating System for Your Business",
  description:
    "One console for your whole business: revenue, spending, inbox-extracted todos, calendar, clients, and every system you run — plus an AI copilot with 40 live tools that answers with real data. Free trial, no card.",
  // The root layout canonicalizes to the homepage; this page must claim its
  // own URL (on the www host, matching metadataBase) or search engines fold
  // it into "/".
  alternates: { canonical: "https://www.wiemansystems.com/wieman-os" },
  openGraph: {
    title: "Wieman OS — The Operating System for Your Business",
    description:
      "Every live number in one console, with an intelligence that works it for you. Built by Wieman Systems — we run our business on it every day.",
    url: "https://www.wiemansystems.com/wieman-os",
    siteName: "Wieman Systems",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wieman OS — The Operating System for Your Business",
    description:
      "Every live number in one console, with an intelligence that works it for you. Free trial, no card.",
  },
};

// Product structured data. Founding pricing — confirmed 2026-08-13. Still
// deliberately no `offers`: asserting prices in structured data is a separate
// commitment (search engines surface and cache them) Caleb hasn't made.
const PRODUCT_JSONLD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Wieman OS",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://www.wiemansystems.com/wieman-os",
  description:
    "A single operating console for a small business: revenue, spending, inbox-extracted action items, todos, calendar, client pipeline, and live system monitoring, with an AI copilot grounded in the business's real data.",
  publisher: {
    "@type": "Organization",
    name: "Wieman Systems",
    url: "https://www.wiemansystems.com",
  },
};

export default function WiemanOsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_JSONLD) }}
      />
      {children}
    </>
  );
}
