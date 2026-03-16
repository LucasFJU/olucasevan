import { useState } from "react";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Send, Mail, Instagram, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  nome: z.string().trim().min(1, "Nome é obrigatório").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  tipo_projeto: z.string().optional(),
  mensagem: z.string().trim().min(1, "Mensagem é obrigatória").max(2000),
});

const Contact = () => {
  const [form, setForm] = useState({ nome: "", email: "", tipo_projeto: "", mensagem: "" });
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
      tipo_projeto: result.data.tipo_projeto || null,
      mensagem: result.data.mensagem,
    });
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
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Contato</span>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mt-2 text-foreground">
                Vamos criar algo <span className="text-gradient-ember">incrível</span>
              </h1>
              <p className="text-muted-foreground mt-6 leading-relaxed max-w-md text-pretty">
                Tem um projeto em mente? Envie uma mensagem e vamos conversar sobre como posso ajudar.
              </p>

              <div className="mt-10 space-y-4">
                <a href="mailto:contato@studio.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Mail size={18} strokeWidth={1.5} className="text-primary" />
                  contato@studio.com
                </a>
                <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Instagram size={18} strokeWidth={1.5} className="text-primary" />
                  @studio.design
                </a>
                <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin size={18} strokeWidth={1.5} className="text-primary" />
                  linkedin.com/in/studio
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {sent ? (
                <div className="bg-card rounded-2xl p-12 card-rim text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-ember-gradient flex items-center justify-center mb-6">
                    <Send size={24} className="text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Mensagem enviada!</h3>
                  <p className="text-muted-foreground mt-3">Retornarei em até 24 horas.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 card-rim space-y-6">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Nome</label>
                    <input
                      type="text"
                      value={form.nome}
                      onChange={(e) => setForm({ ...form, nome: e.target.value })}
                      className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                      placeholder="Seu nome"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Tipo de Projeto</label>
                    <select
                      value={form.tipo_projeto}
                      onChange={(e) => setForm({ ...form, tipo_projeto: e.target.value })}
                      className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
                    >
                      <option value="">Selecione...</option>
                      <option value="Social Media">Social Media Design</option>
                      <option value="Brand Design">Brand Design</option>
                      <option value="Web Design">Web Design</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Mensagem</label>
                    <textarea
                      value={form.mensagem}
                      onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                      rows={4}
                      className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                      placeholder="Conte sobre seu projeto..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-ember-gradient text-primary-foreground py-3.5 rounded-xl text-sm font-semibold transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {loading ? "Enviando..." : "Enviar Mensagem"}
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
