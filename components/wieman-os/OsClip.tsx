"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";

const subscribeReducedMotion = (cb: () => void) => {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
};

interface OsClipProps {
  src: string;
  poster: string;
  alt: string;
  /** Poster intrinsic size (the clip shares it). */
  width: number;
  height: number;
  sizes?: string;
}

/**
 * A silent product clip that behaves like a still until it can honestly play:
 * server-renders the poster (works with no JS), swaps in a muted looping
 * <video> after mount only when motion is allowed, and plays/pauses with an
 * IntersectionObserver so an offscreen loop never burns battery.
 */
export default function OsClip({ src, poster, alt, width, height, sizes }: OsClipProps) {
  // Server snapshot says "reduced" so SSR + no-JS render the poster; capable
  // clients re-render to the video after hydration, live-tracking the OS toggle.
  const motionOk = !useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!motionOk) return;
    const video = videoRef.current;
    if (!video) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) video.play().catch(() => {});
          else video.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [motionOk]);

  if (!motionOk) {
    return (
      <Image src={poster} alt={alt} width={width} height={height} sizes={sizes} />
    );
  }

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-label={alt}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
