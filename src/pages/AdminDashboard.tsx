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
    if (!authLoading && !user) {
      navigate("/admin/login");
    }
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
    onError: () => {
      toast.error("Erro ao excluir projeto");
    },
  });

  if (authLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-foreground">Carregando...</div>;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-display text-xl font-bold tracking-tighter text-foreground">
              Studio<span className="text-primary">.</span>
            </Link>
            <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-md">Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/admin/sobre"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              title="Editar Sobre"
            >
              <FileText size={18} />
            </Link>
            <Link
              to="/admin/configuracoes"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              title="Configurações"
            >
              <Settings size={18} />
            </Link>
            <Link
              to="/admin/novo"
              className="bg-ember-gradient text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
            >
              <Plus size={16} /> Novo Projeto
            </Link>
            <button
              onClick={signOut}
              className="text-muted-foreground hover:text-foreground transition-colors p-2"
              title="Sair"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Projetos</h1>
          <div className="relative w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar projetos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-secondary border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 bg-card rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filtered && filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((project) => (
              <div
                key={project.id}
                className="bg-card rounded-xl p-5 card-rim flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  {project.imagem_capa ? (
                    <img
                      src={project.imagem_capa}
                      alt={project.titulo}
                      className="w-16 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-12 rounded-lg bg-secondary flex-shrink-0 flex items-center justify-center">
                      <span className="text-muted-foreground text-xs">{project.titulo[0]}</span>
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground truncate">{project.titulo}</h3>
                      {project.destaque && <Star size={14} className="text-primary flex-shrink-0" />}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-xs text-muted-foreground">{project.categoria}</p>
                      {(project as any).status && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          (project as any).status === "Concluído" ? "bg-green-500/10 text-green-400" :
                          (project as any).status === "Em andamento" ? "bg-yellow-500/10 text-yellow-400" :
                          "bg-blue-500/10 text-blue-400"
                        }`}>
                          {(project as any).status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    to={`/admin/editar/${project.id}`}
                    className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => {
                      if (confirm("Tem certeza que deseja excluir este projeto?")) {
                        deleteMutation.mutate(project.id);
                      }
                    }}
                    className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">Nenhum projeto ainda.</p>
            <Link
              to="/admin/novo"
              className="inline-flex items-center gap-2 bg-ember-gradient text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold mt-4"
            >
              <Plus size={16} /> Criar primeiro projeto
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
