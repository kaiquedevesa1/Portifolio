"use client";

import { useEffect, useRef, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Send,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import emailjs from "emailjs-com";

const socialLinks = [
  { icon: Github, href: "https://github.com/kaiquedevesa1", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/kaique-devesa-4677ab1a2/",
    label: "LinkedIn",
  },
  { icon: Mail, href: "mailto:kaikedaeves@hotmail.com", label: "Email" },
];

export function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //funcao do envio do formulario
    e.preventDefault(); // e evento do formulario
    setIsSubmitting(true); // isso troca o botao de enviar para enviando...

    const form = e.currentTarget; // pega todos os dados do formulario
    const formData = new FormData(form); // vai ler todos o inputs com o 'name' vira um objeto name: "kaique"

    const data = {
      // organizando os dados de envio criando objetos name : kaique - email: ...
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      time: new Date().toLocaleString(),
    };

    try {
      //envio do email
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        data,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );

      form.reset(); // limpa formulario
      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato. Responderei em breve!",
        className: "bg-card border-primary/20 text-foreground",
      });
    } catch (error) {
      console.log("Erro EmailJS:", error);
      toast({
        variant: "destructive",
        title: "Erro ao enviar",
        description: "Ocorreu um problema. Tente novamente mais tarde.",
      });
    }

    setIsSubmitting(false); // volta o botao ao normal
  };

  return (
    <section
      ref={sectionRef}
      id="contato"
      className="py-24 md:py-32 bg-card/50"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <div
            className={`mb-16 text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              <span className="text-primary">04.</span> Contato
            </h2>
            <div className="w-24 h-1 bg-primary rounded-full mx-auto mb-8" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Estou sempre aberto a novas oportunidades e projetos
              interessantes. Se você tem uma ideia ou quer apenas dizer oi,
              sinta-se à vontade para entrar em contato!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div
              className={`${isVisible ? "animate-fade-up animation-delay-200" : "opacity-0"}`}
            >
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Envie uma mensagem
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Seu nome"
                    required
                    className="bg-background border-border focus:border-primary"
                  />
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Seu email"
                    required
                    className="bg-background border-border focus:border-primary"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Sua mensagem"
                    rows={5}
                    required
                    className="bg-background border-border focus:border-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      Enviar Mensagem
                      <Send className="ml-2" size={18} />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div
              className={`${isVisible ? "animate-fade-up animation-delay-300" : "opacity-0"}`}
            >
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Vamos nos conectar
              </h3>
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Você também pode me encontrar nas redes sociais. Estou sempre
                  disposto a discutir projetos, compartilhar ideias ou
                  simplesmente trocar uma ideia sobre tecnologia.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                      <Mail className="text-primary" size={22} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <Link
                        href="mailto:kaikedaeves@hotmail.com"
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        kaikedaeves@hotmail.com
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Redes Sociais
                  </p>
                  <div className="flex gap-4">
                    {socialLinks.map((social) => (
                      <Link
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        aria-label={social.label}
                      >
                        <social.icon size={22} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
