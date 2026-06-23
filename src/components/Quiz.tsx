import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WhatsAppButton } from './WhatsAppButton';

interface Question {
  id: number;
  text: string;
  options: { label: string; value: 'A' | 'B' | 'C' | 'D' }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "O que mais te incomoda hoje?",
    options: [
      { label: "Cansaço que não melhora com descanso", value: 'A' },
      { label: "Dificuldade de emagrecer mesmo fazendo tudo certo", value: 'B' },
      { label: "Sintomas da menopausa que estão afetando minha vida", value: 'C' },
      { label: "Suspeita de lipedema ou gordura que não sai com dieta", value: 'D' },
    ],
  },
  {
    id: 2,
    text: "Você já passou por isso?",
    options: [
      { label: "Fiz exames e ouvi que estava tudo normal", value: 'A' },
      { label: "Já tentei várias dietas e o peso volta sempre", value: 'B' },
      { label: "Meu corpo mudou muito nos últimos anos", value: 'C' },
      { label: "Sinto dor ou inchaço em pernas e braços", value: 'D' },
    ],
  },
  {
    id: 3,
    text: "O que você mais quer resolver?",
    options: [
      { label: "Entender por que me sinto tão cansada", value: 'A' },
      { label: "Emagrecer de forma sustentável de verdade", value: 'B' },
      { label: "Controlar os sintomas da menopausa", value: 'C' },
      { label: "Investigar se tenho lipedema ou problema hormonal", value: 'D' },
    ],
  },
  {
    id: 4,
    text: "Como está sua relação com o peso?",
    options: [
      { label: "Não é meu problema principal, é o cansaço", value: 'A' },
      { label: "Luto contra o efeito sanfona há anos", value: 'B' },
      { label: "Engordei na menopausa e não consigo reverter", value: 'C' },
      { label: "Tenho gordura que não responde a nada", value: 'D' },
    ],
  },
  {
    id: 5,
    text: "O que você espera de uma consulta?",
    options: [
      { label: "Finalmente ter respostas para o que sinto", value: 'A' },
      { label: "Um plano real que eu consiga manter", value: 'B' },
      { label: "Cuidado específico para meu momento de vida", value: 'C' },
      { label: "Diagnóstico preciso e protocolo adequado", value: 'D' },
    ],
  },
];

const results = {
  A: {
    title: "Você merece respostas de verdade 🤍",
    text: "Cansaço sem explicação, exames normais e sintomas ignorados. Você não está exagerando. Sua condição merece investigação real, não normalização.",
    message: "Olá Dra. Rafaella, fiz o teste e quero investigar meus sintomas"
  },
  B: {
    title: "Emagrecimento real começa com diagnóstico real 🔬",
    text: "O efeito sanfona não é falta de força de vontade. É falta do protocolo certo para o seu metabolismo. Vamos investigar a causa e criar um plano que funcione para a sua vida.",
    message: "Olá Dra. Rafaella, fiz o teste e quero resolver o efeito sanfona"
  },
  C: {
    title: "Menopausa não precisa ser assim 💊",
    text: "Seu corpo está passando por uma mudança real e seus sintomas merecem atenção especializada. Com cuidado adequado, qualidade de vida é possível nessa fase.",
    message: "Olá Dra. Rafaella, fiz o teste e quero cuidar da menopausa e hormônios"
  },
  D: {
    title: "Seus sintomas podem ter um nome 🩺",
    text: "Lipedema é frequentemente confundido e subdiagnosticado. Com investigação correta e protocolo adequado, é possível ter qualidade de vida real. Vamos investigar juntas.",
    message: "Olá Dra. Rafaella, fiz o teste e quero investigar lipedema"
  }
};

export const Quiz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<('A' | 'B' | 'C' | 'D')[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: 'A' | 'B' | 'C' | 'D') => {
    const newAnswers = [...answers, value];
    if (step < questions.length - 1) {
      setAnswers(newAnswers);
      setStep(step + 1);
    } else {
      setAnswers(newAnswers);
      setShowResult(true);
    }
  };

  const getMajority = () => {
    const counts = answers.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b) as 'A' | 'B' | 'C' | 'D';
  };

  const result = showResult ? results[getMajority()] : null;

  return (
    <div className="max-w-2xl mx-auto bg-fundo-2 rounded-3xl p-8 md:p-12 shadow-sm border border-acento-2/10">
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-acento">Pergunta {step + 1} de {questions.length}</span>
              <div className="w-48 h-1.5 bg-acento-2/20 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-acento-2"
                  initial={{ width: 0 }}
                  animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-primaria leading-tight">
              {questions[step].text}
            </h3>

            <div className="grid gap-4">
              {questions[step].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full text-left px-6 py-4 rounded-xl border border-acento-2/20 bg-fundo hover:border-acento-2 hover:bg-fundo-2 transition-all duration-300 group flex items-center justify-between"
                >
                  <span className="text-lg text-primaria/80 group-hover:text-primaria">{option.label}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="inline-block p-4 rounded-full bg-acento/10 text-acento mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-primaria leading-tight">
              {result?.title}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {result?.text}
            </p>
            <div className="pt-6">
              <WhatsAppButton className="bg-acento text-fundo hover:bg-primaria shadow-xl w-full md:w-auto mx-auto">
                Falar com a Dra. Rafaella
              </WhatsAppButton>
            </div>
            <button 
              onClick={() => { setStep(0); setAnswers([]); setShowResult(false); }}
              className="text-acento hover:underline text-sm block mx-auto"
            >
              Refazer teste
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
