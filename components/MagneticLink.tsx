"use client";

import { AnchorHTMLAttributes, ReactNode, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, isFinePointer, prefersReducedMotion } from "@/lib/motion";

type Variant = "outline-dark" | "solid-dark" | "solid-light";

interface MagneticLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  /** How strongly the link is pulled toward the cursor (0–1). */
  strength?: number;
  children: ReactNode;
}

/**
 * Anchor twin of MagneticButton — same `.ws-btn` styling, same magnetic pull
 * and colour sweep, but it navigates. For CTAs that are real links (e.g. the
 * Wieman OS trial at try.wiemansystems.com) so they stay crawlable and
 * middle-click/cmd-click friendly.
 */
export default function MagneticLink({
  variant = "outline-dark",
  strength = 0.17,
  children,
  className,
  ...rest
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      if (!isFinePointer() || prefersReducedMotion()) return;
      const el = ref.current!;
      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });

      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: ref }
  );

  return (
    <a
      ref={ref}
      data-cursor
      className={`ws-btn ws-btn--${variant}${className ? ` ${className}` : ""}`}
      {...rest}
    >
      <span className="ws-btn__label">{children}</span>
    </a>
  );
}
