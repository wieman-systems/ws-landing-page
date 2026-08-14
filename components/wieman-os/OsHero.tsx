"use client";

import { useRef } from "react";
import InteractiveBrandGrid from "../InteractiveBrandGrid";
import MagneticLink from "../MagneticLink";
import ScrambleText from "../ScrambleText";
import Plus from "../Plus";

interface OsHeroProps {
  trialUrl: string;
  onBook: () => void;
}

/**
 * Wieman OS hero. The headline decodes with the house scramble — the same
 * effect the OS itself uses — instead of the homepage's line-mask reveal,
 * so the page opens the way the product feels.
 */
export default function OsHero({ trialUrl, onBook }: OsHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={heroRef}
      id="top"
      className="hero-shell"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--bg)",
        color: "var(--fg)",
        borderBottom: "1px solid var(--fg)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Pitch band — the grid lives here, so its skyline baseline lands on
          the credibility strip's top border instead of running through it. */}
      <div
        style={{
          position: "relative",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* The skyline ends 20px ABOVE the strip — clear ground between the
            lowest grid line and the strip's border, so the strip reads as
            sitting under the grid, never laid over its bottom edge. */}
        <InteractiveBrandGrid
          tone="primary"
          height="calc(100% - 20px)"
          opacity={1}
          unit={20}
          offsetX={0}
          fragRate={0.044}
          rightBias={1}
          interactive
          drawIn
          clearTargets={[
            { ref: headingRef, padX: 6, padTop: 2, padBottom: 4, mp: 6 },
            { ref: leadRef, padX: 14, padTop: 8, padBottom: 10 },
            { ref: ctaRef, padX: 10, padTop: 8, padBottom: 8 },
          ]}
        />

        <div
          className="ws-wrap"
          style={{
            position: "relative",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingTop: "clamp(40px, 7vh, 96px)",
            paddingBottom: "clamp(28px, 4vh, 48px)",
          }}
        >
          <div
            className="eyebrow"
            style={{
              fontFamily: "var(--font-mono), monospace",
              marginBottom: "clamp(20px, 3vh, 30px)",
            }}
          >
            <Plus size={12} color="var(--fg)" opacity={0.55} />
            <ScrambleText text="WIEMAN OS" style={{ color: "var(--fg)", fontWeight: 700 }} />
            <span
              style={{ width: 22, height: 1, background: "var(--fg)", opacity: 0.35, display: "inline-block" }}
            />
            <ScrambleText text="One console. Every number." />
          </div>

          <h1
            ref={headingRef}
            className="hero-h1"
            style={{ maxWidth: 1080, margin: 0, fontFamily: "var(--font-display), sans-serif" }}
          >
            <span className="hl">
              <ScrambleText text="The operating " trigger="load" duration={820} />
              <strong>
                <ScrambleText text="system" trigger="load" duration={820} />
              </strong>
            </span>
            <span className="hl">
              <ScrambleText text="for your " trigger="load" duration={1100} />
              <strong>
                <ScrambleText text="business." trigger="load" duration={1100} />
              </strong>
            </span>
          </h1>

          <div
            style={{
              width: 48,
              height: 2,
              background: "var(--fg)",
              margin: "clamp(26px,3.6vh,38px) 0 clamp(22px,3vh,30px)",
            }}
          />

          <p
            ref={leadRef}
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "clamp(16px, 1.4vw, 19px)",
              lineHeight: 1.55,
              color: "rgba(var(--ink-rgb), 0.72)",
              maxWidth: 460,
              marginBottom: "clamp(32px,4.5vh,44px)",
            }}
          >
            Revenue, spending, inbox, todos, calendar, clients, and every system
            you run — one live console, with an intelligence that works it for you.
          </p>

          <div
            ref={ctaRef}
            style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}
          >
            <MagneticLink variant="outline-dark" href={trialUrl} style={{ letterSpacing: "0.16em" }}>
              Start the free trial
              <span style={{ fontSize: 16, lineHeight: 1 }}>&rarr;</span>
            </MagneticLink>
            <button
              onClick={onBook}
              data-cursor
              style={{
                background: "none",
                border: "none",
                fontFamily: "var(--font-mono), monospace",
                fontSize: 13,
                letterSpacing: "0.04em",
                color: "rgba(var(--ink-rgb), 0.66)",
                textDecoration: "underline",
                textUnderlineOffset: 4,
                padding: 4,
              }}
            >
              or book a call
            </button>
          </div>
        </div>
      </div>

      {/* Credibility strip — the trust line the whole page rests on. Sits below
          the grid band on an opaque surface so no lattice can run through it. */}
      <div
        style={{
          position: "relative",
          background: "var(--bg)",
          borderTop: "1px solid var(--border-soft)",
        }}
      >
        <div
          className="ws-wrap"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(14px, 2.4vw, 28px)",
            flexWrap: "wrap",
            padding: "16px var(--gutter)",
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--text-eyebrow)",
          }}
        >
          <ScrambleText text="Built by Wieman Systems" style={{ color: "var(--fg)" }} />
          <Plus size={10} color="var(--fg)" opacity={0.4} />
          <ScrambleText text="We run our business on it every day" />
          <span className="hide-mobile" style={{ display: "inline-flex" }}>
            <Plus size={10} color="var(--fg)" opacity={0.4} />
          </span>
          <ScrambleText
            text="Every capture on this page is our own console"
            className="hide-mobile"
          />
        </div>
      </div>
    </section>
  );
}
