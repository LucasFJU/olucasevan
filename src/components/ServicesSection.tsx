import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Smartphone, Palette, Layout, ArrowRight } from "lucide-react";

const services = [
  { num: "01", label: "Social Media Design" },
  { num: "02", label: "Brand Identity" },
  { num: "03", label: "Web Design" },
  { num: "04", label: "UI/UX Design" },
  { num: "05", label: "Estratégia Criativa" },
];

const ServicesSection = () => {
  return (
    <section className="section-border-top">
      <div className="max-w-[1200px] mx-auto py-[60px] md:py-[120px] px-6 md:px-0">
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
              key={srv.label}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group cursor-pointer"
            >
              <Link to="/servicos" className="flex items-baseline gap-4">
                <span className="text-primary font-display text-sm md:text-base opacity-60 group-hover:opacity-100 transition-opacity">
                  {srv.num}
                </span>
                <span
                  className="font-display text-muted-foreground/60 group-hover:text-foreground transition-all duration-500 block"
                  style={{ fontSize: "clamp(22px, 4.5vw, 72px)", fontWeight: 400, lineHeight: 1.1 }}
                >
                  {srv.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 border-t border-border pt-8 md:pt-10">
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
            >
              <Link
                to="/servicos"
                className="block bg-card border border-border rounded-lg p-6 md:p-8 hover:border-primary hover:scale-[1.02] transition-all duration-300 h-full"
              >
                <card.icon size={24} className="text-primary mb-4" />
                <h4 className="font-display text-foreground text-[18px] font-medium mb-2">{card.title}</h4>
                <p className="text-muted-foreground text-[14px] leading-[1.6] mb-5">{card.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-primary text-[13px] font-medium">
                  Saiba mais <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
