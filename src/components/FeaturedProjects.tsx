import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ProjectCard from "./ProjectCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="text-primary text-sm font-bold uppercase tracking-widest">Portfólio</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mt-2 text-foreground">
              Projetos em Destaque
            </h2>
          </div>
          <Link
            to="/projetos"
            className="hidden md:flex items-center gap-2 text-primary text-sm font-semibold hover:underline"
          >
            Ver todos <ArrowRight size={14} />
          </Link>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-12 gap-8">
            {[8, 4, 4].map((span, i) => (
              <div
                key={i}
                className={`col-span-12 md:col-span-${span} aspect-[16/10] bg-card rounded-2xl animate-pulse`}
              />
            ))}
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-12 gap-8">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} featured={i === 0} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">Nenhum projeto em destaque ainda.</p>
            <p className="text-sm mt-2">Projetos aparecerão aqui quando adicionados pelo painel admin.</p>
          </div>
        )}

        <Link
          to="/projetos"
          className="md:hidden flex items-center justify-center gap-2 text-primary text-sm font-semibold mt-8"
        >
          Ver todos os projetos <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProjects;
