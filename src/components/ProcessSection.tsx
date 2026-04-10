import { motion } from "framer-motion";

const process = [
  { num: "01", title: "Briefing & Imersão", desc: "Mergulhamos no seu negócio, público e objetivos antes de criar qualquer pixel." },
  { num: "02", title: "Estratégia Visual", desc: "Definimos direção criativa, referências e conceito antes da execução." },
  { num: "03", title: "Design & Refinamento", desc: "Criamos, apresentamos e refinamos com foco em clareza, conversão e identidade." },
  { num: "04", title: "Entrega & Suporte", desc: "Arquivos organizados, manual de uso e suporte pós-entrega incluso." },
];

const ProcessSection = () => (
  <section className="sec-pad">
    <div className="container mx-auto px-6 md:px-12">
      {/* Two-column header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 mb-16"
      >
        <div>
          <p className="tag-label mb-4">Intencional. Colaborativo. Feito pra durar.</p>
          <h2
            className="font-display font-extrabold leading-[1.1] text-foreground"
            style={{ fontSize: "clamp(34px, 5vw, 58px)" }}
          >
            Como abordo cada projeto
          </h2>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-foreground font-bold text-[18px] md:text-[22px] leading-[1.5]">
            Design com clareza e propósito — unindo estratégia e estilo para construir marcas que funcionam em qualquer lugar.
          </p>
        </div>
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {process.map((step) => (
          <div
            key={step.num}
            className="group relative bg-secondary border border-border rounded-[20px] md:rounded-[30px] p-8 md:p-10 min-h-[240px] flex flex-col justify-end hover:border-primary/30 transition-colors overflow-hidden"
          >
            {/* Large background number */}
            <span className="absolute top-4 right-6 font-display text-[100px] md:text-[120px] font-extrabold text-border/30 leading-none select-none group-hover:text-primary/10 transition-colors">
              {step.num}
            </span>
            
            <div className="relative z-10">
              <div className="w-12 h-[4px] bg-primary rounded-full mb-5" />
              <h3 className="font-display text-[22px] md:text-[26px] font-extrabold text-foreground leading-tight tracking-tight mb-3">
                {step.title}
              </h3>
              <p className="text-[14px] text-muted-foreground leading-[1.8] max-w-[400px]">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ProcessSection;
