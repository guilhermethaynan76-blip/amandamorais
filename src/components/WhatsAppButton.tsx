import React, { useState } from 'react';
import { LeadCaptureModal } from './LeadCaptureModal';

interface WhatsAppButtonProps {
  children?: React.ReactNode;
  className?: string;
  pulsing?: boolean;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ children, className = "", pulsing = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-full transition-all duration-300 text-sm md:text-base ${
          pulsing ? 'animate-pulse' : ''
        } ${className}`}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M11.999 0C5.373 0 0 5.373 0 12c0 2.117.554 4.104 1.524 5.827L.057 23.428a.75.75 0 00.921.921l5.684-1.461A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.626 0 11.999 0zm0 21.75a9.733 9.733 0 01-4.96-1.355l-.355-.211-3.679.945.974-3.562-.232-.368A9.724 9.724 0 012.25 12c0-5.376 4.374-9.75 9.749-9.75S21.75 6.624 21.75 12 17.375 21.75 11.999 21.75z"/>
        </svg>
        {children || "Agendar consulta"}
      </button>
      <LeadCaptureModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
