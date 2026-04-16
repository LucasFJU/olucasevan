import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Mariana Costa",
    role: "CEO, Nova Digital",
    text: "O Lucas transformou completamente nossa presença digital. Em 3 meses, nosso engajamento no Instagram cresceu 280%. O design dele realmente vende.",
    stars: 5,
  },
  {
    name: "Rafael Mendes",
    role: "Fundador, Startup Lab",
    text: "Contratamos para o rebranding completo. O resultado foi tão profissional que clientes começaram a nos tratar diferente. Investimento que se pagou em semanas.",
    stars: 5,
  },
  {
    name: "Camila Ferreira",
    role: "Diretora de Marketing, Brandhaus",
    text: "O site que o Lucas criou converteu 3x mais que o anterior. Ele entende de design E de negócios — raro encontrar isso junto.",
    stars: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-border-top">
      <div className="max-w-[1200px] mx-auto px-6 md:px-0 py-[60px] md:py-[120px]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-6 mb-8 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            <span className="label-num">[ 04 ]</span> Depoimentos
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-foreground max-w-[600px]"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.15 }}
          >
            O que dizem quem já <span className="text-primary">trabalhou comigo</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 md:p-8 flex flex-col justify-between hover:border-primary/30 transition-colors duration-300"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={16} className="text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-foreground text-[15px] leading-[1.7] mb-6">
                  "{t.text}"
                </p>
              </div>
              <div>
                <p className="text-foreground text-[15px] font-medium">{t.name}</p>
                <p className="text-muted-foreground text-[13px]">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
