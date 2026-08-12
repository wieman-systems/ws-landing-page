"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ClosingBlock from "@/components/ClosingBlock";
import BookModal from "@/components/BookModal";
import CustomCursor from "@/components/CustomCursor";
import OsHero from "@/components/wieman-os/OsHero";
import OsShift from "@/components/wieman-os/OsShift";
import OsTour from "@/components/wieman-os/OsTour";
import OsIntelligence from "@/components/wieman-os/OsIntelligence";
import OsCustomize from "@/components/wieman-os/OsCustomize";
import OsTrial from "@/components/wieman-os/OsTrial";
import OsPricing from "@/components/wieman-os/OsPricing";
import OsFaq from "@/components/wieman-os/OsFaq";

// The single source of truth for the trial funnel. Always a plain link-out —
// never an iframe or a cross-origin fetch; the site's CSP stays strict.
const TRIAL_URL = "https://try.wiemansystems.com";

export default function WiemanOs() {
  const [modalOpen, setModalOpen] = useState(false);
  const onBook = () => setModalOpen(true);

  return (
    <>
      <CustomCursor hidden={modalOpen} />
      <Header
        onBook={onBook}
        cta={{ label: "Start free trial", shortLabel: "Trial", href: TRIAL_URL }}
      />
      <main>
        <OsHero trialUrl={TRIAL_URL} onBook={onBook} />
        <OsShift />
        <OsTour />
        <OsIntelligence />
        <OsCustomize />
        <OsTrial trialUrl={TRIAL_URL} />
        <OsPricing trialUrl={TRIAL_URL} />
        <OsFaq />
        <ClosingBlock
          onBook={onBook}
          eyebrow="Wieman OS"
          title="Run your whole business from one screen."
          cta={{ label: "Start the free trial", href: TRIAL_URL }}
        />
      </main>
      <BookModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
