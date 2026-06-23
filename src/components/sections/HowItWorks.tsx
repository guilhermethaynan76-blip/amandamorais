import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { id: "01", title: "Agende sua consulta pelo WhatsApp" },
  { id: "02", title: "Receba a solicitação de exames antes da consulta" },
  { id: "03", title: "Consulta completa com investigação real" },
  { id: "04", title: "Plano que faz sentido para a sua vida" }
];

export const HowItWorks = () => {
  return (
    <section className="py-24 bg-fundo-2">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-primaria mb-4">Como funciona</h2>
          <div className="w-24 h-1 bg-acento mx-auto rounded-full" />
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Line (Desktop) */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-acento-2/20 -translate-y-1/2 hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative z-10 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-acento text-fundo flex items-center justify-center text-xl font-bold mb-6 shadow-xl border-4 border-fundo-2">
                  {step.id}
                </div>
                <h3 className="text-lg font-bold text-primaria max-w-[200px]">
                  {step.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
