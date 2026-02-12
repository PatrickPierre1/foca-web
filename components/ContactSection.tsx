"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xgolayka", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        toast({
          title: "Mensagem enviada!",
          description: "Em breve entraremos em contato com você.",
        });
        form.reset();
      } else {
        toast({
          title: "Erro ao enviar",
          description: "Tente novamente ou entre em contato pelo WhatsApp.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente ou entre em contato pelo WhatsApp.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "foca.marketing@gmail.com" },
    { icon: Phone, label: "Telefone", value: "(11) 96578-1953" },
    { icon: MapPin, label: "Localização", value: "São Paulo, SP" },
  ];

  return (
    <section id="contato" className="py-24 bg-secondary/50">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left side - Info */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
              Fale com a Foca
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Pronto para{" "}
              <span className="gradient-text">crescer de verdade?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Conte para nós sobre seu negócio e seus objetivos. Vamos criar juntos uma estratégia 
              que gere resultados reais para você.
            </p>

            {/* Contact Info */}
            <div className="space-y-6 mb-10">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    <div className="font-semibold text-foreground">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp Button */}
            <Button
              variant="accent"
              size="lg"
              className="gap-3"
              onClick={() => window.open("https://wa.me/5511965781953?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20Foca%20Marketing!", "_blank")}
            >
              <MessageCircle className="w-5 h-5" />
              Conversar no WhatsApp
            </Button>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card rounded-2xl p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nome
                    </label>
                    <Input
                      type="text"
                      name="nome"
                      placeholder="Seu nome"
                      required
                      className="h-12 bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Telefone
                    </label>
                    <Input
                      type="tel"
                      name="telefone"
                      placeholder="(00) 00000-0000"
                      required
                      className="h-12 bg-background"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="seu@email.com"
                    required
                    className="h-12 bg-background"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Mensagem
                  </label>
                  <Textarea
                    name="mensagem"
                    placeholder="Conte-nos sobre seu projeto..."
                    rows={4}
                    required
                    className="bg-background resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      Enviar mensagem
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>

                <p className="text-sm text-center text-muted-foreground">
                  Respondemos em até 24 horas úteis.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
