import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-[60px] md:py-[120px] px-6 md:px-0">
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
          <div className="p-8 md:p-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-[600px]">
              <h2
                className="font-display text-foreground mb-4"
                style={{ fontSize: "clamp(28px, 5vw, 56px)", fontWeight: 400, lineHeight: 1.1 }}
              >
                Pronto para <span className="text-primary">vender mais</span> com design?
              </h2>
              <p className="text-muted-foreground text-[16px] md:text-[18px] leading-[1.5]">
                Conte seu projeto e receba uma proposta personalizada em até 24h. Sem compromisso.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/contato" className="btn-primary">
                Solicitar Orçamento →
              </Link>
              <span className="text-muted-foreground text-[13px] text-center">
                ⚡ Resposta em até 24h
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
