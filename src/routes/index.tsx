import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Camila Strieder | Psicóloga Clínica, Perita Judicial e Assistente Técnica" },
      {
        name: "description",
        content:
          "Psicologia clínica em TCC, perícia judicial junto ao TJPR e avaliações psicológicas para procedimentos cirúrgicos e empresas. Cascavel, PR e online.",
      },
    ],
  }),
  component: Page,
});

const WA_NUMBER = "5545988389822";
const EMAIL = "psicamilastrieder@gmail.com";
const IG = "psicamilastrieder";

const waLink = (text: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

function WAIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M11.999 0C5.373 0 0 5.373 0 12c0 2.117.554 4.104 1.524 5.827L.057 23.428a.75.75 0 00.921.921l5.684-1.461A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.626 0 11.999 0zm0 21.75a9.733 9.733 0 01-4.96-1.355l-.355-.211-3.679.945.974-3.562-.232-.368A9.724 9.724 0 012.25 12c0-5.376 4.374-9.75 9.749-9.75S21.75 6.624 21.75 12 17.375 21.75 11.999 21.75z" />
    </svg>
  );
}

const LEAD_EVENT = "open-lead-modal";
function openLead(message: string) {
  window.dispatchEvent(new CustomEvent(LEAD_EVENT, { detail: { message } }));
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6 },
} as const;

function Page() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen bg-[var(--fundo)] text-[var(--primaria)]">
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-[var(--acento)] z-[60] origin-left"
      />
      <Navbar />
      <Hero />
      <Impact />
      <Services />
      <ForWhom />
      <About />
      <Location />
      <QuizSection />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
      <FloatingWA />
      <LeadModal />
    </div>
  );
}

/* ------------------------ NAVBAR ------------------------ */
function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 100 && y > lastY.current);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#sobre", label: "Sobre" },
    { href: "#servicos", label: "Serviços" },
    { href: "#avaliacoes", label: "Avaliações" },
    { href: "#faq", label: "FAQ" },
    { href: "#contato", label: "Contato" },
  ];

  return (
    <motion.header
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[var(--fundo)]/95 backdrop-blur border-b border-[var(--acento)]/30"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-3 flex items-center justify-between">
        <a href="#top" className="leading-tight">
          <div className="font-display italic text-xl text-[var(--primaria)]">Camila Strieder</div>
          <div className="text-[10px] tracking-wide uppercase text-[var(--primaria)]/60">
            Psicóloga Clínica • Perita Judicial • Assistente Técnica
          </div>
        </a>
        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[var(--primaria)]/80 hover:text-[var(--acento)] transition">
              {l.label}
            </a>
          ))}
        </nav>
        <button
          onClick={() => openLead("Olá Camila, gostaria de agendar um atendimento.")}
          className="hidden md:inline-flex items-center justify-center gap-2 bg-[var(--acento)] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition"
        >
          <WAIcon size={18} /> Agendar atendimento
        </button>
        <button
          aria-label="Menu"
          className="lg:hidden p-2 text-[var(--primaria)]"
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-[var(--fundo)] border-t border-[var(--acento)]/20"
          >
            <div className="px-5 py-4 flex flex-col gap-3">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 text-[var(--primaria)]">
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  openLead("Olá Camila, gostaria de agendar um atendimento.");
                }}
                className="mt-2 inline-flex items-center justify-center gap-2 bg-[var(--acento)] text-white px-5 py-3 rounded-full text-sm font-medium"
              >
                <WAIcon size={18} /> Agendar atendimento
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ------------------------ HERO ------------------------ */
function Hero() {
  return (
    <section id="top" className="bg-[var(--fundo)] pt-24 lg:pt-28 pb-16 lg:pb-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-[55%_45%] gap-10 lg:gap-12 items-center">
        <div className="flex flex-col items-center lg:items-start gap-4 text-center lg:text-left order-2 lg:order-1">
          <motion.span
            {...fadeUp}
            className="hidden lg:inline-block px-4 py-1.5 rounded-full bg-[var(--acento)]/10 text-[var(--acento)] text-[12px] tracking-wide font-title font-semibold"
          >
            Psicóloga Clínica • Perita Judicial • Assistente Técnica TJPR • Cascavel, PR
          </motion.span>
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="hidden lg:block font-display italic text-[clamp(2rem,3vw,3.5rem)] leading-[1.15] max-w-[480px] text-[var(--primaria)]"
          >
            Psicologia clínica, jurídica e avaliação. Com rigor, ética e acolhimento.
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[15px] leading-[1.5] max-w-[460px] text-[var(--primaria)]/75"
          >
            TCC para demandas clínicas e psicopatológicas. Perícia e assistência técnica junto ao TJPR. Avaliações para procedimentos cirúrgicos e empresas. Cascavel, PR e online.
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
          >
            <button
              onClick={() => openLead("Olá Camila, quero agendar meu atendimento.")}
              className="inline-flex items-center justify-center gap-2 bg-[var(--acento)] text-white px-6 py-3.5 rounded-full text-sm font-medium hover:opacity-90 transition"
            >
              <WAIcon /> Quero agendar meu atendimento
            </button>
            <a
              href="#servicos"
              className="inline-flex items-center justify-center gap-2 border border-[var(--acento)]/40 text-[var(--primaria)] px-6 py-3.5 rounded-full text-sm font-medium hover:bg-[var(--acento)]/10 transition"
            >
              Ver serviços
            </a>
          </motion.div>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-1.5 text-[12px] text-[var(--primaria)]/60 pt-2"
          >
            <span>✓ TCC</span>
            <span>✓ Perita Judicial TJPR</span>
            <span>✓ Avaliações Psicológicas</span>
            <span>✓ Cascavel, PR e Online</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="order-1 lg:order-2 flex flex-col items-center justify-center relative gap-4"
        >
          <div className="lg:hidden flex flex-col items-center gap-3 text-center">
            <h1 className="font-display italic text-[2rem] leading-[1.15] text-[var(--primaria)] max-w-[340px]">
              Psicologia clínica, jurídica e avaliação. Com rigor, ética e acolhimento.
            </h1>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--acento)]/10 text-[var(--acento)] text-[12px] tracking-wide font-title font-semibold">
              Clínica • Jurídica • Avaliação
            </span>
          </div>
          <div className="relative w-[260px] h-[340px] lg:w-[380px] lg:h-[480px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(43,82,160,0.28),transparent_70%)] blur-2xl" />
            <div className="relative w-full h-full rounded-[36%] overflow-hidden bg-gradient-to-br from-[var(--fundo-2)] to-[var(--acento)]/20 border border-[var(--acento)]/25">
              <img
                src="https://res.cloudinary.com/dkwpz87nw/image/upload/v1782222298/image_36_vdkbhn.png"
                alt="Camila Strieder"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------ IMPACT ------------------------ */
function Impact() {
  return (
    <section className="bg-[var(--fundo-escuro)] py-24 lg:py-32 px-5">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
        <motion.h2
          {...fadeUp}
          className="font-display italic text-white text-[clamp(1.8rem,4vw,3rem)] leading-[1.2]"
        >
          Psicologia com rigor científico e presença humana.
        </motion.h2>
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-px w-24 bg-[var(--acento-2)]"
        />
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[var(--acento-2)] text-[15px] max-w-2xl leading-[1.6]"
        >
          Clínica, jurídica ou avaliação, cada demanda recebe a atenção especializada que merece.
        </motion.p>
      </div>
    </section>
  );
}

/* ------------------------ SERVICES ------------------------ */
function Services() {
  const cards = [
    {
      title: "Psicoterapia Clínica (TCC)",
      text:
        "Acompanhamento para transtornos de ansiedade, pânico, fobia social, depressão, transtornos alimentares, bipolar, regulação emocional, habilidades sociais, autoestima, burnout e outras demandas. Ética, acolhimento e TCC.",
      cta: "Quero psicoterapia",
      msg: "Olá Camila, quero saber sobre psicoterapia clínica",
    },
    {
      title: "Psicologia Jurídica",
      text:
        "Atuação como Perita Judicial e Assistente Técnica junto ao Tribunal de Justiça do Paraná. Para advogados, partes e instituições que precisam de laudo técnico especializado.",
      cta: "Preciso de perícia judicial",
      msg: "Olá Camila, preciso de serviço de perícia ou assistência técnica",
    },
    {
      title: "Avaliações Psicológicas",
      text:
        "Avaliações para cirurgia bariátrica, laqueadura e vasectomia. Avaliações psicossociais para empresas e instituições. Laudos completos com rigor técnico.",
      cta: "Preciso de avaliação psicológica",
      msg: "Olá Camila, preciso de avaliação psicológica",
    },
  ];
  return (
    <section id="servicos" className="bg-[var(--fundo-2)] py-20 lg:py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          {...fadeUp}
          className="font-display italic text-center text-[clamp(1.8rem,3.4vw,2.8rem)] text-[var(--primaria)] mb-12 lg:mb-16"
        >
          Como posso te ajudar
        </motion.h2>
        <div className="grid lg:grid-cols-3 gap-5 lg:gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-[var(--fundo)] rounded-2xl p-7 border border-[var(--acento)]/20 flex flex-col gap-5"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--acento)]/10 flex items-center justify-center text-[var(--acento)] font-title font-bold">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-title text-lg text-[var(--primaria)] leading-tight">
                {c.title}
              </h3>
              <p className="text-[14px] leading-[1.6] text-[var(--primaria)]/75 flex-1">
                {c.text}
              </p>
              <button
                onClick={() => openLead(c.msg)}
                className="inline-flex items-center justify-center gap-2 bg-[var(--acento)] text-white px-5 py-3 rounded-full text-sm font-medium hover:opacity-90 transition"
              >
                <WAIcon size={18} /> {c.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------ FOR WHOM ------------------------ */
function ForWhom() {
  const items = [
    { icon: "😰", text: "Ansiedade, pânico ou fobia afetando minha vida" },
    { icon: "😔", text: "Depressão ou transtorno de humor que precisa de acompanhamento" },
    { icon: "🔥", text: "Burnout ou estresse crônico que não passa" },
    { icon: "⚖️", text: "Preciso de laudo pericial para processo jurídico" },
    { icon: "🏥", text: "Vou fazer cirurgia bariátrica e preciso de avaliação" },
    { icon: "🏢", text: "Minha empresa precisa de avaliação psicossocial" },
  ];
  return (
    <section className="bg-[var(--fundo)] py-20 lg:py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          {...fadeUp}
          className="font-display italic text-center text-[clamp(1.8rem,3.4vw,2.8rem)] text-[var(--primaria)] mb-12 lg:mb-16"
        >
          Você se reconhece em alguma dessas situações?
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {items.map((it, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-[var(--fundo-2)] rounded-2xl p-6 border border-[var(--acento)]/20 flex items-start gap-4"
            >
              <span className="text-2xl">{it.icon}</span>
              <p className="text-[15px] leading-[1.5] text-[var(--primaria)]/85">{it.text}</p>
            </motion.div>
          ))}
        </div>
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display italic text-center text-[clamp(1.4rem,2.6vw,2rem)] text-[var(--primaria)] mt-14 max-w-3xl mx-auto leading-[1.35]"
        >
          Cada demanda tem uma abordagem adequada. Vamos entender qual é a sua.
        </motion.p>
      </div>
    </section>
  );
}

/* ------------------------ ABOUT ------------------------ */
function About() {
  const creds = [
    "TCC",
    "Perita Judicial TJPR",
    "Avaliações Psicológicas",
    "Cascavel, PR e Online",
    "Psicologia Jurídica",
  ];
  return (
    <section id="sobre" className="bg-[var(--fundo-2)] py-20 lg:py-28 px-5">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div {...fadeUp} className="flex justify-center order-1">
          <div className="relative w-[260px] h-[340px] lg:w-[380px] lg:h-[460px] rounded-[32%] overflow-hidden bg-gradient-to-br from-[var(--fundo)] to-[var(--acento)]/15 border border-[var(--acento)]/25">
            <img
              src="https://res.cloudinary.com/dkwpz87nw/image/upload/v1782222888/image_38_arri4j.png"
              alt="Camila Strieder"
              className="w-full h-full object-cover"
            />
          </div>

        </motion.div>
        <div className="flex flex-col gap-5 text-center lg:text-left order-2">
          <motion.h2
            {...fadeUp}
            className="font-display italic text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.15]"
          >
            Rigor técnico, ética e compromisso com o bem-estar.
          </motion.h2>
          <motion.p {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="text-[15px] leading-[1.7] text-[var(--primaria)]/80">
            Sou Camila Strieder, psicóloga clínica pós-graduada em TCC e em formação em Avaliação Psicológica, com formações em Psicopatologia, Neurociência e Comportamento e Psicologia Jurídica. Atuo como Psicóloga Clínica, Perita Judicial e Assistente Técnica junto ao Tribunal de Justiça do Paraná. Realizo atendimentos presenciais em Cascavel, PR e online para todo o Brasil e brasileiros no exterior.
          </motion.p>
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-2 gap-3 pt-2">
            {creds.map((c) => (
              <div key={c} className="bg-[var(--fundo)] rounded-xl px-4 py-3 border border-[var(--acento)]/20 text-[13px] text-[var(--primaria)]/80 text-center lg:text-left">
                {c}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------ LOCATION ------------------------ */
function Location() {
  return (
    <section id="avaliacoes" className="bg-[var(--fundo)] py-20 lg:py-24 px-5">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          {...fadeUp}
          className="font-display italic text-center text-[clamp(1.8rem,3.4vw,2.6rem)] text-[var(--primaria)] mb-12"
        >
          Onde me encontrar
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-5">
          <motion.div {...fadeUp} className="bg-[var(--fundo-2)] rounded-2xl p-7 border border-[var(--acento)]/20">
            <div className="text-[11px] tracking-widest uppercase text-[var(--acento)] font-title font-bold mb-3">Presencial</div>
            <p className="text-[15px] leading-[1.6] text-[var(--primaria)]/85">
              Rua Souza Naves, 3983, Edifício Centro Comercial Lince, Sala 805, Cascavel, PR.
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="bg-[var(--fundo-2)] rounded-2xl p-7 border border-[var(--acento)]/20">
            <div className="text-[11px] tracking-widest uppercase text-[var(--acento)] font-title font-bold mb-3">Online</div>
            <p className="text-[15px] leading-[1.6] text-[var(--primaria)]/85">
              Atendimento para todo o Brasil e brasileiros no exterior.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------ QUIZ ------------------------ */
type QLetter = "A" | "B" | "C" | "D";
const QUIZ: { q: string; opts: { t: string; v: QLetter }[] }[] = [
  {
    q: "O que melhor descreve o que você precisa?",
    opts: [
      { t: "Acompanhamento psicológico para questões emocionais", v: "A" },
      { t: "Laudo ou perícia para processo jurídico", v: "B" },
      { t: "Avaliação para procedimento cirúrgico", v: "C" },
      { t: "Avaliação psicossocial para empresa", v: "D" },
    ],
  },
  {
    q: "Sua demanda é para quem?",
    opts: [
      { t: "Para mim, busco acompanhamento clínico", v: "A" },
      { t: "Para um processo judicial em andamento", v: "B" },
      { t: "Para cirurgia bariátrica, laqueadura ou vasectomia", v: "C" },
      { t: "Para minha empresa ou instituição", v: "D" },
    ],
  },
  {
    q: "Com qual urgência você precisa?",
    opts: [
      { t: "Quero iniciar acompanhamento o quanto antes", v: "A" },
      { t: "Tenho prazo judicial para apresentar laudo", v: "B" },
      { t: "Tenho data cirúrgica agendada", v: "C" },
      { t: "É um projeto corporativo com prazo definido", v: "D" },
    ],
  },
  {
    q: "Você está em Cascavel, PR ou prefere online?",
    opts: [
      { t: "Em Cascavel, prefiro presencial", v: "A" },
      { t: "Online, estou em outra cidade", v: "A" },
      { t: "Qualquer formato, o que importa é o laudo", v: "B" },
      { t: "Online ou presencial, conforme disponibilidade", v: "C" },
    ],
  },
  {
    q: "O que você espera do atendimento?",
    opts: [
      { t: "Acolhimento, técnica e melhora emocional", v: "A" },
      { t: "Laudo técnico com validade jurídica", v: "B" },
      { t: "Avaliação completa e laudo para o procedimento", v: "C" },
      { t: "Relatório psicossocial profissional", v: "D" },
    ],
  },
];

const RESULTS: Record<QLetter, { title: string; text: string; msg: string }> = {
  A: {
    title: "Psicoterapia com TCC é o seu caminho 🧠",
    text:
      "Atendimento clínico para demandas emocionais, psicopatológicas e transdiagnósticas, com abordagem TCC, ética e acolhimento real. Presencial em Cascavel, PR ou online.",
    msg: "Olá Camila, fiz o teste e quero iniciar psicoterapia",
  },
  B: {
    title: "Perícia e assistência técnica especializada ⚖️",
    text:
      "Atuação como Perita Judicial e Assistente Técnica junto ao TJPR. Laudos com rigor técnico e validade jurídica para o seu processo.",
    msg: "Olá Camila, fiz o teste e preciso de serviço de psicologia jurídica",
  },
  C: {
    title: "Avaliação psicológica para o seu procedimento 🏥",
    text:
      "Avaliações para bariátrica, laqueadura e vasectomia com laudo completo. Processo humanizado, ágil e tecnicamente fundamentado.",
    msg: "Olá Camila, fiz o teste e preciso de avaliação para procedimento cirúrgico",
  },
  D: {
    title: "Avaliação psicossocial para sua empresa 🏢",
    text:
      "Avaliações psicossociais completas para empresas e instituições, com metodologia técnica e relatórios estruturados.",
    msg: "Olá Camila, fiz o teste e preciso de avaliação psicossocial para empresa",
  },
};

function QuizSection() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QLetter[]>([]);

  const done = answers.length === QUIZ.length;
  const result = (() => {
    if (!done) return null;
    const counts: Record<string, number> = {};
    answers.forEach((a) => (counts[a] = (counts[a] || 0) + 1));
    const winner = (Object.keys(counts) as QLetter[]).reduce((a, b) =>
      counts[a] >= counts[b] ? a : b,
    );
    return RESULTS[winner];
  })();

  const pick = (v: QLetter) => {
    setAnswers((a) => [...a, v]);
    setStep((s) => s + 1);
  };
  const restart = () => {
    setStarted(false);
    setStep(0);
    setAnswers([]);
  };

  return (
    <section id="quiz" className="bg-[var(--fundo-2)] py-20 lg:py-28 px-5">
      <div className="max-w-3xl mx-auto">
        {!started && (
          <motion.div {...fadeUp} className="text-center flex flex-col items-center gap-5">
            <h2 className="font-display italic text-[clamp(1.8rem,3.4vw,2.8rem)] text-[var(--primaria)]">
              Qual é a sua necessidade hoje?
            </h2>
            <p className="text-[15px] text-[var(--primaria)]/75 max-w-xl">
              5 perguntas para entender qual serviço é o mais indicado.
            </p>
            <button
              onClick={() => setStarted(true)}
              className="inline-flex items-center justify-center gap-2 bg-[var(--acento)] text-white px-7 py-3.5 rounded-full text-sm font-medium hover:opacity-90 transition"
            >
              Descobrir agora →
            </button>
          </motion.div>
        )}

        {started && !done && (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-[var(--fundo)] rounded-2xl p-7 lg:p-10 border border-[var(--acento)]/20"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-[11px] tracking-widest uppercase text-[var(--acento)] font-title font-bold">
                Pergunta {step + 1} de {QUIZ.length}
              </span>
              <span className="text-[12px] text-[var(--primaria)]/60">
                {Math.round(((step) / QUIZ.length) * 100)}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-[var(--fundo-2)] rounded-full overflow-hidden mb-7">
              <motion.div
                animate={{ width: `${((step + 1) / QUIZ.length) * 100}%` }}
                transition={{ duration: 0.4 }}
                className="h-full bg-[var(--acento)]"
              />
            </div>
            <h3 className="font-title text-xl lg:text-2xl text-[var(--primaria)] mb-6 leading-snug">
              {QUIZ[step].q}
            </h3>
            <div className="flex flex-col gap-3">
              {QUIZ[step].opts.map((o, i) => (
                <button
                  key={i}
                  onClick={() => pick(o.v)}
                  className="text-left px-5 py-4 rounded-xl border border-[var(--acento)]/25 hover:bg-[var(--acento)]/5 hover:border-[var(--acento)] transition text-[14px] text-[var(--primaria)]/85"
                >
                  {o.t}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {done && result && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[var(--fundo)] rounded-2xl p-7 lg:p-10 border border-[var(--acento)]/30 text-center flex flex-col items-center gap-5"
          >
            <h3 className="font-display italic text-[clamp(1.6rem,3vw,2.4rem)] text-[var(--primaria)] leading-tight">
              {result.title}
            </h3>
            <p className="text-[15px] leading-[1.7] text-[var(--primaria)]/80 max-w-xl">
              {result.text}
            </p>
            <button
              onClick={() => openLead(result.msg)}
              className="inline-flex items-center justify-center gap-2 bg-[var(--acento)] text-white px-6 py-3.5 rounded-full text-sm font-medium hover:opacity-90 transition"
            >
              <WAIcon /> Falar com a Camila
            </button>
            <button
              onClick={restart}
              className="text-[13px] text-[var(--primaria)]/60 hover:text-[var(--acento)] transition"
            >
              Refazer o teste
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ------------------------ HOW IT WORKS ------------------------ */
function HowItWorks() {
  const steps = [
    "Entre em contato pelo WhatsApp",
    "Conversamos sobre o tipo de atendimento necessário",
    "Agendamos presencial em Cascavel ou online",
    "Início do processo com rigor, ética e acolhimento",
  ];
  return (
    <section className="bg-[var(--fundo)] py-20 lg:py-28 px-5">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          {...fadeUp}
          className="font-display italic text-center text-[clamp(1.8rem,3.4vw,2.6rem)] text-[var(--primaria)] mb-12 lg:mb-16"
        >
          Como funciona
        </motion.h2>
        <div className="relative flex flex-col gap-6">
          <div className="hidden lg:block absolute left-[27px] top-0 bottom-0 w-px bg-[var(--acento)]/40" />
          {steps.map((s, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex items-start gap-5"
            >
              <div className="shrink-0 w-14 h-14 rounded-full bg-[var(--acento)] text-white flex items-center justify-center font-title font-bold relative z-10">
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="text-[15px] lg:text-base text-[var(--primaria)]/85 pt-4 leading-[1.5]">
                {s}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------ TESTIMONIALS ------------------------ */
function Testimonials() {
  const items = [
    {
      quote:
        "Atendimento sério e técnico, com escuta verdadeira. Foi a primeira vez que me senti realmente compreendida em terapia.",
      who: "Paciente, atendimento clínico",
    },
    {
      quote:
        "Laudo pericial completo, claro e tecnicamente impecável. Recomendo o trabalho da Camila para qualquer demanda jurídica.",
      who: "Advogado parceiro",
    },
    {
      quote:
        "Fiz minha avaliação para bariátrica e o processo foi humano, organizado e dentro do prazo que minha equipe precisava.",
      who: "Paciente, avaliação cirúrgica",
    },
  ];
  return (
    <section className="bg-[var(--fundo-2)] py-20 lg:py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          {...fadeUp}
          className="font-display italic text-center text-[clamp(1.8rem,3.4vw,2.6rem)] text-[var(--primaria)] mb-12 lg:mb-16"
        >
          O que dizem pacientes e parceiros
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-[var(--fundo)] rounded-2xl p-7 border border-[var(--acento)]/25 flex flex-col gap-4"
            >
              <div className="font-display italic text-[var(--acento)] text-4xl leading-none">“</div>
              <p className="text-[14px] leading-[1.6] text-[var(--primaria)]/80 flex-1">
                {it.quote}
              </p>
              <div className="text-[12px] uppercase tracking-wider text-[var(--primaria)]/60 font-title font-semibold">
                {it.who}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------ FAQ ------------------------ */
function FAQ() {
  const items = [
    {
      q: "O que é Perita Judicial e Assistente Técnica?",
      a: "A Perita Judicial é nomeada pelo juiz para realizar avaliações técnicas em processos judiciais. A Assistente Técnica é indicada por uma das partes para acompanhar e contestar tecnicamente a perícia. Atuo junto ao Tribunal de Justiça do Paraná.",
    },
    {
      q: "Você realiza avaliação para cirurgia bariátrica?",
      a: "Sim. Realizo avaliação psicológica obrigatória para cirurgia bariátrica, laqueadura e vasectomia, com emissão de laudo técnico completo.",
    },
    {
      q: "Como funciona a avaliação psicossocial para empresas?",
      a: "É um processo estruturado para avaliar o perfil psicológico e social de colaboradores ou candidatos, com relatório técnico formal. Entre em contato para mais detalhes sobre o processo.",
    },
    {
      q: "Você atende online?",
      a: "Sim, atendo online para todo o Brasil e brasileiros no exterior. Os atendimentos presenciais são realizados em Cascavel, PR.",
    },
    {
      q: "Qual o endereço do consultório?",
      a: "Rua Souza Naves, 3983, Edifício Centro Comercial Lince, Sala 805, Cascavel, PR.",
    },
    {
      q: "Com que frequência são as sessões de psicoterapia?",
      a: "Geralmente uma vez por semana, ajustado conforme o caso.",
    },
    {
      q: "As sessões e laudos são sigilosos?",
      a: "Sim. O sigilo profissional é um princípio ético e legal garantido em todos os atendimentos e documentos emitidos.",
    },
    {
      q: "Como faço para agendar?",
      a: "Entre em contato pelo WhatsApp ou e-mail psicamilastrieder@gmail.com. Conversamos sobre a sua necessidade e agendamos.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-[var(--fundo-2)] py-20 lg:py-28 px-5">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          {...fadeUp}
          className="font-display italic text-center text-[clamp(1.8rem,3.4vw,2.6rem)] text-[var(--primaria)] mb-12"
        >
          Perguntas frequentes
        </motion.h2>
        <div className="flex flex-col gap-3">
          {items.map((it, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.3) }}
              className="bg-[var(--fundo)] rounded-xl border border-[var(--acento)]/20 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-5 lg:px-6 py-4 flex items-center justify-between gap-4"
              >
                <span className="font-title text-[15px] text-[var(--primaria)]">{it.q}</span>
                <span className="text-[var(--acento)] text-xl shrink-0">{open === i ? "×" : "+"}</span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 lg:px-6 pb-5 text-[14px] leading-[1.6] text-[var(--primaria)]/75">
                      {it.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button
            onClick={() => openLead("Olá Camila, ainda tenho dúvidas sobre o atendimento.")}
            className="inline-flex items-center justify-center gap-2 bg-[var(--acento)] text-white px-6 py-3.5 rounded-full text-sm font-medium hover:opacity-90 transition"
          >
            <WAIcon /> Ainda tem dúvidas? Me manda uma mensagem
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------ FINAL CTA ------------------------ */
function FinalCTA() {
  return (
    <section id="contato" className="bg-[var(--fundo-escuro)] py-24 lg:py-32 px-5">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        <motion.h2
          {...fadeUp}
          className="font-display italic text-white text-[clamp(1.9rem,4vw,3rem)] leading-[1.2]"
        >
          Clínica, jurídica ou avaliação. Cada demanda tem a atenção que merece.
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-[var(--acento-2)] text-[15px] max-w-xl leading-[1.6]"
        >
          Cascavel, PR e online para todo o Brasil e brasileiros no exterior.
        </motion.p>
        <motion.button
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.25 }}
          onClick={() => openLead("Olá Camila, quero agendar meu atendimento.")}
          className="inline-flex items-center justify-center gap-2 bg-[var(--acento)] text-white px-7 py-4 rounded-full text-sm font-medium hover:opacity-90 transition pulse-acento"
        >
          <WAIcon /> Quero agendar meu atendimento
        </motion.button>
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-[12px] text-white/60 tracking-wide"
        >
          TCC • Perita Judicial TJPR • Avaliações Psicológicas • Cascavel, PR
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------ FOOTER ------------------------ */
function Footer() {
  return (
    <footer className="bg-[#080F1C] text-white/75 py-12 px-5">
      <div className="max-w-6xl mx-auto flex flex-col gap-4 items-center text-center text-[13px] leading-[1.7]">
        <div className="font-display italic text-white text-xl">
          Camila Strieder
        </div>
        <div className="text-white/60">
          Psicóloga Clínica | Perita Judicial | Assistente Técnica
        </div>
        <div>Rua Souza Naves, 3983, Sala 805, Cascavel, PR</div>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <a href={`mailto:${EMAIL}`} className="hover:text-[var(--acento-2)] transition">
            {EMAIL}
          </a>
          <span className="opacity-40">•</span>
          <a
            href={`https://instagram.com/${IG}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--acento-2)] transition"
          >
            @{IG}
          </a>
        </div>
        <div className="text-white/50 text-[12px] tracking-wide pt-2">
          TCC • Psicologia Jurídica • Avaliações Psicológicas
        </div>
      </div>
    </footer>
  );
}

/* ------------------------ FLOATING WA ------------------------ */
function FloatingWA() {
  return (
    <button
      onClick={() => openLead("Olá Camila, quero agendar meu atendimento.")}
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-105 transition pulse-acento"
    >
      <WAIcon size={26} />
    </button>
  );
}

/* ------------------------ LEAD MODAL ------------------------ */
function LeadModal() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ message: string }>;
      setMsg(ce.detail?.message || "Olá Camila, gostaria de mais informações.");
      setOpen(true);
    };
    window.addEventListener(LEAD_EVENT, handler);
    return () => window.removeEventListener(LEAD_EVENT, handler);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    const full = `${msg}%0A%0ANome: ${encodeURIComponent(name)}%0AWhatsApp: ${encodeURIComponent(phone)}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${full}`, "_blank");
    setOpen(false);
    setName("");
    setPhone("");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-[var(--fundo)] rounded-2xl p-8 shadow-2xl border border-[var(--acento)]/20"
          >
            <button
              aria-label="Fechar"
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full text-[var(--primaria)]/60 hover:bg-[var(--fundo-2)] flex items-center justify-center"
            >
              ×
            </button>
            <h3 className="font-display italic text-2xl text-[var(--primaria)] mb-1">
              Antes de continuar...
            </h3>
            <p className="text-[14px] text-[var(--primaria)]/70 mb-6">
              Me conta um pouquinho sobre você:
            </p>
            <form onSubmit={submit} className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-[12px] uppercase tracking-wider text-[var(--primaria)]/60 font-title font-semibold">
                  Nome completo
                </span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="px-4 py-3 rounded-xl bg-[var(--fundo-2)] border border-[var(--acento)]/20 focus:border-[var(--acento)] focus:outline-none focus:ring-2 focus:ring-[var(--acento)]/30 text-[14px] text-[var(--primaria)]"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[12px] uppercase tracking-wider text-[var(--primaria)]/60 font-title font-semibold">
                  WhatsApp
                </span>
                <input
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(00) 00000-0000"
                  className="px-4 py-3 rounded-xl bg-[var(--fundo-2)] border border-[var(--acento)]/20 focus:border-[var(--acento)] focus:outline-none focus:ring-2 focus:ring-[var(--acento)]/30 text-[14px] text-[var(--primaria)]"
                />
              </label>
              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 bg-[var(--acento)] text-white px-6 py-3.5 rounded-full text-sm font-medium hover:opacity-90 transition"
              >
                <WAIcon size={18} /> Continuar para o WhatsApp →
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
