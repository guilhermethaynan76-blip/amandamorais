import React from 'react';
import { motion } from 'framer-motion';

export const MirrorSection = () => {
  const phrases = [
    "Cansada sem explicação.",
    "Com exames normais.",
    "E sem respostas."
  ];

  return (
    <section className="py-24 md:py-32 bg-fundo-escuro text-center relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-acento-2 uppercase tracking-[0.2em] text-[10px] font-bold mb-12 block"
        >
          Se você chegou até aqui, provavelmente já se sentiu assim:
        </motion.span>

        <div className="space-y-12 max-w-4xl mx-auto">
          {phrases.map((phrase, idx) => (
            <React.Fragment key={idx}>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="cormorant italic text-4xl md:text-6xl lg:text-7xl text-white"
              >
                "{phrase}"
              </motion.h2>
              {idx < phrases.length - 1 && (
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100px" }}
                  viewport={{ once: true }}
                  className="h-px bg-acento/30 mx-auto" 
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 max-w-2xl mx-auto"
        >
          <p className="text-acento-2 text-lg md:text-xl leading-relaxed">
            "Você nunca será reduzida a um número no laudo.
            O espaço e o momento são inteiramente seus."
          </p>
        </motion.div>
      </div>
    </section>
  );
};
