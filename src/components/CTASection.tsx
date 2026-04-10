import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ctaBg from "@/assets/cta-bg.jpg";

const CTASection = () => (
  <section className="sec-pad">
    <div className="container mx-auto px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-[20px] md:rounded-[30px] overflow-hidden min-h-[480px]"
      >
        {/* Left - Image */}
        <div className="relative h-[300px] md:h-auto">
          <img
            src={ctaBg}
            alt="Creative workspace"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Right - Content */}
        <div className="bg-primary p-10 md:p-16 flex flex-col justify-center gap-6">
          <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-primary-foreground/60">
            Vamos trabalhar juntos
          </p>
          <h2
            className="font-display font-extrabold text-primary-foreground leading-[1.05]"
            style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
          >
            Sua marca merece design que funciona.
          </h2>
          <p className="text-primary-foreground/70 text-[15px] leading-[1.8] max-w-[400px]">
            Conte seu projeto. Respondemos em até 24h com uma proposta personalizada.
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            <Link
              to="/contato"
              className="btn-pill bg-primary-foreground text-primary px-7 py-3.5 font-bold text-[14px] hover:opacity-90 transition-opacity"
            >
              Fale Comigo →
            </Link>
            <Link
              to="/projetos"
              className="btn-pill border border-primary-foreground/30 text-primary-foreground px-6 py-3 text-[14px] hover:border-primary-foreground/60 transition-colors"
            >
              Ver Projetos
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
