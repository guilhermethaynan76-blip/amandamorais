import React from 'react';
import { motion } from 'framer-motion';
import { WhatsAppButton } from '../WhatsAppButton';

const specialties = [
  {
    title: "Lipedema",
    description: "Condição frequentemente confundida com obesidade comum. Com diagnóstico correto e protocolo adequado, é possível ter qualidade de vida real.",
    image: "https://images.unsplash.com/photo-1579165466541-7183b6f90551?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Menopausa",
    description: "Mais do que fogachos. A menopausa afeta metabolismo, humor, peso e sono. Cuidado especializado faz diferença.",
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Obesidade",
    description: "Além da balança. Entendendo a obesidade como doença crônica e tratando com ciência, individualidade e respeito.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Hormônios",
    description: "Desequilíbrios hormonais que causam sintomas reais e que exames padrão frequentemente não capturam.",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Efeito Sanfona",
    description: "Para quem já tentou tudo e não consegue manter. Investigamos a causa real e criamos estratégia sustentável.",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Deficiências Nutricionais",
    description: "Carências que causam fadiga, queda de cabelo, baixa imunidade e muito mais. Diagnóstico preciso e reposição.",
    image: "https://images.unsplash.com/photo-1471864190281-ad5f9f8162e6?auto=format&fit=crop&q=80&w=800"
  }
];

export const Specialties = () => {
  return (
    <section id="especialidades" className="py-24 bg-fundo-2">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primaria mb-4">O que eu cuido</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Condições que a medicina tradicional muitas vezes normaliza e que merecem, finalmente, um olhar mais cuidadoso.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialties.map((specialty, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group bg-fundo rounded-2xl overflow-hidden shadow-sm border border-acento-2/10 hover:border-acento-2/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-primaria mb-4">{specialty.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                  {specialty.description}
                </p>
                <WhatsAppButton className="w-full bg-transparent border border-acento-2/30 text-primaria hover:bg-acento-2/10">
                  Saiba mais
                </WhatsAppButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
