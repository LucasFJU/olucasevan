import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border" style={{
      background: "radial-gradient(ellipse 60% 40% at 50% 0%, hsl(15 100% 50% / 0.06), transparent 60%)"
    }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-0 py-[120px] md:py-[120px]">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-20">
          {/* Logo + Description */}
          <div className="max-w-[305px]">
            <Link to="/" className="font-display text-lg font-semibold text-foreground block mb-4">
              <span className="text-primary">■</span> Folio<span className="text-primary">blox</span>
            </Link>
            <p className="text-muted-foreground text-[16px] leading-[1.5]">
              Diretor criativo focado em design digital — social media, brand design e web design que conectam e convertem.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16">
            <div>
              <p className="text-primary text-[14px] font-normal mb-4">[ COMPANY ]</p>
              <div className="flex flex-col gap-4">
                {[
                  { label: "About", path: "/sobre" },
                  { label: "Process", path: "/processo" },
                  { label: "Contact", path: "/contato" },
                ].map((link) => (
                  <Link key={link.path} to={link.path} className="text-foreground text-[16px] hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-primary text-[14px] font-normal mb-4">[ SERVICES ]</p>
              <div className="flex flex-col gap-4">
                {["Social Media", "Brand Design", "Web Design", "UI/UX Design"].map((s) => (
                  <Link key={s} to="/servicos" className="text-foreground text-[16px] hover:text-primary transition-colors">
                    {s}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-primary text-[14px] font-normal mb-4">[ SOCIAL ]</p>
              <div className="flex flex-col gap-4">
                {["Dribbble", "LinkedIn", "Behance", "Instagram"].map((s) => (
                  <a key={s} href="#" className="text-foreground text-[16px] hover:text-primary transition-colors">
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-[14px]">
            <span className="text-primary">//</span> ©{new Date().getFullYear()} Folioblox. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground text-[14px] hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground text-[14px] hover:text-foreground transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
