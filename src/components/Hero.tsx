import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  { num: "01", label: "Brand Strategy" },
  { num: "02", label: "Brand Identity Design" },
  { num: "03", label: "Packaging Design" },
  { num: "04", label: "Creative Direction" },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden mx-4 md:mx-6 rounded-b-[40px] md:rounded-b-[80px]">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-b-[40px] md:rounded-b-[80px]"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Dark overlay gradient from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 rounded-b-[40px] md:rounded-b-[80px]" />

      {/* Content */}
      <div className="w-full max-w-[1600px] mx-auto relative z-10 pb-16 md:pb-24 pt-32 px-6 md:px-10">
        <div className="flex flex-col gap-16 md:gap-24">
          {/* Header area */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            {/* Headline */}
            <div className="max-w-[1110px]">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-primary font-bold text-[20px] md:text-[30px] leading-[1.4] mb-5"
              >
                Olá, sou um
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-display font-extrabold leading-[0.95] tracking-tighter text-foreground"
                style={{ fontSize: "clamp(56px, 8.5vw, 116px)" }}
              >
                Diretor<br />
                Criativo
              </motion.h1>
            </div>

            {/* Right text + buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="max-w-[480px] flex flex-col gap-5"
            >
              <p className="text-foreground font-bold text-[18px] md:text-[22px] leading-[1.5]">
                O bom design deve ser invisível.
              </p>
              <p className="text-foreground/60 text-[15px] leading-[1.85]">
                Do logotipo à linguagem visual, crio marcas que conectam e convertem.
              </p>

              <div className="flex flex-wrap gap-3 mt-2">
                <Link to="/projetos" className="btn-primary">
                  Ver Projetos →
                </Link>
                <Link to="/contato" className="btn-ghost border-foreground/20 text-foreground hover:border-primary/50 hover:bg-primary/5">
                  Solicitar Orçamento
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Features bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
          >
            {features.map((f) => (
              <div key={f.num} className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-primary font-bold text-[15px]">#</span>
                  <span className="text-foreground font-bold text-[15px]">{f.num}</span>
                </div>
                <p className="text-foreground/80 text-[15px]">{f.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
