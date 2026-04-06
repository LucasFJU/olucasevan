import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ProjectCard from "./ProjectCard";
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
    <section className="sec-pad">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10 flex-wrap gap-4"
        >
          <div>
            <p className="tag-label mb-3">Portfólio</p>
            <h2
              className="font-display font-extrabold leading-[1.05] text-foreground"
              style={{ fontSize: "clamp(32px, 5vw, 54px)" }}
            >
              Projetos que falam por si.
            </h2>
          </div>
          <Link
            to="/projetos"
            className="hidden md:inline-flex text-primary text-sm font-semibold hover:underline items-center gap-2"
          >
            Ver todos →
          </Link>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-12 gap-4">
            {[6, 6, 6, 6].map((_, i) => (
              <div
                key={i}
                className="col-span-12 md:col-span-6 h-[340px] bg-card rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-12 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <div className="text-[40px] mb-3 opacity-30">🎨</div>
            <p className="font-display text-lg font-bold text-foreground mb-2">Nenhum projeto em destaque</p>
            <p className="text-sm">Adicione projetos pelo painel admin.</p>
          </div>
        )}

        <Link
          to="/projetos"
          className="md:hidden flex items-center justify-center gap-2 text-primary text-sm font-semibold mt-8"
        >
          Ver todos os projetos →
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProjects;
