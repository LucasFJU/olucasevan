import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const categories = ["Social Media", "Brand Design", "Web Design"];
const projectStatuses = ["Concluído", "Em andamento", "Em breve"];

const AdminProjectForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    categoria: "Social Media",
    tags: "",
    link_projeto: "",
    destaque: false,
    status: "Concluído",
  });
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>("");
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [existingGallery, setExistingGallery] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate("/admin/login");
  }, [user, authLoading, navigate]);

  // Load existing project
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

      // Upload cover
      let coverUrl = coverPreview;
      if (coverFile) {
        coverUrl = await uploadFile(coverFile, `${projectId}/cover.${coverFile.name.split('.').pop()}`);
      }

      // Upload gallery
      const galleryUrls = [...existingGallery];
      for (let i = 0; i < galleryFiles.length; i++) {
        const file = galleryFiles[i];
        const url = await uploadFile(file, `${projectId}/gallery/${Date.now()}-${i}.${file.name.split('.').pop()}`);
        galleryUrls.push(url);
      }

      const tags = form.tags.split(",").map((t) => t.trim()).filter(Boolean);

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
      } as any;

      if (isEditing) {
        const { error } = await supabase.from("projects").update(projectData).eq("id", id!);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert({ id: projectId, ...projectData });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      toast.success(isEditing ? "Projeto atualizado!" : "Projeto criado!");
      navigate("/admin");
    },
    onError: (err) => {
      toast.error("Erro ao salvar: " + (err as Error).message);
    },
    onSettled: () => setUploading(false),
  });

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setGalleryFiles((prev) => [...prev, ...files]);
  };

  if (authLoading || !user) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center gap-4">
          <Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-display font-bold text-foreground">
            {isEditing ? "Editar Projeto" : "Novo Projeto"}
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-6 py-10 max-w-2xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveMutation.mutate();
          }}
          className="space-y-6"
        >
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Título *</label>
            <input
              type="text"
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Descrição</label>
            <textarea
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              rows={4}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors resize-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Categoria *</label>
            <select
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Status *</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
            >
              {projectStatuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Imagem de Capa</label>
            {coverPreview ? (
              <div className="relative rounded-xl overflow-hidden mb-2">
                <img src={coverPreview} alt="Cover" className="w-full aspect-[16/9] object-cover" />
                <button
                  type="button"
                  onClick={() => { setCoverFile(null); setCoverPreview(""); }}
                  className="absolute top-2 right-2 bg-background/80 p-1.5 rounded-lg"
                >
                  <X size={16} className="text-foreground" />
                </button>
              </div>
            ) : null}
            <label className="flex items-center gap-2 bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-muted-foreground cursor-pointer hover:border-primary transition-colors">
              <Upload size={16} />
              Selecionar imagem
              <input type="file" accept="image/*" onChange={handleCoverChange} className="hidden" />
            </label>
          </div>

          {/* Gallery */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Galeria</label>
            {(existingGallery.length > 0 || galleryFiles.length > 0) && (
              <div className="grid grid-cols-3 gap-3 mb-3">
                {existingGallery.map((url, i) => (
                  <div key={url} className="relative rounded-lg overflow-hidden aspect-square">
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setExistingGallery((prev) => prev.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 bg-background/80 p-1 rounded"
                    >
                      <X size={12} className="text-foreground" />
                    </button>
                  </div>
                ))}
                {galleryFiles.map((file, i) => (
                  <div key={i} className="relative rounded-lg overflow-hidden aspect-square">
                    <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setGalleryFiles((prev) => prev.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 bg-background/80 p-1 rounded"
                    >
                      <X size={12} className="text-foreground" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <label className="flex items-center gap-2 bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-muted-foreground cursor-pointer hover:border-primary transition-colors">
              <Upload size={16} />
              Adicionar imagens
              <input type="file" accept="image/*" multiple onChange={handleGalleryChange} className="hidden" />
            </label>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Tags (separadas por vírgula)</label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
              placeholder="branding, logo, identidade visual"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Link do Projeto</label>
            <input
              type="url"
              value={form.link_projeto}
              onChange={(e) => setForm({ ...form, link_projeto: e.target.value })}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
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

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-ember-gradient text-primary-foreground py-3.5 rounded-xl text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {uploading && <Loader2 size={16} className="animate-spin" />}
            {uploading ? "Salvando..." : isEditing ? "Atualizar Projeto" : "Criar Projeto"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProjectForm;
