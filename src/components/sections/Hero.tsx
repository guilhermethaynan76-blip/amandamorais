import React from 'react';
import { motion } from 'framer-motion';
import { WhatsAppButton } from '../WhatsAppButton';

export const Hero = () => {
  return (
    <section className="relative min-h-screen pt-24 md:pt-32 pb-16 flex items-center bg-fundo overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          
          {/* Column Text (Left on Desktop) */}
          <div className="w-full md:w-[55%] flex flex-col items-center md:items-start gap-6 md:gap-6 z-10 order-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="cormorant italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primaria leading-[1.15] text-center md:text-left max-w-[480px] order-1 md:-mt-16 lg:-mt-24"
            >
              Cansada sem explicação, com exames normais e sem respostas?
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="px-4 py-1.5 rounded-full border border-acento-2 bg-acento-2/5 text-acento text-[11px] md:text-[12px] font-bold tracking-widest uppercase self-center md:self-start order-2"
            >
              Médica Nutróloga • CRM-SP 267.644 • Online
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full md:hidden order-3 my-2"
            >
              <img 
                src="https://res.cloudinary.com/dkwpz87nw/image/upload/v1781290048/ChatGPT_Image_12_de_jun._de_2026_15_46_04_1_ypod7r.png" 
                alt="Dra. Rafaella de Paula"
                className="w-full h-auto rounded-2xl shadow-xl border border-acento-2/20"
              />

            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[15px] md:text-lg text-muted-foreground leading-relaxed text-center md:text-left max-w-[460px] order-4"
            >
              Eu cuido exatamente dessas pessoas. Daquelas que carregam sintomas que o mundo aprendeu a normalizar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 w-full justify-center md:justify-start order-5"
            >
              <WhatsAppButton className="bg-acento text-fundo hover:bg-primaria shadow-xl w-full sm:w-auto">
                Quero agendar minha consulta
              </WhatsAppButton>
              <a 
                href="#sobre"
                className="px-8 py-3.5 rounded-full border border-acento-2/30 text-primaria font-medium hover:bg-acento-2/5 transition-all text-center"
              >
                Conhecer o trabalho
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center md:justify-start gap-y-2 gap-x-6 text-[12px] text-muted-foreground order-6 text-center md:text-left"
            >
              <span>✓ Lipedema • Menopausa • Obesidade</span>
              <span>✓ Medicina baseada em evidências</span>
              <span>✓ Online</span>
            </motion.div>
          </div>

          {/* Column Photo (Desktop) */}
          <div className="hidden md:block w-full md:w-[45%] h-full relative z-0 order-2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-radial-gradient from-acento/20 to-transparent blur-3xl rounded-full" />
              <img 
                src="https://res.cloudinary.com/dkwpz87nw/image/upload/v1781290048/ChatGPT_Image_12_de_jun._de_2026_15_46_04_1_ypod7r.png" 
                alt="Dra. Rafaella de Paula"
                className="relative z-10 w-full h-auto object-cover rounded-3xl"
              />

              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-acento/10 blur-3xl rounded-full -z-10" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
