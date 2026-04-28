"use client";

import { useEffect, useRef, useState } from "react";

const skills = [
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "MongoDB",
  "Git",
  "Html",
  "Css",
];

export function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="sobre" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Title */}
          <div
            className={`mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              <span className="text-primary">01.</span> Sobre Mim
            </h2>
            <div className="w-24 h-1 bg-primary rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* About Text */}
            <div
              className={`space-y-6 ${isVisible ? "animate-fade-up animation-delay-200" : "opacity-0"}`}
            >
              <p className="text-muted-foreground leading-relaxed text-lg">
                Sou um desenvolvedor apaixonado por criar experiências digitais
                que combinam design elegante com código de alta qualidade. Minha
                jornada na programação começou há alguns anos, e desde então
                tenho me dedicado a aprender e aplicar as melhores práticas do
                mercado.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Atualmente busco oportunidades como desenvolvedor, tanto
                freelancer quanto CLT, com o objetivo de aprimorar continuamente
                minhas habilidades e aplicar boas práticas no desenvolvimento de
                soluções web modernas.{" "}
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg"></p>
            </div>

            {/* Skills */}
            <div
              className={`${isVisible ? "animate-fade-up animation-delay-300" : "opacity-0"}`}
            >
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Tecnologias que utilizo
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    style={{ animationDelay: `${index * 50}ms` }}
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
