import React from 'react';
import { motion } from 'framer-motion';

export const About = () => {
  const credentials = [
    { icon: "🩺", text: "CRM-SP 267.644" },
    { icon: "🧬", text: "Médica Nutróloga" },
    { icon: "💊", text: "Lipedema • Menopausa • Obesidade" },
    { icon: "🔬", text: "Medicina baseada em evidências" },
    { icon: "💻", text: "Consultas Online" }
  ];

  return (
    <section id="sobre" className="py-24 bg-fundo-2 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-acento/10 rounded-[2rem] blur-2xl group-hover:bg-acento/20 transition-all duration-700" />
              <img 
                src="https://res.cloudinary.com/dkwpz87nw/image/upload/v1781289129/image_15_k3upom.png" 
                alt="Dra. Rafaella de Paula"
                className="relative rounded-[2rem] shadow-2xl z-10 w-full"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 space-y-8"
          >
            <div className="space-y-4 text-center md:text-left">
              <span className="text-acento uppercase tracking-[0.2em] text-[10px] font-bold">
                Quem é Dra. Rafaella
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-primaria leading-tight">
                Medicina que investiga de verdade.
              </h2>
            </div>

            <div className="space-y-6 text-muted-foreground leading-relaxed text-center md:text-left">
              <p>
                Me chamo Rafaella, sou médica com dedicação à nutrologia. Cuido de menopausa, lipedema, obesidade, deficiências nutricionais e envelhecimento saudável.
              </p>
              <p>
                Meu trabalho é com pessoas que carregam sintomas que o mundo aprendeu a normalizar. Que foram ao médico, ouviram que estava "tudo normal" e continuaram sofrendo.
              </p>
              <p>
                Aqui você encontra medicina baseada em evidência, atualizada, e um espaço onde você nunca será reduzida a um número no laudo.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              {credentials.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-fundo border border-acento-2/10">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm font-medium text-primaria">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
