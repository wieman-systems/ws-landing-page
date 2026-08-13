"use client";

import Image from "next/image";
import SectionHead from "../SectionHead";
import Reveal from "../Reveal";
import ScrambleText from "../ScrambleText";
import BlueprintGrid from "../BlueprintGrid";

const SECTION_MASK =
  "linear-gradient(to bottom, transparent, #000 16%, #000 84%, transparent)";

const BEATS = [
  {
    id: "01",
    title: "Answers are data cards, not vibes",
    body: "Ask how revenue looks and it calls GET_REVENUE and GET_RECEIVABLES against your live Stripe before a word renders. The answer arrives pinned to a card of the real numbers — you watch it check.",
  },
  {
    id: "02",
    title: "It has hands",
    body: "Forty live tools across every module. It drafts the client email, files the todo, raises the invoice, probes the estate. You approve; it executes.",
  },
  {
    id: "03",
    title: "Next: it runs its own agents",
    body: "Shipping next: the Intelligence spawns its own agents to work while you're away — chase the late deposit, patch the failing header, report back when it's done.",
    soon: true,
  },
];

// A representative sample of the 40 live tools, verbatim style from the console.
const TOOLS = [
  "GET_REVENUE",
  "GET_RECEIVABLES",
  "GET_SPENDING",
  "PROBE_SYSTEMS",
  "CHECK_HEADERS",
  "SEARCH_INBOX",
  "DRAFT_EMAIL",
  "CREATE_TODO",
  "CREATE_INVOICE",
  "GET_CALENDAR",
  "GET_PIPELINE",
  "RUN_BRIEF",
];

/**
 * The Intelligence — the page's centerpiece, on the inverted surface. Copy
 * beats + a wall of tool chips that decode into view, beside the real chat
 * capture: reasoning, two tool calls, a live revenue card, the answer.
 */
export default function OsIntelligence() {
  return (
    <section
      style={{
        position: "relative",
        borderTop: "1px solid var(--bg-inverse)",
        overflow: "hidden",
        background: "var(--bg-inverse)",
        color: "var(--fg-inverse)",
      }}
    >
      <BlueprintGrid
        tone="inverse"
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
          index="03"
          label="The Intelligence"
          title="A copilot that checks the live numbers before it speaks."
          maxTitle={900}
          dark
        />

        <div className="os-intel-grid">
          <div>
            {BEATS.map((b, i) => (
              <Reveal key={b.id} delay={i * 0.06}>
                <div
                  style={{
                    borderTop: "1px solid rgba(var(--ink-inverse-rgb), 0.16)",
                    padding: "clamp(24px, 3.4vh, 34px) 0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 14,
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 12,
                        letterSpacing: "0.18em",
                        color: "rgba(var(--ink-inverse-rgb), 0.6)",
                      }}
                    >
                      <ScrambleText text={b.id} />
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-display), sans-serif",
                        fontWeight: 700,
                        fontSize: "clamp(19px, 2vw, 24px)",
                        letterSpacing: "-0.02em",
                        color: "var(--fg-inverse)",
                      }}
                    >
                      {b.title}
                    </h3>
                    {b.soon && (
                      <span
                        style={{
                          fontFamily: "var(--font-mono), monospace",
                          fontSize: 10,
                          letterSpacing: "0.18em",
                          padding: "4px 8px",
                          border: "1px solid rgba(var(--ink-inverse-rgb), 0.5)",
                          color: "rgba(var(--ink-inverse-rgb), 0.8)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        SOON
                      </span>
                    )}
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-display), sans-serif",
                      fontSize: 16,
                      lineHeight: 1.62,
                      color: "rgba(var(--ink-inverse-rgb), 0.72)",
                      maxWidth: 560,
                    }}
                  >
                    {b.body}
                  </p>
                </div>
              </Reveal>
            ))}

            {/* Tool wall */}
            <Reveal delay={0.1}>
              <div
                style={{
                  borderTop: "1px solid rgba(var(--ink-inverse-rgb), 0.16)",
                  paddingTop: "clamp(24px, 3.4vh, 34px)",
                }}
              >
                <div
                  className="eyebrow"
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    color: "rgba(var(--ink-inverse-rgb), 0.62)",
                    marginBottom: 18,
                  }}
                >
                  <ScrambleText text="40 LIVE TOOLS" />
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {TOOLS.map((t) => (
                    <span key={t} className="os-chip">
                      <ScrambleText text={t} />
                    </span>
                  ))}
                  <span className="os-chip" style={{ borderStyle: "solid" }}>
                    <ScrambleText text="+ 28 MORE" />
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* The real exchange */}
          <Reveal delay={0.09}>
            <div className="os-frame" style={{ aspectRatio: "9 / 16", borderColor: "var(--fg-inverse)", boxShadow: "8px 8px 0 rgba(var(--ink-inverse-rgb), 0.35)" }}>
              <Image
                src="/wieman-os/intelligence-chat.png"
                alt="An Intelligence conversation: asked 'how is my revenue looking', it shows its reasoning, calls GET_REVENUE and GET_RECEIVABLES, renders a live revenue card, then answers with the two invoices worth chasing."
                width={1080}
                height={1920}
                sizes="(max-width: 880px) 92vw, 460px"
                style={{ objectFit: "cover", objectPosition: "center top", height: "100%" }}
              />
            </div>
            <p
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 12,
                lineHeight: 1.7,
                letterSpacing: "0.02em",
                color: "rgba(var(--ink-inverse-rgb), 0.6)",
                maxWidth: 480,
                marginTop: 18,
              }}
            >
              A REAL EXCHANGE: REASONING, TWO TOOL CALLS, A LIVE REVENUE CARD,
              THEN THE ANSWER — WITH THE TWO INVOICES WORTH CHASING.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
