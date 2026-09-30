import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import type { Tables } from "@/integrations/supabase/types";

interface ProjectCardProps {
  project: Pick<Tables<"projects">, "id" | "titulo" | "descricao" | "imagem_capa"> & Partial<Tables<"projects">>;
  featured?: boolean;
}

const optimizeImage = (url: string | null) => {
  if (!url) return null;
  if (!url.includes("/storage/v1/object/public/")) return url;
  const optimized = url.replace("/object/public/", "/render/image/public/");
  return `${optimized}${optimized.includes("?") ? "&" : "?"}width=900&quality=75`;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const reduced = useReducedMotion();
  return (
    <motion.div
      whileHover={reduced ? undefined : { y: -2 }}
      transition={{ duration: 0.25 }}
      className="col-span-12 md:col-span-6 group cursor-pointer"
    >
      <Link to={`/projetos/${project.id}`}>
        {/* Thumbnail */}
        <div className="w-full h-[350px] md:h-[450px] overflow-hidden rounded-lg bg-card relative mb-5 project-card-image">
          {project.imagem_capa ? (
            <img
              src={optimizeImage(project.imagem_capa) || project.imagem_capa}
              alt={project.titulo}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="w-full h-full" style={{
              background: "linear-gradient(135deg, hsl(var(--border)) 0%, hsl(var(--background)) 100%)"
            }} />
          )}
        </div>

        {/* Body */}
        <div className="flex items-start justify-between gap-4 project-card-meta">
          <div>
            {project.categoria && <p className="project-card-category">{project.categoria}</p>}
            <h3 className="font-display text-[20px] font-medium text-foreground mb-1">
              {project.titulo}
            </h3>
          </div>
          <span className="text-foreground text-[14px] font-medium shrink-0 mt-1 group-hover:text-primary transition-colors">
            Ver Projeto →
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;

