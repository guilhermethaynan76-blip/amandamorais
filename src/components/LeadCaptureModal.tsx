import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const message = encodeURIComponent(`Olá Dra. Rafaella, meu nome é ${name} e gostaria de informações sobre a consulta.`);
    window.open(`https://wa.me/5517997772500?text=${message}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-md bg-fundo rounded-2xl p-8 shadow-2xl border border-acento-2/20"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-primaria/50 hover:text-primaria transition-colors"
            >
              <X size={24} />
            </button>

            <h3 className="cormorant italic text-3xl text-primaria mb-2">
              Antes de continuar...
            </h3>
            <p className="text-muted-foreground mb-6">
              Me conta um pouquinho sobre você:
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primaria mb-1">
                  Nome completo
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full px-4 py-3 rounded-xl border border-acento-2/30 focus:border-acento-2 focus:ring-2 focus:ring-acento-2/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primaria mb-1">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(00) 00000-0000"
                  className="w-full px-4 py-3 rounded-xl border border-acento-2/30 focus:border-acento-2 focus:ring-2 focus:ring-acento-2/20 outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-acento text-fundo py-4 rounded-xl font-medium hover:bg-primaria transition-colors flex items-center justify-center gap-2 group"
              >
                Continuar para o WhatsApp
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
