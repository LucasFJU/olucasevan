import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Conteúdo que para o scroll.",
    heading: "Social Media Design",
    desc: "Design estratégico para redes sociais que engaja, comunica e converte seguidores em clientes.",
    items: ["Posts e Stories", "Carrosséis e Reels Cover", "Templates editáveis", "Calendário visual mensal"],
  },
  {
    title: "Sua marca, visualmente definida.",
    heading: "Brand Design",
    desc: "Identidades visuais completas que transmitem a essência da sua marca com clareza e impacto.",
    items: ["Logotipo + variações", "Paleta de cores e tipografia", "Manual de identidade visual", "Brandbook completo"],
  },
  {
    title: "Experiências digitais que convertem.",
    heading: "Web Design",
    desc: "Sites e landing pages que impressionam visualmente e são construídos para gerar resultados.",
    items: ["Landing pages de alta conversão", "Sites institucionais", "UI/UX para aplicativos", "Protótipos interativos"],
  },
];

const ServicesSection = () => (
  <section className="sec-pad" id="servicos">
    <div className="container mx-auto px-6 md:px-12">
      {/* Two-column header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 mb-20"
      >
        <div>
          <p className="tag-label mb-4">Serviços</p>
          <h2
            className="font-display font-extrabold leading-[1.1] text-foreground"
            style={{ fontSize: "clamp(34px, 5vw, 58px)" }}
          >
            No que posso te ajudar
          </h2>
        </div>
        <div className="flex flex-col justify-center gap-8">
          <p className="text-foreground font-bold text-[18px] md:text-[22px] leading-[1.5]">
            Da estratégia ao visual, ofereço serviços personalizados para ajudar sua marca a crescer com clareza e impacto.
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            <p className="text-muted-foreground text-[15px] flex-1 min-w-[200px]">
              Vamos construir algo significativo juntos
            </p>
            <Link to="/contato" className="btn-primary shrink-0">
              Fale comigo →
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Service Cards */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {services.map((srv) => (
          <div
            key={srv.heading}
            className="group bg-secondary border border-border rounded-[20px] md:rounded-[30px] p-8 md:p-10 flex flex-col justify-between min-h-[420px] hover:border-primary/30 transition-colors"
          >
            <div>
              <div className="w-full h-[4px] bg-primary rounded-full mb-6" />
              <p className="text-primary font-bold text-[16px] mb-2">{srv.title}</p>
              <h3 className="font-display text-[28px] md:text-[32px] font-extrabold text-foreground leading-tight tracking-tight mb-4">
                {srv.heading}
              </h3>
              <p className="text-muted-foreground text-[15px] leading-[1.8] mb-6">{srv.desc}</p>
            </div>

            <ul className="space-y-0">
              {srv.items.map((item) => (
                <li key={item} className="text-[14px] text-muted-foreground py-2.5 border-b border-border last:border-b-0 flex items-center gap-2">
                  <span className="text-primary text-[12px] shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ServicesSection;
