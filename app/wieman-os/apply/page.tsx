"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ClosingBlock from "@/components/ClosingBlock";
import BookModal from "@/components/BookModal";
import CustomCursor from "@/components/CustomCursor";
import BlueprintGrid from "@/components/BlueprintGrid";
import ScrambleText from "@/components/ScrambleText";
import Plus from "@/components/Plus";
import { TRIAL_URL } from "@/lib/product";

const SECTION_MASK =
  "linear-gradient(to bottom, transparent, #000 16%, #000 84%, transparent)";

const TIERS = ["Install", "Guided", "Partner"] as const;
type Tier = (typeof TIERS)[number];

interface FormState {
  name: string;
  email: string;
  company: string;
  runs: string;
  tier: Tier;
  notes: string;
}

function Field({
  label,
  type = "text",
  textarea,
  rows = 3,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type?: string;
  textarea?: boolean;
  rows?: number;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="field" style={{ marginBottom: 24 }}>
      <label style={{ fontFamily: "var(--font-mono), monospace" }}>{label}</label>
      {textarea ? (
        <textarea
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={{ fontFamily: "var(--font-display), sans-serif" }}
        />
      )}
    </div>
  );
}

export default function Apply() {
  const [modalOpen, setModalOpen] = useState(false);
  const onBook = () => setModalOpen(true);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    runs: "",
    tier: "Guided",
    notes: "",
  });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hp, setHp] = useState(""); // honeypot

  // Preselect the tier when arriving from a pricing card
  // (/wieman-os/apply?tier=partner). Read once on mount; plain
  // window.location keeps this out of any Suspense contract.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("tier");
    const match = TIERS.find((t) => t.toLowerCase() === q?.toLowerCase());
    if (match) setForm((f) => ({ ...f, tier: match }));
  }, []);

  const upd = (k: keyof FormState) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const valid = form.name.trim() && /\S+@\S+\.\S+/.test(form.email);

  const submit = async () => {
    if (!valid || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, company_website: hp }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setSent(true);
      window.scrollTo({ top: 0 });
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <CustomCursor hidden={modalOpen} />
      <Header onBook={onBook} />
      <main>
        <section style={{ position: "relative", overflow: "hidden" }}>
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
              padding: "clamp(64px, 9vh, 112px) var(--gutter) clamp(72px, 11vh, 128px)",
            }}
          >
            {sent ? (
              <div style={{ maxWidth: 560, padding: "clamp(24px, 6vh, 72px) 0" }}>
                <Plus size={22} opacity={0.6} style={{ marginBottom: 26 }} />
                <div
                  className="eyebrow"
                  style={{ fontFamily: "var(--font-mono), monospace", marginBottom: 18 }}
                >
                  <ScrambleText text="Application received" trigger="load" />
                </div>
                <h1
                  style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(30px, 4vw, 46px)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                    marginBottom: 16,
                  }}
                >
                  We&rsquo;ll be in touch.
                </h1>
                <p
                  style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontSize: 16,
                    lineHeight: 1.62,
                    color: "rgba(var(--ink-rgb), 0.72)",
                    marginBottom: 36,
                  }}
                >
                  Your application is in. We reply within 24 hours — usually
                  the same day. In the meantime, the sandbox is open.
                </p>
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
                  }}
                >
                  Open the free trial &rarr;
                </a>
              </div>
            ) : (
              <>
                <div
                  className="eyebrow"
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    marginBottom: 20,
                  }}
                >
                  <Plus size={12} color="var(--fg)" opacity={0.55} />
                  <ScrambleText
                    text="Wieman OS"
                    style={{ color: "var(--fg)", fontWeight: 700 }}
                  />
                  <span
                    style={{
                      width: 22,
                      height: 1,
                      background: "var(--fg)",
                      opacity: 0.35,
                      display: "inline-block",
                    }}
                  />
                  <ScrambleText text="Guided installs" />
                </div>
                <h1
                  style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(30px, 4.4vw, 52px)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.08,
                    maxWidth: 720,
                    textWrap: "balance" as never,
                  }}
                >
                  Apply for a guided install.
                </h1>
                <p
                  style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontSize: 16,
                    lineHeight: 1.62,
                    color: "rgba(var(--ink-rgb), 0.72)",
                    maxWidth: 560,
                    margin: "20px 0 0",
                  }}
                >
                  Guided and Partner tiers are installed with you, one on one —
                  or run entirely for you. We take a limited number of founding
                  installs at a time so every one gets the builder. Tell us
                  what you run; we reply within 24 hours.
                </p>

                <div style={{ maxWidth: 560, marginTop: "clamp(40px, 6vh, 56px)" }}>
                  <Field
                    label="Name"
                    value={form.name}
                    onChange={upd("name")}
                    placeholder="Your name"
                  />
                  <Field
                    label="Work email"
                    type="email"
                    value={form.email}
                    onChange={upd("email")}
                    placeholder="you@company.com"
                  />
                  <Field
                    label="Company"
                    value={form.company}
                    onChange={upd("company")}
                    placeholder="Company name"
                  />
                  <Field
                    label="What do you run today?"
                    textarea
                    rows={4}
                    value={form.runs}
                    onChange={upd("runs")}
                    placeholder="Tools, spreadsheets, inboxes — how the business actually runs…"
                  />
                  <div className="field field--select" style={{ marginBottom: 24 }}>
                    <label style={{ fontFamily: "var(--font-mono), monospace" }}>
                      Which tier?
                    </label>
                    <select
                      value={form.tier}
                      onChange={(e) => upd("tier")(e.target.value)}
                      style={{ fontFamily: "var(--font-display), sans-serif" }}
                    >
                      <option value="Install">Install — Wieman OS on your stack</option>
                      <option value="Guided">Guided — installed with you, one on one</option>
                      <option value="Partner">Partner — we run the whole install</option>
                    </select>
                  </div>
                  <Field
                    label="Anything else?"
                    textarea
                    value={form.notes}
                    onChange={upd("notes")}
                    placeholder="Timelines, must-haves, questions…"
                  />
                  {/* Honeypot: hidden from people, catches bots that fill every field */}
                  <input
                    type="text"
                    name="company_website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      width: 1,
                      height: 1,
                      opacity: 0,
                    }}
                  />
                  <div style={{ marginTop: 32 }}>
                    <button
                      disabled={!valid || submitting}
                      onClick={submit}
                      data-cursor
                      style={{
                        width: "100%",
                        fontFamily: "var(--font-display), sans-serif",
                        fontWeight: 600,
                        fontSize: 13,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        padding: "15px 24px",
                        background:
                          valid && !submitting ? "var(--fg)" : "var(--border-mid)",
                        color: valid && !submitting ? "var(--bg)" : "var(--text-muted)",
                        border: "1px solid",
                        borderColor:
                          valid && !submitting ? "var(--fg)" : "var(--border-mid)",
                        cursor: valid && !submitting ? "pointer" : "default",
                        transition: "background 80ms linear, color 80ms linear",
                      }}
                    >
                      {submitting ? "Sending…" : "Submit application"}
                    </button>
                    {error && (
                      <p
                        style={{
                          marginTop: 14,
                          fontFamily: "var(--font-mono), monospace",
                          fontSize: 12,
                          lineHeight: 1.5,
                          color: "var(--danger)",
                        }}
                      >
                        {error}
                      </p>
                    )}
                    <p
                      style={{
                        marginTop: 18,
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 11,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--text-eyebrow)",
                      }}
                    >
                      Limited founding slots &middot; Reply within 24 hours
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

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
