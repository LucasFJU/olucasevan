import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { ArrowLeft, ArrowRight, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";

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
        <div className="pt-32 pb-24 container mx-auto px-6 md:px-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-card rounded w-1/3" />
            <div className="aspect-[16/9] bg-card rounded-lg" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="pt-32 pb-24 container mx-auto px-6 md:px-12 text-center">
          <h1 className="text-3xl font-bold text-foreground">Projeto não encontrado</h1>
          <Link to="/projetos" className="text-primary mt-4 inline-block">Voltar aos projetos</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero with background */}
      <section className="relative pt-[68px] min-h-[60vh] flex flex-col justify-end overflow-hidden">
        {project.imagem_capa && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${project.imagem_capa})`, filter: "brightness(0.35)" }}
          />
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(0 0% 4%) 0%, rgba(10,10,10,0.6) 40%, transparent 70%)" }} />

        <div className="relative z-10 container mx-auto px-6 md:px-12 pb-16">
          <Link to="/projetos" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-7 transition-colors">
            <ArrowLeft size={14} /> Voltar
          </Link>
          <div className="tag-label mb-3">{project.categoria}</div>
          <h1
            className="font-display font-extrabold leading-[0.95] text-foreground mb-5"
            style={{ fontSize: "clamp(42px, 7vw, 84px)" }}
          >
            {project.titulo}
          </h1>
          <div className="flex gap-10 flex-wrap">
            <div>
              <strong className="block font-display text-[15px] text-foreground mb-1">{project.titulo}</strong>
              <span className="text-[13px] text-muted-foreground">Cliente</span>
            </div>
            <div>
              <strong className="block font-display text-[15px] text-foreground mb-1">
                {project.data_publicacao ? new Date(project.data_publicacao).getFullYear() : "—"}
              </strong>
              <span className="text-[13px] text-muted-foreground">Ano</span>
            </div>
            <div>
              <strong className="block font-display text-[15px] text-foreground mb-1">{project.categoria}</strong>
              <span className="text-[13px] text-muted-foreground">Serviço</span>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="container mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-16 items-start">
          <div>
            {/* Main image */}
            {project.imagem_capa && (
              <div className="rounded-lg overflow-hidden bg-secondary mb-9">
                <img src={project.imagem_capa} alt={project.titulo} className="w-full object-cover" />
              </div>
            )}

            {/* Description */}
            {project.descricao && (
              <p className="text-base text-secondary-foreground leading-[1.9] mb-9 whitespace-pre-line">
                {project.descricao}
              </p>
            )}

            {/* Gallery */}
            {project.galeria && project.galeria.length > 0 && (
              <div className="space-y-3">
                {project.galeria.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    className={`rounded-md overflow-hidden bg-secondary cursor-pointer hover:scale-[1.01] transition-transform ${
                      i % 3 === 0 ? "aspect-[16/9]" : ""
                    } ${i % 3 !== 0 && i + 1 < project.galeria!.length && (i + 1) % 3 !== 0 ? "inline-block w-[calc(50%-6px)] mr-3 aspect-[4/3] align-top" : i % 3 !== 0 ? "inline-block w-[calc(50%-6px)] aspect-[4/3] align-top" : ""}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar info */}
          <div className="space-y-5">
            <div className="bg-card border border-border rounded-lg p-7">
              <h4 className="font-display text-base font-bold text-foreground mb-4">Informações</h4>
              {[
                { label: "Cliente", value: project.titulo },
                { label: "Serviço", value: project.categoria },
                { label: "Ano", value: project.data_publicacao ? new Date(project.data_publicacao).getFullYear().toString() : "—" },
                { label: "Status", value: "● Publicado", color: "text-green-400" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between py-2.5 border-b border-border last:border-b-0 text-[13px]">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className={`font-medium text-right ${(row as any).color || ""}`}>{row.value}</span>
                </div>
              ))}
            </div>

            {project.tags && project.tags.length > 0 && (
              <div className="bg-card border border-border rounded-lg p-7">
                <h4 className="font-display text-base font-bold text-foreground mb-4">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="bg-secondary border border-border rounded-full px-3.5 py-1.5 text-[12px] text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.link_projeto && (
              <a
                href={project.link_projeto}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost w-full justify-center"
              >
                Ver projeto ao vivo <ExternalLink size={14} />
              </a>
            )}

            <Link to="/contato" className="btn-primary w-full justify-center">
              Quero um projeto similar →
            </Link>
          </div>
        </div>

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
                <span className="font-display font-semibold text-foreground">{prevProject.titulo}</span>
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
                <span className="font-display font-semibold text-foreground">{nextProject.titulo}</span>
              </div>
              <ArrowRight size={16} />
            </Link>
          ) : <div />}
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetail;
