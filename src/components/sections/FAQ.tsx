import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { WhatsAppButton } from '../WhatsAppButton';

const faqs = [
  {
    q: "Você atende quais condições?",
    r: "Cuido de lipedema, menopausa, obesidade, hormônios desregulados, efeito sanfona, deficiências nutricionais e envelhecimento saudável. Meu foco são pessoas que tiveram seus sintomas normalizados e merecem um olhar mais cuidadoso."
  },
  {
    q: "Como funciona a consulta online?",
    r: "A consulta acontece por videochamada. Antes mesmo de nos encontrarmos, já envio a solicitação de exames para chegar preparada e investigar de verdade. Toda a atenção é sua durante o tempo da consulta."
  },
  {
    q: "Qual a diferença entre a consulta avulsa e o programa de 4 meses?",
    r: "A consulta avulsa é para quem quer clareza e uma conduta pontual. O programa de 4 meses é para quem busca acompanhamento contínuo, com ajustes ao longo do processo e suporte em cada etapa."
  },
  {
    q: "Você trata lipedema?",
    r: "Sim. Lipedema é uma das minhas especialidades. Muitas mulheres chegam com diagnóstico errado ou sem diagnóstico. Com investigação correta e protocolo adequado, é possível ter qualidade de vida real."
  },
  {
    q: "É possível emagrecer de forma sustentável?",
    r: "Sim, mas exige investigação real. O efeito sanfona não é falta de força de vontade. É falta do protocolo certo para o seu metabolismo e histórico."
  },
  {
    q: "Você prescreve medicamentos?",
    r: "Sou médica e posso prescrever quando necessário, sempre com critério e explicação clara. Mas o foco é investigar a causa, não apenas tratar sintomas."
  },
  {
    q: "Atende todo o Brasil?",
    r: "Sim, as consultas são 100% online e atendo todo o Brasil."
  },
  {
    q: "Como faço para agendar?",
    r: "Me chama no WhatsApp. Conversamos sobre o que você está vivendo e agendamos sua consulta."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-fundo-2">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primaria mb-4">Perguntas Frequentes</h2>
          <p className="text-muted-foreground">Tudo o que você precisa saber sobre o atendimento.</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-acento-2/20">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full py-6 flex items-center justify-between text-left group"
              >
                <span className={`text-lg font-bold transition-colors ${openIndex === idx ? 'text-acento' : 'text-primaria'}`}>
                  {faq.q}
                </span>
                <div className={`transition-transform duration-300 ${openIndex === idx ? 'rotate-90' : ''}`}>
                  {openIndex === idx ? <Minus className="text-acento" /> : <Plus className="text-acento-2 group-hover:text-acento" />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-muted-foreground leading-relaxed">
                      {faq.r}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <WhatsAppButton className="bg-transparent border border-acento text-primaria hover:bg-acento hover:text-fundo">
            Ainda tem dúvidas? Me chama
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
};
