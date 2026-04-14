import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="section-border-top">
      <div className="max-w-[1200px] mx-auto px-6 md:px-0 py-[80px] md:py-[120px]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label shrink-0"
          >
            <span className="label-num">[ 01 ]</span> Sobre
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-foreground max-w-[820px]"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.15 }}
          >
            <span className="font-semibold">Unir</span> design e estratégia para criar experiências criativas que engajam, inspiram e performam.
          </motion.h2>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 mt-12 md:mt-16">
          {[
            { num: "120+", text: "Projetos entregues. Design que funciona, do briefing ao resultado.", cta: "Ver Portfólio", path: "/projetos" },
            { num: "50+", text: "Clientes globais. Startups e marcas confiam no nosso trabalho.", cta: "Saiba Mais", path: "/sobre" },
            { num: "8+", text: "Anos de experiência. Criatividade, estratégia e tecnologia em cada projeto.", cta: "Saiba Mais", path: "/sobre" },
          ].map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group flex flex-col items-start gap-6 md:gap-10 p-6 md:p-16 transition-colors duration-500 md:hover:bg-primary ${
                i < 2 ? "md:border-r border-b md:border-b-0 border-border" : "border-b md:border-b-0"
              }`}
            >
              <span
                className="font-display font-normal text-foreground leading-none"
                style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
              >
                {item.num}
              </span>
              <p className="text-muted-foreground text-[15px] md:text-[16px] leading-[1.5] max-w-[320px] group-hover:text-foreground/80 transition-colors">
                {item.text}
              </p>
              <Link
                to={item.path}
                className="text-foreground text-[15px] md:text-[16px] font-medium hover:text-primary group-hover:text-foreground transition-colors"
              >
                {item.cta} →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
