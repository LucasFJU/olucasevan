import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { ArrowLeft, ArrowRight, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useCallback, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const reduced = useReducedMotion();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number>(0);

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id!)
        .neq("status", "Rascunho")
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
        .neq("status", "Rascunho")
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

  const galleryLength = project?.galeria?.length ?? 0;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null && prev < galleryLength - 1 ? prev + 1 : prev));
  }, [galleryLength]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, goNext, goPrev]);

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

  if (!project || project.status === "Rascunho") {
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
      <div className="editorial-page project-case">
      <Helmet>
        <title>{project.titulo} — Lucas Evangelista</title>
        <meta name="description" content={project.descricao?.slice(0, 160) || `Projeto ${project.titulo} por Lucas Evangelista.`} />
        {project.imagem_capa && <meta property="og:image" content={project.imagem_capa} />}
      </Helmet>
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
                    initial={reduced ? false : { opacity: 0, y: 20 }}
                    whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    className={`rounded-md overflow-hidden bg-secondary cursor-pointer hover:scale-[1.01] transition-transform ${
                      i % 3 === 0 ? "aspect-[16/9]" : ""
                    } ${i % 3 !== 0 && i + 1 < project.galeria!.length && (i + 1) % 3 !== 0 ? "inline-block w-[calc(50%-6px)] mr-3 aspect-[4/3] align-top" : i % 3 !== 0 ? "inline-block w-[calc(50%-6px)] aspect-[4/3] align-top" : ""}`}
                    onClick={() => openLightbox(i)}
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
                { label: "Serviço", value: project.categoria },
                { label: "Ano", value: project.data_publicacao ? new Date(project.data_publicacao).getFullYear().toString() : "—" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between py-2.5 border-b border-border last:border-b-0 text-[13px]">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className={`font-medium text-right ${"color" in row ? row.color : ""}`}>{row.value}</span>
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && project?.galeria && (
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
            onClick={closeLightbox}
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const delta = touchStartX.current - e.changedTouches[0].clientX;
              if (delta > 50) goNext();
              else if (delta < -50) goPrev();
            }}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 p-2 rounded-full bg-card/80 border border-border text-foreground hover:bg-card transition-colors"
            >
              <X size={20} />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-6 text-muted-foreground text-sm font-display">
              {lightboxIndex + 1} / {project.galeria.length}
            </div>

            {/* Prev */}
            {lightboxIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 md:left-8 z-50 p-3 rounded-full bg-card/80 border border-border text-foreground hover:bg-card transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Next */}
            {lightboxIndex < project.galeria.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 md:right-8 z-50 p-3 rounded-full bg-card/80 border border-border text-foreground hover:bg-card transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            )}

            {/* Image */}
            <motion.img
              key={lightboxIndex}
              initial={reduced ? false : { opacity: 0, scale: 0.95 }}
              animate={reduced ? undefined : { opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              src={project.galeria[lightboxIndex]}
              alt=""
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </Layout>
  );
};

export default ProjectDetail;

