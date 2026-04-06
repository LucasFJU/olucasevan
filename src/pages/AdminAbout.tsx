import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

const settingsKeys = [
  { key: "about_title", label: "Título", placeholder: "O Designer por trás do Studio" },
  { key: "about_description", label: "Descrição Principal", placeholder: "Com mais de 8 anos de experiência...", multiline: true },
  { key: "about_mission", label: "Missão", placeholder: "Nossa missão é...", multiline: true },
  { key: "about_vision", label: "Visão", placeholder: "Nossa visão é...", multiline: true },
  { key: "about_values", label: "Valores", placeholder: "Estratégia, Criatividade, Resultados", multiline: true },
];

const AdminAbout = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate("/admin/login");
  }, [user, authLoading, navigate]);

  const { data: settings } = useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings" as any).select("*");
      if (error) throw error;
      return data as any[];
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (settings) {
      const map: Record<string, string> = {};
      settings.forEach((s: any) => { map[s.key] = s.value || ""; });
      setForm(map);
    }
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      setSaving(true);
      for (const { key } of settingsKeys) {
        const value = form[key] || "";
        const { data: existing } = await supabase
          .from("site_settings" as any)
          .select("id")
          .eq("key", key)
          .maybeSingle();
        if (existing) {
          await supabase.from("site_settings" as any).update({ value }).eq("key", key);
        } else {
          await supabase.from("site_settings" as any).insert({ key, value });
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast.success("Página Sobre atualizada!");
    },
    onError: () => toast.error("Erro ao salvar"),
    onSettled: () => setSaving(false),
  });

  if (authLoading || !user) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center gap-4">
          <Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-display font-bold text-foreground">Editar Página Sobre</h1>
        </div>
      </header>

      <div className="container mx-auto px-6 py-10 max-w-2xl">
        <div className="space-y-6">
          {settingsKeys.map(({ key, label, placeholder, multiline }) => (
            <div key={key}>
              <label className="text-sm font-medium text-foreground block mb-2">{label}</label>
              {multiline ? (
                <textarea
                  value={form[key] || ""}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  rows={4}
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder={placeholder}
                />
              ) : (
                <input
                  type="text"
                  value={form[key] || ""}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
                  placeholder={placeholder}
                />
              )}
            </div>
          ))}
          <button
            onClick={() => saveMutation.mutate()}
            disabled={saving}
            className="bg-ember-gradient text-primary-foreground px-6 py-3 rounded-xl text-sm font-semibold disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAbout;
