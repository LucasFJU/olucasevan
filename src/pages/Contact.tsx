import { useState } from "react";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

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
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12">
          {/* Banner CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg p-12 md:p-20 text-center relative overflow-hidden mb-16"
            style={{ background: "linear-gradient(135deg, #ff5c1a 0%, #c03000 55%, #0a0a0a 100%)" }}
          >
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.025'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`
            }} />
            <div className="relative z-10">
              <p className="tag-label mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>Vamos trabalhar juntos</p>
              <h1
                className="font-display font-extrabold text-white mb-4"
                style={{ fontSize: "clamp(38px, 6vw, 72px)" }}
              >
                Sua marca merece design que funciona.
              </h1>
              <p className="text-white/75 text-base max-w-[440px] mx-auto leading-[1.8]">
                Conte seu projeto. Respondemos em até 24h com uma proposta personalizada.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-[640px] mx-auto"
          >
            {sent ? (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-ember-gradient flex items-center justify-center mb-6">
                  <Send size={24} className="text-primary-foreground" />
                </div>
                <h3 className="font-display text-2xl font-extrabold text-foreground">Mensagem enviada!</h3>
                <p className="text-muted-foreground mt-3">Retornaremos em até 24 horas.</p>
              </div>
            ) : (
              <>
                <h2
                  className="font-display font-extrabold text-foreground mb-2"
                  style={{ fontSize: "clamp(30px, 4vw, 46px)" }}
                >
                  Vamos começar?
                </h2>
                <p className="text-muted-foreground mb-10 text-[15px] leading-[1.8]">
                  Preencha o formulário e nossa equipe entra em contato para entender seu projeto e apresentar a melhor solução.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[11px] text-muted-foreground font-semibold uppercase tracking-[0.08em] mb-2 block">Nome *</label>
                      <input
                        type="text"
                        value={form.nome}
                        onChange={(e) => setForm({ ...form, nome: e.target.value })}
                        className="w-full bg-card border border-border rounded-md px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                        placeholder="Seu nome"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-muted-foreground font-semibold uppercase tracking-[0.08em] mb-2 block">E-mail *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-card border border-border rounded-md px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-muted-foreground font-semibold uppercase tracking-[0.08em] mb-2 block">Assunto</label>
                    <input
                      type="text"
                      value={form.assunto}
                      onChange={(e) => setForm({ ...form, assunto: e.target.value })}
                      className="w-full bg-card border border-border rounded-md px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                      placeholder="Assunto da mensagem"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-muted-foreground font-semibold uppercase tracking-[0.08em] mb-2 block">Serviço de interesse</label>
                    <select
                      value={form.tipo_projeto}
                      onChange={(e) => setForm({ ...form, tipo_projeto: e.target.value })}
                      className="w-full bg-card border border-border rounded-md px-4 py-3.5 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
                    >
                      <option value="">Selecione...</option>
                      <option value="Social Media Design">Social Media Design</option>
                      <option value="Brand Design">Brand Design</option>
                      <option value="Web Design">Web Design</option>
                      <option value="Pacote Completo">Pacote Completo</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-muted-foreground font-semibold uppercase tracking-[0.08em] mb-2 block">Mensagem *</label>
                    <textarea
                      value={form.mensagem}
                      onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                      rows={5}
                      className="w-full bg-card border border-border rounded-md px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-y min-h-[130px]"
                      placeholder="Fale sobre seu projeto, prazo e orçamento..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-ember-gradient text-primary-foreground py-4 rounded-full font-display text-base font-bold transition-all hover:translate-y-[-2px] disabled:opacity-50 disabled:hover:translate-y-0 mt-2"
                  >
                    {loading ? "Enviando..." : "Enviar Mensagem →"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
