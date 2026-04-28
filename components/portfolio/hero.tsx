"use client";

import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float animation-delay-500" />
      </div>

      <div className="container mx-auto px-6 pt-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Greeting */}
          <p className="text-primary font-medium mb-4 animate-fade-up opacity-0">
            Olá, meu nome é
          </p>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 animate-fade-up opacity-0 animation-delay-100">
            Kaique Devesa
          </h1>

          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-bold text-muted-foreground mb-8 animate-fade-up opacity-0 animation-delay-200">
            Desenvolvedor Full Stack
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed animate-fade-up opacity-0 animation-delay-300">
            Construo experiências digitais modernas e responsivas, focando em
            performance, acessibilidade e boas práticas de desenvolvimento.
            Tenho experiência com React, JavaScript e consumo de APIs REST,
            desenvolvendo interfaces dinâmicas e funcionais
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12 animate-fade-up opacity-0 animation-delay-400">
            <Button size="lg" asChild>
              <Link href="#projetos">Ver Projetos</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#contato">Entre em Contato</Link>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 animate-fade-up opacity-0 animation-delay-500">
            <Link
              href="https://github.com/kaiquedevesa1"
              target="_blank"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/kaique-devesa-4677ab1a2/"
              target="_blank"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </Link>
            <Link
              href="mailto:kaikedaeves@hotmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={24} />
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <Link
            href="#sobre"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Scroll down"
          >
            <ArrowDown size={28} />
          </Link>
        </div>
      </div>
    </section>
  );
}
