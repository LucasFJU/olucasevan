import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const services = [
  {
    num: "01",
    title: "Social Media Design",
    desc: "Conteúdo visual estratégico que para o scroll, comunica em segundos e converte seguidores em clientes.",
    items: ["Posts e Stories para Instagram", "Carrosséis e Reels Cover", "Identidade visual para redes", "Templates editáveis no Canva", "Calendário visual mensal"],
  },
  {
    num: "02",
    title: "Brand Identity",
    desc: "Identidades visuais que transmitem profissionalismo, geram confiança e tornam sua marca inesquecível.",
    items: ["Logotipo + variações", "Paleta de cores e tipografia", "Manual de identidade visual", "Papelaria e materiais gráficos", "Brandbook completo"],
  },
  {
    num: "03",
    title: "Web Design",
    desc: "Sites e landing pages que impressionam visualmente e são construídos para converter visitantes em leads.",
    items: ["Landing pages de alta conversão", "Sites institucionais e portfólios", "UI/UX para aplicativos", "Design para Webflow / Framer", "Protótipos interativos no Figma"],
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Page Banner */}
      <section className="min-h-[400px] md:min-h-[600px] flex items-center justify-center border-b border-border relative" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(15 100% 50% / 0.12), transparent 70%), hsl(var(--background))"
      }}>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-foreground text-center"
          style={{ fontSize: "clamp(44px, 8vw, 120px)", fontWeight: 500, lineHeight: 1, letterSpacing: "-0.02em" }}
        >
          Services
        </motion.h1>
      </section>

      {/* Services List */}
      <section className="max-w-[2000px] mx-auto">
        {services.map((srv, i) => (
          <div key={srv.title} className="flex flex-col md:flex-row border-b border-border">
            {/* Left label area */}
            <div className="md:w-[30%] py-16 md:py-[120px] px-6">
              <div className="section-label mb-4">
                <span className="label-num">[ {srv.num} ]</span> Services
              </div>
            </div>

            {/* Right content */}
            <div className="md:w-[70%] border-l border-border py-16 md:py-[120px] px-6 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-foreground text-[28px] md:text-[36px] font-medium mb-4">{srv.title}</h2>
                <p className="text-muted-foreground text-[16px] leading-[1.6] max-w-[500px] mb-8">{srv.desc}</p>
                <ul className="space-y-0">
                  {srv.items.map((item) => (
                    <li key={item} className="text-[15px] text-muted-foreground py-3 border-b border-border last:border-b-0 flex items-center gap-3">
                      <span className="text-primary text-[13px]">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-[120px] px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="font-display text-foreground mb-6"
              style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 400, lineHeight: 1.1 }}
            >
              Pronto para começar?
            </h2>
            <Link to="/contato" className="btn-primary">
              Solicitar Orçamento <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
