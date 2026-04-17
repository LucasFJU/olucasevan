export const slugify = (str: string) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40);

export const randomId = (len = 6) => {
  const chars = "abcdefghijkmnpqrstuvwxyz23456789";
  let out = "";
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
};

export const buildSlug = (clienteNome: string) => {
  const base = slugify(clienteNome) || "proposta";
  return `${randomId()}-${base}`;
};

export const formatBRL = (n: number | null | undefined) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(n) || 0);

export const proposalStatusBadge = (status: string | null) => {
  switch (status) {
    case "Aceita":
      return "bg-green-500/10 text-green-400";
    case "Enviada":
      return "bg-blue-500/10 text-blue-400";
    case "Recusada":
      return "bg-destructive/10 text-destructive";
    case "Expirada":
      return "bg-yellow-500/10 text-yellow-400";
    case "Rascunho":
    default:
      return "bg-white/[0.07] text-muted-foreground";
  }
};

export type ProcessoEtapa = { titulo: string; descricao: string; prazo: string };
export type FormaPagamento = { titulo: string; descricao: string; valor: number };
