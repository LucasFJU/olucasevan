import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./navbar.css";

const links = [
  { label: "Início", path: "/" },
  { label: "Projetos", path: "/projetos" },
  { label: "Sobre", path: "/sobre" },
  { label: "Serviços", path: "/servicos" },
  { label: "Contato", path: "/contato" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 60);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => setOpen(false), [location.pathname]);
  function closeMenu() { setOpen(false); triggerRef.current?.focus(); }
  useEffect(() => {
    if (!open) return;
    const items = panelRef.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled])');
    items?.[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); triggerRef.current?.focus(); }
      if (event.key === "Tab" && items?.length) {
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);
  function quote(event: React.MouseEvent<HTMLButtonElement>) {
    const focusTarget = event.currentTarget.closest(".site-menu-panel")
      ? triggerRef.current
      : event.currentTarget;
    setOpen(false);
    window.dispatchEvent(new CustomEvent("open-quote", { detail: focusTarget }));
  }
  return <nav className={`site-nav ${scrolled ? "site-nav-scrolled" : ""}`} aria-label="Navegação principal">
    <div className="site-nav-inner">
      <Link className="site-signature" to="/" onClick={() => setOpen(false)}>Lucas<span>.</span> Evangelista</Link>
      <button ref={triggerRef} className={`site-menu-trigger ${open ? "is-open" : ""}`} type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="site-menu-panel" onClick={() => setOpen(!open)}>{open ? "Fechar" : "Menu"}{open ? <X size={18} /> : <Menu size={18} />}</button>
      {location.pathname === "/" ? <button className="site-nav-cta" onClick={quote}>Conversar sobre um projeto</button> : <Link className="site-nav-cta" to="/contato">Conversar sobre um projeto</Link>}
    </div>
    {open && <div ref={panelRef} id="site-menu-panel" className="site-menu-panel" role="dialog" aria-modal="true" aria-label="Menu do site">{links.map((link, index) => <Link key={link.path} className={location.pathname === link.path ? "active" : ""} to={link.path} onClick={closeMenu}><span>0{index + 1}</span>{link.label}</Link>)}{location.pathname === "/" ? <button onClick={quote}>Conversar sobre um projeto</button> : <Link to="/contato" onClick={closeMenu}>Conversar sobre um projeto <span aria-hidden>↗</span></Link>}</div>}
  </nav>;
}

