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

  const mission = getSetting("about_mission");
  const vision = getSetting("about_vision");
  const values = getSetting("about_values");

  return (
    <Layout>
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center"
          >
            {/* Image */}
            <div
              className="rounded-lg min-h-[480px] relative overflow-hidden"
              style={{ background: "linear-gradient(160deg, #ff5c1a 0%, #8a2200 50%, #0a0a0a 100%)" }}
            >
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`
              }} />
            </div>

            {/* Content */}
            <div>
              <p className="tag-label mb-3">Sobre a Folioblox</p>
              <h1
                className="font-display font-extrabold leading-[1.05] text-foreground mb-5"
                style={{ fontSize: "clamp(34px, 4.5vw, 54px)" }}
              >
                Não somos só designers. Somos parceiros de crescimento.
              </h1>
              <p className="text-muted-foreground leading-[1.85] mb-4 text-[15px]">
                A Folioblox nasceu com uma missão clara: criar design que vai além do bonito — design que trabalha pela sua marca, que vende, que posiciona.
              </p>
              <p className="text-muted-foreground leading-[1.85] text-[15px]">
                Combinamos estratégia, criatividade e execução impecável em cada projeto. Entendemos o seu negócio antes de abrir o Figma.
              </p>

              {mission && (
                <div className="mt-6">
                  <h3 className="tag-label">Missão</h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed whitespace-pre-line text-sm">{mission}</p>
                </div>
              )}
              {vision && (
                <div className="mt-4">
                  <h3 className="tag-label">Visão</h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed whitespace-pre-line text-sm">{vision}</p>
                </div>
              )}
              {values && (
                <div className="mt-4">
                  <h3 className="tag-label">Valores</h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed whitespace-pre-line text-sm">{values}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mt-9">
                {[
                  { n: "120+", l: "Projetos entregues" },
                  { n: "80+", l: "Clientes satisfeitos" },
                  { n: "5 anos", l: "De experiência" },
                  { n: "3", l: "Especialidades" },
                ].map((s) => (
                  <div key={s.l} className="bg-secondary border border-border rounded-md p-5">
                    <div className="font-display text-[32px] font-extrabold text-primary">{s.n}</div>
                    <div className="text-[13px] text-muted-foreground mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <hr className="border-border my-24" />

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="tag-label mb-3">Ferramentas</p>
            <h2 className="font-display font-extrabold text-foreground mb-10" style={{ fontSize: "clamp(30px, 4vw, 46px)" }}>
              Stack de Design
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Figma", desc: "UI/UX Design" },
              { name: "Adobe Creative Suite", desc: "Branding & Ilustração" },
              { name: "Webflow", desc: "Desenvolvimento Web" },
              { name: "Framer", desc: "Protótipos Interativos" },
            ].map((tool) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary transition-colors"
              >
                <h3 className="font-display font-bold text-foreground">{tool.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{tool.desc}</p>
              </motion.div>
            ))}
          </div>

          <hr className="border-border my-24" />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display font-extrabold text-foreground" style={{ fontSize: "clamp(30px, 4vw, 48px)" }}>
              Vamos trabalhar juntos?
            </h2>
            <Link to="/contato" className="btn-primary mt-8">
              Entrar em contato <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
