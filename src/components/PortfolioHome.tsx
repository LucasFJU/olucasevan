import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import QuoteDrawer from "./QuoteDrawer";
import { useIsMobile } from "@/hooks/use-mobile";
import lucasHero from "@/assets/lucas-hero.webp";
import "./portfolio-home.css";

const ease = [0.22, 1, 0.36, 1] as const;
const services = [
  { name: "Identidade visual", description: "Logotipo, linguagem visual e aplicações para uma marca consistente." },
  { name: "Social media", description: "Design para campanhas, carrosséis e a comunicação do dia a dia." },
  { name: "Sites e landing pages", description: "Páginas que apresentam seu negócio e facilitam o próximo passo do cliente." },
  { name: "UI/UX", description: "Interfaces e fluxos claros para produtos digitais." },
];
const steps = [
  { title: "Conversa", description: "Entendo seu negócio, o contexto e os objetivos do projeto." },
  { title: "Direção", description: "Definimos as referências e o caminho criativo." },
  { title: "Desenvolvimento", description: "Crio as peças e refinamos os detalhes juntos." },
  { title: "Entrega", description: "Organizo os arquivos e as orientações para colocar o projeto em uso." },
];
const questions = [
  { question: "Como começamos um projeto?", answer: "Você me conta o que precisa pelo formulário. A partir dessa conversa, alinhamos escopo, entregas e próximos passos antes de iniciar." },
  { question: "Qual é o prazo de entrega?", answer: "O prazo depende do tipo e da extensão do projeto. Eu o defino com você depois de entender o escopo." },
  { question: "Posso pedir ajustes?", answer: "Sim. As etapas de apresentação e refinamento são combinadas no escopo de cada projeto." },
  { question: "Quais arquivos recebo?", answer: "As entregas variam conforme o serviço contratado. Antes de começar, alinhamos quais arquivos e orientações serão fornecidos." },
];
type FeaturedProject = { id: string; titulo: string; categoria: string; imagem_capa: string | null };

function Reveal({ children, className = "", delay = 0, y = 16 }: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.5, delay, ease }}>{children}</motion.div>;
}
function HighlightWord({ word, index, count, progress }: { word: string; index: number; count: number; progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const reduced = useReducedMotion();
  const color = useTransform(progress, [index / count, Math.min(1, (index + 1) / count)], ["#9d9d9d", "#f5f4f1"]);
  return <motion.span style={{ color: reduced ? "#f5f4f1" : color }}>{word}{" "}</motion.span>;
}
function ProjectTile({ project, index }: { project: FeaturedProject; index: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, .5, 1], [1.03, 1, 1]);
  return <Reveal className="home-project" y={24} delay={index % 2 ? .1 : 0}><Link to={`/projetos/${project.id}`}><div className="home-project-image" ref={ref}>{project.imagem_capa ? <motion.img src={project.imagem_capa} alt={`Capa do projeto ${project.titulo}`} loading="lazy" style={{ scale: reduced ? 1 : scale }} whileHover={reduced ? undefined : { scale: 1.025 }} transition={{ duration: .3 }} /> : <span>Projeto sem capa</span>}</div><div className="home-project-meta"><div><h3>{project.titulo}</h3><p>{project.categoria}</p></div><ArrowUpRight size={22} aria-hidden /></div></Link></Reveal>;
}

export default function PortfolioHome() {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lastTrigger = useRef<HTMLElement>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteService, setQuoteService] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeService, setActiveService] = useState<number | null>(null);
  const mobile = useIsMobile();
  useEffect(() => {
    const handleOpen = (event: Event) => { lastTrigger.current = (event as CustomEvent<HTMLElement>).detail; setQuoteService(""); setQuoteOpen(true); };
    window.addEventListener("open-quote", handleOpen);
    return () => window.removeEventListener("open-quote", handleOpen);
  }, []);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const photoY = useTransform(heroProgress, [0, 1], [0, 24]);
  const { scrollYProgress: titleProgress } = useScroll({ target: titleRef, offset: ["start 0.8", "start 0.35"] });
  const { data: projects, isLoading, isError } = useQuery({
    queryKey: ["featured-projects"], staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("id, titulo, categoria, imagem_capa, data_publicacao").eq("destaque", true).neq("status", "Rascunho").order("data_publicacao", { ascending: false }).limit(4);
      if (error) throw error;
      return data as FeaturedProject[];
    },
  });
  const { data: contactEmail } = useQuery({
    queryKey: ["contact-email"],
    queryFn: async () => {
      const { data } = await supabase.from("site_settings").select("value").eq("key", "contact_email").maybeSingle();
      return data?.value || "";
    },
  });
  function openQuote(service = "", trigger?: HTMLElement) { lastTrigger.current = trigger || (document.activeElement as HTMLElement); setQuoteService(service); setQuoteOpen(true); }
  const headline = "Design com intenção. Do conceito à entrega.".split(" ");
  return <div className="portfolio-home">
    <section className="home-hero" ref={heroRef}><div className="home-shell home-hero-grid"><div className="home-hero-copy"><p className="home-kicker hero-enter">Lucas Evangelista · Designer</p><h1 className="hero-enter hero-title">Design que <em>posiciona</em> sua marca.</h1><p className="hero-enter hero-description">Crio identidades visuais, conteúdo e sites que traduzem o valor do seu negócio.</p><div className="home-actions hero-enter"><Link className="home-button home-button-secondary" to="/projetos">Ver projetos <ArrowUpRight size={18} /></Link><button className="home-button home-button-primary" onClick={(event) => openQuote("", event.currentTarget)}>Conversar sobre um projeto <ArrowRight size={18} /></button></div></div><div className="home-photo-frame"><motion.img src={lucasHero} alt="Lucas Evangelista" loading="eager" style={{ y: reduced ? 0 : photoY }} /></div></div></section>
    <section className="home-about" id="sobre"><div className="home-shell home-about-grid"><p className="home-kicker">01 / Sobre</p><div><h2 ref={titleRef}>{headline.map((word, index) => <HighlightWord key={`${word}-${index}`} word={word} index={index} count={headline.length} progress={titleProgress} />)}</h2><Reveal><p className="home-lead">Sou Lucas Evangelista. Trabalho com identidade visual, social media e experiências digitais, conectando direção criativa às necessidades de cada negócio.</p><Link className="home-text-link" to="/sobre">Conheça minha trajetória <ArrowUpRight size={18} /></Link></Reveal></div></div></section>
    <section className="home-projects" id="projetos"><div className="home-shell"><div className="home-section-heading"><div><p className="home-kicker">02 / Portfólio</p><h2>Projetos selecionados.</h2></div><p>Identidades, campanhas e interfaces desenvolvidas para diferentes desafios.</p></div>{isLoading ? <p className="home-project-message">Carregando projetos...</p> : isError ? <p className="home-project-message">Não foi possível carregar os projetos agora.</p> : projects?.length ? <div className="home-project-grid">{projects.map((project, index) => <ProjectTile key={project.id} project={project} index={index} />)}</div> : <p className="home-project-message">Os projetos selecionados aparecerão aqui quando forem publicados.</p>}<Link className="home-text-link" to="/projetos">Explorar portfólio <ArrowUpRight size={18} /></Link></div></section>
    <div className="home-light-surface"><section className="home-services home-shell" id="servicos"><div className="home-services-intro"><p className="home-kicker">03 / Serviços</p><h2>O que podemos criar juntos.</h2><p>Projetos pontuais ou uma parceria contínua, conforme a necessidade da sua marca.</p></div><div className="home-service-list">{services.map((service, index) => <Reveal key={service.name} className="home-service"><span className="home-service-number">0{index + 1}</span><div><h3><button className="service-title-button" type="button" aria-expanded={!mobile || activeService === index} aria-controls={`service-detail-${index}`} onClick={() => setActiveService(activeService === index ? null : index)}>{service.name}<span aria-hidden>{activeService === index ? "−" : "+"}</span></button></h3><div id={`service-detail-${index}`} className={`home-service-details ${activeService === index ? "is-open" : ""}`}><div><p>{service.description}</p><button className="service-cta" onClick={(event) => openQuote(service.name, event.currentTarget)}>Conversar sobre este serviço <ArrowUpRight size={17} /></button></div></div></div></Reveal>)}</div></section>
      <section className="home-process home-shell" id="processo"><p className="home-kicker">04 / Processo</p><h2>Um caminho claro,<br /> do início ao fim.</h2><div className="home-process-layout"><div className="home-step-list" role="tablist" aria-label="Etapas do processo">{steps.map((step, index) => <button key={step.title} role="tab" id={`process-tab-${index}`} aria-controls="process-panel" aria-selected={activeStep === index} tabIndex={activeStep === index ? 0 : -1} className={activeStep === index ? "active" : ""} onClick={() => setActiveStep(index)} onKeyDown={(event) => { if (event.key === "ArrowDown" || event.key === "ArrowRight") { event.preventDefault(); const next = (index + 1) % steps.length; setActiveStep(next); document.getElementById(`process-tab-${next}`)?.focus(); } if (event.key === "ArrowUp" || event.key === "ArrowLeft") { event.preventDefault(); const next = (index - 1 + steps.length) % steps.length; setActiveStep(next); document.getElementById(`process-tab-${next}`)?.focus(); } }}>0{index + 1} · {step.title}<ArrowRight size={18} /></button>)}</div><div className="home-step-content" role="tabpanel" id="process-panel" aria-labelledby={`process-tab-${activeStep}`}><AnimatePresence mode="wait"><motion.div key={activeStep} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0 }} transition={{ duration: reduced ? 0 : 0.25 }}><span>0{activeStep + 1} / 04</span><h3>{steps[activeStep].title}</h3><p>{steps[activeStep].description}</p></motion.div></AnimatePresence></div></div></section>
      <section className="home-faq home-shell" id="faq"><div><p className="home-kicker">05 / Dúvidas</p><h2>Antes de começarmos.</h2></div><div className="home-faq-list">{questions.map((item, index) => <div className="home-faq-item" key={item.question}><button aria-expanded={activeFaq === index} aria-controls={`faq-answer-${index}`} onClick={() => setActiveFaq(activeFaq === index ? null : index)}>{item.question}<span aria-hidden>{activeFaq === index ? "−" : "+"}</span></button><div className={`home-faq-answer ${activeFaq === index ? "is-open" : ""}`} id={`faq-answer-${index}`} aria-hidden={activeFaq !== index}><p>{item.answer}</p></div></div>)}</div></section>
    </div>
    <section className="home-contact" id="contato"><div className="home-shell"><Reveal><p className="home-kicker">06 / Contato</p><h2>Vamos dar forma ao seu próximo projeto?</h2><p>Conte o que você precisa. Vamos conversar sobre o escopo e o próximo passo.</p><div className="home-actions"><button className="home-button home-button-primary" onClick={(event) => openQuote("", event.currentTarget)}>Conversar sobre um projeto <ArrowRight size={18} /></button>{contactEmail ? <a className="home-text-link" href={`mailto:${contactEmail}`}>Enviar um e-mail <ArrowUpRight size={18} /></a> : <Link className="home-text-link" to="/contato">Página de contato <ArrowUpRight size={18} /></Link>}</div></Reveal></div></section>
    <QuoteDrawer open={quoteOpen} onOpenChange={setQuoteOpen} service={quoteService} returnFocus={lastTrigger} />
  </div>;
}
