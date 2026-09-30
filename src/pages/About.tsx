import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

const About = () => {
  const reduced = useReducedMotion();
  return (
    <Layout>
      <div className="editorial-page about-page">
        <Helmet>
          <title>Sobre — Lucas Evangelista</title>
          <meta name="description" content="Conheça Lucas Evangelista e seu trabalho com identidade visual, social media e experiências digitais." />
        </Helmet>
        <section className="editorial-page-hero">
          <p className="editorial-kicker">Lucas Evangelista · Designer</p>
          <motion.h1 initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, ease: [.22, 1, .36, 1] }}>Design com intenção,<br /><span>do conceito à entrega.</span></motion.h1>
        </section>
        <section className="editorial-page-section about-story">
          <p className="editorial-kicker">01 / Sobre</p>
          <div>
            <h2>Direção criativa conectada às necessidades de cada negócio.</h2>
            <p>Sou Lucas Evangelista. Trabalho com identidade visual, social media e experiências digitais, conectando direção criativa às necessidades de cada negócio.</p>
            <p>Cada projeto parte de uma conversa sobre o contexto e os objetivos da marca. A partir daí, definimos uma direção visual clara e desenvolvemos as peças para o uso real do negócio.</p>
            <Link className="editorial-link" to="/projetos">Conheça os projetos <ArrowUpRight size={18} /></Link>
          </div>
        </section>
        <section className="editorial-page-section about-fields">
          <p className="editorial-kicker">02 / Áreas de atuação</p>
          <div className="editorial-field-list">
            {["Identidade visual", "Social media", "Sites e landing pages", "UI/UX"].map((field, index) => <div key={field}><span>0{index + 1}</span><h3>{field}</h3></div>)}
          </div>
        </section>
        <section className="editorial-page-cta">
          <p className="editorial-kicker">Próximo passo</p>
          <h2>Vamos conversar sobre o seu projeto?</h2>
          <Link className="editorial-button" to="/contato">Entre em contato <ArrowUpRight size={18} /></Link>
        </section>
      </div>
    </Layout>
  );
};

export default About;

