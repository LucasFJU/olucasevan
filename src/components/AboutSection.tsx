import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import demoBrand from "@/assets/demo-brand-identity.jpg";
import demoSocial from "@/assets/demo-social-media.jpg";
import demoWeb from "@/assets/demo-web-design.jpg";

const AboutSection = () => (
  <section className="sec-pad" id="sobre">
    <div className="container mx-auto px-6 md:px-12">
      {/* Two-column header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 mb-20"
      >
        {/* Left - Title */}
        <div>
          <p className="tag-label mb-4">Por trás dos designs</p>
          <h2
            className="font-display font-extrabold leading-[1.1] text-foreground"
            style={{ fontSize: "clamp(34px, 5vw, 58px)" }}
          >
            Moldando experiências visuais que simplificam marcas.
          </h2>
        </div>

        {/* Right - Text + Button */}
        <div className="flex flex-col justify-center gap-8">
          <p className="text-foreground font-bold text-[18px] md:text-[22px] leading-[1.5]">
            Sou um diretor criativo especializado em social media design, brand design e web design — transformando ideias em identidades que convertem.
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

      {/* Three images */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {[
          { img: demoBrand, label: "Brand Design" },
          { img: demoSocial, label: "Social Media" },
          { img: demoWeb, label: "Web Design" },
        ].map((item, i) => (
          <div
            key={i}
            className="group relative aspect-[1.04] rounded-[20px] md:rounded-[30px] overflow-hidden"
          >
            <img
              src={item.img}
              alt={item.label}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-5 left-5 text-foreground text-[14px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {item.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
