import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import { motion } from "framer-motion";

const categories = ["Todos", "Social Media", "Brand Design", "Web Design"];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects", activeFilter],
    queryFn: async () => {
      let query = supabase
        .from("projects")
        .select("*")
        .order("data_publicacao", { ascending: false });

      if (activeFilter !== "Todos") {
        query = query.eq("categoria", activeFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  return (
    <Layout>
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary text-sm font-bold uppercase tracking-widest">Portfólio</span>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mt-2 text-foreground">
              Todos os Projetos
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl text-pretty">
              Explore meus trabalhos em Social Media, Brand Design e Web Design.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mt-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeFilter === cat
                    ? "bg-ember-gradient text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-12 gap-8 mt-12">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="col-span-12 md:col-span-4 aspect-[4/3] bg-card rounded-2xl animate-pulse"
                  />
                ))
              : projects && projects.length > 0
              ? projects.map((project, i) => (
                  <ProjectCard key={project.id} project={project} featured={i === 0} />
                ))
              : (
                <div className="col-span-12 text-center py-20 text-muted-foreground">
                  <p className="text-lg">Nenhum projeto encontrado.</p>
                </div>
              )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
