"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/kaiquedevesa1", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/kaique-devesa-4677ab1a2/",
    label: "LinkedIn",
  },

  { icon: Mail, href: "mailto:kaikedaeves@hotmail.com", label: "Email" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo/Brand */}
            <Link
              href="/"
              className="text-xl font-bold text-foreground hover:text-primary transition-colors"
            >
              {"<Dev />"}
            </Link>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              Feito por{" "}
              <Link
                href="/"
                className="text-foreground hover:text-primary transition-colors"
              >
                Kaique Devesa
              </Link>{" "}
              © {currentYear}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Construído com Next.js e Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
