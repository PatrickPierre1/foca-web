"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Layers, TrendingUp, Zap } from "lucide-react";

const differentials = [
  {
    icon: Users,
    title: "Time Completo e Integrado",
    description: "Designers, copywriters, gestores de tráfego e desenvolvedores trabalhando em sinergia pelo seu projeto.",
  },
  {
    icon: Layers,
    title: "Solução de Ponta a Ponta",
    description: "Do planejamento estratégico à execução e otimização. Você não precisa de várias agências.",
  },
  {
    icon: TrendingUp,
    title: "Foco em Resultados",
    description: "Cada ação é pensada para gerar retorno mensurável. Seu investimento precisa dar lucro.",
  },
  {
    icon: Zap,
    title: "Tecnologia de Ponta",
    description: "Automações, IA e as melhores ferramentas do mercado para escalar suas operações.",
  },
];

const DifferentialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="diferenciais" className="py-24 bg-secondary/50">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
              Por que a Foca?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Não somos apenas uma agência.{" "}
              <span className="gradient-text">Somos seu time de crescimento.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              A Foca Marketing nasceu para ser diferente. Reunimos os melhores talentos em um time coeso 
              que respira resultados e entrega excelência em cada projeto.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {differentials.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative rings */}
              <div className="absolute inset-8 rounded-full border-2 border-dashed border-accent/20 animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-16 rounded-full border-2 border-dashed border-brand-purple/20 animate-[spin_30s_linear_infinite_reverse]" />
              <div className="absolute inset-24 rounded-full border-2 border-dashed border-brand-blue/20 animate-[spin_20s_linear_infinite]" />

              {/* Central element */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full gradient-hero shadow-accent flex items-center justify-center">
                  <span className="text-5xl font-extrabold text-white">F</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;
