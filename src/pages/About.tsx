import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const defaultPhilosophy = [
  { title: "Estratégia", desc: "Todo design começa com uma estratégia sólida. Entendo o negócio antes de criar." },
  { title: "Criatividade", desc: "Soluções visuais únicas que diferenciam sua marca no mercado." },
  { title: "Resultados", desc: "Design orientado a métricas. Resultados orgânicos: +45% em conversão." },
];

const tools = [
  { name: "Figma", desc: "UI/UX Design" },
  { name: "Adobe Creative Suite", desc: "Branding & Ilustração" },
  { name: "Webflow", desc: "Desenvolvimento Web" },
  { name: "Framer", desc: "Protótipos Interativos" },
];

const About = () => {
  const { data: settings } = useQuery({
    queryKey: ["site-settings-public"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings" as any).select("*");
      if (error) return [];
      return data as any[];
    },
  });

  const getSetting = (key: string) => settings?.find((s: any) => s.key === key)?.value || "";

  const title = getSetting("about_title") || "O Designer por trás do Studio";
  const description = getSetting("about_description") || "Com mais de 8 anos de experiência em design digital, já ajudei dezenas de marcas a construir identidades visuais fortes e experiências digitais que geram resultados reais.";
  const mission = getSetting("about_mission");
  const vision = getSetting("about_vision");
  const values = getSetting("about_values");

  return (
    <Layout>
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Sobre</span>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mt-2 text-foreground">
                {title}
              </h1>
              <p className="text-muted-foreground mt-6 leading-relaxed text-pretty whitespace-pre-line">
                {description}
              </p>
              {mission && (
                <div className="mt-6">
                  <h3 className="text-sm font-bold text-primary uppercase tracking-widest">Missão</h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed text-pretty whitespace-pre-line">{mission}</p>
                </div>
              )}
              {vision && (
                <div className="mt-4">
                  <h3 className="text-sm font-bold text-primary uppercase tracking-widest">Visão</h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed text-pretty whitespace-pre-line">{vision}</p>
                </div>
              )}
              {values && (
                <div className="mt-4">
                  <h3 className="text-sm font-bold text-primary uppercase tracking-widest">Valores</h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed text-pretty whitespace-pre-line">{values}</p>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="aspect-square rounded-2xl bg-card card-rim overflow-hidden"
            >
              <div className="w-full h-full bg-secondary flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto rounded-full bg-ember-gradient flex items-center justify-center mb-4">
                    <span className="font-display text-5xl font-bold text-primary-foreground">S</span>
                  </div>
                  <p className="text-muted-foreground text-sm">Foto profissional</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24"
          >
            <span className="text-primary text-sm font-bold uppercase tracking-widest">Filosofia</span>
            <h2 className="text-4xl font-bold tracking-tighter mt-2 text-foreground">Como eu trabalho</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {defaultPhilosophy.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 card-rim"
              >
                <span className="text-primary text-xs font-bold">0{i + 1}</span>
                <h3 className="text-xl font-bold text-foreground mt-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24"
          >
            <span className="text-primary text-sm font-bold uppercase tracking-widest">Ferramentas</span>
            <h2 className="text-4xl font-bold tracking-tighter mt-2 text-foreground">Stack de Design</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 text-center card-rim"
              >
                <h3 className="font-bold text-foreground">{tool.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{tool.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
              Vamos trabalhar juntos?
            </h2>
            <Link
              to="/contato"
              className="inline-flex items-center gap-2 bg-ember-gradient text-primary-foreground px-8 py-3.5 rounded-xl text-sm font-semibold mt-8 transition-transform hover:scale-105"
            >
              Entrar em contato <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
