import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(15 100% 50% / 0.12), transparent 70%), hsl(var(--background))"
        }}
      />

      {/* Content */}
      <div className="w-full max-w-[1200px] mx-auto relative z-10 pt-[195px] pb-0 px-6 md:px-0">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12 md:gap-10">
          {/* Left — Headline */}
          <div className="md:w-[60%]">
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-normal leading-[1] tracking-[-0.02em] text-foreground"
              style={{ fontSize: "clamp(54px, 7vw, 88px)" }}
            >
              Experiências Digitais que <span className="text-primary">Funcionam</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground text-[18px] leading-[1.5] mt-6 max-w-[400px]"
            >
              Crio experiências digitais que conectam marcas a pessoas — com design estratégico, interfaces intuitivas e comunicação visual.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-2 mt-8"
            >
              <Link to="/projetos" className="btn-primary">
                Ver Projetos →
              </Link>
              <Link to="/contato" className="btn-ghost">
                Solicitar Orçamento
              </Link>
            </motion.div>
          </div>

          {/* Right — Social + Showreel card */}
          <div className="md:w-[30%] flex flex-col justify-between gap-8">
            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex md:flex-col md:items-end gap-3"
            >
              {["Dribbble", "LinkedIn", "Behance"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-10 h-10 rounded-full border border-foreground/[0.08] bg-foreground/[0.04] flex items-center justify-center text-foreground text-[14px] hover:border-primary hover:text-primary transition-colors"
                  aria-label={s}
                >
                  {s[0]}
                </a>
              ))}
            </motion.div>

            {/* Showreel card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="rounded-lg border border-foreground/[0.08] bg-foreground/[0.04] overflow-hidden"
            >
              <div className="flex items-center justify-between px-3 pt-2">
                <span className="text-[13px] text-foreground font-medium">Showreel</span>
                <span className="text-[13px] text-primary font-medium">// 2025</span>
              </div>
              <div className="h-[200px] md:h-[220px] bg-card flex items-center justify-center m-2 rounded-md overflow-hidden relative">
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--border)) 0%, hsl(var(--background)) 100%)"
                  }}
                />
                <button className="relative z-10 w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar — Clients + Feature tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 border-t border-border py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          {/* Client logos (text placeholders) */}
          <div className="flex items-center gap-8">
            {["Startup Lab", "Nova Digital", "Brandhaus"].map((name) => (
              <span key={name} className="text-[14px] text-muted-foreground/40 font-medium tracking-wider uppercase">
                {name}
              </span>
            ))}
          </div>

          {/* Copyright */}
          <span className="text-[14px] text-muted-foreground">
            <span className="text-primary">//</span> ©2025 Folioblox. Todos os direitos reservados.
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
