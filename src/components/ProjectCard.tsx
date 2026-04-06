import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Tables } from "@/integrations/supabase/types";

interface ProjectCardProps {
  project: Tables<"projects">;
  featured?: boolean;
}

const ProjectCard = ({ project, featured = false }: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className={`group bg-card border border-border rounded-lg overflow-hidden cursor-pointer hover:border-primary transition-colors ${
        featured ? "col-span-12 md:col-span-6" : "col-span-12 md:col-span-6"
      }`}
    >
      <Link to={`/projetos/${project.id}`}>
        {/* Thumbnail */}
        <div className="w-full h-[220px] overflow-hidden bg-secondary relative">
          {project.imagem_capa ? (
            <img
              src={project.imagem_capa}
              alt={project.titulo}
              className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.04]"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[40px] opacity-25">
              🎨
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-7">
          <div className="flex items-center gap-2 mb-2">
            <span className="tag-label">{project.categoria}</span>
            {(project as any).status && (project as any).status !== "Concluído" && (
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                (project as any).status === "Em andamento" ? "bg-yellow-500/10 text-yellow-400" : "bg-blue-500/10 text-blue-400"
              }`}>
                {(project as any).status}
              </span>
            )}
          </div>
          <h3 className="font-display text-xl font-bold text-foreground mb-2">
            {project.titulo}
          </h3>
          {project.descricao && (
            <p className="text-[13px] text-muted-foreground leading-[1.7] line-clamp-2">
              {project.descricao}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
            <span className="text-[12px] text-muted-foreground/60">
              {project.data_publicacao
                ? new Date(project.data_publicacao).getFullYear()
                : ""}
            </span>
            <span className="text-[13px] text-primary font-semibold">
              Ver Projeto →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
