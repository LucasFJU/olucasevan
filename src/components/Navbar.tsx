import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "Início", path: "/" },
  { label: "Sobre", path: "/sobre" },
  { label: "Projetos", path: "/projetos" },
  { label: "Serviços", path: "/servicos" },
  { label: "Processo", path: "/processo" },
  { label: "Contato", path: "/contato" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-3 left-0 right-0 z-50 px-4 md:px-6">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between rounded-full border border-foreground/[0.06] bg-background/80 backdrop-blur-xl px-5 md:px-6 py-3">
        {/* Logo */}
        <Link to="/" className="font-display text-lg font-semibold tracking-tight text-foreground select-none shrink-0">
          <span className="text-primary">■</span> Folio<span className="text-primary">blox</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link-animated text-[15px] ${location.pathname === link.path ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          to="/contato"
          className="hidden md:inline-flex btn-primary px-5 py-2.5 text-[14px]"
        >
          Fale Conosco
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground p-1"
          aria-label="Menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-2 mx-0 rounded-2xl bg-background/95 backdrop-blur-xl border border-foreground/[0.06] overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-[16px] font-medium py-2 ${
                    location.pathname === link.path ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contato"
                onClick={() => setIsOpen(false)}
                className="btn-primary justify-center mt-2 text-[14px]"
              >
                Fale Conosco
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
