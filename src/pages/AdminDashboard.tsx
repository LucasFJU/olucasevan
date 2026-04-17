import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Plus, LogOut, Star, Settings, FileText, Eye, Copy, Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const STATUS_OPTIONS = ["Concluído", "Em andamento", "Em breve", "Rascunho"] as const;
type ProjectRow = {
  id: string;
  titulo: string;
  categoria: string;
  imagem_capa: string | null;
  destaque: boolean | null;
  status: string | null;
  descricao: string | null;
  tags: string[] | null;
  link_projeto: string | null;
  galeria: string[] | null;
  data_publicacao: string | null;
};

const statusBadgeClass = (status: string | null) => {
  switch (status) {
    case "Concluído":
      return "bg-green-500/10 text-green-400";
    case "Em andamento":
      return "bg-yellow-500/10 text-yellow-400";
    case "Rascunho":
      return "bg-white/[0.07] text-muted-foreground";
    case "Em breve":
      return "bg-blue-500/10 text-blue-400";
    default:
      return "bg-white/[0.07] text-muted-foreground";
  }
};

const AdminDashboard = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "destaques" | "rascunhos" | string>("all");
  const [toDelete, setToDelete] = useState<ProjectRow | null>(null);

  useEffect(() => {
    if (!authLoading && !user) navigate("/admin/login");
  }, [user, authLoading, navigate]);

  const { data: projects, isLoading } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as ProjectRow[];
    },
    enabled: !!user,
  });

  const categories = Array.from(new Set((projects || []).map((p) => p.categoria))).filter(Boolean);

  const filtered = projects?.filter((p) => {
    const matchesSearch =
      !search ||
      p.titulo.toLowerCase().includes(search.toLowerCase()) ||
      p.categoria.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === "all") return true;
    if (filter === "destaques") return !!p.destaque;
    if (filter === "rascunhos") return p.status === "Rascunho";
    return p.categoria === filter;
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      toast.success("Projeto excluído");
      setToDelete(null);
    },
    onError: () => toast.error("Erro ao excluir projeto"),
  });

  const updateField = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<ProjectRow> }) => {
      const { error } = await supabase.from("projects").update(patch).eq("id", id);
      if (error) throw error;
    },
    onMutate: async ({ id, patch }) => {
      await queryClient.cancelQueries({ queryKey: ["admin-projects"] });
      const prev = queryClient.getQueryData<ProjectRow[]>(["admin-projects"]);
      queryClient.setQueryData<ProjectRow[]>(["admin-projects"], (old) =>
        old?.map((p) => (p.id === id ? { ...p, ...patch } : p)) || old,
      );
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(["admin-projects"], ctx.prev);
      toast.error("Erro ao atualizar");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
    },
  });

  const duplicateMutation = useMutation({
    mutationFn: async (project: ProjectRow) => {
      const { id, ...rest } = project;
      const { error } = await supabase.from("projects").insert({
        ...rest,
        titulo: `${project.titulo} (cópia)`,
        destaque: false,
        status: "Rascunho",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      toast.success("Projeto duplicado como Rascunho");
    },
    onError: () => toast.error("Erro ao duplicar projeto"),
  });

  if (authLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-foreground">Carregando...</div>;
  }
  if (!user) return null;

  const totalProjects = projects?.length || 0;
  const published = projects?.filter((p) => p.status === "Concluído").length || 0;
  const drafts = projects?.filter((p) => p.status === "Rascunho").length || 0;
  const featured = projects?.filter((p) => p.destaque).length || 0;

  const filterChips: { key: string; label: string }[] = [
    { key: "all", label: "Todos" },
    { key: "destaques", label: "Destaques" },
    { key: "rascunhos", label: "Rascunhos" },
    ...categories.map((c) => ({ key: c, label: c })),
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/88 backdrop-blur-[18px] border-b border-border">
        <div className="container mx-auto px-4 md:px-12 h-[68px] flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <Link to="/" className="font-display text-lg font-extrabold text-foreground shrink-0">
              Folio<span className="text-primary">blox</span>
            </Link>
            <span className="text-[11px] text-primary font-bold uppercase tracking-[0.08em] bg-primary/10 px-2 py-1 rounded-full shrink-0">Admin</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <Link to="/admin/propostas" className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors" title="Propostas comerciais">
              <FileText size={18} />
            </Link>
            <Link to="/admin/sobre" className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors text-[11px] font-bold" title="Editar Sobre">
              Sobre
            </Link>
            <Link to="/admin/configuracoes" className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors" title="Configurações">
              <Settings size={18} />
            </Link>
            <Link to="/admin/novo" className="btn-primary px-3 py-2 md:px-5 md:py-2.5 text-[13px]">
              <Plus size={16} /> <span className="hidden sm:inline">Novo Projeto</span>
            </Link>
            <button onClick={signOut} className="p-2 text-muted-foreground hover:text-foreground transition-colors" title="Sair">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 md:px-12 pt-[100px] pb-16">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-10">
          {[
            { n: totalProjects, l: "Total de Projetos" },
            { n: published, l: "Concluídos" },
            { n: drafts, l: "Rascunhos" },
            { n: featured, l: "Em destaque" },
          ].map((s) => (
            <div key={s.l} className="bg-card border border-border rounded-md p-6">
              <div className="font-display text-[38px] font-extrabold text-primary">{s.n}</div>
              <div className="text-[13px] text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-6 py-4 flex items-center justify-between border-b border-border flex-wrap gap-3">
            <h2 className="font-display text-base font-bold text-foreground">Lista de Projetos</h2>
            <div className="relative w-[230px]">
              <input
                type="text"
                placeholder="🔍 Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-secondary border border-border rounded-md pl-3 pr-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Filter chips */}
          <div className="px-6 py-3 border-b border-border flex flex-wrap gap-2 bg-background/40">
            {filterChips.map((c) => (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium border transition-all ${
                  filter === c.key
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-16 bg-secondary rounded-md animate-pulse" />
              ))}
            </div>
          ) : filtered && filtered.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="bg-secondary">
                  <th className="px-5 py-3 text-left text-[11px] text-muted-foreground font-bold uppercase tracking-[0.07em] border-b border-border">Projeto</th>
                  <th className="px-5 py-3 text-left text-[11px] text-muted-foreground font-bold uppercase tracking-[0.07em] border-b border-border hidden md:table-cell">Categoria</th>
                  <th className="px-5 py-3 text-left text-[11px] text-muted-foreground font-bold uppercase tracking-[0.07em] border-b border-border hidden md:table-cell">Status</th>
                  <th className="px-5 py-3 text-left text-[11px] text-muted-foreground font-bold uppercase tracking-[0.07em] border-b border-border">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((project) => (
                  <tr key={project.id} className="hover:bg-white/[0.015] transition-colors">
                    <td className="px-5 py-4 border-b border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-[52px] h-10 rounded-sm overflow-hidden bg-secondary flex-shrink-0">
                          {project.imagem_capa ? (
                            <img src={project.imagem_capa} alt="" className="w-full h-full object-cover" loading="lazy" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">{project.titulo[0]}</div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-display text-[15px] font-semibold text-foreground flex items-center gap-1.5">
                            <span className="truncate">{project.titulo}</span>
                            <button
                              onClick={() =>
                                updateField.mutate({ id: project.id, patch: { destaque: !project.destaque } })
                              }
                              title={project.destaque ? "Remover destaque" : "Marcar como destaque"}
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Star
                                size={14}
                                className={project.destaque ? "text-primary fill-primary" : ""}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 border-b border-border text-[13px] text-muted-foreground hidden md:table-cell">
                      {project.categoria}
                    </td>
                    <td className="px-5 py-4 border-b border-border hidden md:table-cell">
                      <select
                        value={project.status || "Concluído"}
                        onChange={(e) =>
                          updateField.mutate({ id: project.id, patch: { status: e.target.value } })
                        }
                        className={`appearance-none cursor-pointer inline-flex px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.04em] border-0 focus:outline-none focus:ring-1 focus:ring-primary ${statusBadgeClass(project.status)}`}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s} className="bg-card text-foreground normal-case">
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4 border-b border-border">
                      <div className="flex gap-1.5">
                        <Link
                          to={`/projetos/${project.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Ver projeto"
                          className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                        >
                          <Eye size={14} />
                        </Link>
                        <Link
                          to={`/admin/editar/${project.id}`}
                          title="Editar"
                          className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-secondary transition-all"
                        >
                          <Pencil size={14} />
                        </Link>
                        <button
                          onClick={() => duplicateMutation.mutate(project)}
                          title="Duplicar"
                          className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                        >
                          <Copy size={14} />
                        </button>
                        <button
                          onClick={() => setToDelete(project)}
                          title="Excluir"
                          className="p-2 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-20 px-10">
              <div className="text-[48px] mb-4 opacity-30">📁</div>
              <p className="font-display text-xl font-bold text-foreground mb-2">Nenhum projeto encontrado</p>
              <p className="text-sm text-muted-foreground mb-7">Tente outro filtro, busca, ou crie um novo projeto.</p>
              <Link to="/admin/novo" className="btn-primary">
                <Plus size={16} /> Novo Projeto
              </Link>
            </div>
          )}
        </div>
      </div>

      <AlertDialog open={!!toDelete} onOpenChange={(open) => !open && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir projeto?</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a excluir <strong className="text-foreground">{toDelete?.titulo}</strong>. Esta ação é irreversível e removerá o projeto permanentemente do site.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => toDelete && deleteMutation.mutate(toDelete.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
