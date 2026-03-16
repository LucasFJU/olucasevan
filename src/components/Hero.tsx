import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] -translate-y-1/2" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <span className="text-primary text-sm font-bold uppercase tracking-widest mb-6 block">
              Social Media · Brand · Web Design
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-foreground text-balance">
              Designer criando marcas e experiências digitais{" "}
              <span className="text-gradient-ember">memoráveis</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl text-pretty leading-relaxed">
              Transformo ideias em identidades visuais impactantes, experiências web 
              imersivas e conteúdo de social media que conecta marcas ao seu público.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/projetos"
                className="bg-ember-gradient text-primary-foreground px-8 py-3.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-transform hover:scale-105"
              >
                Ver Projetos
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/contato"
                className="border border-border text-foreground px-8 py-3.5 rounded-xl text-sm font-semibold transition-all hover:border-primary/50 hover:shadow-[0_0_20px_hsl(25_90%_55%/0.1)]"
              >
                Entrar em contato
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 hidden lg:block"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-card card-rim ember-glow">
              <div className="absolute inset-0 bg-ember-gradient opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-full bg-ember-gradient flex items-center justify-center mb-4">
                    <span className="font-display text-3xl font-bold text-primary-foreground">S</span>
                  </div>
                  <p className="text-muted-foreground text-sm">Portfólio Criativo</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
