import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Plus, Pencil, Trash2, LogOut, Star, Search, Settings, FileText } from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

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
      return data;
    },
    enabled: !!user,
  });

  const filtered = projects?.filter((p) =>
    !search ||
    p.titulo.toLowerCase().includes(search.toLowerCase()) ||
    p.categoria.toLowerCase().includes(search.toLowerCase())
  );

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      toast.success("Projeto excluído");
    },
    onError: () => toast.error("Erro ao excluir projeto"),
  });

  if (authLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-foreground">Carregando...</div>;
  }
  if (!user) return null;

  const totalProjects = projects?.length || 0;
  const published = projects?.filter((p) => (p as any).status === "Concluído").length || 0;
  const inProgress = projects?.filter((p) => (p as any).status === "Em andamento").length || 0;
  const featured = projects?.filter((p) => p.destaque).length || 0;

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
            <Link to="/admin/sobre" className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors" title="Editar Sobre">
              <FileText size={18} />
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
            { n: inProgress, l: "Em andamento" },
            { n: featured, l: "Em destaque" },
          ].map((s) => (
            <div key={s.l} className="bg-card border border-border rounded-md p-6">
              <div className="font-display text-[38px] font-extrabold text-primary">{s.n}</div>
              <div className="text-[13px] text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Table header */}
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

          {/* Table */}
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
                            <img src={project.imagem_capa} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">{project.titulo[0]}</div>
                          )}
                        </div>
                        <div>
                          <div className="font-display text-[15px] font-semibold text-foreground flex items-center gap-1.5">
                            {project.titulo}
                            {project.destaque && <Star size={12} className="text-primary" />}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 border-b border-border text-[13px] text-muted-foreground hidden md:table-cell">
                      {project.categoria}
                    </td>
                    <td className="px-5 py-4 border-b border-border hidden md:table-cell">
                      {(project as any).status === "Concluído" ? (
                        <span className="inline-flex px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.04em] bg-green-500/10 text-green-400">● Concluído</span>
                      ) : (project as any).status === "Em andamento" ? (
                        <span className="inline-flex px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.04em] bg-yellow-500/10 text-yellow-400">Em andamento</span>
                      ) : (
                        <span className="inline-flex px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.04em] bg-white/[0.07] text-muted-foreground">{(project as any).status || "—"}</span>
                      )}
                    </td>
                    <td className="px-5 py-4 border-b border-border">
                      <div className="flex gap-2">
                        <Link
                          to={`/admin/editar/${project.id}`}
                          className="px-3.5 py-1.5 rounded-full text-[12px] border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all"
                        >
                          ✏
                        </Link>
                        <button
                          onClick={() => {
                            if (confirm("Tem certeza que deseja excluir este projeto?")) {
                              deleteMutation.mutate(project.id);
                            }
                          }}
                          className="px-3.5 py-1.5 rounded-full text-[12px] border border-border text-muted-foreground hover:text-destructive hover:border-destructive hover:bg-destructive/5 transition-all"
                        >
                          🗑
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
              <p className="font-display text-xl font-bold text-foreground mb-2">Nenhum projeto ainda</p>
              <p className="text-sm text-muted-foreground mb-7">Comece adicionando seu primeiro projeto ao portfólio.</p>
              <Link to="/admin/novo" className="btn-primary">
                <Plus size={16} /> Novo Projeto
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
