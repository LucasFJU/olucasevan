import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Tables } from "@/integrations/supabase/types";

interface ProjectCardProps {
  project: Tables<"projects">;
  featured?: boolean;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="col-span-12 md:col-span-6 group cursor-pointer"
    >
      <Link to={`/projetos/${project.id}`}>
        {/* Thumbnail */}
        <div className="w-full h-[350px] md:h-[450px] overflow-hidden rounded-lg bg-card relative mb-5">
          {project.imagem_capa ? (
            <img
              src={project.imagem_capa}
              alt={project.titulo}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full" style={{
              background: "linear-gradient(135deg, hsl(var(--border)) 0%, hsl(var(--background)) 100%)"
            }} />
          )}
        </div>

        {/* Body */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-[20px] font-medium text-foreground mb-1">
              {project.titulo}
            </h3>
            {project.descricao && (
              <p className="text-[14px] text-muted-foreground leading-[1.6] line-clamp-2">
                {project.descricao}
              </p>
            )}
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
