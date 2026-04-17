import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, Plus, Trash2, Loader2, Copy, Save } from "lucide-react";
import { toast } from "sonner";
import { buildSlug, formatBRL, type ProcessoEtapa, type FormaPagamento } from "@/lib/proposalUtils";

const STATUSES = ["Rascunho", "Enviada", "Aceita", "Recusada", "Expirada"];

type ProjectMini = { id: string; titulo: string; categoria: string; imagem_capa: string | null };

const emptyEtapa: ProcessoEtapa = { titulo: "", descricao: "", prazo: "" };
const emptyPagamento: FormaPagamento = { titulo: "", descricao: "", valor: 0 };

const AdminProposalForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    cliente_nome: "",
    cliente_empresa: "",
    cliente_email: "",
    titulo: "",
    introducao: "",
    valor_total: 0,
    prazo_entrega: "",
    validade_dias: 15,
    status: "Rascunho",
    observacoes: "",
  });
  const [projetoIds, setProjetoIds] = useState<string[]>([]);
  const [processo, setProcesso] = useState<ProcessoEtapa[]>([{ ...emptyEtapa }]);
  const [pagamentos, setPagamentos] = useState<FormaPagamento[]>([{ ...emptyPagamento }]);
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) navigate("/admin/login");
  }, [user, authLoading, navigate]);

  const { data: projects } = useQuery({
    queryKey: ["proposal-projects-list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id, titulo, categoria, imagem_capa")
        .order("titulo");
      if (error) throw error;
      return data as ProjectMini[];
    },
    enabled: !!user,
  });

  const { data: existing } = useQuery({
    queryKey: ["proposal", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("proposals").select("*").eq("id", id!).single();
      if (error) throw error;
      return data;
    },
    enabled: !!user && isEditing,
  });

  useEffect(() => {
    if (!existing) return;
    setForm({
      cliente_nome: existing.cliente_nome,
      cliente_empresa: existing.cliente_empresa || "",
      cliente_email: existing.cliente_email || "",
      titulo: existing.titulo,
      introducao: existing.introducao || "",
      valor_total: Number(existing.valor_total) || 0,
      prazo_entrega: existing.prazo_entrega || "",
      validade_dias: existing.validade_dias,
      status: existing.status,
      observacoes: existing.observacoes || "",
    });
    setProjetoIds(existing.projeto_ids || []);
    setProcesso((existing.processo as unknown as ProcessoEtapa[]) || [{ ...emptyEtapa }]);
    setPagamentos((existing.formas_pagamento as unknown as FormaPagamento[]) || [{ ...emptyPagamento }]);
    setSlug(existing.slug);
  }, [existing]);

  const saveMutation = useMutation({
    mutationFn: async (opts: { copyLinkAfter?: boolean } = {}) => {
      if (!form.cliente_nome.trim() || !form.titulo.trim()) {
        throw new Error("Cliente e título são obrigatórios");
      }
      const cleanProcesso = processo.filter((p) => p.titulo.trim() || p.descricao.trim());
      const cleanPagamentos = pagamentos.filter((p) => p.titulo.trim() || p.valor > 0);

      const payload = {
        ...form,
        cliente_empresa: form.cliente_empresa || null,
        cliente_email: form.cliente_email || null,
        prazo_entrega: form.prazo_entrega || null,
        introducao: form.introducao || null,
        observacoes: form.observacoes || null,
        projeto_ids: projetoIds,
        processo: cleanProcesso as unknown as never,
        formas_pagamento: cleanPagamentos as unknown as never,
      };

      let savedSlug: string;
      if (isEditing) {
        const { error } = await supabase.from("proposals").update(payload).eq("id", id!);
        if (error) throw error;
        savedSlug = slug!;
      } else {
        const newSlug = buildSlug(form.cliente_nome);
        const { error } = await supabase.from("proposals").insert({ ...payload, slug: newSlug });
        if (error) throw error;
        savedSlug = newSlug;
        setSlug(newSlug);
      }
      return { slug: savedSlug, copyLinkAfter: opts.copyLinkAfter };
    },
    onSuccess: ({ slug: savedSlug, copyLinkAfter }) => {
      queryClient.invalidateQueries({ queryKey: ["admin-proposals"] });
      toast.success("Proposta salva");
      if (copyLinkAfter) {
        const url = `${window.location.origin}/proposta/${savedSlug}`;
        navigator.clipboard.writeText(url);
        toast.success("Link copiado para a área de transferência");
      }
      if (!isEditing) navigate("/admin/propostas");
    },
    onError: (e: Error) => toast.error(e.message || "Erro ao salvar"),
  });

  const totalPagamentos = pagamentos.reduce((acc, p) => acc + (Number(p.valor) || 0), 0);

  if (authLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-foreground">Carregando...</div>;
  }
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/88 backdrop-blur-[18px] border-b border-border">
        <div className="container mx-auto px-4 md:px-12 h-[68px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/admin/propostas" className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <ArrowLeft size={18} />
            </Link>
            <span className="font-display text-lg font-extrabold text-foreground">
              {isEditing ? "Editar Proposta" : "Nova Proposta"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => saveMutation.mutate({})}
              disabled={saveMutation.isPending}
              className="btn-ghost px-4 py-2 text-[13px]"
            >
              {saveMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              <span className="hidden sm:inline">Salvar</span>
            </button>
            <button
              onClick={() => saveMutation.mutate({ copyLinkAfter: true })}
              disabled={saveMutation.isPending}
              className="btn-primary px-4 py-2 text-[13px]"
            >
              <Copy size={14} />
              <span className="hidden sm:inline">Salvar e copiar link</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 md:px-12 pt-[100px] pb-16 max-w-4xl">
        {/* Cliente */}
        <Section title="Cliente">
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Nome do cliente *">
              <Input value={form.cliente_nome} onChange={(v) => setForm({ ...form, cliente_nome: v })} />
            </Field>
            <Field label="Empresa">
              <Input value={form.cliente_empresa} onChange={(v) => setForm({ ...form, cliente_empresa: v })} />
            </Field>
            <Field label="E-mail">
              <Input type="email" value={form.cliente_email} onChange={(v) => setForm({ ...form, cliente_email: v })} />
            </Field>
            <Field label="Status">
              <Select value={form.status} options={STATUSES} onChange={(v) => setForm({ ...form, status: v })} />
            </Field>
          </div>
        </Section>

        {/* Conteúdo */}
        <Section title="Conteúdo da Proposta">
          <Field label="Título *">
            <Input value={form.titulo} onChange={(v) => setForm({ ...form, titulo: v })} placeholder="Ex: Identidade Visual para Empresa X" />
          </Field>
          <Field label="Introdução">
            <Textarea rows={5} value={form.introducao} onChange={(v) => setForm({ ...form, introducao: v })} placeholder="Apresente o escopo, contexto e o que essa proposta cobre." />
          </Field>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Prazo de entrega">
              <Input value={form.prazo_entrega} onChange={(v) => setForm({ ...form, prazo_entrega: v })} placeholder="Ex: 30 dias úteis" />
            </Field>
            <Field label="Validade (dias)">
              <Input type="number" value={String(form.validade_dias)} onChange={(v) => setForm({ ...form, validade_dias: Number(v) || 0 })} />
            </Field>
          </div>
        </Section>

        {/* Projetos de referência */}
        <Section title="Projetos de Referência" subtitle="Selecione projetos do seu portfólio para mostrar ao cliente.">
          {projects && projects.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {projects.map((p) => {
                const selected = projetoIds.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() =>
                      setProjetoIds((cur) => (cur.includes(p.id) ? cur.filter((x) => x !== p.id) : [...cur, p.id]))
                    }
                    className={`group text-left rounded-md overflow-hidden border-2 transition-all ${
                      selected ? "border-primary" : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <div className="aspect-[4/3] bg-secondary relative">
                      {p.imagem_capa ? (
                        <img src={p.imagem_capa} alt="" className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-2xl">{p.titulo[0]}</div>
                      )}
                      {selected && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
                          ✓
                        </div>
                      )}
                    </div>
                    <div className="p-2.5 bg-card">
                      <div className="text-[12px] font-semibold text-foreground truncate">{p.titulo}</div>
                      <div className="text-[10px] text-muted-foreground">{p.categoria}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Nenhum projeto cadastrado ainda.</p>
          )}
          <p className="text-[12px] text-muted-foreground mt-3">
            {projetoIds.length} projeto(s) selecionado(s)
          </p>
        </Section>

        {/* Processo */}
        <Section
          title="Processo de Trabalho"
          subtitle="Etapas que o cliente verá. Adicione quantas precisar."
          action={
            <button
              type="button"
              onClick={() => setProcesso([...processo, { ...emptyEtapa }])}
              className="text-[12px] text-primary hover:underline flex items-center gap-1"
            >
              <Plus size={14} /> Adicionar etapa
            </button>
          }
        >
          <div className="space-y-3">
            {processo.map((etapa, i) => (
              <div key={i} className="bg-secondary/40 border border-border rounded-md p-4 relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Etapa {i + 1}</span>
                  {processo.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setProcesso(processo.filter((_, idx) => idx !== i))}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <Input
                    value={etapa.titulo}
                    onChange={(v) => setProcesso(processo.map((p, idx) => (idx === i ? { ...p, titulo: v } : p)))}
                    placeholder="Título (ex: Briefing)"
                  />
                  <Input
                    value={etapa.prazo}
                    onChange={(v) => setProcesso(processo.map((p, idx) => (idx === i ? { ...p, prazo: v } : p)))}
                    placeholder="Prazo (ex: 5 dias)"
                  />
                </div>
                <Textarea
                  rows={2}
                  value={etapa.descricao}
                  onChange={(v) => setProcesso(processo.map((p, idx) => (idx === i ? { ...p, descricao: v } : p)))}
                  placeholder="Descrição da etapa"
                  className="mt-3"
                />
              </div>
            ))}
          </div>
        </Section>

        {/* Pagamentos */}
        <Section
          title="Formas de Pagamento"
          subtitle="Defina como o pagamento será dividido."
          action={
            <button
              type="button"
              onClick={() => setPagamentos([...pagamentos, { ...emptyPagamento }])}
              className="text-[12px] text-primary hover:underline flex items-center gap-1"
            >
              <Plus size={14} /> Adicionar parcela
            </button>
          }
        >
          <div className="space-y-3">
            {pagamentos.map((pag, i) => (
              <div key={i} className="bg-secondary/40 border border-border rounded-md p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Parcela {i + 1}</span>
                  {pagamentos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setPagamentos(pagamentos.filter((_, idx) => idx !== i))}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  <Input
                    value={pag.titulo}
                    onChange={(v) => setPagamentos(pagamentos.map((p, idx) => (idx === i ? { ...p, titulo: v } : p)))}
                    placeholder="Título (ex: Entrada 50%)"
                  />
                  <Input
                    value={pag.descricao}
                    onChange={(v) => setPagamentos(pagamentos.map((p, idx) => (idx === i ? { ...p, descricao: v } : p)))}
                    placeholder="Condição (ex: Na assinatura)"
                  />
                  <Input
                    type="number"
                    value={String(pag.valor)}
                    onChange={(v) => setPagamentos(pagamentos.map((p, idx) => (idx === i ? { ...p, valor: Number(v) || 0 } : p)))}
                    placeholder="Valor R$"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-[12px] text-muted-foreground">
            Soma das parcelas: <span className="text-foreground font-semibold">{formatBRL(totalPagamentos)}</span>
          </div>
        </Section>

        {/* Total */}
        <Section title="Valor Total e Observações">
          <Field label="Valor total (R$)">
            <Input
              type="number"
              value={String(form.valor_total)}
              onChange={(v) => setForm({ ...form, valor_total: Number(v) || 0 })}
            />
          </Field>
          <Field label="Observações finais">
            <Textarea
              rows={3}
              value={form.observacoes}
              onChange={(v) => setForm({ ...form, observacoes: v })}
              placeholder="Termos, observações ou notas adicionais."
            />
          </Field>
        </Section>

        {slug && (
          <div className="bg-card border border-border rounded-md p-4 flex items-center justify-between gap-3 flex-wrap">
            <div className="min-w-0">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Link público</div>
              <code className="text-[12px] text-primary break-all">{`${window.location.origin}/proposta/${slug}`}</code>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/proposta/${slug}`);
                toast.success("Link copiado!");
              }}
              className="btn-ghost px-4 py-2 text-[13px] shrink-0"
            >
              <Copy size={14} /> Copiar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Section = ({ title, subtitle, children, action }: { title: string; subtitle?: string; children: React.ReactNode; action?: React.ReactNode }) => (
  <div className="mb-8 bg-card border border-border rounded-lg p-6">
    <div className="flex items-start justify-between mb-5 gap-3">
      <div>
        <h2 className="font-display text-lg font-bold text-foreground">{title}</h2>
        {subtitle && <p className="text-[12px] text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
    {children}
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="mb-4 last:mb-0">
    <label className="block text-[12px] text-muted-foreground mb-1.5 font-medium">{label}</label>
    {children}
  </div>
);

const Input = ({ value, onChange, type = "text", placeholder }: { value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) => (
  <input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full bg-secondary border border-border rounded-md px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
  />
);

const Textarea = ({ value, onChange, rows = 3, placeholder, className = "" }: { value: string; onChange: (v: string) => void; rows?: number; placeholder?: string; className?: string }) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    rows={rows}
    placeholder={placeholder}
    className={`w-full bg-secondary border border-border rounded-md px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-y ${className}`}
  />
);

const Select = ({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full bg-secondary border border-border rounded-md px-3 py-2.5 text-[13px] text-foreground focus:border-primary focus:outline-none transition-colors"
  >
    {options.map((o) => (
      <option key={o} value={o} className="bg-card">{o}</option>
    ))}
  </select>
);

export default AdminProposalForm;
