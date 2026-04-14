import { motion } from "framer-motion";
import { Smartphone, Palette, Layout } from "lucide-react";

const services = [
  "// Social Media Design",
  "// Brand Identity",
  "// Web Design",
  "// UI/UX Design",
  "// Estratégia Criativa",
];

const ServicesSection = () => {
  return (
    <section className="section-border-top">
      <div className="max-w-[1200px] mx-auto py-[80px] md:py-[120px] px-6 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label mb-6"
        >
          <span className="label-num">[ 02 ]</span> Serviços
        </motion.div>

        <div className="flex flex-col gap-3 md:gap-4 mb-10">
          {services.map((srv, i) => (
            <motion.div
              key={srv}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group cursor-pointer"
            >
              <span
                className="font-display text-muted-foreground/60 hover:text-foreground transition-all duration-500 block"
                style={{ fontSize: "clamp(24px, 5vw, 80px)", fontWeight: 400, lineHeight: 1.1 }}
              >
                {srv}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-border pt-10">
          {[
            { title: "Social Media", desc: "Conteúdo visual estratégico que para o scroll e converte seguidores em clientes.", icon: Smartphone },
            { title: "Brand Design", desc: "Identidades visuais que transmitem profissionalismo e tornam sua marca inesquecível.", icon: Palette },
            { title: "Web Design", desc: "Sites e landing pages que impressionam visualmente e convertem visitantes em leads.", icon: Layout },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-border rounded-lg p-6 hover:border-primary hover:scale-[1.02] transition-all duration-300"
            >
              <card.icon size={24} className="text-primary mb-3" />
              <h4 className="font-display text-foreground text-[18px] font-medium mb-2">{card.title}</h4>
              <p className="text-muted-foreground text-[14px] leading-[1.6]">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
