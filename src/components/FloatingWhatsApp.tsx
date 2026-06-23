import React from 'react';
import { WhatsAppButton } from './WhatsAppButton';

export const FloatingWhatsApp = () => {
  return (
    <div className="fixed bottom-6 right-6 z-[90]">
      <WhatsAppButton 
        className="!p-4 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-300"
      >
        <span className="sr-only">WhatsApp</span>
      </WhatsAppButton>
    </div>
  );
};
