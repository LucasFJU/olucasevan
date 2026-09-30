-- Anonymous visitors may submit a lead, but cannot discover private rows.
REVOKE SELECT ON public.leads, public.user_roles FROM anon;
