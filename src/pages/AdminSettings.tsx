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
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [socialDribbble, setSocialDribbble] = useState("");
  const [socialLinkedin, setSocialLinkedin] = useState("");
  const [socialBehance, setSocialBehance] = useState("");
  const [socialInstagram, setSocialInstagram] = useState("");
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
      const wa = settings.find((s: any) => s.key === "whatsapp_number");
      if (wa) setWhatsappNumber(wa.value || "");
      const dr = settings.find((s: any) => s.key === "social_dribbble");
      if (dr) setSocialDribbble(dr.value || "");
      const li = settings.find((s: any) => s.key === "social_linkedin");
      if (li) setSocialLinkedin(li.value || "");
      const be = settings.find((s: any) => s.key === "social_behance");
      if (be) setSocialBehance(be.value || "");
      const ig = settings.find((s: any) => s.key === "social_instagram");
      if (ig) setSocialInstagram(ig.value || "");
    }
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      setSaving(true);
      const upserts = [
        { key: "contact_email", value: contactEmail },
        { key: "site_name", value: siteName },
        { key: "whatsapp_number", value: whatsappNumber },
        { key: "social_dribbble", value: socialDribbble },
        { key: "social_linkedin", value: socialLinkedin },
        { key: "social_behance", value: socialBehance },
        { key: "social_instagram", value: socialInstagram },
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
          {/* General */}
          <h2 className="font-display text-lg font-bold text-foreground border-b border-border pb-2">Geral</h2>
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
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Número do WhatsApp</label>
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
              placeholder="5511999990000"
            />
            <p className="text-xs text-muted-foreground mt-1">Número com código do país, sem espaços ou traços. Deixe vazio para ocultar o botão.</p>
          </div>

          {/* Social */}
          <h2 className="font-display text-lg font-bold text-foreground border-b border-border pb-2 pt-4">Redes Sociais</h2>
          <p className="text-xs text-muted-foreground -mt-4">Links exibidos no rodapé do site. Deixe em branco para ocultar.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Dribbble</label>
              <input
                type="url"
                value={socialDribbble}
                onChange={(e) => setSocialDribbble(e.target.value)}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
                placeholder="https://dribbble.com/..."
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">LinkedIn</label>
              <input
                type="url"
                value={socialLinkedin}
                onChange={(e) => setSocialLinkedin(e.target.value)}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Behance</label>
              <input
                type="url"
                value={socialBehance}
                onChange={(e) => setSocialBehance(e.target.value)}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
                placeholder="https://behance.net/..."
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Instagram</label>
              <input
                type="url"
                value={socialInstagram}
                onChange={(e) => setSocialInstagram(e.target.value)}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
                placeholder="https://instagram.com/..."
              />
            </div>
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
