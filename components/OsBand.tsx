"use client";

import Reveal from "./Reveal";
import ScrambleText from "./ScrambleText";
import BlueprintGrid from "./BlueprintGrid";
import MagneticLink from "./MagneticLink";
import Plus from "./Plus";
import { TRIAL_URL } from "@/lib/product";

const SECTION_MASK =
  "linear-gradient(to bottom, transparent, #000 16%, #000 84%, transparent)";

const PROOF = ["One console", "The Intelligence", "Your modules only"];

/**
 * Compact Wieman OS product band on the homepage — sits between the hero and
 * WhatWeDo. Deliberately unnumbered: the 01–04 section indices are a sequence
 * and this band lives outside it. One strong CTA to /wieman-os plus a quiet
 * trial link; the apply funnel is reached from the product page, not here.
 */
export default function OsBand() {
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
          padding: "clamp(56px, 8vh, 96px) var(--gutter)",
        }}
      >
        <Reveal>
          <div
            className="eyebrow"
            style={{
              fontFamily: "var(--font-mono), monospace",
              marginBottom: 20,
            }}
          >
            <Plus size={12} color="var(--fg)" opacity={0.55} />
            <ScrambleText text="Wieman OS" style={{ color: "var(--fg)", fontWeight: 700 }} />
            <span
              style={{
                width: 22,
                height: 1,
                background: "var(--fg)",
                opacity: 0.35,
                display: "inline-block",
              }}
            />
            <ScrambleText text="Our product" />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 46px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--fg)",
              textWrap: "balance" as never,
              maxWidth: 760,
            }}
          >
            We productized our own operating system.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: 16,
              lineHeight: 1.62,
              color: "rgba(var(--ink-rgb), 0.72)",
              maxWidth: 520,
              marginTop: 18,
            }}
          >
            The console we run Wieman Systems on — revenue, inbox, todos,
            calendar, clients — installed on your business.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(14px, 2.4vw, 28px)",
              flexWrap: "wrap",
              marginTop: "clamp(26px, 4vh, 36px)",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--text-eyebrow)",
            }}
          >
            {PROOF.map((p, i) => (
              <span
                key={p}
                style={{ display: "inline-flex", alignItems: "center", gap: "clamp(14px, 2.4vw, 28px)" }}
              >
                {i > 0 && <Plus size={10} color="var(--fg)" opacity={0.4} />}
                <ScrambleText text={p} />
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
              flexWrap: "wrap",
              marginTop: "clamp(30px, 4.5vh, 42px)",
            }}
          >
            <MagneticLink
              variant="outline-dark"
              href="/wieman-os"
              style={{ letterSpacing: "0.16em" }}
            >
              See Wieman OS
              <span style={{ fontSize: 16, lineHeight: 1 }}>&rarr;</span>
            </MagneticLink>
            <a
              href={TRIAL_URL}
              data-cursor
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 13,
                letterSpacing: "0.04em",
                color: "rgba(var(--ink-rgb), 0.66)",
                textDecoration: "underline",
                textUnderlineOffset: 4,
                padding: 4,
              }}
            >
              or start the free trial
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
