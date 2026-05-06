import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const categories = ["Todos", "Social Media", "Brand Design", "Web Design"];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id, titulo, descricao, categoria, imagem_capa, tags, data_publicacao")
        .neq("status", "Rascunho")
        .order("data_publicacao", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filtered = projects?.filter((p) => {
    const matchesCategory = activeFilter === "Todos" || p.categoria === activeFilter;
    const matchesSearch =
      !searchQuery ||
      p.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.descricao?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      {/* Page Banner */}
      <section className="min-h-[180px] md:min-h-[350px] flex items-center justify-center border-b border-border relative pt-[80px] md:pt-0" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(15 100% 50% / 0.12), transparent 70%), hsl(var(--background))"
      }}>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-foreground text-center"
          style={{ fontSize: "clamp(36px, 8vw, 120px)", fontWeight: 500, lineHeight: 1, letterSpacing: "-0.02em" }}
        >
          Projetos
        </motion.h1>
      </section>

      {/* Filters + Grid */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-0 py-[40px] md:py-[60px]">
        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-12">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`rounded-full px-5 py-2.5 text-[14px] font-medium border transition-all ${
                  activeFilter === cat
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-foreground/[0.02] border-border text-muted-foreground hover:border-primary hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:min-w-[200px] md:max-w-sm">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-foreground/[0.02] border border-border rounded-full pl-10 pr-4 py-2.5 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="col-span-1 md:col-span-6 h-[300px] md:h-[400px] bg-card rounded-lg animate-pulse" />
              ))
            : filtered && filtered.length > 0
            ? filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            : (
              <div className="col-span-1 md:col-span-12 text-center py-16 md:py-20 text-muted-foreground">
                <p className="font-display text-lg font-medium text-foreground mb-2">Nenhum projeto encontrado</p>
                <p className="text-sm">Tente outro filtro ou busca.</p>
              </div>
            )}
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
