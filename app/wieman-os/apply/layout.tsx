import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply for a Guided Install — Wieman OS",
  description:
    "Guided and Partner tiers of Wieman OS are installed with you — or run entirely for you. Founding slots are limited; tell us what you run today and we reply within 24 hours.",
  // The root layout canonicalizes to the homepage; this page must claim its
  // own URL (on the www host, matching metadataBase) or search engines fold
  // it into "/".
  alternates: { canonical: "https://www.wiemansystems.com/wieman-os/apply" },
  openGraph: {
    title: "Apply for a Guided Install — Wieman OS",
    description:
      "Guided and Partner installs are done with you, one on one — limited founding slots. Tell us what you run today.",
    url: "https://www.wiemansystems.com/wieman-os/apply",
    siteName: "Wieman Systems",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply for a Guided Install — Wieman OS",
    description:
      "Guided and Partner installs are done with you, one on one — limited founding slots.",
  },
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
