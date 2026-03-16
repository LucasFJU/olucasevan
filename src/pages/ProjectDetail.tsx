import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: allProjects } = useQuery({
    queryKey: ["all-project-ids"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id, titulo")
        .order("data_publicacao", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const currentIndex = allProjects?.findIndex((p) => p.id === id) ?? -1;
  const prevProject = currentIndex > 0 ? allProjects![currentIndex - 1] : null;
  const nextProject = currentIndex >= 0 && currentIndex < (allProjects?.length ?? 0) - 1
    ? allProjects![currentIndex + 1]
    : null;

  if (isLoading) {
    return (
      <Layout>
        <div className="pt-32 pb-24 container mx-auto px-6">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-card rounded w-1/3" />
            <div className="aspect-[16/9] bg-card rounded-2xl" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="pt-32 pb-24 container mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold text-foreground">Projeto não encontrado</h1>
          <Link to="/projetos" className="text-primary mt-4 inline-block">Voltar aos projetos</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/projetos" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-8">
              <ArrowLeft size={16} /> Voltar aos projetos
            </Link>

            <span className="text-primary text-sm font-bold uppercase tracking-widest block">
              {project.categoria}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mt-2 text-foreground">
              {project.titulo}
            </h1>

            {project.link_projeto && (
              <a
                href={project.link_projeto}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary text-sm font-semibold mt-4 hover:underline"
              >
                Ver projeto ao vivo <ExternalLink size={14} />
              </a>
            )}
          </motion.div>

          {/* Hero image */}
          {project.imagem_capa && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 rounded-2xl overflow-hidden ember-glow"
            >
              <img
                src={project.imagem_capa}
                alt={project.titulo}
                className="w-full object-cover"
              />
            </motion.div>
          )}

          {/* Description */}
          {project.descricao && (
            <div className="mt-12 max-w-3xl">
              <h2 className="text-2xl font-bold text-foreground mb-4">Sobre o Projeto</h2>
              <p className="text-muted-foreground leading-relaxed text-pretty whitespace-pre-line">
                {project.descricao}
              </p>
            </div>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-lg">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Gallery */}
          {project.galeria && project.galeria.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-foreground mb-8">Galeria</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.galeria.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-2xl overflow-hidden bg-card card-rim"
                  >
                    <img src={img} alt={`${project.titulo} - ${i + 1}`} className="w-full object-cover" loading="lazy" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-20 pt-10 border-t border-border flex justify-between">
            {prevProject ? (
              <Link
                to={`/projetos/${prevProject.id}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft size={16} />
                <div>
                  <span className="text-xs block">Projeto anterior</span>
                  <span className="font-semibold text-foreground">{prevProject.titulo}</span>
                </div>
              </Link>
            ) : <div />}
            {nextProject ? (
              <Link
                to={`/projetos/${nextProject.id}`}
                className="flex items-center gap-2 text-right text-muted-foreground hover:text-foreground transition-colors"
              >
                <div>
                  <span className="text-xs block">Próximo projeto</span>
                  <span className="font-semibold text-foreground">{nextProject.titulo}</span>
                </div>
                <ArrowRight size={16} />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;
