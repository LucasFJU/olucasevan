import { motion } from "framer-motion";

const AboutSection = () => (
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
          style={{ background: "linear-gradient(160deg, hsl(var(--primary)) 0%, #8a2200 50%, hsl(var(--background)) 100%)" }}
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
);

export default AboutSection;
