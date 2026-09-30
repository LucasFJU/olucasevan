import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./navbar.css";

const links = [
  { label: "Projetos", path: "/projetos" },
  { label: "Sobre", path: "/sobre" },
  { label: "Serviços", path: "/servicos" },
  { label: "Contato", path: "/contato" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 60);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  function quote(event: React.MouseEvent<HTMLButtonElement>) {
    const focusTarget = event.currentTarget.closest(".site-mobile-menu")
      ? document.querySelector<HTMLElement>(".site-nav-toggle")
      : event.currentTarget;
    setOpen(false);
    window.dispatchEvent(new CustomEvent("open-quote", { detail: focusTarget }));
  }
  return <nav className={`site-nav ${scrolled ? "site-nav-scrolled" : ""}`} aria-label="Navegação principal">
    <div className="site-nav-inner">
      <Link className="site-signature" to="/" onClick={() => setOpen(false)}>Lucas<span>.</span> Evangelista</Link>
      <div className="site-nav-desktop">{links.map((link) => <Link key={link.path} className={location.pathname === link.path ? "active" : ""} to={link.path}>{link.label}</Link>)}</div>
      {location.pathname === "/" ? <button className="site-nav-cta" onClick={quote}>Conversar sobre um projeto</button> : <Link className="site-nav-cta" to="/contato">Conversar sobre um projeto</Link>}
      <button className="site-nav-toggle" type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="site-mobile-menu" onClick={() => setOpen(!open)}>{open ? <X size={23} /> : <Menu size={23} />}</button>
    </div>
    {open && <div id="site-mobile-menu" className="site-mobile-menu">{links.map((link) => <Link key={link.path} to={link.path} onClick={() => setOpen(false)}>{link.label}</Link>)}{location.pathname === "/" ? <button onClick={quote}>Conversar sobre um projeto</button> : <Link to="/contato" onClick={() => setOpen(false)}>Conversar sobre um projeto</Link>}</div>}
  </nav>;
}
