"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import SectionHead from "../SectionHead";
import ScrambleText from "../ScrambleText";
import BlueprintGrid from "../BlueprintGrid";
import Reveal from "../Reveal";

const SECTION_MASK =
  "linear-gradient(to bottom, transparent, #000 16%, #000 84%, transparent)";

// The five tabs and a spreadsheet a small business already runs itself on.
const TABS = [
  { name: "Stripe", holds: "what came in" },
  { name: "The bank app", holds: "what went out" },
  { name: "The inbox", holds: "what needs you" },
  { name: "A spreadsheet", holds: "what you owe people" },
  { name: "Status pages", holds: "whether anything is down" },
  { name: "The calendar", holds: "which knows nothing about the rest" },
];

/**
 * Problem → shift: the tab graveyard on a scrubbed rail (the house StopDoing
 * recipe) beside the one console that replaces it — a CSS crop of the real
 * Wieman OS Overview, no stretching of the portrait source.
 */
export default function OsShift() {
  const sectionRef = useRef<HTMLElement>(null);
  const railFillRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current!;
      const rows = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".os-tab-row"));
      const fill = railFillRef.current!;

      if (prefersReducedMotion()) {
        gsap.set(rows, { opacity: 1, x: 0 });
        gsap.set(fill, { scaleY: 1 });
        return;
      }

      gsap.set(rows, { opacity: 0.3, x: -8 });
      gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });

      const wrap = root.querySelector(".os-tab-timeline") as HTMLElement;
      const step = 0.85;
      const span = (rows.length - 1) * step + 1.1;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top 72%",
          end: "bottom 72%",
          scrub: 0.6,
        },
      });
      tl.to(fill, { scaleY: 1, duration: span, ease: "none" }, 0);
      rows.forEach((row, i) => {
        tl.to(row, { opacity: 1, x: 0, duration: 1.1, ease: "power2.out" }, i * step);
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
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
          index="01"
          label="The problem"
          title="Your current OS is five tabs and a spreadsheet."
          maxTitle={880}
        />

        <div className="os-shift-grid">
          {/* The tab graveyard */}
          <div
            className="os-tab-timeline"
            style={{ position: "relative", paddingLeft: "clamp(18px, 3vw, 30px)" }}
          >
            <div className="stop-rail">
              <div className="stop-rail__fill" ref={railFillRef} />
            </div>
            <div>
              {TABS.map((t, i) => (
                <div
                  className="os-tab-row"
                  key={t.name}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 14,
                    padding: "18px 0",
                    borderTop: i === 0 ? "none" : "1px solid var(--border-soft)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 12,
                      letterSpacing: "0.1em",
                      color: "var(--text-muted)",
                      minWidth: 26,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display), sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(17px, 1.6vw, 21px)",
                      letterSpacing: "-0.01em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 12,
                      letterSpacing: "0.04em",
                      color: "var(--text-muted)",
                    }}
                  >
                    — {t.holds}
                  </span>
                </div>
              ))}
              <p
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: 16,
                  lineHeight: 1.62,
                  color: "rgba(var(--ink-rgb), 0.72)",
                  maxWidth: 420,
                  paddingTop: 26,
                  borderTop: "1px solid var(--border-soft)",
                }}
              >
                Six places, zero agreement between them — and you are the sync
                layer. Wieman OS replaces the whole stack with one login that
                already knows the answer.
              </p>
            </div>
          </div>

          {/* The one console */}
          <Reveal>
            <div
              className="eyebrow"
              style={{
                fontFamily: "var(--font-mono), monospace",
                marginBottom: 18,
              }}
            >
              <ScrambleText text="THE SHIFT" style={{ fontWeight: 700, color: "var(--fg)" }} />
              <span
                style={{ width: 22, height: 1, background: "var(--fg)", opacity: 0.35, display: "inline-block" }}
              />
              <ScrambleText text="ONE CONSOLE" />
            </div>
            <div className="os-frame" style={{ aspectRatio: "936 / 582" }}>
              {/* CSS crop of the 1080x1350 capture down to the console window
                  (x 72-1008, y 440-1022) — portrait source, never stretched. */}
              <Image
                src="/wieman-os/console-overview.png"
                alt="The Wieman OS Overview: a morning brief covering money, the day's priorities, and two items that need attention, above live status for eight systems."
                width={1080}
                height={1350}
                sizes="(max-width: 880px) 92vw, 620px"
                style={{
                  position: "absolute",
                  width: "115.39%",
                  maxWidth: "none",
                  height: "auto",
                  left: "-7.7%",
                  top: "-75.6%",
                }}
              />
            </div>
            <p
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 12,
                lineHeight: 1.7,
                letterSpacing: "0.02em",
                color: "var(--text-muted)",
                maxWidth: 520,
                marginTop: 18,
              }}
            >
              THE OVERVIEW, THIS MORNING. IT WRITES THE BRIEF BEFORE YOU SIT
              DOWN: WHAT&apos;S UP, WHAT&apos;S OWED, WHAT TO DO FIRST.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
