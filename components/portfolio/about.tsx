"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "MongoDB",
  "Git",
  "HTML",
  "CSS",
];

const p1 =
  "Sou um desenvolvedor apaixonado por criar experiências digitais que combinam design elegante com código de alta qualidade. Minha jornada na programação começou há alguns anos, e desde então tenho me dedicado a aprender e aplicar as melhores práticas do mercado.";

const p2 =
  "Atualmente busco oportunidades como desenvolvedor, tanto freelancer quanto CLT, com o objetivo de aprimorar continuamente minhas habilidades e aplicar boas práticas no desenvolvimento de soluções web modernas.";

function splitToWords(text: string, baseDelay: number) {
  return text.split(" ").map((word, i) => (
    <span
      key={`${word}-${i}`}
      className="word-reveal"
      data-delay={baseDelay + i * 0.05}
      style={{ display: "inline-block", opacity: 0.1, willChange: "opacity" }}
    >
      {word}&nbsp;
    </span>
  ));
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title slides in
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

      // Word-by-word scroll scrub on both paragraphs
      const paragraphs = textRef.current?.querySelectorAll("p");
      paragraphs?.forEach((para) => {
        const words = para.querySelectorAll(".word-reveal");
        gsap.to(words, {
          opacity: 1,
          stagger: { each: 0.06, from: "start" },
          ease: "none",
          scrollTrigger: {
            trigger: para,
            start: "top 88%",
            end: "bottom 55%",
            scrub: 0.9,
          },
        });
      });

      // Skills stagger scale-in
      const skillPills = skillsRef.current?.querySelectorAll(".skill-pill");
      if (skillPills) {
        gsap.fromTo(
          skillPills,
          { opacity: 0, scale: 0.7, y: 12 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: { each: 0.065, from: "start" },
            duration: 0.5,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="sobre" className="py-28 md:py-40">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section title */}
          <div ref={titleRef} className="mb-16 opacity-0">
            <div className="flex items-center gap-4 mb-2">
              <span
                className="text-primary font-mono text-sm tracking-widest"
                style={{ opacity: 0.6 }}
              >
                01
              </span>
              <div className="h-px flex-1 bg-border" style={{ maxWidth: 60 }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Sobre Mim
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-14 items-start">
            {/* Text with word-reveal */}
            <div ref={textRef} className="space-y-7">
              <p className="text-muted-foreground leading-[1.85] text-[1.05rem]">
                {splitToWords(p1, 0)}
              </p>
              <p className="text-muted-foreground leading-[1.85] text-[1.05rem]">
                {splitToWords(p2, 0)}
              </p>
            </div>

            {/* Skills */}
            <div ref={skillsRef}>
              <p
                className="text-xs uppercase tracking-[0.2em] text-muted-foreground/50 mb-6"
              >
                Tecnologias
              </p>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-pill px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-300 cursor-default select-none"
                    style={{ opacity: 0 }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
