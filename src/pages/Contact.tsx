import { useState } from "react";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Helmet } from "react-helmet-async";

const contactSchema = z.object({
  nome: z.string().trim().min(1, "Nome é obrigatório").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  assunto: z.string().trim().max(200).optional(),
  tipo_projeto: z.string().optional(),
  mensagem: z.string().trim().min(1, "Mensagem é obrigatória").max(2000),
});

const Contact = () => {
  const [form, setForm] = useState({ nome: "", email: "", assunto: "", tipo_projeto: "", mensagem: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("leads").insert({
      nome: result.data.nome,
      email: result.data.email,
      assunto: result.data.assunto || null,
      tipo_projeto: result.data.tipo_projeto || null,
      mensagem: result.data.mensagem,
    } as any);
    setLoading(false);

    if (error) {
      toast.error("Erro ao enviar. Tente novamente.");
    } else {
      setSent(true);
      toast.success("Mensagem enviada com sucesso!");
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Contato — Folioblox</title>
        <meta name="description" content="Entre em contato para solicitar um orçamento. Resposta em até 24h." />
      </Helmet>
      {/* Page Banner */}
      <section className="min-h-[250px] md:min-h-[350px] flex items-center justify-center border-b border-border relative" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(15 100% 50% / 0.12), transparent 70%), hsl(var(--background))"
      }}>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-foreground text-center"
          style={{ fontSize: "clamp(44px, 8vw, 120px)", fontWeight: 500, lineHeight: 1, letterSpacing: "-0.02em" }}
        >
          Contato
        </motion.h1>
      </section>

      {/* Contact content */}
      <section className="border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6 md:px-0 py-[80px] md:py-[120px]">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16">
            {/* Left — Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:w-1/2"
            >
              <div className="section-label mb-4">
                <span className="label-num">[ 01 ]</span> Solicitar Orçamento
              </div>
              <h2
                className="font-display text-foreground mb-6"
                style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, lineHeight: 1.15 }}
              >
                Conecte-se Conosco Hoje!
              </h2>
              <p className="text-muted-foreground text-[16px] leading-[1.6] mb-2">
                Conte sobre seu projeto e receba uma proposta personalizada em até 24h.
              </p>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-primary mb-8">
                ⚡ Resposta em até 24h
              </span>

              {/* Contact info cards */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {[
                  { label: "E-mail", value: "hello@folioblox.com" },
                  { label: "Telefone", value: "+55 11 9999-0000" },
                  { label: "Localização", value: "São Paulo, BR" },
                  { label: "Horário", value: "Seg–Sex, 9h–18h" },
                ].map((item) => (
                  <div key={item.label} className="border border-border rounded-lg p-4">
                    <p className="text-primary text-[12px] font-medium mb-1">[ {item.label.toUpperCase()} ]</p>
                    <p className="text-foreground text-[13px] md:text-[14px]">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="md:w-1/2"
            >
              {sent ? (
                <div className="border border-border rounded-lg p-10 md:p-12 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary flex items-center justify-center mb-6">
                    <Send size={24} className="text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-2xl font-medium text-foreground">Mensagem enviada!</h3>
                  <p className="text-muted-foreground mt-3">Retornaremos em até 24 horas.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[12px] text-muted-foreground font-medium uppercase tracking-[0.05em] mb-2 block">Nome *</label>
                      <input
                        type="text"
                        value={form.nome}
                        onChange={(e) => setForm({ ...form, nome: e.target.value })}
                        className="w-full bg-foreground/[0.02] border border-border rounded-lg px-4 py-3.5 text-[16px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                        placeholder="Seu nome"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[12px] text-muted-foreground font-medium uppercase tracking-[0.05em] mb-2 block">E-mail *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-foreground/[0.02] border border-border rounded-lg px-4 py-3.5 text-[16px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[12px] text-muted-foreground font-medium uppercase tracking-[0.05em] mb-2 block">Serviço</label>
                    <div className="relative">
                      <select
                        value={form.tipo_projeto}
                        onChange={(e) => setForm({ ...form, tipo_projeto: e.target.value })}
                        className="w-full appearance-none bg-foreground/[0.02] border border-border rounded-lg px-4 py-3.5 pr-10 text-[16px] text-foreground focus:border-primary focus:outline-none transition-colors cursor-pointer"
                      >
                        <option value="">Selecione um serviço...</option>
                        <option value="Social Media Design">Social Media Design</option>
                        <option value="Brand Identity">Brand Identity</option>
                        <option value="Web Design">Web Design</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Estratégia Criativa">Estratégia Criativa</option>
                      </select>
                      <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>

                  <div>
                    <label className="text-[12px] text-muted-foreground font-medium uppercase tracking-[0.05em] mb-2 block">Mensagem *</label>
                    <textarea
                      value={form.mensagem}
                      onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                      rows={5}
                      className="w-full bg-foreground/[0.02] border border-border rounded-lg px-4 py-3.5 text-[16px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-y min-h-[130px]"
                      placeholder="Conte sobre seu projeto..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary justify-center py-4 text-[16px] disabled:opacity-50"
                  >
                    {loading ? "Enviando..." : "Enviar Mensagem →"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
