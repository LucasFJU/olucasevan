import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-6 md:px-12 py-11 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="font-display font-extrabold text-[17px] text-foreground">
          Folio<span className="text-primary">blox</span>
        </Link>

        <div className="flex gap-6">
          {[
            { label: "Início", path: "/" },
            { label: "Serviços", path: "/servicos" },
            { label: "Projetos", path: "/projetos" },
            { label: "Contato", path: "/contato" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <p className="text-[13px] text-muted-foreground/60">
          © {new Date().getFullYear()} Folioblox. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
