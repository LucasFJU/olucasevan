import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Projetos", path: "/projetos" },
  { label: "Serviços", path: "/servicos" },
  { label: "Sobre", path: "/sobre" },
  { label: "Contato", path: "/contato" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-xl font-bold tracking-tighter text-foreground">
          Studio<span className="text-primary">.</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contato"
            className="bg-ember-gradient text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold transition-transform hover:scale-105"
          >
            Iniciar Projeto
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
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium ${
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contato"
                onClick={() => setIsOpen(false)}
                className="bg-ember-gradient text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold text-center"
              >
                Iniciar Projeto
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
