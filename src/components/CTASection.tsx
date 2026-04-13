import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-[120px] px-6 md:px-0">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, hsl(15 100% 50% / 0.15) 0%, hsl(var(--background)) 60%)"
          }}
        >
          <div className="p-12 md:p-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-[600px]">
              <h2
                className="font-display text-foreground mb-4"
                style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 400, lineHeight: 1.1 }}
              >
                Vamos <span className="text-primary">trabalhar</span> juntos?
              </h2>
              <p className="text-muted-foreground text-[18px] leading-[1.5]">
                Pronto para transformar sua marca? Conte seu projeto e receba uma proposta personalizada em até 24h.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/contato" className="btn-primary">
                Start Your Project →
              </Link>
              <Link to="/projetos" className="btn-ghost">
                View Work
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
