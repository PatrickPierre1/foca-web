"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Target,
  Globe,
  Cpu,
  Share2,
  Palette,
  PenTool
} from "lucide-react";

const services = [
  {
    icon: Target,
    title: "Tráfego Pago",
    description: "Estratégias em múltiplas plataformas digitais, com forte especialização em Google Ads e Meta Ads.\nEstrutura completa orientada a conversão, escala e previsibilidade de resultados.",
    gradient: "from-brand-magenta to-brand-purple",
  },
  {
    icon: Globe,
    title: "Desenvolvimento Web",
    description: "Sites e landing pages de alta conversão, rápidos e otimizados para SEO.",
    gradient: "from-brand-purple to-brand-blue",
  },
  {
    icon: Cpu,
    title: "Automação & IA",
    description: "Automações inteligentes e inteligência artificial para escalar suas operações.",
    gradient: "from-brand-blue to-brand-cyan",
  },
  {
    icon: Share2,
    title: "Social Media",
    description: "Gestão estratégica de redes sociais que engajam, constroem autoridade e geram conexão com seu público.",
    gradient: "from-brand-cyan to-brand-teal",
  },
  {
    icon: Palette,
    title: "Design Gráfico",
    description: "Identidade visual marcante, criativos que convertem e materiais que elevam sua marca.",
    gradient: "from-brand-teal to-brand-magenta",
  },
  {
    icon: PenTool,
    title: "Copywriting",
    description: "Textos persuasivos que vendem. Copy para anúncios, landing pages e comunicação que converte.",
    gradient: "from-brand-magenta to-brand-purple",
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="glass-card rounded-2xl p-8 h-full hover-lift cursor-pointer">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
          <service.icon className="w-7 h-7 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="servicos" className="py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            Nossos Serviços
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Soluções completas para{" "}
            <span className="gradient-text">fazer você crescer</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Um time integrado de especialistas trabalhando juntos pelo seu resultado.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
