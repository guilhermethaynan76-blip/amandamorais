import React, { useState, useEffect } from 'react';
import { WhatsAppButton } from '../WhatsAppButton';

export const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <nav className={`fixed top-0 w-full z-50 bg-fundo/90 backdrop-blur-md border-b border-acento-2/20 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-display italic text-lg md:text-xl text-primaria leading-tight">Dra. Rafaella de Paula</span>
          <span className="text-[9px] md:text-[10px] tracking-widest text-muted-foreground uppercase hidden sm:block">CRM-SP 267.644 • Nutrologia</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-primaria">
          {['Sobre', 'Especialidades', 'Consultas', 'FAQ', 'Contato'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-acento transition-colors">
              {item}
            </a>
          ))}
        </div>
        <WhatsAppButton className="bg-acento text-fundo hover:bg-primaria shadow-sm" />
      </div>
    </nav>
  );
};
