"use client";

import Image from "next/image";
import SectionHead from "../SectionHead";
import Reveal from "../Reveal";
import ScrambleText from "../ScrambleText";
import BlueprintGrid from "../BlueprintGrid";
import OsClip from "./OsClip";

const SECTION_MASK =
  "linear-gradient(to bottom, transparent, #000 16%, #000 84%, transparent)";

interface Tile {
  id: string;
  name: string;
  desc: string;
  img?: { src: string; alt: string };
  clip?: { src: string; poster: string; alt: string };
}

const TILES: Tile[] = [
  {
    id: "01",
    name: "Overview",
    desc: "Writes you a brief every morning: what's up, what's owed, what to answer first.",
    img: {
      src: "/wieman-os/module-brief.png",
      alt: "The Overview module: a written morning brief above an all-systems-operational bar and two flagged items.",
    },
  },
  {
    id: "02",
    name: "Todos",
    desc: "Action items lift themselves out of your inbox — prioritized, dated, and tracked to done.",
    clip: {
      src: "/wieman-os/module-todos.mp4",
      poster: "/wieman-os/module-todos-poster.png",
      alt: "The Todos module extracting action items from email: a prioritized task queue tagged 'from email' with due dates.",
    },
  },
  {
    id: "03",
    name: "Revenue",
    desc: "Stripe, live and read-only: MRR, balances, and exactly who hasn't paid yet.",
    img: {
      src: "/wieman-os/module-revenue.png",
      alt: "The Revenue module: Stripe balance, business checking, pending payout, and two overdue invoices flagged 'needs a nudge'.",
    },
  },
  {
    id: "04",
    name: "Systems",
    desc: "Every property you run, probed daily: uptime, latency, security headers, email posture.",
    img: {
      src: "/wieman-os/module-systems.png",
      alt: "The Systems module: live status cards for each property with response codes, header scores, and DMARC state.",
    },
  },
];

const MORE = "ALSO IN THE CONSOLE — SPENDING · CALENDAR · CLIENTS · BUILDS · COMMAND PALETTE";

/** Module tour: four real captures of the console, framed as portrait crops. */
export default function OsTour() {
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
          index="02"
          label="The console"
          title="Every number in your business, live on one screen."
          maxTitle={820}
        />

        <div className="os-tour-grid">
          {TILES.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.09}>
              <div className="os-frame os-frame--chip" style={{ aspectRatio: "9 / 13.2" }}>
                {t.clip ? (
                  <OsClip
                    src={t.clip.src}
                    poster={t.clip.poster}
                    alt={t.clip.alt}
                    width={1080}
                    height={1920}
                    sizes="(max-width: 560px) 92vw, (max-width: 1080px) 44vw, 270px"
                  />
                ) : t.img ? (
                  <Image
                    src={t.img.src}
                    alt={t.img.alt}
                    width={1080}
                    height={1920}
                    sizes="(max-width: 560px) 92vw, (max-width: 1080px) 44vw, 270px"
                    style={{ objectFit: "cover", objectPosition: "center top", height: "100%" }}
                  />
                ) : null}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 12,
                  marginTop: 22,
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 12,
                    letterSpacing: "0.18em",
                    color: "var(--text-muted)",
                  }}
                >
                  <ScrambleText text={t.id} />
                </span>
                <h3 className="wd-title" style={{ fontFamily: "var(--font-display), sans-serif" }}>
                  <ScrambleText text={t.name} />
                </h3>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "rgba(var(--ink-rgb), 0.72)",
                  maxWidth: 300,
                }}
              >
                {t.desc}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.14em",
              color: "var(--text-eyebrow)",
              marginTop: "clamp(40px, 6vh, 56px)",
              paddingTop: 22,
              borderTop: "1px solid var(--border-soft)",
            }}
          >
            <ScrambleText text={MORE} />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
