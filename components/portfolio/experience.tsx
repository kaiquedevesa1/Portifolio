"use client";

import { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const experiences = [
  {
    id: 1,
    role: "Projeto Pessoal",
    company: "Flappy Bird",
    companyUrl: "https://github.com/kaiquedevesa1/Flappy-Bird",
    period: "2024",
    description:
      "Jogo Flappy Bird desenvolvido em Java com Swing, focado em lógica, eventos e manipulação gráfica.",
    technologies: ["Java"],
  },
  {
    id: 2,
    role: "Projeto Pessoal",
    company: "Você Fitness",
    companyUrl: "https://kaiquedevesa1.github.io/Projeto-voc--fitnes/",
    period: "2024",
    description:
      "Projeto web desenvolvido com foco no segmento fitness, apresentando uma interface responsiva e moderna.",
    technologies: ["HTML", "CSS"],
  },
  {
    id: 3,
    role: "Curso — Rei dos Códigos",
    company: "Site Fanta",
    companyUrl: "https://site-fanta.netlify.app/",
    period: "2025",
    description:
      "Site da Fanta desenvolvido durante curso. Aprendi novas formas de codar e como executar animações limpas.",
    technologies: ["JavaScript", "HTML", "CSS"],
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );

      // Timeline line draws itself from top to bottom as you scroll
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "bottom 75%",
            scrub: 1.2,
          },
        }
      );

      // Each card slides in from its respective side
      const cards = sectionRef.current?.querySelectorAll(".exp-card");
      cards?.forEach((card, index) => {
        const fromLeft = index % 2 === 0;
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: fromLeft ? -40 : 40,
            y: 10,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
            },
          }
        );
      });

      // Timeline dots pop in
      const dots = sectionRef.current?.querySelectorAll(".timeline-dot");
      dots?.forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.45,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: dot,
              start: "top 90%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experiencia"
      className="py-28 md:py-40"
      style={{
        background:
          "linear-gradient(180deg, transparent 0%, oklch(0.16 0.02 240 / 0.4) 50%, transparent 100%)",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section title */}
          <div ref={titleRef} className="mb-16 opacity-0">
            <div className="flex items-center gap-4 mb-2">
              <span
                className="text-primary font-mono text-sm tracking-widest"
                style={{ opacity: 0.6 }}
              >
                02
              </span>
              <div className="h-px flex-1 bg-border" style={{ maxWidth: 60 }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Experiência
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Animated line */}
            <div
              ref={lineRef}
              className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent"
              style={{ transformOrigin: "top center", transform: "scaleY(0)" }}
            />

            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative mb-14 last:mb-0">
                {/* Dot */}
                <div
                  className="timeline-dot absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background -translate-x-[7px] md:-translate-x-2 mt-5 z-10"
                  style={{ scale: 0 }}
                />

                <div
                  className={`exp-card ml-8 md:ml-0 opacity-0 ${
                    index % 2 === 0
                      ? "md:mr-[calc(50%+2.5rem)] md:text-right"
                      : "md:ml-[calc(50%+2.5rem)]"
                  }`}
                >
                  <div className="group bg-card/60 backdrop-blur-sm p-6 rounded-xl border border-border hover:border-primary/40 transition-all duration-400 hover:shadow-[0_0_24px_oklch(0.75_0.15_180_/_0.08)]">
                    <span className="text-xs text-primary font-mono tracking-widest">
                      {exp.period}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground mt-2">
                      {exp.role}
                    </h3>
                    <Link
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mt-1"
                    >
                      {exp.company}
                      <ExternalLink size={12} />
                    </Link>
                    <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                      {exp.description}
                    </p>
                    <div
                      className={`flex flex-wrap gap-2 mt-5 ${
                        index % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-secondary/60 text-secondary-foreground rounded-md text-xs font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
