
CREATE TABLE public.proposals (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  cliente_nome text NOT NULL,
  cliente_empresa text,
  cliente_email text,
  titulo text NOT NULL,
  introducao text,
  valor_total numeric(12,2) DEFAULT 0,
  prazo_entrega text,
  validade_dias integer NOT NULL DEFAULT 15,
  status text NOT NULL DEFAULT 'Rascunho',
  projeto_ids uuid[] NOT NULL DEFAULT '{}',
  processo jsonb NOT NULL DEFAULT '[]'::jsonb,
  formas_pagamento jsonb NOT NULL DEFAULT '[]'::jsonb,
  observacoes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_proposals_slug ON public.proposals(slug);
CREATE INDEX idx_proposals_status ON public.proposals(status);

ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view proposals"
  ON public.proposals FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view proposal by slug"
  ON public.proposals FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Admins can insert proposals"
  ON public.proposals FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update proposals"
  ON public.proposals FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete proposals"
  ON public.proposals FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_proposals_updated_at
  BEFORE UPDATE ON public.proposals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.proposal_views (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  proposal_id uuid NOT NULL REFERENCES public.proposals(id) ON DELETE CASCADE,
  user_agent text,
  viewed_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_proposal_views_proposal_id ON public.proposal_views(proposal_id);

ALTER TABLE public.proposal_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view proposal views"
  ON public.proposal_views FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can register a view"
  ON public.proposal_views FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
