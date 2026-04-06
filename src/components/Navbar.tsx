import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "Início", path: "/" },
  { label: "Serviços", path: "/servicos" },
  { label: "Projetos", path: "/projetos" },
  { label: "Sobre", path: "/sobre" },
  { label: "Contato", path: "/contato" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/88 backdrop-blur-[18px] border-b border-border">
      <div className="container mx-auto px-6 md:px-12 h-[68px] flex items-center justify-between">
        <Link to="/" className="font-display text-lg font-extrabold tracking-tight text-foreground select-none">
          Folio<span className="text-primary">blox</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link-animated ${location.pathname === link.path ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/admin/login"
            className="btn-pill border border-border text-muted-foreground px-5 py-2 text-[13px] hover:text-foreground hover:border-muted-foreground/50 transition-all"
          >
            ⚙ Admin
          </Link>
          <Link
            to="/contato"
            className="btn-primary px-6 py-2.5 text-[14px]"
          >
            Fale Comigo <span className="text-xs">●</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
          aria-label="Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium ${
                    location.pathname === link.path ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contato"
                onClick={() => setIsOpen(false)}
                className="btn-primary justify-center mt-2"
              >
                Fale Comigo <span className="text-xs">●</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
