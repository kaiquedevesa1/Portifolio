"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

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
    company: "Você fitness",
    companyUrl: "https://kaiquedevesa1.github.io/Projeto-voc--fitnes/",
    period: "2024",
    description:
      "Projeto web desenvolvido com foco no segmento fitness, apresentando uma interface responsiva e moderna.",
    technologies: ["HTML", "CSS"],
  },
  {
    id: 3,
    role: "Curso - Rei dos codigos",
    company: "Site Fanta",
    companyUrl: "https://site-fanta.netlify.app/",
    period: "2025",
    description:
      " Desenvolvi um site da fanta, nesse projeto consegui aprender novas formas de codar, e como fazer pequenas animações limpas. ",
    technologies: ["JavaScript", "HTML", "CSS"],
  },
];

export function Experience() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experiencia"
      className="py-24 md:py-32 bg-card/50"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <div
            className={`mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              <span className="text-primary">02.</span> Experiência
            </h2>
            <div className="w-24 h-1 bg-primary rounded-full" />
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative mb-12 last:mb-0 ${
                  isVisible ? "animate-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${(index + 1) * 150}ms` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1.5 md:-translate-x-2 mt-1.5 border-4 border-background" />

                <div
                  className={`ml-8 md:ml-0 ${
                    index % 2 === 0
                      ? "md:mr-[calc(50%+2rem)] md:text-right"
                      : "md:ml-[calc(50%+2rem)]"
                  }`}
                >
                  <div className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors">
                    <span className="text-sm text-primary font-medium">
                      {exp.period}
                    </span>
                    <h3 className="text-xl font-semibold text-foreground mt-2">
                      {exp.role}
                    </h3>
                    <Link
                      href={exp.companyUrl}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors mt-1"
                    >
                      {exp.company}
                      <ExternalLink size={14} />
                    </Link>
                    <p className="text-muted-foreground mt-4 leading-relaxed">
                      {exp.description}
                    </p>
                    <div
                      className={`flex flex-wrap gap-2 mt-4 ${
                        index % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-medium"
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
