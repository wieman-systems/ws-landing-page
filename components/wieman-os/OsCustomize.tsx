"use client";

import { useState } from "react";
import SectionHead from "../SectionHead";
import Reveal from "../Reveal";
import ScrambleText from "../ScrambleText";
import BlueprintGrid from "../BlueprintGrid";

const SECTION_MASK =
  "linear-gradient(to bottom, transparent, #000 16%, #000 84%, transparent)";

interface Mod {
  name: string;
  desc: string;
  core?: boolean;
  on: boolean;
}

const INITIAL: Mod[] = [
  { name: "Overview", desc: "the morning brief", core: true, on: true },
  { name: "Intelligence", desc: "the copilot and its tools", core: true, on: true },
  { name: "Revenue", desc: "Stripe, MRR, receivables", on: true },
  { name: "Spending", desc: "bank feed and burn", on: true },
  { name: "Todos", desc: "inbox-extracted action items", on: true },
  { name: "Calendar", desc: "every calendar, merged", on: true },
  { name: "Clients", desc: "pipeline and next steps", on: true },
  { name: "Systems", desc: "uptime, headers, deploys", on: true },
  { name: "Builds", desc: "agent work in progress", on: false },
  { name: "School", desc: "yes, really — see below", on: false },
];

/**
 * Customization: a working toggle board. Owners switch whole modules off in
 * the real console; here the same motif shows the OS reshaping to fit.
 */
export default function OsCustomize() {
  const [mods, setMods] = useState<Mod[]>(INITIAL);
  const active = mods.filter((m) => m.on).length;

  const toggle = (name: string) =>
    setMods((ms) =>
      ms.map((m) => (m.name === name && !m.core ? { ...m, on: !m.on } : m))
    );

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
          index="04"
          label="Customization"
          title="Only the modules you need."
          maxTitle={760}
        />

        <Reveal>
          <p
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "clamp(16px, 1.4vw, 18px)",
              lineHeight: 1.62,
              color: "rgba(var(--ink-rgb), 0.72)",
              maxWidth: 620,
              marginBottom: "clamp(32px, 5vh, 48px)",
            }}
          >
            Wieman OS is not a template. A landscaping company doesn&apos;t need a
            client pipeline; a consultancy doesn&apos;t need fleet telemetry. Every
            module switches off cleanly, so your console shows your business and
            nothing else. Try it:
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 16,
              borderBottom: "1px solid var(--fg)",
              paddingBottom: 12,
            }}
          >
            <span
              className="eyebrow"
              style={{ fontFamily: "var(--font-mono), monospace" }}
            >
              <ScrambleText text="YOUR CONSOLE" />
            </span>
            <span
              aria-live="polite"
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 12,
                letterSpacing: "0.18em",
                fontVariantNumeric: "tabular-nums",
                color: "var(--fg)",
              }}
            >
              {String(active).padStart(2, "0")} / {mods.length} MODULES ACTIVE
            </span>
          </div>

          <div className="os-toggle-grid">
            {mods.map((m) => (
              <button
                key={m.name}
                type="button"
                role="switch"
                aria-checked={m.on}
                aria-disabled={m.core || undefined}
                onClick={() => toggle(m.name)}
                data-cursor
                className="os-toggle-row"
                style={{ cursor: m.core ? "default" : "pointer" }}
              >
                <span className="os-switch" aria-hidden />
                <span
                  className="os-toggle-name"
                  style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontWeight: 700,
                    fontSize: 15,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  {m.name}
                </span>
                <span
                  className="os-toggle-desc"
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 12,
                    letterSpacing: "0.02em",
                    color: "var(--text-muted)",
                    flex: 1,
                    textAlign: "right",
                  }}
                >
                  {m.core ? "CORE" : m.desc}
                </span>
              </button>
            ))}
          </div>

          <p
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: 15,
              lineHeight: 1.62,
              color: "rgba(var(--ink-rgb), 0.6)",
              maxWidth: 620,
              marginTop: "clamp(28px, 4vh, 40px)",
            }}
          >
            Our own console really does run a School module — Caleb is a college
            student. That&apos;s the point: the OS is shaped to its owner, not the
            other way around. Need a module that doesn&apos;t exist yet? That&apos;s a
            build, and building is what we do.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
