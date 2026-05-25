"use client";

import { useEffect, useRef } from "react";
import { ExternalLink, Github, Folder } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const featuredProjects = [
  {
    id: 1,
    title: "Funko-Shop",
    description:
      "Plataforma de e-commerce de Funkos, com uma home apresentando os produtos, uma seção de compras e uma página de contato.",
    image: "/Funko-web.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/kaiquedevesa1/Funko",
    demo: "https://kaiquedevesa1.github.io/Funko/",
  },
  {
    id: 2,
    title: "Aromas da Casa",
    description:
      "Cardápio de restaurante responsivo e interativo, com funções de adicionar ao carrinho e enviar o pedido.",
    image: "/Aromas-casa.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/kaiquedevesa1/dessert-restaurant",
    demo: "https://remarkable-dusk-49ad5b.netlify.app/",
  },
  {
    id: 3,
    title: "The Movie",
    description:
      "Site de filmes onde é possível pesquisar um filme e visualizar sinopse, gênero, ano de lançamento, duração e avaliação.",
    image: "/the-movie.png",
    technologies: ["React", "Next.js", "API Rest", "JavaScript"],
    github: "https://github.com/kaiquedevesa1/The-movies",
    demo: "https://the-movies1.netlify.app/",
  },
];

const otherProjects = [
  {
    id: 4,
    title: "Weather App",
    description:
      "Aplicativo de previsão do tempo com geolocalização e dados em tempo real.",
    technologies: ["HTML", "CSS", "Api Rest", "JavaScript"],
    github: "https://github.com/kaiquedevesa1/weather_app",
  },
  {
    id: 5,
    title: "RPG de Texto",
    description:
      "RPG de texto com caminhos a seguir, dados e sistema de perda baseado em sorte.",
    technologies: ["JavaScript"],
    github: "https://github.com/kaiquedevesa1/Rpg",
  },
  {
    id: 6,
    title: "Contact Us",
    description:
      "Formulário de contato em React com validação de dados, feedback de erro e confirmação via modal.",
    technologies: ["React", "CSS", "HTML"],
    github: "https://github.com/kaiquedevesa1/Contact_Us",
  },
];

// 3D Tilt card wrapper — premium hover effect
function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = -(y - 0.5) * 12;
      const rotateY = (x - 0.5) * 12;

      gsap.to(el, {
        rotateX,
        rotateY,
        transformPerspective: 900,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        duration: 1,
        ease: "elastic.out(1, 0.55)",
        overwrite: "auto",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

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
        },
      );

      // Featured projects — alternating left/right slide with image scale
      const featured =
        sectionRef.current?.querySelectorAll(".featured-project");
      featured?.forEach((project, index) => {
        const fromLeft = index % 2 === 0;

        // Info panel
        const info = project.querySelector(".project-info");
        gsap.fromTo(
          info,
          { opacity: 0, x: fromLeft ? -35 : 35 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: project,
              start: "top 82%",
            },
          },
        );

        // Image panel — scale from 0.88
        const img = project.querySelector(".project-img-wrap");
        gsap.fromTo(
          img,
          { opacity: 0, scale: 0.88, x: fromLeft ? 35 : -35 },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: project,
              start: "top 82%",
            },
          },
        );

        // Subtle image parallax on scroll
        const imgInner = project.querySelector(".project-img-inner");
        gsap.to(imgInner, {
          y: -28,
          ease: "none",
          scrollTrigger: {
            trigger: project,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });

      // Other projects stagger
      const otherCards = sectionRef.current?.querySelectorAll(".other-card");
      const otherGrid = sectionRef.current?.querySelector(
        ".other-projects-grid",
      );
      if (otherCards && otherCards.length > 0) {
        gsap.fromTo(
          Array.from(otherCards),
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: { each: 0.1, from: "start" },
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: otherGrid ?? sectionRef.current,
              start: "top 85%",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projetos"
      className="py-28 md:py-40 overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section title */}
          <div ref={titleRef} className="mb-20 opacity-0">
            <div className="flex items-center gap-4 mb-2">
              <span
                className="text-primary font-mono text-sm tracking-widest"
                style={{ opacity: 0.6 }}
              >
                03
              </span>
              <div className="h-px flex-1 bg-border" style={{ maxWidth: 60 }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Projetos
            </h2>
          </div>

          {/* Featured Projects */}
          <div className="space-y-28 mb-28">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className="featured-project grid md:grid-cols-2 gap-10 items-center"
              >
                {/* Image */}
                <div
                  className={`project-img-wrap relative overflow-hidden rounded-2xl border border-border/60 opacity-0 ${
                    index % 2 === 1 ? "md:order-2" : ""
                  }`}
                  style={{ willChange: "transform" }}
                >
                  <div className="aspect-video overflow-hidden bg-secondary">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-img-inner w-full h-full object-cover transition-transform duration-700"
                      style={{ willChange: "transform" }}
                    />
                  </div>
                  {/* Hover shimmer overlay */}
                  <div className="absolute inset-0 bg-primary/0 hover:bg-primary/8 transition-colors duration-500 rounded-2xl" />
                </div>

                {/* Info */}
                <TiltCard
                  className={`project-info opacity-0 ${
                    index % 2 === 1 ? "md:order-1" : ""
                  }`}
                >
                  <div className={`${index % 2 === 1 ? "md:text-right" : ""}`}>
                    <p className="text-primary/70 text-xs font-mono tracking-widest mb-3 uppercase">
                      Projeto em Destaque
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-5">
                      {project.title}
                    </h3>
                    <div className="bg-card/70 backdrop-blur-sm p-5 rounded-xl border border-border/50 mb-5 hover:border-primary/30 transition-colors duration-400">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {project.description}
                      </p>
                    </div>
                    <div
                      className={`flex flex-wrap gap-2 mb-6 ${
                        index % 2 === 1 ? "md:justify-end" : ""
                      }`}
                    >
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs text-muted-foreground/70 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div
                      className={`flex gap-5 items-center ${
                        index % 2 === 1 ? "md:justify-end" : ""
                      }`}
                    >
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors duration-300"
                        aria-label="GitHub"
                      >
                        <Github size={20} />
                      </Link>
                      <Link
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors duration-300"
                        aria-label="Demo"
                      >
                        <ExternalLink size={20} />
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>

          {/* Other Projects */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-10 text-center tracking-tight">
              Outros Projetos
            </h3>
            <div className="other-projects-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {otherProjects.map((project) => (
                <TiltCard
                  key={project.id}
                  className="other-card group bg-card/60 backdrop-blur-sm p-6 rounded-xl border border-border hover:border-primary/40 transition-all duration-400 hover:shadow-[0_0_32px_oklch(0.75_0.15_180_/_0.07)] opacity-0"
                >
                  <div className="flex items-center justify-between mb-5">
                    <Folder
                      className="text-primary/70 group-hover:text-primary transition-colors duration-300"
                      size={36}
                    />
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                      aria-label="GitHub"
                    >
                      <Github size={18} />
                    </Link>
                  </div>
                  <h4 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h4>
                  <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs text-muted-foreground/60 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* View more */}
          <div className="text-center mt-14">
            <Button variant="outline" size="lg" asChild>
              <Link
                href="https://github.com/kaiquedevesa1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver mais no GitHub
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
