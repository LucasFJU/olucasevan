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
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="tag-label mb-3">Como trabalhamos</p>
        <h2 className="font-display font-extrabold text-foreground" style={{ fontSize: "clamp(30px, 4vw, 50px)" }}>
          Processo simples. Resultado excepcional.
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
      >
        {process.map((step) => (
          <div
            key={step.num}
            className="group bg-card border border-border rounded-lg p-8 hover:border-primary transition-colors"
          >
            <div className="font-display text-[56px] font-extrabold text-border leading-none mb-4 group-hover:text-primary transition-colors">
              {step.num}
            </div>
            <h3 className="font-display text-[17px] font-bold text-foreground mb-2">{step.title}</h3>
            <p className="text-[13px] text-muted-foreground leading-[1.7]">{step.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ProcessSection;
