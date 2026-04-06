import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const categories = ["Todos", "Social Media", "Brand Design", "Web Design"];
const statuses = ["Todos", "Concluído", "Em andamento", "Em breve"];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [activeStatus, setActiveStatus] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("data_publicacao", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filtered = projects?.filter((p) => {
    const matchesCategory = activeFilter === "Todos" || p.categoria === activeFilter;
    const matchesStatus = activeStatus === "Todos" || (p as any).status === activeStatus;
    const matchesSearch =
      !searchQuery ||
      p.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.descricao?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <Layout>
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-end justify-between flex-wrap gap-4 mb-9"
          >
            <div>
              <p className="tag-label mb-3">Portfólio</p>
              <h1
                className="font-display font-extrabold leading-[1.05] text-foreground"
                style={{ fontSize: "clamp(32px, 5vw, 54px)" }}
              >
                Todos os Projetos
              </h1>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`rounded-full px-5 py-2 text-[13px] font-medium border transition-all ${
                    activeFilter === cat
                      ? "bg-primary border-primary text-primary-foreground"
                      : "bg-secondary border-border text-muted-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Search + Status */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="🔍 Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-secondary border border-border rounded-md pl-10 pr-4 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveStatus(s)}
                  className={`rounded-full px-4 py-1.5 text-[12px] font-medium border transition-all ${
                    activeStatus === s
                      ? "border-primary text-primary bg-primary/10"
                      : "border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-12 gap-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="col-span-12 md:col-span-6 h-[340px] bg-card rounded-lg animate-pulse"
                  />
                ))
              : filtered && filtered.length > 0
              ? filtered.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))
              : (
                <div className="col-span-12 text-center py-20 text-muted-foreground">
                  <div className="text-[40px] mb-3 opacity-30">🎨</div>
                  <p className="font-display text-lg font-bold text-foreground mb-2">Nenhum projeto nesta categoria</p>
                  <p className="text-sm">Adicione projetos pelo painel admin.</p>
                </div>
              )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
