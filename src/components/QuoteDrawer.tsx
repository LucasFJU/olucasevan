import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Send } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";

const serviceNames = ["Identidade visual", "Social media", "Sites e landing pages", "UI/UX"];

export default function QuoteDrawer({ open, onOpenChange, service, returnFocus }: { open: boolean; onOpenChange: (value: boolean) => void; service: string; returnFocus: React.RefObject<HTMLElement> }) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [selectedService, setSelectedService] = useState(service);
  useEffect(() => { setSelectedService(service); setSent(false); }, [service, open]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const nome = String(values.get("nome") || "").trim();
    const email = String(values.get("email") || "").trim();
    const mensagem = String(values.get("mensagem") || "").trim();
    const modalidade = String(values.get("modalidade") || "");
    if (!nome || !email || !mensagem || !modalidade || !selectedService) return;
    setSending(true);
    try {
      const { error } = await supabase.from("leads").insert({ nome, email, tipo_projeto: selectedService, assunto: `Orçamento · ${modalidade}`, mensagem });
      if (error) throw error;
      setSent(true);
      toast.success("Mensagem enviada com sucesso.");
    } catch {
      toast.error("Não foi possível enviar. Tente novamente ou use a página de contato.");
    } finally { setSending(false); }
  }

  return <Sheet open={open} onOpenChange={onOpenChange}><SheetContent side="right" className="quote-panel" onCloseAutoFocus={(event) => { event.preventDefault(); returnFocus.current?.focus(); }}>
    <SheetHeader><SheetTitle>Vamos conversar sobre seu projeto.</SheetTitle></SheetHeader>
    <p className="quote-intro">Conte um pouco sobre a sua ideia. Eu retorno para alinharmos o escopo e o próximo passo.</p>
    {sent ? <div className="quote-success" role="status"><Send size={28} /><h3>Mensagem enviada.</h3><p>Obrigado pelo contato. Sua solicitação foi registrada.</p><button type="button" onClick={() => onOpenChange(false)}>Fechar</button></div> :
      <form onSubmit={submit} className="quote-form">
        <label>Nome <input name="nome" autoComplete="name" maxLength={100} required /></label>
        <label>E-mail <input name="email" type="email" autoComplete="email" maxLength={255} required /></label>
        <label>Serviço <select value={selectedService} onChange={(event) => setSelectedService(event.target.value)} required><option value="">Selecione um serviço</option>{serviceNames.map((name) => <option key={name} value={name}>{name}</option>)}</select></label>
        <fieldset><legend>Modalidade</legend><label><input type="radio" name="modalidade" value="pontual" required /> Projeto pontual</label><label><input type="radio" name="modalidade" value="contínua" required /> Parceria contínua</label></fieldset>
        <label>Descrição <textarea name="mensagem" rows={5} maxLength={2000} placeholder="Conte o que você precisa..." required /></label>
        <button className="home-button home-button-primary" type="submit" disabled={sending}>{sending ? "Enviando..." : "Enviar mensagem"}<ArrowRight size={18} /></button>
        <Link to="/contato" onClick={() => onOpenChange(false)}>Prefere a página de contato?</Link>
      </form>}
  </SheetContent></Sheet>;
}
