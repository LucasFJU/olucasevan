import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Palette, Layout as LayoutIcon, Sparkles } from "lucide-react";

const services = [
  {
    num: "01",
    title: "Social Media Design",
    desc: "Conteúdo visual estratégico que para o scroll, comunica em segundos e converte seguidores em clientes.",
    items: ["Posts e Stories para Instagram", "Carrosséis e Reels Cover", "Identidade visual para redes", "Templates editáveis no Canva", "Calendário visual mensal"],
    icon: Smartphone,
  },
  {
    num: "02",
    title: "Brand Identity",
    desc: "Identidades visuais que transmitem profissionalismo, geram confiança e tornam sua marca inesquecível.",
    items: ["Logotipo + variações", "Paleta de cores e tipografia", "Manual de identidade visual", "Papelaria e materiais gráficos", "Brandbook completo"],
    icon: Palette,
  },
  {
    num: "03",
    title: "Web Design",
    desc: "Sites e landing pages que impressionam visualmente e são construídos para converter visitantes em leads.",
    items: ["Landing pages de alta conversão", "Sites institucionais e portfólios", "UI/UX para aplicativos", "Design para Webflow / Framer", "Protótipos interativos no Figma"],
    icon: LayoutIcon,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Services = () => {
  return (
    <Layout>
      {/* Hero Banner */}
      <section
        className="min-h-[50vh] md:min-h-[70vh] flex flex-col items-center justify-center border-b border-border relative overflow-hidden px-6"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, hsl(15 100% 50% / 0.10), transparent 60%), hsl(var(--background))",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-label mb-6"
        >
          <span className="label-num">[ 02 ]</span> O que fazemos
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-foreground text-center max-w-[900px]"
          style={{
            fontSize: "clamp(36px, 7vw, 100px)",
            fontWeight: 500,
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          Design que transforma
          <br />
          <span className="text-primary">marcas em referência</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-muted-foreground text-center mt-6 max-w-[520px] text-[15px] md:text-[17px] leading-[1.6]"
        >
          Combinamos estratégia, estética e performance para criar experiências visuais que geram resultados reais.
        </motion.p>
      </section>

      {/* Services Detail */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-0">
        {services.map((srv, i) => (
          <motion.div
            key={srv.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0}
            variants={fadeUp}
            className="grid grid-cols-1 md:grid-cols-12 border-b border-border"
          >
            {/* Left */}
            <div className="md:col-span-4 py-12 md:py-[100px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-primary font-display text-[13px] tracking-wider opacity-70">
                  [ {srv.num} ]
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <srv.icon size={20} className="text-primary" />
                <h2 className="font-display text-foreground text-[26px] md:text-[32px] font-medium leading-tight">
                  {srv.title}
                </h2>
              </div>
              <p className="text-muted-foreground text-[15px] leading-[1.65] max-w-[400px]">
                {srv.desc}
              </p>
            </div>

            {/* Right — items grid */}
            <div className="md:col-span-8 md:border-l border-border py-8 md:py-[100px] md:pl-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {srv.items.map((item, j) => (
                  <motion.div
                    key={item}
                    custom={j}
                    variants={fadeUp}
                    className="group flex items-start gap-3 bg-card border border-border rounded-lg p-5 hover:border-primary/40 transition-colors duration-300"
                  >
                    <Sparkles size={14} className="text-primary mt-0.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span className="text-[14px] md:text-[15px] text-muted-foreground group-hover:text-foreground transition-colors">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-[100px] md:py-[140px] px-6 border-t border-border">
        <div className="max-w-[800px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary text-[13px] font-medium tracking-wider uppercase mb-4">
              Próximo passo
            </p>
            <h2
              className="font-display text-foreground mb-4"
              style={{
                fontSize: "clamp(28px, 4.5vw, 52px)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Tem um projeto em mente?
            </h2>
            <p className="text-muted-foreground text-[15px] md:text-[16px] mb-8 max-w-[460px] mx-auto leading-[1.6]">
              Vamos conversar sobre como transformar sua visão em realidade com design estratégico.
            </p>
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
