import { Link } from "react-router-dom";
import { Instagram, Linkedin, Mail, Dribbble } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="font-display text-2xl font-bold tracking-tighter text-foreground">
              Studio<span className="text-primary">.</span>
            </Link>
            <p className="mt-4 text-muted-foreground text-sm max-w-sm text-pretty leading-relaxed">
              Criando marcas e experiências digitais memoráveis. Social Media, Brand Design e Web Design.
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Dribbble, href: "#" },
                { icon: Mail, href: "mailto:contato@studio.com" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Navegação</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Home", path: "/" },
                { label: "Projetos", path: "/projetos" },
                { label: "Serviços", path: "/servicos" },
                { label: "Sobre", path: "/sobre" },
                { label: "Contato", path: "/contato" },
              ].map(({ label, path }) => (
                <Link
                  key={label}
                  to={path}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-foreground mb-4">Serviços</h4>
            <div className="flex flex-col gap-3">
              {["Social Media Design", "Brand Design", "Web Design"].map((s) => (
                <span key={s} className="text-sm text-muted-foreground">{s}</span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              contato@studio.com
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Studio. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
