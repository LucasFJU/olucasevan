import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useSiteSetting = (key: string) => {
  const { data } = useQuery({
    queryKey: ["site-setting", key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", key)
        .maybeSingle();
      if (error) throw error;
      return data?.value ?? null;
    },
    staleTime: 60_000,
  });
  return data ?? null;
};

export const sanitizeWhatsApp = (raw: string | null | undefined) =>
  (raw || "").replace(/\D/g, "");

export const buildWhatsAppUrl = (number: string | null | undefined, message: string) => {
  const clean = sanitizeWhatsApp(number);
  const base = clean ? `https://wa.me/${clean}` : `https://wa.me/`;
  return `${base}?text=${encodeURIComponent(message)}`;
};
