import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const services = [
  {
    num: "01",
    title: "Social Media Design",
    desc: "Conteúdo visual estratégico que para o scroll, comunica em segundos e converte seguidores em clientes.",
    items: ["Posts e Stories para Instagram", "Carrosséis e Reels Cover", "Identidade visual para redes", "Templates editáveis no Canva", "Calendário visual mensal"],
  },
  {
    num: "02",
    title: "Brand Design",
    desc: "Identidades visuais que transmitem profissionalismo, geram confiança e tornam sua marca inesquecível.",
    items: ["Logotipo + variações", "Paleta de cores e tipografia", "Manual de identidade visual", "Papelaria e materiais gráficos", "Brandbook completo"],
  },
  {
    num: "03",
    title: "Web Design",
    desc: "Sites e landing pages que impressionam visualmente e são construídos para converter visitantes em leads.",
    items: ["Landing pages de alta conversão", "Sites institucionais e portfólios", "UI/UX para aplicativos", "Design para Webflow / Framer", "Protótipos interativos no Figma"],
  },
];

const process = [
  { num: "01", title: "Briefing & Imersão", desc: "Mergulhamos no seu negócio, público e objetivos antes de criar qualquer pixel." },
  { num: "02", title: "Estratégia Visual", desc: "Definimos direção criativa, referências e conceito antes da execução." },
  { num: "03", title: "Design & Refinamento", desc: "Criamos, apresentamos e refinamos com foco em clareza, conversão e identidade." },
  { num: "04", title: "Entrega & Suporte", desc: "Arquivos organizados, manual de uso e suporte pós-entrega incluso." },
];

const Index = () => {
  return (
    <Layout>
      <Hero />

      <hr className="border-border" />

      {/* Services */}
      <section className="sec-pad" id="servicos">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="tag-label mb-3">O que fazemos</p>
            <h2
              className="font-display font-extrabold leading-[1.05] max-w-[600px] mx-auto text-foreground"
              style={{ fontSize: "clamp(34px, 5vw, 58px)" }}
            >
              Três especialidades. Um propósito: fazer sua marca crescer.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-[2px]"
          >
            {services.map((srv, i) => (
              <div
                key={srv.title}
                className={`group relative bg-card border border-border p-10 md:p-12 cursor-pointer transition-colors hover:bg-secondary overflow-hidden ${
                  i === 0 ? "md:rounded-l-lg" : i === 2 ? "md:rounded-r-lg" : ""
                }`}
              >
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="font-display text-[64px] font-extrabold text-border leading-none mb-5 group-hover:text-primary transition-colors">
                    {srv.num}
                  </div>
                  <h3 className="font-display text-2xl font-extrabold text-foreground mb-3">{srv.title}</h3>
                  <p className="text-sm text-muted-foreground leading-[1.8] mb-6">{srv.desc}</p>
                  <ul className="space-y-0">
                    {srv.items.map((item) => (
                      <li key={item} className="text-[13px] text-muted-foreground py-2 border-b border-border last:border-b-0 flex items-center gap-2">
                        <span className="text-primary text-[12px] flex-shrink-0">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <hr className="border-border" />

      {/* About */}
      <section className="sec-pad" id="sobre">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center"
          >
            <div
              className="rounded-lg min-h-[480px] relative overflow-hidden"
              style={{ background: "linear-gradient(160deg, #ff5c1a 0%, #8a2200 50%, #0a0a0a 100%)" }}
            >
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`
              }} />
            </div>
            <div>
              <p className="tag-label mb-3">Sobre a Folioblox</p>
              <h2
                className="font-display font-extrabold leading-[1.05] text-foreground mb-5"
                style={{ fontSize: "clamp(34px, 4.5vw, 54px)" }}
              >
                Não somos só designers. Somos parceiros de crescimento.
              </h2>
              <p className="text-muted-foreground leading-[1.85] mb-4 text-[15px]">
                A Folioblox nasceu com uma missão clara: criar design que vai além do bonito — design que trabalha pela sua marca, que vende, que posiciona.
              </p>
              <p className="text-muted-foreground leading-[1.85] text-[15px]">
                Combinamos estratégia, criatividade e execução impecável em cada projeto. Entendemos o seu negócio antes de abrir o Figma.
              </p>
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
        </div>
      </section>

      <hr className="border-border" />

      <FeaturedProjects />

      <hr className="border-border" />

      {/* Process */}
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

      <hr className="border-border" />

      {/* CTA / Contact banner */}
      <section className="sec-pad">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-lg p-12 md:p-20 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #ff5c1a 0%, #c03000 55%, #0a0a0a 100%)" }}
          >
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.025'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`
            }} />
            <div className="relative z-10">
              <p className="tag-label mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>Vamos trabalhar juntos</p>
              <h2
                className="font-display font-extrabold text-white mb-4"
                style={{ fontSize: "clamp(38px, 6vw, 72px)" }}
              >
                Sua marca merece design que funciona.
              </h2>
              <p className="text-white/75 text-base max-w-[440px] mx-auto mb-8 leading-[1.8]">
                Conte seu projeto. Respondemos em até 24h com uma proposta personalizada.
              </p>
              <Link
                to="/contato"
                className="btn-ghost border-white/30 text-white hover:bg-white/10 hover:border-white/60"
              >
                Fale Comigo →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
