import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-[68px] overflow-hidden">
      {/* Radial gradient glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 65% 35%, rgba(255,92,26,0.18) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 15% 80%, rgba(124,58,237,0.08) 0%, transparent 65%)",
        }}
      />
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 py-16">
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted-foreground text-base font-light mb-3"
        >
          Agência criativa especializada em
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display font-extrabold leading-[0.93] tracking-tighter text-foreground"
          style={{ fontSize: "clamp(68px, 9.5vw, 128px)" }}
        >
          Design<em className="text-primary not-italic block">que Vende.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-[17px] text-muted-foreground max-w-[360px] leading-[1.75] mt-5 mb-10"
        >
          Transformamos marcas em experiências visuais que geram conexão, autoridade e resultados reais. Do social ao digital.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap gap-4"
        >
          <Link to="/projetos" className="btn-primary">
            Ver Nossos Projetos →
          </Link>
          <Link to="/contato" className="btn-ghost">
            Solicitar Orçamento
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex gap-3 mt-14 flex-wrap"
        >
          {[
            { icon: "📱", label: "Social Media Design" },
            { icon: "◈", label: "Brand Design" },
            { icon: "🌐", label: "Web Design" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-secondary border border-border rounded-full px-5 py-2.5 text-[13px] text-secondary-foreground flex items-center gap-2 hover:border-primary hover:bg-primary/5 transition-all"
            >
              <span className="text-[15px]">{s.icon}</span>
              {s.label}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[11px] text-muted-foreground tracking-[0.1em] uppercase">scroll</span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  );
};

export default Hero;
