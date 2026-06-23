import React from 'react';
import { WhatsAppButton } from '../WhatsAppButton';

export const FinalCTA = () => {
  return (
    <section id="contato" className="py-24 md:py-32 bg-fundo-escuro relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-acento/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="cormorant italic text-4xl md:text-7xl text-white mb-8 leading-tight">
          O espaço e o momento <br className="hidden md:block" />
          são inteiramente seus.
        </h2>
        <p className="text-acento-2 text-lg md:text-xl mb-12 max-w-2xl mx-auto opacity-90">
          Se quiser começar essa jornada comigo, é só me chamar.
        </p>
        
        <div className="flex flex-col items-center gap-6">
          <WhatsAppButton 
            pulsing 
            className="bg-acento text-fundo hover:bg-white hover:text-primaria px-12 py-5 text-lg shadow-2xl"
          >
            Quero agendar minha consulta
          </WhatsAppButton>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] md:text-[13px] text-white/50 uppercase tracking-widest font-medium pt-8 border-t border-white/10 w-full max-w-3xl">
            <span>CRM-SP 267.644</span>
            <span>Nutrologia</span>
            <span>Consulta Online</span>
            <span>Todo o Brasil</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="py-12 bg-[#110E0C] text-white/60 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-display italic text-2xl text-white mb-1">Dra. Rafaella de Paula</span>
            <span className="text-[10px] tracking-widest uppercase opacity-50">CRM-SP 267.644 • Nutrologia</span>
          </div>

          <div className="flex flex-col items-center gap-2">
             <a 
              href="https://instagram.com/drarafaelladepaula" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-acento-2 transition-colors flex items-center gap-2"
             >
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
               </svg>
               @drarafaelladepaula
             </a>
          </div>

          <div className="text-[10px] text-center md:text-right max-w-[300px] leading-relaxed uppercase tracking-tighter opacity-40">
            Lipedema • Menopausa • Obesidade • Emagrecimento • Online
            <br />
            © {new Date().getFullYear()} Dra. Rafaella de Paula. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};
