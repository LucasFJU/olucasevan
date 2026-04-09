import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Dark overlay gradient from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 pb-20 md:pb-28 pt-32">
        <div className="max-w-[700px]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="w-8 h-[3px] bg-primary rounded-full" />
            <span className="text-muted-foreground text-sm font-light">Olá, sou um</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display font-extrabold leading-[0.93] tracking-tighter text-foreground"
            style={{ fontSize: "clamp(56px, 8.5vw, 120px)" }}
          >
            Diretor<br />
            <em className="text-primary not-italic">Criativo</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-[16px] text-muted-foreground max-w-[420px] leading-[1.75] mt-6 mb-10"
          >
            O bom design deve ser invisível. Crio identidades visuais, interfaces e marcas que conectam e convertem.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/projetos" className="btn-primary">
              Ver Projetos →
            </Link>
            <Link to="/contato" className="btn-ghost border-foreground/20 text-foreground hover:border-primary/50 hover:bg-primary/5">
              Solicitar Orçamento
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex gap-10 md:gap-16 mt-14 flex-wrap"
          >
            {[
              { n: "08+", l: "ANOS DE EXPERIÊNCIA" },
              { n: "120+", l: "PROJETOS ENTREGUES" },
              { n: "45+", l: "CLIENTES ATIVOS" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-[36px] md:text-[42px] font-extrabold text-foreground leading-none">
                  {s.n}
                </div>
                <div className="text-[11px] text-muted-foreground tracking-[0.08em] uppercase mt-2">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[11px] text-muted-foreground tracking-[0.1em] uppercase">rolar</span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  );
};

export default Hero;
