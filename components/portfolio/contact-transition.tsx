"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ContactTransition() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "+=240%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      tl
        // ── Top rule extends ──────────────────────────────────────────────────
        .from(".ct-rule-top", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.18,
        })

        // ── Tag fades in ──────────────────────────────────────────────────────
        .from(".ct-tag", { opacity: 0, y: -10, duration: 0.16 }, "-=0.06")

        // ── Words: curtain reveal (mask-up from overflow hidden) ──────────────
        .from(".ct-mask-1 .ct-word", { y: "110%", duration: 0.38, ease: "power4.out" }, "-=0.05")
        .from(".ct-mask-2 .ct-word", { y: "110%", duration: 0.38, ease: "power4.out" }, "-=0.26")
        .from(".ct-mask-3 .ct-word", { y: "110%", duration: 0.38, ease: "power4.out" }, "-=0.26")

        // ── Bottom rule extends ───────────────────────────────────────────────
        .from(".ct-rule-bot", {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 0.18,
        }, "-=0.1")

        // ── Subtitle + hint ───────────────────────────────────────────────────
        .from(".ct-sub",  { opacity: 0, y: 18, duration: 0.2 }, "-=0.06")
        .from(".ct-hint", { opacity: 0,         duration: 0.16 }, "-=0.06")

        // ── Hold then fade entire section ─────────────────────────────────────
        .to(".ct-inner", { opacity: 0, duration: 0.18 }, "+=0.22");
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* ── Ambient radial glow ─────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, oklch(0.75 0.15 180 / 0.08) 0%, transparent 68%)",
        }}
      />

      {/* ── Large faded number watermark ───────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute font-black select-none"
        style={{
          fontSize: "clamp(18rem, 40vw, 36rem)",
          lineHeight: 1,
          color: "oklch(0.75 0.15 180 / 0.03)",
          userSelect: "none",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        04
      </div>

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <div className="ct-inner relative z-10 w-full max-w-5xl mx-auto px-8 select-none">

        {/* Top rule + tag */}
        <div className="flex items-center gap-5 mb-8">
          <div className="ct-rule-top h-px flex-1 bg-primary/20" />
          <span className="ct-tag font-mono text-[10px] tracking-[0.38em] uppercase text-primary/45">
            04 · contato
          </span>
          <div className="h-px w-10 bg-primary/10" />
        </div>

        {/* Headline — three words, each in its own overflow-hidden mask */}
        <div className="mb-6">

          {/* "Entre" — left-aligned, foreground */}
          <div className="ct-mask-1 overflow-hidden leading-[0.9]">
            <span
              className="ct-word block font-extrabold tracking-tight text-foreground"
              style={{ fontSize: "clamp(4.5rem, 15vw, 11rem)" }}
            >
              Entre
            </span>
          </div>

          {/* "em" — slightly indented + smaller, muted */}
          <div className="ct-mask-2 overflow-hidden leading-[0.9] pl-[6vw]">
            <span
              className="ct-word block font-extrabold tracking-tight text-foreground/50"
              style={{ fontSize: "clamp(3.2rem, 10vw, 7.5rem)" }}
            >
              em
            </span>
          </div>

          {/* "Contato" — right-aligned, primary color */}
          <div className="ct-mask-3 overflow-hidden leading-[0.9] text-right">
            <span
              className="ct-word block font-extrabold tracking-tight text-primary"
              style={{ fontSize: "clamp(4.5rem, 15vw, 11rem)" }}
            >
              Contato
            </span>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="ct-rule-bot h-px w-full bg-primary/20 mb-7" />

        {/* Subtitle + hint */}
        <div className="flex items-end justify-between flex-wrap gap-4">
          <p className="ct-sub text-muted-foreground text-base md:text-lg max-w-xs leading-relaxed">
            Tem um projeto em mente?<br />
            Vamos criar algo incrível juntos.
          </p>

          <div className="ct-hint flex items-center gap-2 text-primary/35 pb-1">
            <div className="h-px w-5 bg-primary/25" />
            <span className="font-mono text-[9px] tracking-[0.32em] uppercase">
              role para baixo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
