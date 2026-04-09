import { motion } from "framer-motion";

const services = [
  {
    num: "01",
    title: "Social Media Design",
    desc: "Conteúdo visual estratégico que para o scroll, comunica em segundos e converte seguidores em clientes.",
    items: ["Posts e Stories para Instagram", "Carrosséis e Reels Cover", "Identidade visual para redes", "Templates editáveis no Canva", "Calendário visual mensal"],
  },
  {
    num: "02",
    title: "Brand Design",
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

const ServicesSection = () => (
  <section className="sec-pad" id="servicos">
    <div className="container mx-auto px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="tag-label mb-3">O que fazemos</p>
        <h2
          className="font-display font-extrabold leading-[1.05] max-w-[600px] mx-auto text-foreground"
          style={{ fontSize: "clamp(34px, 5vw, 58px)" }}
        >
          Três especialidades. Um propósito: fazer sua marca crescer.
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-[2px]"
      >
        {services.map((srv, i) => (
          <div
            key={srv.title}
            className={`group relative bg-card border border-border p-10 md:p-12 cursor-pointer transition-colors hover:bg-secondary overflow-hidden ${
              i === 0 ? "md:rounded-l-lg" : i === 2 ? "md:rounded-r-lg" : ""
            }`}
          >
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="font-display text-[64px] font-extrabold text-border leading-none mb-5 group-hover:text-primary transition-colors">
                {srv.num}
              </div>
              <h3 className="font-display text-2xl font-extrabold text-foreground mb-3">{srv.title}</h3>
              <p className="text-sm text-muted-foreground leading-[1.8] mb-6">{srv.desc}</p>
              <ul className="space-y-0">
                {srv.items.map((item) => (
                  <li key={item} className="text-[13px] text-muted-foreground py-2 border-b border-border last:border-b-0 flex items-center gap-2">
                    <span className="text-primary text-[12px] flex-shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ServicesSection;
