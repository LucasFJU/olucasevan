import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FeaturedProjects = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("destaque", true)
        .order("data_publicacao", { ascending: false })
        .limit(4);
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="section-border-top section-border-bottom">
      <div className="max-w-[1200px] mx-auto px-6 md:px-0 py-[80px] md:py-[120px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 flex-wrap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            <span className="label-num">[ 03 ]</span> Projetos em Destaque
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-foreground max-w-[600px]"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.15 }}
          >
            Dando Vida a Ideias Através do Design
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-[16px] max-w-[305px] leading-[1.5]"
          >
            Ajudo marcas ambiciosas a transformar ideias em experiências digitais intuitivas e de alta performance.
          </motion.p>
        </div>

        {/* Projects grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 md:mt-16">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[300px] md:h-[400px] bg-card rounded-lg animate-pulse" />
            ))}
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 md:mt-16">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Link to={`/projetos/${project.id}`} className="block">
                  <div className="h-[280px] md:h-[450px] rounded-lg overflow-hidden bg-card mb-4 md:mb-6 relative">
                    {project.imagem_capa ? (
                      <img
                        src={project.imagem_capa}
                        alt={project.titulo}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full" style={{
                        background: "linear-gradient(135deg, hsl(var(--border)) 0%, hsl(var(--background)) 100%)"
                      }} />
                    )}
                  </div>
                  <h3 className="font-display text-[18px] md:text-[20px] text-foreground font-medium mb-1">
                    {project.titulo}
                  </h3>
                  <p className="text-muted-foreground text-[14px] leading-[1.6] line-clamp-2 mb-3">
                    {project.descricao}
                  </p>
                  <span className="text-foreground text-[14px] font-medium hover:text-primary transition-colors">
                    Ver Projeto →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground mt-10">
            <p className="font-display text-lg font-medium text-foreground mb-2">Nenhum projeto em destaque</p>
            <p className="text-sm">Adicione projetos pelo painel admin.</p>
          </div>
        )}

        {/* View all button */}
        <div className="flex justify-center mt-12 md:mt-16">
          <Link to="/projetos" className="btn-ghost">
            Ver Todos os Projetos →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
