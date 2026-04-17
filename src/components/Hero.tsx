import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import profilePhoto from "@/assets/profile-photo-new.png";
import heroBg from "@/assets/hero-bg.png";

const SocialIcon = ({ type }: { type: string }) => {
  const icons: Record<string, JSX.Element> = {
    Dribbble: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.245.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" />
      </svg>
    ),
    LinkedIn: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    Behance: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.63.166-1.27.25-1.95.25H0V4.51h6.938v-.007zM6.545 10.16c.6 0 1.09-.163 1.47-.494.382-.33.572-.788.572-1.372 0-.325-.06-.602-.183-.83-.12-.228-.29-.418-.5-.568-.21-.15-.46-.26-.75-.33-.28-.07-.6-.1-.94-.1H3.32v3.7h3.23l-.005-.006zm.185 5.89c.38 0 .73-.04 1.06-.13.33-.09.61-.22.85-.4.24-.177.43-.41.56-.7.13-.29.19-.64.19-1.05 0-.84-.24-1.46-.73-1.86-.49-.4-1.14-.6-1.95-.6H3.32v4.74h3.41zm9.158-9.86v1.38h4.86V7.58h-4.86v-1.39zm2.518 10.69c.47.47 1.12.7 1.95.7.56 0 1.06-.14 1.47-.42.42-.28.68-.57.79-.87h2.6c-.42 1.3-1.05 2.24-1.9 2.82-.85.58-1.87.87-3.08.87-.83 0-1.58-.13-2.27-.4-.68-.27-1.27-.65-1.76-1.14-.49-.49-.87-1.08-1.14-1.77-.27-.69-.41-1.45-.41-2.29 0-.82.14-1.57.41-2.25.28-.68.66-1.27 1.15-1.76.49-.49 1.08-.88 1.76-1.15.68-.27 1.43-.41 2.24-.41.91 0 1.72.17 2.43.52.7.35 1.29.83 1.76 1.45.47.62.82 1.34 1.04 2.16.22.82.31 1.71.27 2.66h-7.73c.04.96.34 1.72.81 2.19v.01zM19.68 12.24c-.38-.42-1-.63-1.76-.63-.5 0-.92.08-1.27.25-.35.17-.63.38-.85.63-.22.25-.37.53-.47.83-.1.3-.16.57-.18.82h5.12c-.1-.82-.4-1.47-.79-1.9h.2z" />
      </svg>
    ),
    Instagram: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  };

  return icons[type] || null;
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Background image */}
      <img
        src={heroBg}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />
      {/* Subtle overlay to keep text legible */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--background) / 0.55) 0%, hsl(var(--background) / 0.25) 45%, transparent 70%)",
        }}
      />

      {/* Full-bleed Profile Photo background */}
      <motion.img
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        src={profilePhoto}
        alt="Lucas Evan — Designer de Marcas"
        className="absolute inset-0 w-full h-full object-cover z-[2] pointer-events-none"
        style={{ objectPosition: "70% center" }}
      />

      {/* Floating glassmorphism cards (over the figure) */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, x: 20, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="hidden md:block absolute right-[20%] top-[20%] w-[250px] h-[180px] rounded-2xl border border-white/30 bg-white/[0.08] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_32px_rgba(0,0,0,0.35)] z-[3] pointer-events-none"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0, x: 30, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.9, delay: 0.75 }}
        className="hidden md:block absolute right-[6%] top-[50%] w-[280px] h-[200px] rounded-2xl border border-white/30 bg-white/[0.08] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_32px_rgba(0,0,0,0.35)] z-[3] pointer-events-none"
      />

      {/* Content */}
      <div className="w-full max-w-[1200px] mx-auto relative z-10 pt-[100px] md:pt-[140px] pb-[30px] md:pb-0 px-6 md:px-0">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 md:gap-10">
          {/* Left — Headline */}
          <div className="md:w-[50%] md:pb-[80px]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-[13px] font-medium">Disponível para novos projetos</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-normal leading-[1] tracking-[-0.02em] text-foreground"
              style={{ fontSize: "clamp(36px, 6vw, 76px)" }}
            >
              Design estratégico que{" "}
              <span className="text-primary">posiciona</span> sua marca e{" "}
              <span className="text-primary">converte</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted-foreground text-[16px] md:text-[18px] leading-[1.6] mt-6 max-w-[460px]"
            >
              Ajudo empresas a vender mais com identidades visuais, social media e sites que geram autoridade e atraem clientes todos os dias.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              <Link to="/contato" className="btn-primary">
                Solicitar Orçamento →
              </Link>
              <Link to="/projetos" className="btn-ghost">
                Ver Projetos
              </Link>
            </motion.div>

            {/* Social Icons — inline on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="hidden md:flex gap-3 mt-10"
            >
              {["Dribbble", "LinkedIn", "Behance", "Instagram"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-10 h-10 rounded-full border border-foreground/[0.08] bg-foreground/[0.04] flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-colors"
                  aria-label={s}
                >
                  <SocialIcon type={s} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — spacer to keep desktop grid balance */}
          <div className="hidden md:block md:w-[55%] lg:w-[58%]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
