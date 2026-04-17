import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Calendar,
  CheckCircle2,
  MessageCircle,
  ArrowDown,
  Sparkles,
  Compass,
  Wand2,
  Rocket,
  Heart,
} from "lucide-react";
import { formatBRL, type ProcessoEtapa, type FormaPagamento } from "@/lib/proposalUtils";
import { useSiteSetting, buildWhatsAppUrl } from "@/hooks/useSiteSetting";

const stepIcons = [Compass, Wand2, Rocket, Heart, Sparkles];

const PublicProposal = () => {
  const { slug } = useParams<{ slug: string }>();
  const whatsapp = useSiteSetting("whatsapp_number");
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

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

  // Scroll progress for animated background
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setScrollProgress(Math.min(1, Math.max(0, progress)));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
        Carregando…
      </div>
    );
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

  // Animated background hue shifts subtly with scroll
  const hueShift = scrollProgress * 40; // 0 → 40 deg
  const blob1Y = scrollProgress * -200;
  const blob2Y = scrollProgress * 300;

  const scrollToContent = () => {
    const el = document.getElementById("proposta-content");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Animated background blobs */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full opacity-[0.18] blur-[120px] transition-transform duration-700"
          style={{
            background: `radial-gradient(circle, hsl(${20 + hueShift} 95% 55%) 0%, transparent 70%)`,
            transform: `translate3d(0, ${blob1Y}px, 0)`,
          }}
        />
        <div
          className="absolute bottom-[-30%] right-[-15%] w-[70vw] h-[70vw] rounded-full opacity-[0.14] blur-[140px] transition-transform duration-700"
          style={{
            background: `radial-gradient(circle, hsl(${280 - hueShift * 2} 70% 50%) 0%, transparent 70%)`,
            transform: `translate3d(0, ${blob2Y}px, 0)`,
          }}
        />
        <div
          className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] rounded-full opacity-[0.12] blur-[100px]"
          style={{
            background: `radial-gradient(circle, hsl(${200 + hueShift * 3} 80% 50%) 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-border/30 z-50">
        <div
          className="h-full bg-primary transition-[width] duration-150"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Header */}
      <header className="relative z-20 border-b border-border/50 backdrop-blur-sm bg-background/40">
        <div className="container mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <Link to="/" className="font-display text-xl font-extrabold tracking-tight">
            Folio<span className="text-primary">blox</span>
          </Link>
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Proposta · {new Date(proposal.created_at).toLocaleDateString("pt-BR")}
          </span>
        </div>
      </header>

      {/* HERO — fullscreen editorial */}
      <section
        ref={heroRef}
        className="relative min-h-[calc(100vh-65px)] flex flex-col justify-center px-6 md:px-12 py-20 animate-fade-in"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-[11px] md:text-[12px] uppercase tracking-[0.25em] text-primary font-semibold mb-8 flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            Proposta exclusiva para
          </div>

          <div className="font-display text-3xl md:text-5xl font-bold mb-6 text-muted-foreground">
            {proposal.cliente_nome}
            {proposal.cliente_empresa && (
              <span className="text-foreground"> · {proposal.cliente_empresa}</span>
            )}
          </div>

          <h1 className="font-display text-[10vw] md:text-[7.5vw] lg:text-[6.5rem] font-extrabold leading-[0.95] tracking-tight mb-10">
            {proposal.titulo}
          </h1>

          {proposal.introducao && (
            <p className="text-base md:text-xl text-muted-foreground whitespace-pre-line leading-relaxed max-w-3xl">
              {proposal.introducao}
            </p>
          )}
        </div>

        <button
          onClick={scrollToContent}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors group"
        >
          <span>Role para ver a proposta</span>
          <ArrowDown size={18} className="animate-bounce group-hover:text-primary" />
        </button>
      </section>

      <main id="proposta-content" className="relative z-10">
        {/* Projetos de referência */}
        {projetos && projetos.length > 0 && (
          <Section number="01" label="Projetos de referência" subtitle="Trabalhos que mostram a essência do estilo que vamos aplicar">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {projetos.map((p, idx) => (
                <Link
                  key={p.id}
                  to={`/projetos/${p.id}`}
                  target="_blank"
                  className="group relative block rounded-lg overflow-hidden border border-border hover:border-primary transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <div className="aspect-[4/3] bg-secondary overflow-hidden">
                    {p.imagem_capa ? (
                      <img
                        src={p.imagem_capa}
                        alt={p.titulo}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-3xl">
                        {p.titulo[0]}
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-card/80 backdrop-blur-sm">
                    <div className="text-[10px] uppercase tracking-wider text-primary mb-1">{p.categoria}</div>
                    <div className="text-sm font-display font-bold truncate">{p.titulo}</div>
                  </div>
                </Link>
              ))}
            </div>
          </Section>
        )}

        {/* Processo — timeline visual */}
        {processo.length > 0 && (
          <Section number="02" label="Processo de trabalho" subtitle="Cada etapa pensada para entregar o melhor resultado, no prazo combinado">
            <div className="grid md:grid-cols-2 gap-5 md:gap-6">
              {processo.map((etapa, i) => {
                const Icon = stepIcons[i % stepIcons.length];
                return (
                  <div
                    key={i}
                    className="group relative bg-card/60 backdrop-blur-sm border border-border rounded-xl p-6 md:p-8 hover:border-primary transition-all duration-500 hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-5">
                      <div className="shrink-0">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Icon size={22} strokeWidth={1.8} />
                        </div>
                        <div className="font-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-3 text-center">
                          Etapa {String(i + 1).padStart(2, "0")}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-3 flex-wrap mb-2">
                          <h3 className="font-display text-xl md:text-2xl font-bold leading-tight">{etapa.titulo}</h3>
                          {etapa.prazo && (
                            <span className="text-[10px] uppercase tracking-[0.15em] text-primary font-semibold">
                              {etapa.prazo}
                            </span>
                          )}
                        </div>
                        {etapa.descricao && (
                          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                            {etapa.descricao}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>
        )}

        {/* Pagamentos */}
        {pagamentos.length > 0 && (
          <Section number="03" label="Formas de pagamento" subtitle="Condições flexíveis para facilitar o início do projeto">
            <div className="grid md:grid-cols-2 gap-5">
              {pagamentos.map((pag, i) => (
                <div
                  key={i}
                  className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-6 md:p-8 hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 size={18} className="text-primary" />
                    <h3 className="font-display font-bold text-lg">{pag.titulo}</h3>
                  </div>
                  {pag.descricao && (
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{pag.descricao}</p>
                  )}
                  {pag.valor > 0 && (
                    <div className="font-display text-3xl md:text-4xl font-extrabold text-primary">
                      {formatBRL(pag.valor)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Investimento total */}
        <Section number="04" label="Investimento" subtitle="Valor total e prazo de entrega">
          <div className="relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-primary/40 rounded-2xl p-8 md:p-14 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full -z-0" />
            <div className="relative z-10 grid md:grid-cols-2 gap-10 items-end">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                  Valor total do investimento
                </div>
                <div className="font-display text-5xl md:text-7xl font-extrabold text-primary leading-none">
                  {formatBRL(proposal.valor_total)}
                </div>
              </div>
              {proposal.prazo_entrega && (
                <div className="md:text-right">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                    Prazo de entrega
                  </div>
                  <div className="font-display text-3xl md:text-4xl font-bold">{proposal.prazo_entrega}</div>
                </div>
              )}
            </div>
            {proposal.observacoes && (
              <p className="relative z-10 mt-8 pt-8 border-t border-border text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                {proposal.observacoes}
              </p>
            )}
          </div>
        </Section>

        {/* CTA final */}
        <section className="container mx-auto px-6 md:px-12 max-w-6xl py-20 md:py-32 text-center print:hidden">
          <div className="font-display text-[8vw] md:text-6xl font-extrabold mb-6 leading-tight">
            Vamos <span className="text-primary italic">começar?</span>
          </div>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10">
            Aceite a proposta ou tire suas dúvidas pelo WhatsApp. Estou pronto para iniciar o trabalho.
          </p>

          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-8">
            <Calendar size={14} />
            <span>
              Válida até <strong className="text-foreground font-semibold">{validUntilStr}</strong>
            </span>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={buildWhatsAppUrl(whatsapp, `Olá! Aceito a proposta "${proposal.titulo}".`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4"
            >
              <CheckCircle2 size={20} /> Aceitar proposta
            </a>
            <a
              href={buildWhatsAppUrl(whatsapp, `Olá! Tenho dúvidas sobre a proposta "${proposal.titulo}".`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-base px-8 py-4"
            >
              <MessageCircle size={20} /> Tirar dúvidas
            </a>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border/50 py-10 text-center text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        Proposta gerada por{" "}
        <Link to="/" className="text-foreground hover:text-primary font-semibold">
          Folioblox
        </Link>
      </footer>
    </div>
  );
};

const Section = ({
  number,
  label,
  subtitle,
  children,
}: {
  number: string;
  label: string;
  subtitle?: string;
  children: React.ReactNode;
}) => (
  <section className="relative py-16 md:py-24 px-6 md:px-12">
    <div className="container mx-auto max-w-6xl">
      <div className="relative grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 mb-12 md:mb-16">
        <div className="font-display text-[18vw] md:text-[10rem] leading-[0.8] font-extrabold text-primary/10 select-none">
          {number}
        </div>
        <div className="md:pt-6">
          <div className="text-[11px] uppercase tracking-[0.25em] text-primary font-semibold mb-3">
            Seção {number}
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold leading-tight mb-4">{label}</h2>
          {subtitle && <p className="text-base md:text-lg text-muted-foreground max-w-2xl">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  </section>
);

export default PublicProposal;
