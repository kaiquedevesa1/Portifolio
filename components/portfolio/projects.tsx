"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Folder } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
      "Um cardápio de restaurante responsivo e interativo, com funções de adicionar ao carrinho e enviar o pedido.",
    image: "/Aromas-casa.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/kaiquedevesa1/dessert-restaurant",
    demo: "https://remarkable-dusk-49ad5b.netlify.app/",
  },
  {
    id: 3,
    title: "The movie",
    description:
      "Um site de filmes onde posso pesquisar um filme e ele mostra a sinopse, o gênero, o ano de lançamento, a duração e a avaliação.",
    image: "/the-movie.png",
    technologies: ["React", "API Rest", "Next.js", "HTML e CSS", "JavaScript"],
    github: "https://github.com",
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
    title: "Rpg de texto",
    description:
      "Um rpg de texto onde tem caminhos a ser seguidos com dados e caso não tenha sorte nos dados você perde",
    technologies: ["JavaScript"],
    github: "https://github.com/kaiquedevesa1/Rpg",
  },
  {
    id: 6,
    title: "Contact Us",
    description:
      "Um formulário de contato interativo em React, com validação de dados, feedback de erro e confirmação via moda",
    technologies: ["React", "CSS", "HTML"],
    github: "https://github.com/kaiquedevesa1/Contact_Us",
  },
];

export function Projects() {
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
    <section ref={sectionRef} id="projetos" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div
            className={`mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              <span className="text-primary">03.</span> Projetos
            </h2>
            <div className="w-24 h-1 bg-primary rounded-full" />
          </div>

          {/* Featured Projects */}
          <div className="space-y-24 mb-24">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`grid md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                } ${isVisible ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${(index + 1) * 150}ms` }}
              >
                {/* Project Image */}
                <div
                  className={`relative group ${
                    index % 2 === 1 ? "md:order-2" : ""
                  }`}
                >
                  <div className="aspect-video bg-secondary rounded-xl overflow-hidden border border-border">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <img src={project.image} alt={project.title} />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Project Info */}
                <div
                  className={`${
                    index % 2 === 1 ? "md:order-1 md:text-right" : ""
                  }`}
                >
                  <p className="text-primary font-medium mb-2">
                    Projeto em Destaque
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {project.title}
                  </h3>
                  <div className="bg-card p-6 rounded-xl border border-border mb-4">
                    <p className="text-muted-foreground leading-relaxed">
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
                        className="px-3 py-1 text-sm text-muted-foreground font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div
                    className={`flex gap-4 ${
                      index % 2 === 1 ? "md:justify-end" : ""
                    }`}
                  >
                    <Link
                      href={project.github}
                      target="_blank"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <Github size={22} />
                    </Link>
                    <Link
                      href={project.demo}
                      target="_blank"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Live Demo"
                    >
                      <ExternalLink size={22} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Other Projects */}
          <div
            className={`${isVisible ? "animate-fade-up animation-delay-500" : "opacity-0"}`}
          >
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
              Outros Projetos
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="group bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-all hover:-translate-y-2"
                  style={{ animationDelay: `${(index + 6) * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Folder className="text-primary" size={40} />
                    <Link
                      href={project.github}
                      target="_blank"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <Github size={20} />
                    </Link>
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs text-muted-foreground font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* View More Button */}
          <div
            className={`text-center mt-12 ${isVisible ? "animate-fade-up animation-delay-600" : "opacity-0"}`}
          >
            <Button variant="outline" size="lg" asChild>
              <Link href="https://github.com/kaiquedevesa1" target="_blank">
                Ver mais no GitHub
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
