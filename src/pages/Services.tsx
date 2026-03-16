import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Palette, Globe, Megaphone, ArrowRight, Lightbulb, Target, Paintbrush, Send } from "lucide-react";

const services = [
  {
    icon: Megaphone,
    title: "Social Media Design",
    description: "Criação de identidade visual para redes sociais que gera engajamento e fortalece a presença digital da sua marca.",
    benefits: ["Posts e stories consistentes", "Templates editáveis", "Identidade visual para redes", "Aumento de engajamento"],
    deliverables: "Feed design, stories templates, capas de destaque, banners"
  },
  {
    icon: Palette,
    title: "Brand Design",
    description: "Desenvolvimento completo de identidade visual que comunica os valores da sua marca e a diferencia no mercado.",
    benefits: ["Logotipo e variações", "Paleta de cores", "Tipografia definida", "Manual de marca"],
    deliverables: "Logo, brand book, papelaria, guidelines de aplicação"
  },
  {
    icon: Globe,
    title: "Web Design",
    description: "Design de interfaces web modernas, responsivas e focadas em conversão, com experiência de usuário impecável.",
    benefits: ["Design responsivo", "Foco em conversão", "UX otimizada", "Protótipos interativos"],
    deliverables: "Wireframes, protótipos, design system, UI kit completo"
  },
];

const process = [
  { icon: Lightbulb, title: "Briefing", desc: "Entendemos sua marca, objetivos e público-alvo." },
  { icon: Target, title: "Estratégia", desc: "Definimos posicionamento, tom de voz e direção criativa." },
  { icon: Paintbrush, title: "Design", desc: "Criamos conceitos visuais alinhados à estratégia." },
  { icon: Send, title: "Entrega", desc: "Entregamos arquivos finais e guidelines de uso." },
];

const Services = () => {
  return (
    <Layout>
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary text-sm font-bold uppercase tracking-widest">O que faço</span>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mt-2 text-foreground">Serviços</h1>
            <p className="text-muted-foreground mt-4 max-w-xl text-pretty">
              Soluções de design completas para marcas que querem se destacar.
            </p>
          </motion.div>

          {/* Services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 card-rim"
              >
                <div className="w-12 h-12 rounded-xl bg-ember-gradient flex items-center justify-center mb-6">
                  <service.icon size={22} className="text-primary-foreground" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
                <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{service.description}</p>
                <ul className="mt-6 space-y-2">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-secondary-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-secondary-foreground">Entregáveis:</span> {service.deliverables}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24"
          >
            <span className="text-primary text-sm font-bold uppercase tracking-widest">Metodologia</span>
            <h2 className="text-4xl font-bold tracking-tighter mt-2 text-foreground">Processo de Trabalho</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
            {process.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-secondary flex items-center justify-center mb-4">
                  <step.icon size={24} className="text-primary" strokeWidth={1.5} />
                </div>
                <span className="text-xs text-primary font-bold">0{i + 1}</span>
                <h3 className="text-lg font-bold text-foreground mt-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 text-center bg-card rounded-2xl p-12 card-rim"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
              Pronto para transformar sua marca?
            </h2>
            <p className="text-muted-foreground mt-3 max-w-md mx-auto">
              Solicite um orçamento e vamos criar algo memorável juntos.
            </p>
            <Link
              to="/contato"
              className="inline-flex items-center gap-2 bg-ember-gradient text-primary-foreground px-8 py-3.5 rounded-xl text-sm font-semibold mt-8 transition-transform hover:scale-105"
            >
              Solicitar orçamento <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
