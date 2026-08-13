"use client";

import { useRef, useState } from "react";
import SectionHead from "../SectionHead";
import Reveal from "../Reveal";
import BlueprintGrid from "../BlueprintGrid";
import CaliperGauge from "../faq/CaliperGauge";

const SECTION_MASK =
  "linear-gradient(to bottom, transparent, #000 16%, #000 84%, transparent)";

const faqs = [
  {
    q: "Where does my data live, and who can see it?",
    a: "Your data stays in your own accounts — Stripe, your bank, your inbox. The console connects with the narrowest keys each service allows (Stripe is read-only, for example) and runs as its own locked-down deployment for your business, not a shared pool. We don't resell your data or train models on it.",
  },
  {
    q: "What can it connect to?",
    a: "Out of the box: Stripe, business bank feeds, Gmail or Outlook, Google Calendar, and the hosting behind your sites and apps. Client pipelines, invoicing, and todos live in the console itself. If your business runs on something else, that becomes a module — see customization above.",
  },
  {
    q: "Whose AI keys does the Intelligence use?",
    a: "Ours, included in the subscription — you never manage a token or an AI bill. If your policies require your own provider agreement, bring your own key and the console uses it instead.",
  },
  {
    q: "Can I self-host it?",
    a: "The standard model is that we host, monitor, and keep improving it — that's what the monthly covers. If your business requires on-premise or self-hosted deployment, that's a custom build we can scope; ask on a call.",
  },
  {
    q: "What happens when the trial ends?",
    a: "Nothing dramatic. The sandbox is synthetic data on a shared preview, so it simply expires — there's no card on file and nothing to cancel. Going live is a deliberate step: we scope your modules, connect your accounts, and hand you your own console.",
  },
  {
    q: "Do I need to be technical?",
    a: "No. If you can read a dashboard and reply to a chat message, you can run Wieman OS. The Intelligence is the interface — ask it in plain language and it does the systems work underneath.",
  },
];

/** Product FAQ, measured by the house caliper on desktop. */
export default function OsFaq() {
  const [active, setActive] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  return (
    <section
      style={{ position: "relative", borderTop: "1px solid var(--fg)", overflow: "hidden" }}
    >
      <BlueprintGrid
        opacity={0.05}
        unit={52}
        fade={false}
        style={{ maskImage: SECTION_MASK, WebkitMaskImage: SECTION_MASK }}
      />
      <div
        className="ws-wrap"
        style={{
          position: "relative",
          zIndex: 1,
          padding: "clamp(72px, 11vh, 128px) var(--gutter)",
        }}
      >
        <SectionHead index="07" label="FAQ" title="The fine print, out loud." />

        <div className="faq-grid">
          <div className="faq-list">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05}>
                <div
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive((a) => (a === i ? null : a))}
                  style={{
                    borderTop: "1px solid rgba(var(--ink-rgb), 0.12)",
                    padding: "clamp(22px, 3vh, 30px) 0",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-display), sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(18px, 1.9vw, 23px)",
                      letterSpacing: "-0.02em",
                      marginBottom: 12,
                      color: "var(--fg)",
                    }}
                  >
                    {f.q}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-display), sans-serif",
                      fontSize: 16,
                      lineHeight: 1.62,
                      color: "rgba(var(--ink-rgb), 0.72)",
                      maxWidth: 620,
                      margin: 0,
                    }}
                  >
                    {f.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* The house caliper measures whichever question you hover. */}
          <div className="faq-aside" aria-hidden>
            <CaliperGauge activeIndex={active} itemsRef={itemRefs} count={faqs.length} />
          </div>
        </div>
      </div>
    </section>
  );
}
