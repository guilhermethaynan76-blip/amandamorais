import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';

const testimonials = [
  {
    content: "Finalmente alguém que me ouviu. Depois de anos ouvindo que meu cansaço era 'normal', a Dra. Rafaella investigou e mudou minha vida.",
    author: "Paciente S.M."
  },
  {
    content: "O tratamento para Lipedema foi um divisor de águas. O diagnóstico correto fez toda a diferença que eu buscava há décadas.",
    author: "Paciente L.R."
  },
  {
    content: "A consulta online é super completa. Ela enviou o pedido de exames antes e já chegou na reunião sabendo exatamente o que eu tinha.",
    author: "Paciente M.F."
  }
];

export const Testimonials = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <section className="py-24 bg-fundo">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primaria mb-4 italic">
            O que dizem quem finalmente encontrou respostas
          </h2>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((t, idx) => (
              <div key={idx} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_33.33%] px-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="h-full bg-fundo-2 p-10 rounded-3xl border border-acento-2/20 flex flex-col"
                >
                  <div className="text-acento mb-6 text-4xl font-serif">“</div>
                  <p className="text-primaria/80 leading-relaxed mb-8 flex-grow">
                    {t.content}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-acento/10 border border-acento/20" />
                    <span className="font-bold text-primaria text-sm">{t.author}</span>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
