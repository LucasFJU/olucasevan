import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { value: "08+", label: "Anos de Experiência" },
  { value: "120+", label: "Projetos Entregues" },
  { value: "45+", label: "Clientes Ativos" },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden mx-4 md:mx-6 rounded-b-[40px] md:rounded-b-[80px]">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-b-[40px] md:rounded-b-[80px]"
        style={{ backgroundImage: `url(${heroBg})`, backgroundPosition: "70% center" }}
      />

      {/* Dark overlay gradient from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5 rounded-b-[40px] md:rounded-b-[80px]" />

      {/* Content */}
      <div className="w-full max-w-[1600px] mx-auto relative z-10 pb-16 md:pb-24 pt-32 px-6 md:px-10">
        <div className="flex flex-col gap-16 md:gap-24">
          {/* Header area */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            {/* Headline - left side only */}
            <div className="max-w-[600px]">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-primary font-bold text-[18px] md:text-[28px] leading-[1.4] mb-4 flex items-center gap-3"
              >
                <span className="w-6 h-[3px] bg-primary rounded-full inline-block" />
                Olá, sou um
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-display font-extrabold leading-[0.95] tracking-tighter text-foreground"
                style={{ fontSize: "clamp(52px, 7.5vw, 110px)" }}
              >
                Diretor<br />
                <span className="text-primary">Criativo</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-6 flex flex-col gap-3 max-w-[480px]"
              >
                <p className="text-foreground/80 text-[15px] leading-[1.85]">
                  O bom design deve ser invisível. Crio identidades visuais, interfaces e marcas que conectam e convertem.
                </p>

                <div className="flex flex-wrap gap-3 mt-4">
                  <Link to="/projetos" className="btn-primary">
                    Ver Projetos →
                  </Link>
                  <Link to="/contato" className="btn-ghost border-foreground/20 text-foreground hover:border-primary/50 hover:bg-primary/5">
                    Solicitar Orçamento
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-10 md:gap-16"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="font-display text-[36px] md:text-[44px] font-extrabold text-foreground leading-none tracking-tight">
                  {s.value}
                </span>
                <span className="text-[11px] text-foreground/50 font-bold tracking-[0.12em] uppercase">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="hidden md:flex flex-col items-center gap-2 absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="w-[1px] h-8 bg-gradient-to-b from-primary to-transparent" />
            <span className="text-[10px] text-foreground/40 tracking-[0.2em] uppercase">Rolar</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
