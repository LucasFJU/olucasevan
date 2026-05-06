import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, Search, ShieldCheck, ShieldOff, Loader2, UserPlus } from "lucide-react";
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

type Admin = { id: string; email: string; created_at: string };
type SearchResult = { id: string; email: string; is_admin: boolean };

const callEdge = async (action: string, params?: Record<string, string>) => {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;
  const base = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-admins`;
  const url = new URL(base);
  url.searchParams.set("action", action);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Request failed");
  }
  return res.json();
};

const postEdge = async (body: Record<string, string>) => {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;
  const base = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-admins`;
  const res = await fetch(base, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Request failed");
  }
  return res.json();
};

const AdminUsers = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchEmail, setSearchEmail] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{ user_id: string; email: string; action: "promote" | "demote" } | null>(null);

  useEffect(() => {
    if (!authLoading && !user) navigate("/admin/login");
  }, [user, authLoading, navigate]);

  const { data: admins, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await callEdge("list");
      return res.admins as Admin[];
    },
    enabled: !!user,
  });

  const mutation = useMutation({
    mutationFn: async ({ user_id, action }: { user_id: string; action: string }) => {
      return postEdge({ user_id, action });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      setSearchResults(null);
      setSearchEmail("");
      toast.success(confirmAction?.action === "promote" ? "Usuário promovido a admin" : "Admin removido");
      setConfirmAction(null);
    },
    onError: (e: Error) => {
      toast.error(e.message);
      setConfirmAction(null);
    },
  });

  const handleSearch = async () => {
    if (!searchEmail.trim()) return;
    setSearching(true);
    try {
      const res = await callEdge("search", { email: searchEmail.trim() });
      setSearchResults(res.users as SearchResult[]);
    } catch {
      toast.error("Erro ao buscar usuários");
    } finally {
      setSearching(false);
    }
  };

  if (authLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-foreground">Carregando...</div>;
  }
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/88 backdrop-blur-[18px] border-b border-border">
        <div className="container mx-auto px-4 md:px-12 h-[68px] flex items-center gap-4">
          <Link to="/admin" className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="font-display text-lg font-bold text-foreground">Gerenciar Administradores</h1>
        </div>
      </nav>

      <div className="container mx-auto px-4 md:px-12 pt-[100px] pb-16 max-w-2xl">
        {/* Current admins */}
        <div className="bg-card border border-border rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-display text-base font-bold text-foreground flex items-center gap-2">
              <ShieldCheck size={18} className="text-primary" /> Administradores atuais
            </h2>
          </div>
          {isLoading ? (
            <div className="p-6 flex justify-center"><Loader2 className="animate-spin text-muted-foreground" /></div>
          ) : (
            <div className="divide-y divide-border">
              {admins?.map((a) => (
                <div key={a.id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-foreground">{a.email}</div>
                    <div className="text-xs text-muted-foreground">
                      Desde {new Date(a.created_at).toLocaleDateString("pt-BR")}
                    </div>
                  </div>
                  {a.id !== user.id && (
                    <button
                      onClick={() => setConfirmAction({ user_id: a.id, email: a.email!, action: "demote" })}
                      className="text-xs text-destructive hover:text-destructive/80 flex items-center gap-1 transition-colors"
                    >
                      <ShieldOff size={14} /> Remover
                    </button>
                  )}
                  {a.id === user.id && (
                    <span className="text-xs text-muted-foreground">Você</span>
                  )}
                </div>
              ))}
              {admins?.length === 0 && (
                <div className="p-6 text-center text-sm text-muted-foreground">Nenhum administrador encontrado</div>
              )}
            </div>
          )}
        </div>

        {/* Search & promote */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-display text-base font-bold text-foreground flex items-center gap-2">
              <UserPlus size={18} className="text-primary" /> Adicionar administrador
            </h2>
          </div>
          <div className="p-6">
            <p className="text-sm text-muted-foreground mb-4">
              Busque pelo email de um usuário cadastrado para promovê-lo a administrador.
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="email@exemplo.com"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full bg-secondary border border-border rounded-md pl-3 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={searching || !searchEmail.trim()}
                className="btn-primary px-4 py-2.5 text-sm flex items-center gap-2 disabled:opacity-50"
              >
                {searching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                Buscar
              </button>
            </div>

            {searchResults && (
              <div className="mt-4 border border-border rounded-md divide-y divide-border">
                {searchResults.length === 0 && (
                  <div className="p-4 text-center text-sm text-muted-foreground">Nenhum usuário encontrado</div>
                )}
                {searchResults.map((u) => (
                  <div key={u.id} className="px-4 py-3 flex items-center justify-between">
                    <div className="text-sm text-foreground">{u.email}</div>
                    {u.is_admin ? (
                      <span className="text-xs text-primary font-medium">Já é admin</span>
                    ) : (
                      <button
                        onClick={() => setConfirmAction({ user_id: u.id, email: u.email, action: "promote" })}
                        className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 font-medium transition-colors"
                      >
                        <ShieldCheck size={14} /> Promover
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirm dialog */}
      <AlertDialog open={!!confirmAction} onOpenChange={(o) => !o && setConfirmAction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmAction?.action === "promote" ? "Promover a administrador?" : "Remover administrador?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmAction?.action === "promote"
                ? `${confirmAction.email} terá acesso total ao painel administrativo.`
                : `${confirmAction?.email} perderá acesso ao painel administrativo.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => confirmAction && mutation.mutate({ user_id: confirmAction.user_id, action: confirmAction.action })}
              className={confirmAction?.action === "demote" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""}
            >
              {mutation.isPending ? <Loader2 size={14} className="animate-spin" /> : null}
              {confirmAction?.action === "promote" ? "Promover" : "Remover"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminUsers;