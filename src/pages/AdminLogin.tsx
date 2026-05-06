import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        // Verify user has admin role before redirecting
        const { data: role } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .maybeSingle();
        if (role) {
          navigate("/admin");
        } else {
          toast.error("Acesso não autorizado. Apenas administradores podem acessar.");
          await supabase.auth.signOut();
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) {
      setError(true);
      toast.error("Credenciais inválidas");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden">
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,92,26,0.12) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 bg-card border border-border rounded-lg p-12 md:p-14 w-full max-w-[420px] shadow-[0_12px_48px_rgba(0,0,0,0.55)]">
        <div className="font-display text-[26px] font-extrabold text-center mb-2">
          Folio<span className="text-primary">blox</span>
        </div>
        <p className="text-sm text-muted-foreground text-center mb-10">Painel Administrativo</p>

        <h2 className="font-display text-[22px] font-extrabold text-center mb-7">Entrar</h2>

        {error && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-sm px-3.5 py-2.5 text-[13px] text-destructive mb-4">
            Usuário ou senha incorretos.
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-[11px] text-muted-foreground font-semibold uppercase tracking-[0.08em] mb-2 block">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@email.com"
              className="w-full bg-background border border-border rounded-md px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="text-[11px] text-muted-foreground font-semibold uppercase tracking-[0.08em] mb-2 block">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-background border border-border rounded-md px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ember-gradient text-primary-foreground py-4 rounded-full font-display text-[15px] font-bold mt-2 transition-all hover:translate-y-[-1px] disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar →"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
