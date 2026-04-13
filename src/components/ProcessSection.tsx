import { useState } from "react";
import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Discovery & Brief", desc: "Mergulhamos no seu negócio, público e objetivos. Entendemos antes de criar qualquer pixel." },
  { num: "02", title: "Strategy & Concept", desc: "Definimos direção criativa, referências visuais e conceito estratégico antes da execução." },
  { num: "03", title: "Design & Iteration", desc: "Criamos, apresentamos e refinamos com foco em clareza, conversão e identidade da marca." },
  { num: "04", title: "Delivery & Support", desc: "Arquivos organizados, manual de uso e suporte pós-entrega. Tudo pronto para escalar." },
];

const ProcessSection = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="section-border-top section-border-bottom">
      <div className="max-w-[1200px] mx-auto px-6 md:px-0 py-[120px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 flex-wrap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            <span className="label-num">[ 04 ]</span> Our Process
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-foreground max-w-[680px]"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.15 }}
          >
            Transformando Ideias em Realidade — Passo a Passo
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-[16px] max-w-[305px] leading-[1.5]"
          >
            Seguimos um processo claro e colaborativo que garante resultados digitais intencionais e bem-sucedidos.
          </motion.p>
        </div>

        <div className="flex gap-2 mt-14 mb-10">
          {steps.map((step, i) => (
            <button
              key={step.num}
              onClick={() => setActive(i)}
              className={`rounded-full px-6 py-3 text-[16px] font-medium border transition-all ${
                active === i
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-foreground/[0.02] border-border text-muted-foreground hover:border-primary hover:text-foreground"
              }`}
            >
              {step.num}.
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="border border-border rounded-lg p-10 md:p-16"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <span
              className="font-display text-primary leading-none shrink-0"
              style={{ fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 400 }}
            >
              {steps[active].num}
            </span>
            <div>
              <h3 className="font-display text-foreground text-[28px] md:text-[36px] font-medium mb-4">
                {steps[active].title}
              </h3>
              <p className="text-muted-foreground text-[18px] leading-[1.6] max-w-[600px]">
                {steps[active].desc}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
