import React from 'react';
import { motion } from 'framer-motion';
import { WhatsAppButton } from '../WhatsAppButton';

export const ConsultationWork = () => {
  return (
    <section id="consultas" className="py-24 bg-fundo">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-acento uppercase tracking-[0.2em] text-[10px] font-bold mb-4 block">
            Como é a consulta comigo
          </span>
          <h2 className="cormorant italic text-4xl md:text-5xl lg:text-6xl text-primaria leading-tight mb-8">
            Uma consulta que começa antes mesmo de nos encontrarmos.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Assim que você agenda, já envio a solicitação de exames, porque quero chegar preparada para investigar de verdade e construir com você um plano que faça sentido para a sua vida.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl bg-fundo-2 border border-acento-2/20 flex flex-col items-start"
          >
            <h3 className="text-2xl font-bold text-primaria mb-4">Consulta Avulsa</h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              "Para quem quer clareza e uma conduta pontual. Uma consulta completa, com investigação real e orientações precisas para o seu caso."
            </p>
            <div className="mt-auto w-full">
              <WhatsAppButton className="w-full bg-acento text-fundo hover:bg-primaria">
                Quero a consulta avulsa
              </WhatsAppButton>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl bg-primaria text-fundo flex flex-col items-start"
          >
            <h3 className="text-2xl font-bold text-acento-2 mb-4">Programa de 4 Meses</h3>
            <p className="text-fundo/70 leading-relaxed mb-8">
              "Para quem busca acompanhamento contínuo e resultado real. Acompanhamento próximo, ajustes ao longo do processo e suporte em cada etapa."
            </p>
            <div className="mt-auto w-full">
              <WhatsAppButton className="w-full bg-acento-2 text-primaria hover:bg-fundo">
                Quero saber sobre o programa
              </WhatsAppButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
