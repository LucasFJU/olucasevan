import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Footer = () => {
  const { data: settings } = useQuery({
    queryKey: ["site-settings-public"],
    staleTime: 10 * 60 * 1000,
    queryFn: async () => {
      const { data } = await supabase.from("site_settings").select("*");
      return data || [];
    },
  });

  const getSetting = (key: string) => settings?.find((setting) => setting.key === key)?.value || "";

  const socials = [
    { name: "Dribbble", url: getSetting("social_dribbble") },
    { name: "LinkedIn", url: getSetting("social_linkedin") },
    { name: "Behance", url: getSetting("social_behance") },
    { name: "Instagram", url: getSetting("social_instagram") },
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
              Lucas<span className="text-primary">.</span> Evangelista
            </Link>
            <p className="text-muted-foreground text-[15px] md:text-[16px] leading-[1.5]">
              Designer de identidades visuais, conteúdo e experiências digitais.
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

            {socials.length > 0 && <div className="col-span-2 md:col-span-1">
              <p className="text-primary text-[14px] font-normal mb-4">[ SOCIAL ]</p>
              <div className="flex flex-row md:flex-col gap-4">
                {socials.map((s) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="text-foreground text-[15px] md:text-[16px] hover:text-primary transition-colors">
                    {s.name}
                  </a>
                ))}
              </div>
            </div>}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-12 md:mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-[13px] md:text-[14px]">
            <span className="text-primary">//</span> ©{new Date().getFullYear()} Lucas Evangelista. Todos os direitos reservados.
          </p>
          {getSetting("contact_email") && <a href={`mailto:${getSetting("contact_email")}`} className="text-muted-foreground text-[13px] md:text-[14px] hover:text-foreground transition-colors">{getSetting("contact_email")}</a>}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
