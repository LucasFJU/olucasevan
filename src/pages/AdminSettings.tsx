import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

const AdminSettings = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [contactEmail, setContactEmail] = useState("");
  const [siteName, setSiteName] = useState("");
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
      const emailSetting = settings.find((s: any) => s.key === "contact_email");
      const nameSetting = settings.find((s: any) => s.key === "site_name");
      if (emailSetting) setContactEmail(emailSetting.value || "");
      if (nameSetting) setSiteName(nameSetting.value || "");
    }
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      setSaving(true);
      const upserts = [
        { key: "contact_email", value: contactEmail },
        { key: "site_name", value: siteName },
      ];
      for (const item of upserts) {
        const { data: existing } = await supabase
          .from("site_settings" as any)
          .select("id")
          .eq("key", item.key)
          .maybeSingle();
        if (existing) {
          await supabase.from("site_settings" as any).update({ value: item.value }).eq("key", item.key);
        } else {
          await supabase.from("site_settings" as any).insert(item);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast.success("Configurações salvas!");
    },
    onError: () => toast.error("Erro ao salvar configurações"),
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
          <h1 className="font-display font-bold text-foreground">Configurações</h1>
        </div>
      </header>

      <div className="container mx-auto px-6 py-10 max-w-2xl">
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Nome do Site</label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
              placeholder="Studio."
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Email de Contato</label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
              placeholder="contato@studio.com"
            />
            <p className="text-xs text-muted-foreground mt-1">Email de destino dos formulários de contato.</p>
          </div>
          <button
            onClick={() => saveMutation.mutate()}
            disabled={saving}
            className="bg-ember-gradient text-primary-foreground px-6 py-3 rounded-xl text-sm font-semibold disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? "Salvando..." : "Salvar Configurações"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
