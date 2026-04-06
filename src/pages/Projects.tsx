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

          {/* Search */}
          <div className="relative mt-10 max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar projetos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-secondary border border-border rounded-xl pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mt-6">
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

          {/* Status Filters */}
          <div className="flex flex-wrap gap-3 mt-3">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setActiveStatus(s)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                  activeStatus === s
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {s}
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
              : filtered && filtered.length > 0
              ? filtered.map((project, i) => (
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
