"use client";

import SectionHead from "../SectionHead";
import Reveal from "../Reveal";
import ScrambleText from "../ScrambleText";
import BlueprintGrid from "../BlueprintGrid";
import MagneticLink from "../MagneticLink";

const SECTION_MASK =
  "linear-gradient(to bottom, transparent, #000 16%, #000 84%, transparent)";

const STEPS = [
  {
    id: "01",
    title: "Open the sandbox",
    body: "try.wiemansystems.com is a full console preloaded with a synthetic business. No card, no call, nothing to install — it opens in the browser you're in now.",
  },
  {
    id: "02",
    title: "Ask it something hard",
    body: "“Who hasn't paid?” “What should I do today?” Watch the Intelligence reason, call its tools, and come back with the data cards.",
  },
  {
    id: "03",
    title: "Make it yours",
    body: "When you want it on your real numbers, we connect your systems and hand you the keys. If you walk away, the sandbox just expires — nothing to cancel.",
  },
];

interface OsTrialProps {
  trialUrl: string;
}

/** How the trial works: three steps, five minutes, zero commitment. */
export default function OsTrial({ trialUrl }: OsTrialProps) {
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
        <SectionHead
          index="05"
          label="The free trial"
          title="Five minutes to the aha."
          maxTitle={760}
        />

        <div className="proc-grid">
          {STEPS.map((s, i) => (
            <Reveal className="proc-step" key={s.id} delay={i * 0.09}>
              <div
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 12,
                  letterSpacing: "0.18em",
                  color: "var(--text-muted)",
                  marginBottom: 24,
                }}
              >
                <ScrambleText text={s.id} />
              </div>
              <h3
                className="wd-title"
                style={{ marginBottom: 16, fontFamily: "var(--font-display), sans-serif" }}
              >
                <ScrambleText text={s.title} />
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: 16,
                  lineHeight: 1.62,
                  color: "rgba(var(--ink-rgb), 0.72)",
                  maxWidth: 340,
                }}
              >
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(18px, 3vw, 30px)",
              flexWrap: "wrap",
              marginTop: "clamp(44px, 7vh, 64px)",
            }}
          >
            <MagneticLink variant="solid-dark" href={trialUrl} style={{ letterSpacing: "0.16em" }}>
              Start the free trial
              <span style={{ fontSize: 16, lineHeight: 1 }}>&rarr;</span>
            </MagneticLink>
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.14em",
                color: "var(--text-eyebrow)",
              }}
            >
              <ScrambleText text="NO CARD · SYNTHETIC DATA · EXPIRES ON ITS OWN" />
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
