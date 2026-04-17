import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Plus, LogOut, ArrowLeft, FileText, Settings, Eye, Copy, Trash2, Pencil, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { formatBRL, proposalStatusBadge } from "@/lib/proposalUtils";
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

const STATUS_FILTERS = ["Todas", "Rascunho", "Enviada", "Aceita", "Recusada", "Expirada"] as const;

type ProposalRow = {
  id: string;
  slug: string;
  cliente_nome: string;
  cliente_empresa: string | null;
  titulo: string;
  valor_total: number | null;
  status: string;
  created_at: string;
};

const AdminProposals = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<(typeof STATUS_FILTERS)[number]>("Todas");
  const [toDelete, setToDelete] = useState<ProposalRow | null>(null);

  useEffect(() => {
    if (!authLoading && !user) navigate("/admin/login");
  }, [user, authLoading, navigate]);

  const { data: proposals, isLoading } = useQuery({
    queryKey: ["admin-proposals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("proposals")
        .select("id, slug, cliente_nome, cliente_empresa, titulo, valor_total, status, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as ProposalRow[];
    },
    enabled: !!user,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("proposals").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-proposals"] });
      toast.success("Proposta excluída");
      setToDelete(null);
    },
    onError: () => toast.error("Erro ao excluir proposta"),
  });

  const filtered = proposals?.filter((p) => filter === "Todas" || p.status === filter);

  const copyLink = (slug: string) => {
    const url = `${window.location.origin}/proposta/${slug}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copiado!");
  };

  if (authLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-foreground">Carregando...</div>;
  }
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/88 backdrop-blur-[18px] border-b border-border">
        <div className="container mx-auto px-4 md:px-12 h-[68px] flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <Link to="/admin" className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <ArrowLeft size={18} />
            </Link>
            <Link to="/" className="font-display text-lg font-extrabold text-foreground shrink-0">
              Folio<span className="text-primary">blox</span>
            </Link>
            <span className="text-[11px] text-primary font-bold uppercase tracking-[0.08em] bg-primary/10 px-2 py-1 rounded-full shrink-0">Propostas</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <Link to="/admin/sobre" className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors" title="Editar Sobre">
              <FileText size={18} />
            </Link>
            <Link to="/admin/configuracoes" className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors" title="Configurações">
              <Settings size={18} />
            </Link>
            <Link to="/admin/propostas/nova" className="btn-primary px-3 py-2 md:px-5 md:py-2.5 text-[13px]">
              <Plus size={16} /> <span className="hidden sm:inline">Nova Proposta</span>
            </Link>
            <button onClick={signOut} className="p-2 text-muted-foreground hover:text-foreground transition-colors" title="Sair">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 md:px-12 pt-[100px] pb-16">
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-2">Propostas Comerciais</h1>
          <p className="text-sm text-muted-foreground">Crie e compartilhe propostas com seus clientes através de um link único.</p>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-6 py-3 border-b border-border flex flex-wrap gap-2 bg-background/40">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium border transition-all ${
                  filter === s
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
                }`}
              >
                {s}
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
                  <th className="px-5 py-3 text-left text-[11px] text-muted-foreground font-bold uppercase tracking-[0.07em] border-b border-border">Cliente / Título</th>
                  <th className="px-5 py-3 text-left text-[11px] text-muted-foreground font-bold uppercase tracking-[0.07em] border-b border-border hidden md:table-cell">Valor</th>
                  <th className="px-5 py-3 text-left text-[11px] text-muted-foreground font-bold uppercase tracking-[0.07em] border-b border-border hidden md:table-cell">Status</th>
                  <th className="px-5 py-3 text-left text-[11px] text-muted-foreground font-bold uppercase tracking-[0.07em] border-b border-border">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.015] transition-colors">
                    <td className="px-5 py-4 border-b border-border">
                      <div className="font-display text-[15px] font-semibold text-foreground">{p.cliente_nome}{p.cliente_empresa ? ` · ${p.cliente_empresa}` : ""}</div>
                      <div className="text-[12px] text-muted-foreground truncate max-w-[420px]">{p.titulo}</div>
                    </td>
                    <td className="px-5 py-4 border-b border-border text-[13px] text-foreground hidden md:table-cell">
                      {formatBRL(p.valor_total)}
                    </td>
                    <td className="px-5 py-4 border-b border-border hidden md:table-cell">
                      <span className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.04em] ${proposalStatusBadge(p.status)}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 border-b border-border">
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => copyLink(p.slug)}
                          title="Copiar link"
                          className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-secondary transition-all"
                        >
                          <LinkIcon size={14} />
                        </button>
                        <Link
                          to={`/proposta/${p.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Visualizar"
                          className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                        >
                          <Eye size={14} />
                        </Link>
                        <Link
                          to={`/admin/propostas/editar/${p.id}`}
                          title="Editar"
                          className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-secondary transition-all"
                        >
                          <Pencil size={14} />
                        </Link>
                        <button
                          onClick={() => setToDelete(p)}
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
              <div className="text-[48px] mb-4 opacity-30">📄</div>
              <p className="font-display text-xl font-bold text-foreground mb-2">Nenhuma proposta ainda</p>
              <p className="text-sm text-muted-foreground mb-7">Crie sua primeira proposta comercial e compartilhe com o cliente.</p>
              <Link to="/admin/propostas/nova" className="btn-primary">
                <Plus size={16} /> Nova Proposta
              </Link>
            </div>
          )}
        </div>
      </div>

      <AlertDialog open={!!toDelete} onOpenChange={(open) => !open && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir proposta?</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a excluir a proposta para <strong className="text-foreground">{toDelete?.cliente_nome}</strong>. O link público deixará de funcionar imediatamente.
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

export default AdminProposals;
