import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

const categories = ["Social Media", "Brand Design", "Web Design"];
const projectStatuses = ["Concluído", "Em andamento", "Em breve", "Rascunho"];
const DRAFT_KEY = "admin-project-draft";

const AdminProjectForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const draftTimeout = useRef<ReturnType<typeof setTimeout>>();

  const [form, setForm] = useState(() => {
    if (!id) {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }
    return {
      titulo: "",
      descricao: "",
      categoria: "Social Media",
      tags: "",
      link_projeto: "",
      destaque: false,
      status: "Concluído",
    };
  });
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [existingGallery, setExistingGallery] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  // Save draft to localStorage (debounced) — only for new projects
  useEffect(() => {
    if (isEditing) return;
    if (draftTimeout.current) clearTimeout(draftTimeout.current);
    draftTimeout.current = setTimeout(() => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    }, 500);
    return () => { if (draftTimeout.current) clearTimeout(draftTimeout.current); };
  }, [form, isEditing]);

  useEffect(() => {
    if (!authLoading && !user) navigate("/admin/login");
  }, [user, authLoading, navigate]);

  const { data: project } = useQuery({
    queryKey: ["admin-project", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").eq("id", id!).single();
      if (error) throw error;
      return data;
    },
    enabled: isEditing && !!user,
  });

  useEffect(() => {
    if (project) {
      setForm({
        titulo: project.titulo,
        descricao: project.descricao || "",
        categoria: project.categoria,
        tags: project.tags?.join(", ") || "",
        link_projeto: project.link_projeto || "",
        destaque: project.destaque || false,
        status: (project as any).status || "Concluído",
      });
      setCoverPreview(project.imagem_capa || "");
      setExistingGallery(project.galeria || []);
    }
  }, [project]);

  const uploadFile = async (file: File, path: string): Promise<string> => {
    const { error } = await supabase.storage.from("projects").upload(path, file, { upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from("projects").getPublicUrl(path);
    return data.publicUrl;
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      setUploading(true);
      const projectId = id || crypto.randomUUID();
      let coverUrl = coverPreview;
      if (coverFile) {
        coverUrl = await uploadFile(coverFile, `${projectId}/cover.${coverFile.name.split('.').pop()}`);
      }
      const galleryUrls = [...existingGallery];
      for (let i = 0; i < galleryFiles.length; i++) {
        const file = galleryFiles[i];
        const url = await uploadFile(file, `${projectId}/gallery/${Date.now()}-${i}.${file.name.split('.').pop()}`);
        galleryUrls.push(url);
      }
      const tags = form.tags.split(",").map((t: string) => t.trim()).filter(Boolean);
      const projectData = {
        titulo: form.titulo,
        descricao: form.descricao || null,
        categoria: form.categoria,
        imagem_capa: coverUrl || null,
        galeria: galleryUrls,
        tags,
        link_projeto: form.link_projeto || null,
        destaque: form.destaque,
        status: form.status,
      };

      if (isEditing) {
        const { error } = await supabase.from("projects").update(projectData).eq("id", id!);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert({ id: projectId, ...projectData });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      localStorage.removeItem(DRAFT_KEY);
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      toast.success(isEditing ? "Projeto atualizado!" : "Projeto criado!");
      navigate("/admin");
    },
    onError: (err) => toast.error("Erro ao salvar: " + (err as Error).message),
    onSettled: () => setUploading(false),
  });

  if (authLoading || !user) return null;

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/88 backdrop-blur-[18px] border-b border-border">
        <div className="container mx-auto px-6 md:px-12 h-[68px] flex items-center gap-4">
          <Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-display font-extrabold text-foreground">
            {isEditing ? "Editar Projeto" : "Novo Projeto"}
          </h1>
        </div>
      </nav>

      <div className="container mx-auto px-6 md:px-12 pt-[100px] pb-16 max-w-[820px]">
        <form
          onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }}
          className="space-y-5"
        >
          <div className="bg-card border border-border rounded-lg p-9">
            <h3 className="font-display text-[17px] font-bold text-foreground mb-6 pb-4 border-b border-border">
              📋 Informações Básicas
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-[12px] text-muted-foreground font-bold uppercase tracking-[0.07em] mb-2 block">Título *</label>
                <input
                  type="text"
                  value={form.titulo}
                  onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                  className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
                  placeholder="Ex: Branding Kin Studio"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[12px] text-muted-foreground font-bold uppercase tracking-[0.07em] mb-2 block">Categoria *</label>
                  <select
                    value={form.categoria}
                    onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                    className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
                  >
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[12px] text-muted-foreground font-bold uppercase tracking-[0.07em] mb-2 block">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
                  >
                    {projectStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[12px] text-muted-foreground font-bold uppercase tracking-[0.07em] mb-2 block">Descrição</label>
                <textarea
                  value={form.descricao}
                  onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                  rows={5}
                  className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors resize-y min-h-[140px]"
                  placeholder="Detalhe o processo, desafios e resultados..."
                />
              </div>

              <div>
                <label className="text-[12px] text-muted-foreground font-bold uppercase tracking-[0.07em] mb-2 block">Tags (separadas por vírgula)</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
                  placeholder="Branding, Logotipo, Identidade Visual"
                />
              </div>

              <div>
                <label className="text-[12px] text-muted-foreground font-bold uppercase tracking-[0.07em] mb-2 block">Link do Projeto</label>
                <input
                  type="url"
                  value={form.link_projeto}
                  onChange={(e) => setForm({ ...form, link_projeto: e.target.value })}
                  className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
                  placeholder="https://..."
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.destaque}
                  onChange={(e) => setForm({ ...form, destaque: e.target.checked })}
                  className="w-5 h-5 rounded border-border bg-secondary accent-primary"
                />
                <span className="text-sm text-foreground">Destacar na homepage</span>
              </label>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-9">
            <h3 className="font-display text-[17px] font-bold text-foreground mb-6 pb-4 border-b border-border">
              🖼️ Imagens
            </h3>

            <div className="space-y-5">
              <div>
                <label className="text-[12px] text-muted-foreground font-bold uppercase tracking-[0.07em] mb-2 block">Imagem de Capa</label>
                {coverPreview && (
                  <div className="relative rounded-md overflow-hidden mb-3">
                    <img src={coverPreview} alt="Cover" className="w-full aspect-[16/9] object-cover" />
                    <button
                      type="button"
                      onClick={() => { setCoverFile(null); setCoverPreview(""); }}
                      className="absolute top-2 right-2 bg-background/80 p-1.5 rounded-full border border-border hover:bg-destructive hover:text-white transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                <label className="flex items-center justify-center gap-2 border-2 border-dashed border-border rounded-lg px-6 py-10 text-sm text-muted-foreground cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
                  <Upload size={16} />
                  <span><strong className="text-primary">Clique</strong> ou arraste a imagem de capa</span>
                  <input type="file" accept="image/*" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) { setCoverFile(file); setCoverPreview(URL.createObjectURL(file)); }
                  }} className="hidden" />
                </label>
              </div>

              <div>
                <label className="text-[12px] text-muted-foreground font-bold uppercase tracking-[0.07em] mb-2 block">Galeria</label>
                {(existingGallery.length > 0 || galleryFiles.length > 0) && (
                  <div className="grid grid-cols-4 gap-2.5 mb-3">
                    {existingGallery.map((url, i) => (
                      <div key={url} className="relative rounded-sm overflow-hidden aspect-[4/3] bg-secondary">
                        <img src={url} alt="" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setExistingGallery((prev) => prev.filter((_, idx) => idx !== i))}
                          className="absolute top-1.5 right-1.5 bg-background/80 p-1 rounded-full border border-border hover:bg-destructive hover:text-white transition-colors"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                    {galleryFiles.map((file, i) => (
                      <div key={i} className="relative rounded-sm overflow-hidden aspect-[4/3] bg-secondary">
                        <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setGalleryFiles((prev) => prev.filter((_, idx) => idx !== i))}
                          className="absolute top-1.5 right-1.5 bg-background/80 p-1 rounded-full border border-border hover:bg-destructive hover:text-white transition-colors"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <label className="flex items-center justify-center gap-2 border-2 border-dashed border-border rounded-lg px-6 py-8 text-sm text-muted-foreground cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
                  <Upload size={16} />
                  <span>Adicionar imagens à galeria</span>
                  <input type="file" accept="image/*" multiple onChange={(e) => {
                    setGalleryFiles((prev) => [...prev, ...Array.from(e.target.files || [])]);
                  }} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Link to="/admin" className="btn-pill border border-border text-muted-foreground px-6 py-3 hover:text-foreground hover:border-muted-foreground/50 transition-all">
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={uploading}
              className="btn-primary px-8 py-3.5 disabled:opacity-50 flex items-center gap-2"
            >
              {uploading && <Loader2 size={16} className="animate-spin" />}
              {uploading ? "Salvando..." : isEditing ? "Atualizar Projeto" : "Publicar Projeto ●"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProjectForm;
