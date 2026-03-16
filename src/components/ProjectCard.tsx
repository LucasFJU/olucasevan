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
      whileHover="hover"
      className={`group relative overflow-hidden rounded-2xl bg-card card-rim ${
        featured ? "col-span-12 md:col-span-8" : "col-span-12 md:col-span-4"
      }`}
    >
      <Link to={`/projetos/${project.id}`}>
        <div className={`overflow-hidden ${featured ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
          {project.imagem_capa ? (
            <motion.img
              variants={{ hover: { scale: 1.05 } }}
              transition={{ type: "spring", duration: 0.5, bounce: 0 }}
              src={project.imagem_capa}
              alt={project.titulo}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          ) : (
            <motion.div
              variants={{ hover: { scale: 1.05 } }}
              transition={{ type: "spring", duration: 0.5, bounce: 0 }}
              className="w-full h-full bg-secondary flex items-center justify-center"
            >
              <span className="font-display text-4xl font-bold text-muted-foreground/30">
                {project.titulo[0]}
              </span>
            </motion.div>
          )}
        </div>
        <div className="p-6">
          <span className="text-primary text-xs font-bold uppercase tracking-widest">
            {project.categoria}
          </span>
          <h3 className="text-xl font-bold mt-2 text-foreground group-hover:text-primary transition-colors">
            {project.titulo}
          </h3>
          {featured && project.descricao && (
            <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{project.descricao}</p>
          )}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
