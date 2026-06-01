"use client";

import { useEffect, useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import dynamic from "next/dynamic";
import gsap from "gsap";

const TechCube = dynamic(
  () => import("@/components/ui/tech-cube").then((m) => ({ default: m.TechCube })),
  { ssr: false, loading: () => null },
);

export function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const greetRef    = useRef<HTMLParagraphElement>(null);
  const nameRef     = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const socialRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nameEl = nameRef.current;
      if (!nameEl) return;

      // Character-split reveal
      const text = "Kaique Devesa";
      const fragments = text.split("").map((char) => {
        const outer = document.createElement("span");
        outer.style.cssText =
          "display:inline-block; overflow:hidden; line-height:1; vertical-align:top;";
        const inner = document.createElement("span");
        inner.style.cssText = "display:inline-block; transform:translateY(110%);";
        inner.textContent = char === " " ? " " : char;
        outer.appendChild(inner);
        return inner;
      });

      nameEl.innerHTML = "";
      fragments.forEach((inner) => nameEl.appendChild(inner.parentElement!));

      const tl = gsap.timeline({ delay: 0.15, defaults: { ease: "power3.out" } });

      tl.fromTo(greetRef.current,
          { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.55 })
        .to(fragments, {
          y: "0%", duration: 0.85, stagger: 0.028, ease: "power4.out",
        }, "-=0.1")
        .from(subtitleRef.current,
          { opacity: 0, x: -24, duration: 0.65, ease: "power3.out" },
          "-=0.45")
        .from(descRef.current,
          { opacity: 0, y: 16, duration: 0.6, ease: "power3.out" },
          "-=0.35")
        .fromTo(ctaRef.current,
          { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55 },
          "-=0.4")
        .fromTo(
          socialRef.current ? Array.from(socialRef.current.children) : [],
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, stagger: 0.07, duration: 0.45 },
          "-=0.3"
        );

      // Magnetic buttons
      const btns = ctaRef.current?.querySelectorAll("a, button");
      btns?.forEach((btn) => {
        const el = btn as HTMLElement;
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const x = e.clientX - r.left  - r.width  / 2;
          const y = e.clientY - r.top   - r.height / 2;
          gsap.to(el, { x: x * 0.22, y: y * 0.22, duration: 0.45, ease: "power2.out", overwrite: "auto" });
        };
        const onLeave = () =>
          gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.55)", overwrite: "auto" });
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center relative overflow-hidden"
    >
      {/* ── Layer 1: Flickering grid ── */}
      <FlickeringGrid
        squareSize={4}
        gridGap={6}
        flickerChance={0.3}
        color="oklch(0.75 0.15 180)"
        maxOpacity={0.18}
      />

      {/* ── Layer 2: Radial vignette — fades grid at edges ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 25%, var(--background) 80%)",
        }}
      />

      {/* ── Layer 3: Aurora color blobs ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="aurora-1" />
        <div className="aurora-2" />
        <div className="aurora-3" />
      </div>

      {/* ── Layer 4: Top glow ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 35% at 50% -5%, oklch(0.75 0.15 180 / 0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── Layer 5: Noise grain ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      {/* ── Content ── */}
      <div className="container mx-auto px-6 pt-24 pb-12 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
        <div>

          <p
            ref={greetRef}
            className="text-primary/60 font-medium mb-6 tracking-[0.22em] text-[11px] uppercase opacity-0"
          >
            Olá, meu nome é
          </p>

          <h1
            ref={nameRef}
            className="font-bold text-foreground mb-5 leading-[0.92] tracking-tight select-none"
            style={{ fontSize: "clamp(3.6rem, 8vw, 6.5rem)" }}
          >
            Kaique Devesa
          </h1>

          <h2
            ref={subtitleRef}
            className="font-semibold text-primary mb-10"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 3rem)" }}
          >
            Desenvolvedor Full Stack
          </h2>

          <p
            ref={descRef}
            className="text-muted-foreground max-w-lg mb-12 leading-relaxed"
            style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)" }}
          >
            Construo experiências digitais modernas e responsivas, focando em
            performance, acessibilidade e boas práticas. Experiência com React,
            Next.js e APIs REST.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4 mb-14 opacity-0">
            <Button size="lg" asChild>
              <Link href="#projetos">Ver Projetos</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#contato">Entre em Contato</Link>
            </Button>
          </div>

          <div ref={socialRef} className="flex gap-6 items-center">
            <Link
              href="https://github.com/kaiquedevesa1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300 opacity-0"
              aria-label="GitHub"
            >
              <Github size={21} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/kaique-devesa-4677ab1a2/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300 opacity-0"
              aria-label="LinkedIn"
            >
              <Linkedin size={21} />
            </Link>
            <Link
              href="mailto:kaikedaeves@hotmail.com"
              className="text-muted-foreground hover:text-primary transition-colors duration-300 opacity-0"
              aria-label="Email"
            >
              <Mail size={21} />
            </Link>
          </div>

        </div>

          {/* ── Right: interactive 3D tech cube ── */}
          <div className="hidden lg:block h-[560px] relative">
            <TechCube />
          </div>

        </div>
      </div>
    </section>
  );
}
