import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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

  return (
    <Layout>
      {/* Page Banner */}
      <section className="min-h-[400px] md:min-h-[600px] flex items-center justify-center border-b border-border relative" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(15 100% 50% / 0.12), transparent 70%), hsl(var(--background))"
      }}>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-foreground text-center"
          style={{ fontSize: "clamp(44px, 8vw, 120px)", fontWeight: 500, lineHeight: 1, letterSpacing: "-0.02em" }}
        >
          About
        </motion.h1>
      </section>

      {/* About Content */}
      <section className="border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 md:px-0 py-[120px]">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label shrink-0"
            >
              <span className="label-num">[ 01 ]</span> About
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="max-w-[820px]"
            >
              <h2
                className="font-display text-foreground mb-6"
                style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.15 }}
              >
                Não sou apenas um designer. Sou um <span className="font-semibold">parceiro de crescimento</span> para a sua marca.
              </h2>
              <p className="text-muted-foreground text-[18px] leading-[1.6] mb-4">
                Sou diretor criativo especializado em social media design, brand identity e web design. Combino estratégia, criatividade e execução impecável para criar experiências digitais que conectam marcas a pessoas.
              </p>
              <p className="text-muted-foreground text-[18px] leading-[1.6]">
                Cada projeto começa com o entendimento profundo do seu negócio. Antes de abrir o Figma, já sei exatamente o que sua marca precisa comunicar.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3">
          {[
            { num: "120+", text: "Projetos entregues com foco em resultado." },
            { num: "50+", text: "Clientes satisfeitos em diferentes indústrias." },
            { num: "8+", text: "Anos de experiência em design digital." },
          ].map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 md:p-16 ${i < 2 ? "md:border-r border-b md:border-b-0 border-border" : "border-b md:border-b-0"}`}
            >
              <span className="font-display text-[56px] text-foreground leading-none block mb-4" style={{ fontWeight: 400 }}>
                {item.num}
              </span>
              <p className="text-muted-foreground text-[16px] leading-[1.5]">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section className="border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 md:px-0 py-[120px]">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
            <div className="section-label shrink-0">
              <span className="label-num">[ 02 ]</span> Tools
            </div>
            <h2
              className="font-display text-foreground max-w-[600px]"
              style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.15 }}
            >
              Stack de design profissional
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Figma", desc: "UI/UX Design" },
              { name: "Adobe Suite", desc: "Branding & Ilustração" },
              { name: "Webflow", desc: "Desenvolvimento Web" },
              { name: "Framer", desc: "Protótipos Interativos" },
            ].map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-border rounded-lg p-6 hover:border-primary transition-colors"
              >
                <h3 className="font-display text-foreground text-[18px] font-medium">{tool.name}</h3>
                <p className="text-muted-foreground text-[14px] mt-1">{tool.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[120px] px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="font-display text-foreground mb-6"
              style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 400, lineHeight: 1.1 }}
            >
              Vamos trabalhar juntos?
            </h2>
            <Link to="/contato" className="btn-primary">
              Entrar em contato <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
