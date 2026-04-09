import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTASection = () => (
  <section className="sec-pad">
    <div className="container mx-auto px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-lg p-12 md:p-20 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(var(--primary)) 0%, #c03000 55%, hsl(var(--background)) 100%)" }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.025'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`
        }} />
        <div className="relative z-10">
          <p className="tag-label mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>Vamos trabalhar juntos</p>
          <h2
            className="font-display font-extrabold text-foreground mb-4"
            style={{ fontSize: "clamp(38px, 6vw, 72px)" }}
          >
            Sua marca merece design que funciona.
          </h2>
          <p className="text-muted-foreground text-base max-w-[440px] mx-auto mb-8 leading-[1.8]" style={{ color: "rgba(255,255,255,0.75)" }}>
            Conte seu projeto. Respondemos em até 24h com uma proposta personalizada.
          </p>
          <Link
            to="/contato"
            className="btn-ghost border-foreground/30 text-foreground hover:bg-foreground/10 hover:border-foreground/60"
          >
            Fale Comigo →
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
