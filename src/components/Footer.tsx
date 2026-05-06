import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const defaultSocials: Record<string, string> = {
  Dribbble: "#",
  LinkedIn: "#",
  Behance: "#",
  Instagram: "#",
};

const Footer = () => {
  const { data: settings } = useQuery({
    queryKey: ["site-settings-public"],
    staleTime: 10 * 60 * 1000,
    queryFn: async () => {
      const { data } = await supabase.from("site_settings" as any).select("*");
      return data as any[] || [];
    },
  });

  const getSetting = (key: string) => settings?.find((s: any) => s.key === key)?.value || "";

  const socials = [
    { name: "Dribbble", url: getSetting("social_dribbble") || defaultSocials.Dribbble },
    { name: "LinkedIn", url: getSetting("social_linkedin") || defaultSocials.LinkedIn },
    { name: "Behance", url: getSetting("social_behance") || defaultSocials.Behance },
    { name: "Instagram", url: getSetting("social_instagram") || defaultSocials.Instagram },
  ].filter((s) => s.url && s.url !== "#");

  return (
    <footer className="border-t border-border" style={{
      background: "radial-gradient(ellipse 60% 40% at 50% 0%, hsl(15 100% 50% / 0.06), transparent 60%)"
    }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-0 py-[60px] md:py-[120px]">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-20">
          {/* Logo + Description */}
          <div className="max-w-[305px]">
            <Link to="/" className="font-display text-lg font-semibold text-foreground block mb-4">
              <span className="text-primary">■</span> Folio<span className="text-primary">blox</span>
            </Link>
            <p className="text-muted-foreground text-[15px] md:text-[16px] leading-[1.5]">
              Diretor criativo focado em design digital — social media, brand design e web design que conectam e convertem.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
            <div>
              <p className="text-primary text-[14px] font-normal mb-4">[ EMPRESA ]</p>
              <div className="flex flex-col gap-3 md:gap-4">
                {[
                  { label: "Sobre", path: "/sobre" },
                  { label: "Projetos", path: "/projetos" },
                  { label: "Contato", path: "/contato" },
                ].map((link) => (
                  <Link key={link.path} to={link.path} className="text-foreground text-[15px] md:text-[16px] hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-primary text-[14px] font-normal mb-4">[ SERVIÇOS ]</p>
              <div className="flex flex-col gap-3 md:gap-4">
                {["Social Media", "Brand Design", "Web Design", "UI/UX Design"].map((s) => (
                  <Link key={s} to="/servicos" className="text-foreground text-[15px] md:text-[16px] hover:text-primary transition-colors">
                    {s}
                  </Link>
                ))}
              </div>
            </div>

            <div className="col-span-2 md:col-span-1">
              <p className="text-primary text-[14px] font-normal mb-4">[ SOCIAL ]</p>
              <div className="flex flex-row md:flex-col gap-4">
                {socials.length > 0 ? socials.map((s) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="text-foreground text-[15px] md:text-[16px] hover:text-primary transition-colors">
                    {s.name}
                  </a>
                )) : ["Dribbble", "LinkedIn", "Behance", "Instagram"].map((s) => (
                  <a key={s} href="#" className="text-foreground text-[15px] md:text-[16px] hover:text-primary transition-colors opacity-50 pointer-events-none">
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-12 md:mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-[13px] md:text-[14px]">
            <span className="text-primary">//</span> ©{new Date().getFullYear()} Folioblox. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground text-[13px] md:text-[14px] hover:text-foreground transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-muted-foreground text-[13px] md:text-[14px] hover:text-foreground transition-colors">
              Termos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
