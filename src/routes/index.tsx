import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useSpring, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amanda Morais | Influenciadora & Estrategista Digital" },
      {
        name: "description",
        content:
          "Influenciadora de lifestyle e estrategista digital. Publis, parcerias, gestão de redes sociais e consultoria de Instagram para marcas que querem crescer com estratégia.",
      },
    ],
  }),
  component: Page,
});

const WA_NUMBER = "5519997682485";
const IG_HANDLE = "amandamoraaiis_";

const waLink = (text: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

/* ------------------------ ICONS ------------------------ */
function WAIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function IGIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.054 1.804.249 2.226.413a3.71 3.71 0 011.345.875c.415.415.672.812.875 1.345.164.422.36 1.057.413 2.226.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.804-.413 2.226a3.71 3.71 0 01-.875 1.345 3.71 3.71 0 01-1.345.875c-.422.164-1.057.36-2.226.413-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.804-.249-2.226-.413a3.71 3.71 0 01-1.345-.875 3.71 3.71 0 01-.875-1.345c-.164-.422-.36-1.057-.413-2.226C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.054-1.17.249-1.804.413-2.226a3.71 3.71 0 01.875-1.345A3.71 3.71 0 014.903 2.7c.422-.164 1.057-.36 2.226-.413C8.395 2.212 8.78 2.2 12 2.2zm0 2.16c-3.146 0-3.5.012-4.736.068-.99.045-1.527.21-1.884.35-.474.184-.812.404-1.168.76-.356.356-.576.694-.76 1.168-.14.357-.305.894-.35 1.884C3.046 8.5 3.034 8.854 3.034 12s.012 3.5.068 4.736c.045.99.21 1.527.35 1.884.184.474.404.812.76 1.168.356.356.694.576 1.168.76.357.14.894.305 1.884.35 1.236.056 1.59.068 4.736.068s3.5-.012 4.736-.068c.99-.045 1.527-.21 1.884-.35.474-.184.812-.404 1.168-.76.356-.356.576-.694.76-1.168.14-.357.305-.894.35-1.884.056-1.236.068-1.59.068-4.736s-.012-3.5-.068-4.736c-.045-.99-.21-1.527-.35-1.884a3.14 3.14 0 00-.76-1.168 3.14 3.14 0 00-1.168-.76c-.357-.14-.894-.305-1.884-.35C15.5 4.372 15.146 4.36 12 4.36zM12 7.838a4.162 4.162 0 110 8.324 4.162 4.162 0 010-8.324zm0 6.864a2.702 2.702 0 100-5.404 2.702 2.702 0 000 5.404zm5.302-7.027a.972.972 0 11-1.944 0 .972.972 0 011.944 0z" />
    </svg>
  );
}

/* ------------------------ LEAD MODAL EVENT BUS ------------------------ */
type LeadDetail = { message: string; redirect: string };
const LEAD_EVENT = "open-lead-modal";
function openLead(message: string, redirect?: string) {
  const detail: LeadDetail = {
    message,
    redirect: redirect || waLink(message),
  };
  window.dispatchEvent(new CustomEvent<LeadDetail>(LEAD_EVENT, { detail }));
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6 },
} as const;

/* ------------------------ PAGE ------------------------ */
function Page() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen bg-[var(--dark)] text-[var(--off-white)] overflow-x-hidden">
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-[var(--rosa)] z-[60] origin-left"
      />
      <Navbar />
      <Hero />
      <About />
      <Stats />
      <Brands />
      <Services />
      <Portfolio />
      <Feedbacks />
      <Quiz />
      <FinalCTA />
      <FAQ />
      <Footer />
      <FloatingWA />
      <LeadModal />
    </div>
  );
}

/* ------------------------ NAVBAR ------------------------ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#sobre", label: "Sobre" },
    { href: "#servicos", label: "Serviços" },
    { href: "#marcas", label: "Para Marcas" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--dark)]/85 backdrop-blur-xl border-b border-[var(--rosa)]/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-4 flex items-center justify-between">
        <a href="#top" className="font-display italic text-2xl text-[var(--rosa)]">
          Amanda Morais
        </a>
        <nav className="hidden lg:flex items-center gap-8 text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[var(--off-white)]/80 hover:text-[var(--rosa)] transition"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <button
          onClick={() => openLead("Oi Amanda, gostaria de falar com você.")}
          className="hidden md:inline-flex items-center gap-2 bg-[var(--rosa)] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[var(--magenta)] transition shadow-rosa"
        >
          Fale Comigo
        </button>
        <button
          aria-label="Menu"
          className="lg:hidden p-2 text-[var(--off-white)]"
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
            className="lg:hidden overflow-hidden bg-[var(--dark)]/95 backdrop-blur-xl border-t border-[var(--rosa)]/20"
          >
            <div className="px-5 py-5 flex flex-col gap-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-2 text-[var(--off-white)]/90"
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  openLead("Oi Amanda, gostaria de falar com você.");
                }}
                className="mt-2 inline-flex items-center justify-center gap-2 bg-[var(--rosa)] text-white px-5 py-3 rounded-full text-sm font-medium"
              >
                Fale Comigo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ------------------------ PARTICLES ------------------------ */
function GlitterCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; r: number; vy: number; life: number; max: number; hue: 0 | 1 };
    const colors = ["rgba(232,86,122,", "rgba(244,200,140,"];
    let parts: P[] = [];

    const spawn = () => {
      const r = canvas.getBoundingClientRect();
      parts.push({
        x: Math.random() * r.width,
        y: r.height + 10,
        r: Math.random() * 1.8 + 0.6,
        vy: -(Math.random() * 0.6 + 0.25),
        life: 0,
        max: 180 + Math.random() * 180,
        hue: Math.random() > 0.5 ? 0 : 1,
      });
    };

    const tick = () => {
      const r = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, r.width, r.height);
      if (parts.length < 120 && Math.random() > 0.4) spawn();
      parts = parts.filter((p) => p.life < p.max && p.y > -10);
      for (const p of parts) {
        p.life++;
        p.y += p.vy;
        p.x += Math.sin(p.life * 0.03) * 0.3;
        const alpha = Math.sin((p.life / p.max) * Math.PI) * 0.9;
        ctx.beginPath();
        ctx.fillStyle = `${colors[p.hue]}${alpha.toFixed(3)})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.hue === 0 ? "#E8567A" : "#F4C88C";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} className={`absolute inset-0 w-full h-full ${className}`} />;
}

/* ------------------------ HERO ------------------------ */
function Hero() {
  return (
    <section
      id="top"
      className="relative bg-[var(--dark)] overflow-hidden"
      style={{ paddingTop: 80 }}
    >
      <GlitterCanvas />
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_30%,rgba(232,86,122,0.18),transparent_60%)] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-14 lg:py-24 grid lg:grid-cols-[55%_45%] gap-10 lg:gap-12 items-center">
        {/* MOBILE: order Headline > Badge > Photo > Subtitle > CTAs */}
        <div className="flex flex-col items-center lg:items-start gap-4 lg:gap-5 text-center lg:text-left">
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2 font-display text-[clamp(2rem,3vw,3.5rem)] leading-[1.15] max-w-[480px] text-[var(--off-white)]"
          >
            Sua marca vai crescer. Ou vai crescer{" "}
            <span className="italic text-gradient-rosa">com estratégia</span>.
          </motion.h1>

          <motion.span
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="order-2 lg:order-1 glass px-4 py-2 rounded-full font-title text-[12px] tracking-wide text-[var(--off-white)]/90"
          >
            Influenciadora • Estrategista Digital • 7,4k seguidores
          </motion.span>

          {/* Photo (mobile only, between badge and subtitle) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="order-3 lg:hidden relative w-full max-w-[300px]"
          >
            <HeroPhoto />
          </motion.div>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="order-4 text-[15px] leading-[1.6] max-w-[460px] text-[var(--rosa-claro)]"
          >
            Influenciadora de lifestyle e autoestima com 4 anos de mercado e experiência real em
            agência de marketing. Conteúdo autêntico que conecta e vende.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="order-5 flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
          >
            <button
              onClick={() =>
                openLead(
                  "Oi Amanda, quero ser parceira da sua marca e fechar uma publi!",
                )
              }
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[var(--rosa)] text-white px-6 py-3.5 rounded-full text-sm font-medium hover:bg-[var(--magenta)] transition shadow-rosa"
            >
              Quero ser Parceira
            </button>
            <a
              href="#servicos"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[var(--rosa)]/50 text-[var(--off-white)] px-6 py-3.5 rounded-full text-sm font-medium hover:bg-[var(--rosa)]/10 transition"
            >
              Ver Serviços
            </a>
          </motion.div>
        </div>

        {/* Desktop photo column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex justify-center"
        >
          <HeroPhoto />
        </motion.div>
      </div>
    </section>
  );
}

function HeroPhoto() {
  return (
    <div className="relative w-full aspect-square max-w-[460px]">
      <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-[var(--rosa)]/60 via-[var(--magenta)]/30 to-[var(--rosa-claro)]/40 blur-2xl opacity-70" />
      <div className="relative w-full h-full rounded-[22px] overflow-hidden border border-[var(--rosa)]/40 shadow-rosa-lg bg-gradient-to-br from-[var(--magenta)]/30 to-[var(--rosa-claro)]/20">
        <img
          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80"
          alt="Amanda Morais"
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className="absolute bottom-3 right-3 rounded-[12px] px-4 py-2.5 font-title text-white text-[13px] backdrop-blur-md border border-white/20"
        style={{ background: "rgba(232,86,122,0.85)" }}
      >
        4 anos de mercado
      </div>
    </div>
  );
}

/* ------------------------ ABOUT ------------------------ */
function About() {
  const creds = ["Influenciadora há 4 anos", "Ex-agência de Marketing", "Mãe da Louise"];
  return (
    <section id="sobre" className="bg-[var(--rosa-po)] text-[var(--dark)] py-20 lg:py-28 px-5">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div {...fadeUp} className="flex justify-center">
          <motion.div
            whileHover={{ rotateY: 5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            style={{ perspective: 1000 }}
            className="relative w-[280px] h-[360px] lg:w-[420px] lg:h-[500px] rounded-[22px] overflow-hidden shadow-rosa-lg border border-[var(--rosa)]/30"
          >
            <img
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=900&q=80"
              alt="Amanda Morais"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        <div className="flex flex-col gap-6">
          <motion.h2
            {...fadeUp}
            className="font-display italic text-[clamp(2rem,3.6vw,3rem)] leading-[1.15] text-[var(--dark)]"
          >
            Oi, eu sou a Amanda. <br />
            Pode me chamar de <span className="text-[var(--rosa)]">Diva</span>.
          </motion.h2>

          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="flex flex-wrap gap-2">
            {creds.map((c) => (
              <span
                key={c}
                className="glass-light px-4 py-2 rounded-full font-title text-[12px] text-[var(--magenta)]"
              >
                {c}
              </span>
            ))}
          </motion.div>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[15.5px] leading-[1.7] text-[var(--dark)]/80"
          >
            Tenho 25 anos, sou mãe da Louise de 5 anos e apaixonada por redes sociais desde que
            entrei em uma agência de marketing e percebi que era ali que eu me encontrava. Larguei
            a faculdade, mergulhei no marketing digital e hoje trabalho ajudando marcas a crescerem
            com estratégia e autenticidade. Lifestyle, autoestima, maternidade e fitness fazem
            parte do meu conteúdo e da minha vida real.
          </motion.p>

          <motion.blockquote
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="border-l-4 border-[var(--rosa)] pl-5 py-1 font-display italic text-[18px] text-[var(--magenta)]"
          >
            "Toda hora esse mundo muda e toda hora a gente tem que estar estudando. É isso que me
            mantém na frente."
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}

/* ------------------------ STATS ------------------------ */
function Stat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const numMatch = value.match(/[\d,.]+/);
    const suffix = value.replace(numMatch?.[0] ?? "", "");
    if (!numMatch) {
      setDisplay(value);
      return;
    }
    const target = parseFloat(numMatch[0].replace(",", "."));
    const isFloat = numMatch[0].includes(",") || numMatch[0].includes(".");
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = target * eased;
      const formatted = isFloat ? current.toFixed(1).replace(".", ",") : Math.round(current).toString();
      setDisplay(`${formatted}${suffix}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="glass rounded-2xl p-7 lg:p-8 text-center"
    >
      <div className="font-display text-[clamp(2.4rem,4vw,3.4rem)] text-gradient-rosa leading-none">
        {display}
      </div>
      <div className="mt-3 font-title text-[12px] tracking-wider uppercase text-[var(--off-white)]/70">
        {label}
      </div>
    </motion.div>
  );
}

function Stats() {
  const stats = [
    { value: "7,4k", label: "Seguidores no Instagram" },
    { value: "4+", label: "Anos de mercado" },
    { value: "30+", label: "Marcas atendidas" },
    { value: "891", label: "Posts publicados" },
  ];
  return (
    <section className="bg-[var(--dark)] py-20 lg:py-28 px-5">
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((s, i) => (
          <Stat key={s.label} value={s.value} label={s.label} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------ BRANDS ------------------------ */
function Brands() {
  const cards = [
    {
      title: "Publi no Feed",
      text:
        "Posts patrocinados no Instagram com copy estratégico e estética alinhada à sua marca.",
    },
    {
      title: "Stories com Impacto",
      text:
        "Sequência de stories com call-to-action, link e engajamento real da audiência.",
    },
    {
      title: "Reels Patrocinados",
      text:
        "Vídeos curtos criativos com alta capacidade de alcance orgânico e conversão.",
    },
  ];
  return (
    <section id="marcas" className="bg-[var(--rosa-po)] text-[var(--dark)] py-20 lg:py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          {...fadeUp}
          className="font-display italic text-center text-[clamp(2rem,3.6vw,2.8rem)] leading-[1.2] text-[var(--dark)]"
        >
          Sua marca na vida real de uma <span className="text-[var(--rosa)]">Diva</span>
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-[15px] mt-4 text-[var(--dark)]/70 max-w-xl mx-auto"
        >
          Conteúdo autêntico que gera conexão e resultado para marcas que querem mais que números.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 mt-12">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-7 border border-[var(--rosa)]/15 hover:shadow-rosa transition-all duration-300 flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--rosa)]/10 flex items-center justify-center text-[var(--rosa)]">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l2.39 7.36H22l-6.19 4.5 2.39 7.36L12 16.72l-6.2 4.5 2.39-7.36L2 9.36h7.61L12 2z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl text-[var(--dark)]">{c.title}</h3>
              <p className="text-[14.5px] leading-[1.65] text-[var(--dark)]/70 flex-1">{c.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.3 }} className="text-center mt-12">
          <button
            onClick={() =>
              openLead(
                "Oi Amanda, quero fechar uma parceria com você para divulgar minha marca!",
              )
            }
            className="inline-flex items-center justify-center gap-2 bg-[var(--rosa)] text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-[var(--magenta)] transition shadow-rosa"
          >
            Quero uma Parceria
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------ SERVICES ------------------------ */
function Services() {
  const services = [
    {
      title: "Gestão de Redes Sociais",
      text:
        "Planejamento, criação de conteúdo, legendas, agendamento e análise de métricas. Você foca no seu negócio, eu cuido da sua presença digital.",
      msg: "Oi Amanda, quero contratar a gestão de redes sociais para minha marca.",
    },
    {
      title: "Consultoria de Instagram",
      text:
        "Análise completa do seu perfil, estratégia personalizada, posicionamento e plano de ação para crescer de forma consistente.",
      msg: "Oi Amanda, quero contratar uma consultoria de Instagram.",
    },
    {
      title: "Mentoria Individual",
      text:
        "Para quem quer aprender a gerir as próprias redes com estratégia. Encontros ao vivo com direcionamento personalizado.",
      msg: "Oi Amanda, quero saber sobre a mentoria individual.",
    },
  ];
  return (
    <section id="servicos" className="relative bg-[var(--dark)] py-20 lg:py-28 px-5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(232,86,122,0.12),transparent_70%)] pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        <motion.h2
          {...fadeUp}
          className="font-display italic text-center text-[clamp(2rem,3.6vw,2.8rem)] leading-[1.2] text-[var(--off-white)]"
        >
          Quer crescer nas redes?{" "}
          <span className="text-gradient-rosa">Eu faço isso por você.</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 mt-14">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl p-7 lg:p-8 flex flex-col gap-5 hover:shadow-rosa transition-all duration-300"
            >
              <div className="font-title text-[11px] tracking-[0.2em] uppercase text-[var(--rosa-claro)]">
                0{i + 1}
              </div>
              <h3 className="font-display text-[1.6rem] leading-tight text-[var(--off-white)]">
                {s.title}
              </h3>
              <p className="text-[14.5px] leading-[1.65] text-[var(--off-white)]/75 flex-1">
                {s.text}
              </p>
              <button
                onClick={() => openLead(s.msg)}
                className="inline-flex items-center justify-center gap-2 border border-[var(--rosa)]/60 text-[var(--rosa-claro)] px-5 py-3 rounded-full text-sm font-medium hover:bg-[var(--rosa)] hover:text-white hover:border-transparent transition"
              >
                Quero esse serviço
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------ QUIZ ------------------------ */
type QuizOption = { label: string; points: 0 | 1 | 2 | 3 };
type QuizQ = { q: string; options: QuizOption[] };

const QUIZ: QuizQ[] = [
  {
    q: "Sua marca tem presença ativa nas redes sociais?",
    options: [
      { label: "Não, mal postamos", points: 3 },
      { label: "Postamos às vezes", points: 2 },
      { label: "Postamos regularmente", points: 1 },
      { label: "Sim, temos estratégia definida", points: 0 },
    ],
  },
  {
    q: "Você sabe quem é o seu público ideal nas redes?",
    options: [
      { label: "Não faço ideia", points: 3 },
      { label: "Tenho uma noção", points: 2 },
      { label: "Conheço razoavelmente", points: 1 },
      { label: "Sim, muito bem definido", points: 0 },
    ],
  },
  {
    q: "Seus posts geram engajamento real (comentários, salvamentos, compartilhamentos)?",
    options: [
      { label: "Quase nenhum", points: 3 },
      { label: "Pouquinho", points: 2 },
      { label: "Razoável", points: 1 },
      { label: "Sim, bastante", points: 0 },
    ],
  },
  {
    q: "Você já tentou fechar parcerias com influenciadores mas não sabia por onde começar?",
    options: [
      { label: "Sim, é um mistério pra mim", points: 3 },
      { label: "Tentei mas não funcionou", points: 2 },
      { label: "Já fiz algumas", points: 1 },
      { label: "Tenho processo definido", points: 0 },
    ],
  },
  {
    q: "Seu conteúdo reflete a identidade e os valores da sua marca?",
    options: [
      { label: "Nem sei qual é minha identidade visual", points: 3 },
      { label: "Mais ou menos", points: 2 },
      { label: "Na maioria das vezes", points: 1 },
      { label: "Sim, totalmente alinhado", points: 0 },
    ],
  },
  {
    q: "Você converte seguidores em clientes pelas redes sociais?",
    options: [
      { label: "Nunca aconteceu", points: 3 },
      { label: "Raramente", points: 2 },
      { label: "Às vezes", points: 1 },
      { label: "Sim, com frequência", points: 0 },
    ],
  },
  {
    q: "Você tem tempo e conhecimento para gerir as redes da sua marca com estratégia?",
    options: [
      { label: "Não tenho nem um nem outro", points: 3 },
      { label: "Tenho tempo mas não sei como", points: 2 },
      { label: "Sei um pouco mas falta tempo", points: 1 },
      { label: "Sim, consigo gerir bem", points: 0 },
    ],
  },
];

function quizResult(score: number) {
  if (score >= 14) {
    return {
      title: "Sua marca está perdendo muito sem uma estratégia digital",
      text:
        "Seus resultados mostram que há muito espaço para crescer. Vamos trabalhar juntas?",
      cta: "Quero Crescer com Estratégia",
      msg: "Oi Amanda, fiz o quiz e quero saber como você pode ajudar minha marca a crescer.",
    };
  }
  if (score >= 7) {
    return {
      title: "Você está no caminho certo, mas pode ir muito mais longe",
      text:
        "Você já tem alguma estrutura, mas com a estratégia certa o resultado pode ser muito maior.",
      cta: "Quero Evoluir Minha Estratégia",
      msg: "Oi Amanda, fiz o quiz e quero evoluir minha presença digital.",
    };
  }
  return {
    title: "Você já tem uma boa base digital",
    text:
      "Mesmo assim, sempre tem espaço para crescer mais. Que tal conversarmos sobre novas estratégias?",
    cta: "Quero Novas Estratégias",
    msg: "Oi Amanda, fiz o quiz e gostaria de conversar sobre estratégias digitais.",
  };
}

/* ------------------------ PORTFOLIO ------------------------ */
const PORTFOLIO_ITEMS = [
  { brand: "@belezanatural", desc: "Publi no feed • Reels • Stories" },
  { brand: "@modafemme", desc: "Reels • Stories" },
  { brand: "@cafedaamanda", desc: "Publi no feed • Stories" },
  { brand: "@fitlifebr", desc: "Reels • Carrossel" },
  { brand: "@maelinda", desc: "Publi no feed • Reels" },
  { brand: "@skinglow", desc: "Stories • Reels" },
];

function Portfolio() {
  return (
    <section id="trabalhos" className="bg-[#FDF0F4] py-20 lg:py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-12">
          <h2 className="font-display text-[clamp(2rem,3.4vw,2.8rem)] text-[var(--dark)] leading-tight">
            Marcas que já <span className="italic text-[var(--rosa)]">brilharam aqui</span>
          </h2>
          <p className="mt-3 text-[#A03055] font-sans text-[15px]">
            Conteúdo real, resultado real.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_ITEMS.map((item, i) => (
            <motion.div
              key={item.brand}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-[16px] overflow-hidden shadow-[0_8px_24px_-8px_rgba(232,86,122,0.25)] hover:shadow-[0_14px_32px_-8px_rgba(232,86,122,0.35)] transition-shadow"
            >
              <div
                className="h-[200px] w-full flex flex-col items-center justify-center gap-2"
                style={{
                  background:
                    "linear-gradient(135deg, #FDE0E8 0%, #F8C8D6 100%)",
                }}
              >
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#E8567A" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
                <span className="font-title text-[12px] text-[#A07585]">[ foto do trabalho ]</span>
              </div>
              <div className="p-4">
                <div className="font-title text-[var(--rosa)] text-[14px]">{item.brand}</div>
                <p className="font-sans text-[13px] text-[#4a3338] mt-1">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={() =>
              openLead(
                "Oi Amanda, vi seu portfólio e quero fechar uma parceria.",
              )
            }
            className="inline-flex items-center gap-2 border-2 border-[var(--rosa)] text-[var(--rosa)] px-7 py-3.5 rounded-full text-sm font-medium hover:bg-[var(--rosa)] hover:text-white transition"
          >
            Quero ser a próxima
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------ FEEDBACKS ------------------------ */
const FEEDBACKS = [
  {
    text: "Trabalhar com a Amanda foi um divisor de águas. O conteúdo dela traz autenticidade real, a campanha bateu meta em uma semana.",
    name: "@belezanatural",
    role: "Parceira de publi",
  },
  {
    text: "Profissionalismo do briefing à entrega. As métricas superaram tudo que a gente já tinha feito com outras criadoras.",
    name: "@modafemme",
    role: "Parceira de publi",
  },
  {
    text: "Ela entende de estratégia, não só de conteúdo. Isso fez toda diferença no resultado da nossa campanha de lançamento.",
    name: "@cafedaamanda",
    role: "Parceira de publi",
  },
  {
    text: "Engajamento real, audiência que confia nela. Fechamos contrato anual depois da primeira publi, fala tudo né.",
    name: "@skinglow",
    role: "Parceira de publi",
  },
];

function Feedbacks() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = FEEDBACKS.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 4000);
    return () => clearInterval(id);
  }, [paused, total]);

  const go = (dir: number) => setIndex((i) => (i + dir + total) % total);

  return (
    <section className="bg-[#0D0709] py-20 lg:py-28 px-5">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-12">
          <h2 className="font-display text-[clamp(2rem,3.4vw,2.8rem)] text-[var(--off-white)] leading-tight">
            O que dizem sobre <span className="italic text-[var(--rosa)]">trabalhar comigo</span>
          </h2>
          <p className="mt-3 text-[#F4A0B5] font-sans text-[15px]">
            Marcas reais. Resultados reais. Palavras delas.
          </p>
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.5 }}
                className="glass border border-[var(--rosa)]/40 rounded-[20px] p-7 lg:p-10"
              >
                <div className="text-[var(--rosa)] font-display text-6xl leading-none mb-3">“</div>
                <p className="font-display italic text-[var(--off-white)] text-[16px] lg:text-[18px] leading-relaxed">
                  {FEEDBACKS[index].text}
                </p>
                <div className="my-6 h-px bg-[var(--rosa)]/30" />
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[var(--rosa)] to-[var(--magenta)] border border-[var(--rosa)]/50" />
                  <div className="flex-1">
                    <div className="font-title text-[var(--rosa)] text-[14px]">
                      {FEEDBACKS[index].name}
                    </div>
                    <div className="font-sans text-[12px] text-[#F4A0B5]">
                      {FEEDBACKS[index].role}
                    </div>
                    <div className="flex gap-0.5 mt-1 text-[var(--rosa)]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              aria-label="Anterior"
              onClick={() => go(-1)}
              className="w-10 h-10 rounded-full border border-[var(--rosa)]/50 text-[var(--rosa)] hover:bg-[var(--rosa)]/10 transition flex items-center justify-center"
            >
              ←
            </button>
            <div className="flex items-center gap-2">
              {FEEDBACKS.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-[var(--rosa)]" : "w-2 bg-[var(--rosa)]/30"
                  }`}
                />
              ))}
            </div>
            <button
              aria-label="Próximo"
              onClick={() => go(1)}
              className="w-10 h-10 rounded-full border border-[var(--rosa)]/50 text-[var(--rosa)] hover:bg-[var(--rosa)]/10 transition flex items-center justify-center"
            >
              →
            </button>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={() =>
              openLead(
                "Oi Amanda, vi os feedbacks e quero fechar uma parceria.",
              )
            }
            className="inline-flex items-center gap-2 bg-[var(--rosa)] text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-[var(--magenta)] transition shadow-rosa"
          >
            Quero esse resultado também
          </button>
        </div>
      </div>
    </section>
  );
}

function Quiz() {

  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const answer = (pts: number) => {
    const newScore = score + pts;
    if (step + 1 >= QUIZ.length) {
      setScore(newScore);
      setDone(true);
    } else {
      setScore(newScore);
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setScore(0);
    setDone(false);
  };

  const progress = ((step + (done ? 1 : 0)) / QUIZ.length) * 100;
  const result = done ? quizResult(score) : null;

  return (
    <section className="relative bg-[var(--dark)] py-20 lg:py-28 px-5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_100%,rgba(160,48,85,0.25),transparent_70%)] pointer-events-none" />
      <div className="relative max-w-3xl mx-auto text-center">
        <motion.h2
          {...fadeUp}
          className="font-display italic text-[clamp(2rem,3.6vw,2.8rem)] leading-[1.2] text-[var(--off-white)]"
        >
          Sua marca está deixando <span className="text-gradient-rosa">dinheiro na mesa?</span>
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[15px] mt-4 text-[var(--rosa-claro)]"
        >
          Responda 7 perguntas e descubra.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-3xl p-6 lg:p-10 mt-10 text-left shadow-rosa"
        >
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex items-center justify-between font-title text-[11px] tracking-[0.2em] uppercase text-[var(--rosa-claro)]">
                  <span>
                    Pergunta {step + 1} / {QUIZ.length}
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 mt-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4 }}
                    className="h-full bg-[var(--rosa)]"
                  />
                </div>

                <h3 className="font-display text-[1.6rem] lg:text-[1.9rem] leading-tight text-[var(--off-white)] mt-7">
                  {QUIZ[step].q}
                </h3>

                <div className="grid gap-3 mt-6">
                  {QUIZ[step].options.map((o) => (
                    <button
                      key={o.label}
                      onClick={() => answer(o.points)}
                      className="text-left px-5 py-4 rounded-xl border border-[var(--rosa)]/30 bg-white/5 hover:bg-[var(--rosa)]/15 hover:border-[var(--rosa)] transition text-[15px] text-[var(--off-white)]"
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center flex flex-col items-center gap-5"
              >
                <div className="w-16 h-16 rounded-full bg-[var(--rosa)]/15 border border-[var(--rosa)]/40 flex items-center justify-center text-[var(--rosa)]">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="font-display italic text-[1.8rem] lg:text-[2.2rem] leading-tight text-[var(--off-white)] max-w-xl">
                  {result!.title}
                </h3>
                <p className="text-[15.5px] text-[var(--rosa-claro)] leading-[1.6] max-w-md">
                  {result!.text}
                </p>
                <button
                  onClick={() => openLead(result!.msg)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[var(--rosa)] text-white px-6 py-4 rounded-full text-sm font-medium hover:bg-[var(--magenta)] transition shadow-rosa mt-2"
                >
                  <WAIcon size={18} /> {result!.cta}
                </button>
                <button
                  onClick={reset}
                  className="text-[13px] font-title tracking-wide uppercase text-[var(--off-white)]/60 hover:text-[var(--rosa)] transition"
                >
                  Refazer o quiz
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------ FINAL CTA ------------------------ */
function FinalCTA() {
  return (
    <section className="relative bg-[var(--dark)] py-24 lg:py-32 px-5 overflow-hidden">
      <GlitterCanvas />
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_50%,rgba(232,86,122,0.2),transparent_70%)] pointer-events-none" />
      <div className="relative max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        <motion.h2
          {...fadeUp}
          className="font-display italic text-[clamp(2rem,4vw,3.2rem)] leading-[1.15] text-[var(--off-white)]"
        >
          Pronta para ser uma <span className="text-gradient-rosa">marca Diva?</span>
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[16px] text-[var(--rosa-claro)] max-w-lg"
        >
          Vamos trabalhar juntas e fazer sua marca brilhar.
        </motion.p>
        <motion.button
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          onClick={() => openLead("Oi Amanda, quero falar com você agora!")}
          className="inline-flex items-center justify-center gap-2 bg-[var(--rosa)] text-white px-8 py-4 rounded-full text-base font-medium hover:bg-[var(--magenta)] transition shadow-rosa-lg"
        >
          <WAIcon /> Fale Comigo Agora
        </motion.button>
      </div>
    </section>
  );
}

/* ------------------------ FAQ ------------------------ */
const FAQS = [
  {
    q: "Como funciona uma parceria de publi?",
    a: "Você entra em contato, apresenta o produto ou serviço e alinhamos o formato do conteúdo, cronograma e valores. Todo conteúdo passa por aprovação da marca antes de ser publicado.",
  },
  {
    q: "Quais formatos de conteúdo você faz?",
    a: "Faço posts no feed, stories, reels e UGC (conteúdo de criadora). O formato ideal é definido de acordo com o objetivo da campanha.",
  },
  {
    q: "Como é feita a gestão de redes sociais?",
    a: "Inclui planejamento mensal de conteúdo, criação de arte e copy, agendamento e relatório de métricas. Trabalhamos com briefing mensal alinhado ao seu negócio.",
  },
  {
    q: "Você atende qualquer tipo de marca?",
    a: "Trabalho principalmente com marcas de lifestyle, beleza, moda, alimentação, maternidade e serviços. Se tiver dúvida se o seu nicho encaixa, é só me chamar para conversarmos.",
  },
  {
    q: "Qual é o prazo mínimo de contrato para gestão?",
    a: "O contrato mínimo é de 3 meses, para garantir que a estratégia tenha tempo de gerar resultados reais.",
  },
  {
    q: "A consultoria é presencial ou online?",
    a: "A consultoria é realizada de forma online, por videochamada, o que permite atender marcas e empreendedores de qualquer lugar do Brasil.",
  },
  {
    q: "Você tem mídia kit disponível?",
    a: "Sim. Após o primeiro contato, envio meu mídia kit completo com dados de audiência, engajamento, nichos de atuação e formatos disponíveis.",
  },
  {
    q: "Como faço para começar?",
    a: "É só clicar em Fale Comigo, preencher seus dados e te respondo no WhatsApp para entendermos como posso te ajudar.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-[var(--rosa-po)] text-[var(--dark)] py-20 lg:py-28 px-5">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          {...fadeUp}
          className="font-display italic text-center text-[clamp(2rem,3.6vw,2.8rem)] leading-[1.2] text-[var(--dark)]"
        >
          Perguntas <span className="text-[var(--rosa)]">frequentes</span>
        </motion.h2>

        <div className="mt-12 flex flex-col gap-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="bg-white rounded-2xl border border-[var(--rosa)]/15 overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-title font-semibold text-[15px] text-[var(--dark)]">
                    {f.q}
                  </span>
                  <span
                    className={`w-8 h-8 flex items-center justify-center rounded-full bg-[var(--rosa)]/10 text-[var(--rosa)] transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-[14.5px] leading-[1.65] text-[var(--dark)]/75">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------ FOOTER ------------------------ */
function Footer() {
  return (
    <footer className="bg-[var(--dark)] border-t border-[var(--rosa)]/20 py-12 px-5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <div className="font-display italic text-2xl text-[var(--rosa)]">Amanda Morais</div>
          <div className="font-title text-[12px] tracking-wide uppercase text-[var(--off-white)]/60 mt-1">
            Influenciadora & Estrategista Digital
          </div>
        </div>
        <a
          href={`https://instagram.com/${IG_HANDLE}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-[var(--off-white)]/80 hover:text-[var(--rosa)] transition"
        >
          <IGIcon /> @{IG_HANDLE}
        </a>
        <div className="text-[12px] text-[var(--off-white)]/50">
          © {new Date().getFullYear()} Amanda Morais. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

/* ------------------------ FLOATING WHATSAPP ------------------------ */
function FloatingWA() {
  return (
    <button
      onClick={() => openLead("Oi Amanda, quero falar com você no WhatsApp!")}
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-[80] w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform pulse-wa"
    >
      <WAIcon size={26} />
    </button>
  );
}

/* ------------------------ LEAD MODAL ------------------------ */
function LeadModal() {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<LeadDetail | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const onOpen = (e: Event) => {
      const ce = e as CustomEvent<LeadDetail>;
      setDetail(ce.detail);
      setOpen(true);
    };
    window.addEventListener(LEAD_EVENT, onOpen);
    return () => window.removeEventListener(LEAD_EVENT, onOpen);
  }, []);

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      setName("");
      setPhone("");
      setDetail(null);
    }, 250);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    const base = detail?.message || "Oi Amanda!";
    const text = `${base}\n\nNome: ${name}\nWhatsApp: ${phone}`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    close();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[var(--dark)]/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={close}
        >
          <motion.form
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            onSubmit={submit}
            className="w-full max-w-md bg-[#1a0d12] border border-[var(--rosa)]/30 rounded-3xl p-7 lg:p-9 shadow-rosa-lg relative"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Fechar"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[var(--off-white)]/70"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
            <h3 className="font-display italic text-2xl text-[var(--off-white)]">
              Vamos conversar?
            </h3>
            <p className="text-[13.5px] text-[var(--rosa-claro)] mt-1.5">
              Deixe seu contato e te chamo no WhatsApp.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <label className="flex flex-col gap-1.5">
                <span className="font-title text-[11px] tracking-[0.18em] uppercase text-[var(--off-white)]/60">
                  Nome
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Seu nome"
                  className="bg-white/5 border border-[var(--rosa)]/25 focus:border-[var(--rosa)] outline-none rounded-xl px-4 py-3 text-[var(--off-white)] placeholder-white/30 transition"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-title text-[11px] tracking-[0.18em] uppercase text-[var(--off-white)]/60">
                  WhatsApp
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="(00) 00000-0000"
                  className="bg-white/5 border border-[var(--rosa)]/25 focus:border-[var(--rosa)] outline-none rounded-xl px-4 py-3 text-[var(--off-white)] placeholder-white/30 transition"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-[var(--rosa)] text-white px-6 py-3.5 rounded-full text-sm font-medium hover:bg-[var(--magenta)] transition shadow-rosa"
            >
              <WAIcon size={18} /> Continuar no WhatsApp
            </button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
