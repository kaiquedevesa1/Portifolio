"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isTouch = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) {
      isTouch.current = true;
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const xDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "none" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "none" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3.out" });

    let hasEntered = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!hasEntered) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.4 });
        hasEntered = true;
      }
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        style={{
          width: 7,
          height: 7,
          backgroundColor: "oklch(0.75 0.15 180)",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full"
        style={{
          width: 36,
          height: 36,
          border: "1.5px solid oklch(0.75 0.15 180 / 0.6)",
          willChange: "transform",
        }}
      />
    </>
  );
}
