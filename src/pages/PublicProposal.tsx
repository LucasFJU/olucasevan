import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, CheckCircle2, MessageCircle } from "lucide-react";
import { formatBRL, type ProcessoEtapa, type FormaPagamento } from "@/lib/proposalUtils";
import { useSiteSetting, buildWhatsAppUrl } from "@/hooks/useSiteSetting";

const PublicProposal = () => {
  const { slug } = useParams<{ slug: string }>();
  const whatsapp = useSiteSetting("whatsapp_number");

  const { data: proposal, isLoading, error } = useQuery({
    queryKey: ["public-proposal", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("proposals").select("*").eq("slug", slug!).maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const projetoIds = (proposal?.projeto_ids || []) as string[];
  const { data: projetos } = useQuery({
    queryKey: ["public-proposal-projects", proposal?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id, titulo, categoria, imagem_capa")
        .in("id", projetoIds);
      if (error) throw error;
      return data;
    },
    enabled: !!proposal && projetoIds.length > 0,
  });

  // Track view once
  useEffect(() => {
    if (!proposal?.id) return;
    const key = `proposal-view-${proposal.id}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    supabase.from("proposal_views").insert({
      proposal_id: proposal.id,
      user_agent: navigator.userAgent.slice(0, 250),
    });
  }, [proposal?.id]);

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Carregando...</div>;
  }

  if (error || !proposal) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4 opacity-30">🔍</div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">Proposta não encontrada</h1>
          <p className="text-sm text-muted-foreground mb-6">O link pode ter expirado ou estar incorreto.</p>
          <Link to="/" className="btn-primary inline-flex">Ir para o site</Link>
        </div>
      </div>
    );
  }

  const processo = (proposal.processo as unknown as ProcessoEtapa[]) || [];
  const pagamentos = (proposal.formas_pagamento as unknown as FormaPagamento[]) || [];
  const validUntil = new Date(new Date(proposal.created_at).getTime() + proposal.validade_dias * 86400000);
  const validUntilStr = validUntil.toLocaleDateString("pt-BR");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          <Link to="/" className="font-display text-xl font-extrabold">
            Folio<span className="text-primary">blox</span>
          </Link>
          <span className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">Proposta Comercial</span>
        </div>
      </header>

      <main className="container mx-auto px-6 md:px-12 max-w-4xl py-12 md:py-20">
        {/* Hero */}
        <div className="mb-16 print:mb-10">
          <div className="text-[12px] uppercase tracking-[0.15em] text-primary font-semibold mb-4">
            Para {proposal.cliente_nome}{proposal.cliente_empresa ? ` · ${proposal.cliente_empresa}` : ""}
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-[1.05] mb-6">
            {proposal.titulo}
          </h1>
          {proposal.introducao && (
            <p className="text-base md:text-lg text-muted-foreground whitespace-pre-line leading-relaxed max-w-3xl">
              {proposal.introducao}
            </p>
          )}
        </div>

        {/* Projetos de referência */}
        {projetos && projetos.length > 0 && (
          <section className="mb-16">
            <SectionTitle num="01" label="Projetos de referência" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {projetos.map((p) => (
                <Link
                  key={p.id}
                  to={`/projetos/${p.id}`}
                  target="_blank"
                  className="group block rounded-md overflow-hidden border border-border hover:border-primary transition-colors"
                >
                  <div className="aspect-[4/3] bg-secondary overflow-hidden">
                    {p.imagem_capa ? (
                      <img
                        src={p.imagem_capa}
                        alt={p.titulo}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-3xl">{p.titulo[0]}</div>
                    )}
                  </div>
                  <div className="p-3 bg-card">
                    <div className="text-[13px] font-semibold truncate">{p.titulo}</div>
                    <div className="text-[11px] text-muted-foreground">{p.categoria}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Processo */}
        {processo.length > 0 && (
          <section className="mb-16">
            <SectionTitle num="02" label="Processo de trabalho" />
            <div className="space-y-5">
              {processo.map((etapa, i) => (
                <div key={i} className="flex gap-5 md:gap-7 items-start">
                  <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-display font-extrabold text-lg">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1 pt-2 pb-5 border-b border-border last:border-0">
                    <div className="flex items-baseline justify-between gap-3 flex-wrap mb-1.5">
                      <h3 className="font-display text-lg md:text-xl font-bold">{etapa.titulo}</h3>
                      {etapa.prazo && <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{etapa.prazo}</span>}
                    </div>
                    {etapa.descricao && <p className="text-sm text-muted-foreground leading-relaxed">{etapa.descricao}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Pagamentos */}
        {pagamentos.length > 0 && (
          <section className="mb-16">
            <SectionTitle num="03" label="Formas de pagamento" />
            <div className="grid md:grid-cols-2 gap-4">
              {pagamentos.map((pag, i) => (
                <div key={i} className="bg-card border border-border rounded-md p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 size={16} className="text-primary" />
                    <h3 className="font-display font-bold text-base">{pag.titulo}</h3>
                  </div>
                  {pag.descricao && <p className="text-[13px] text-muted-foreground mb-3">{pag.descricao}</p>}
                  {pag.valor > 0 && (
                    <div className="font-display text-2xl font-extrabold text-primary">{formatBRL(pag.valor)}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Total + Prazo */}
        <section className="mb-16 bg-card border border-primary/30 rounded-lg p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-2">Valor total</div>
              <div className="font-display text-4xl md:text-5xl font-extrabold text-primary">
                {formatBRL(proposal.valor_total)}
              </div>
            </div>
            {proposal.prazo_entrega && (
              <div>
                <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-2">Prazo de entrega</div>
                <div className="font-display text-2xl md:text-3xl font-bold">{proposal.prazo_entrega}</div>
              </div>
            )}
          </div>
          {proposal.observacoes && (
            <p className="mt-6 pt-6 border-t border-border text-sm text-muted-foreground whitespace-pre-line">
              {proposal.observacoes}
            </p>
          )}
        </section>

        {/* Validade + CTA */}
        <section className="text-center print:hidden">
          <div className="inline-flex items-center gap-2 text-[12px] text-muted-foreground mb-6">
            <Calendar size={14} />
            <span>Esta proposta é válida até <strong className="text-foreground">{validUntilStr}</strong></span>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Olá! Aceito a proposta "${proposal.titulo}".`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <CheckCircle2 size={18} /> Aceitar proposta
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Olá! Tenho dúvidas sobre a proposta "${proposal.titulo}".`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <MessageCircle size={18} /> Tirar dúvidas
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-[12px] text-muted-foreground">
        Proposta gerada por <Link to="/" className="text-foreground hover:text-primary">Folioblox</Link>
      </footer>
    </div>
  );
};

const SectionTitle = ({ num, label }: { num: string; label: string }) => (
  <div className="mb-6">
    <div className="section-label mb-2">
      <span className="label-num">[ {num} ]</span> <span className="text-muted-foreground">{label}</span>
    </div>
    <div className="h-px bg-border" />
  </div>
);

export default PublicProposal;
