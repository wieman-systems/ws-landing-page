"use client";

import Link from "next/link";
import SectionHead from "../SectionHead";
import Reveal from "../Reveal";
import ScrambleText from "../ScrambleText";
import BlueprintGrid from "../BlueprintGrid";
import MagneticLink from "../MagneticLink";

const SECTION_MASK =
  "linear-gradient(to bottom, transparent, #000 16%, #000 84%, transparent)";

// Founding pricing — confirmed 2026-08-13.
// Install $2,000 + $199/mo · Guided $3,500 + $299/mo · Partner $6,000 + $499/mo,
// on the studio's build-then-monthly model.
const TIERS = [
  {
    name: "Install",
    tagline: "Wieman OS on your stack",
    setup: "$2,000",
    monthly: "$199",
    features: [
      "The full console, installed and configured",
      "Revenue, spending, inbox, todos, calendar",
      "The Intelligence with every tool",
      "Modules picked to fit your business",
      "Your systems monitored daily",
    ],
  },
  {
    name: "Guided",
    tagline: "Installed with you, one on one",
    setup: "$3,500",
    monthly: "$299",
    featured: true,
    apply: true,
    features: [
      "Everything in Install",
      "One-on-one setup sessions on your data",
      "A personal walkthrough of every module",
      "30 days of hands-on tuning",
      "Same-day support from the builder",
    ],
  },
  {
    name: "Partner",
    tagline: "We run the whole install",
    setup: "$6,000",
    monthly: "$499",
    apply: true,
    features: [
      "Everything in Guided",
      "Onboarding run end-to-end for you",
      "Custom modules built for your workflow",
      "Agents as they ship — first in line",
      "A quarterly working session with Caleb",
    ],
  },
];

interface OsPricingProps {
  trialUrl: string;
}

/** Founding pricing: three tiers on the setup + monthly structure. */
export default function OsPricing({ trialUrl }: OsPricingProps) {
  return (
    <section
      id="pricing"
      style={{ position: "relative", borderTop: "1px solid var(--fg)", overflow: "hidden", scrollMarginTop: 74 }}
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
          index="06"
          label="Founding pricing"
          title="One build, then it just runs."
          maxTitle={760}
        />

        <Reveal>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              border: "1px solid var(--fg)",
              padding: "8px 14px",
              marginBottom: "clamp(32px, 5vh, 44px)",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.16em",
              color: "var(--fg)",
            }}
          >
            <ScrambleText text="FOUNDING PRICING — LOCKS FOR THE LIFE OF YOUR SUBSCRIPTION" />
          </div>
        </Reveal>

        <div className="os-price-grid">
          {TIERS.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 0.09}
              className={`os-price-card${t.featured ? " os-price-card--featured" : ""}`}
            >
              {t.featured && (
                <span
                  style={{
                    position: "absolute",
                    top: -1,
                    right: 18,
                    transform: "translateY(-50%)",
                    background: "var(--fg)",
                    color: "var(--bg)",
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    padding: "5px 10px",
                  }}
                >
                  MOST BUSINESSES
                </span>
              )}
              <h3 className="wd-title" style={{ fontFamily: "var(--font-display), sans-serif" }}>
                <ScrambleText text={t.name} />
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 12,
                  letterSpacing: "0.04em",
                  color: "var(--text-muted)",
                  margin: "10px 0 26px",
                }}
              >
                {t.tagline}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 8,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(30px, 3vw, 38px)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {t.setup}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 12,
                    letterSpacing: "0.1em",
                    color: "var(--text-muted)",
                  }}
                >
                  SETUP
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 8,
                  marginTop: 6,
                  marginBottom: 26,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(20px, 2vw, 24px)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t.monthly}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 12,
                    letterSpacing: "0.1em",
                    color: "var(--text-muted)",
                  }}
                >
                  / MONTH, RUN FOR YOU
                </span>
              </div>
              <ul style={{ listStyle: "none", margin: "0 0 30px", padding: 0, flex: 1 }}>
                {t.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "baseline",
                      padding: "9px 0",
                      borderTop: "1px solid var(--border-soft)",
                      fontFamily: "var(--font-display), sans-serif",
                      fontSize: 15,
                      lineHeight: 1.5,
                      color: "rgba(var(--ink-rgb), 0.78)",
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 11,
                        color: "var(--text-muted)",
                      }}
                    >
                      +
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 14,
                }}
              >
                <MagneticLink
                  variant={t.featured ? "solid-dark" : "outline-dark"}
                  href={trialUrl}
                  style={{ padding: "13px 24px", fontSize: 12 }}
                >
                  Start the free trial
                </MagneticLink>
                {/* Guided + Partner are installed with/for you → apply funnel. */}
                {t.apply && (
                  <Link
                    href={`/wieman-os/apply?tier=${t.name.toLowerCase()}`}
                    data-cursor
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 12,
                      letterSpacing: "0.04em",
                      color: "rgba(var(--ink-rgb), 0.66)",
                      textDecoration: "underline",
                      textUnderlineOffset: 4,
                    }}
                  >
                    or apply for this install &rarr;
                  </Link>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <p
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 12,
              lineHeight: 1.7,
              letterSpacing: "0.02em",
              color: "var(--text-muted)",
              maxWidth: 640,
              marginTop: "clamp(32px, 5vh, 44px)",
            }}
          >
            EVERY TIER BEGINS WITH THE SAME FREE TRIAL. PRICES LOCK WHEN YOU
            SIGN, NOT WHEN WE GROW.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
