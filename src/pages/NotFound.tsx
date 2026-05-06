import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <span className="font-display text-[120px] md:text-[180px] font-extrabold text-primary/20 leading-none select-none">
          404
        </span>
        <h1 className="font-display text-2xl md:text-4xl font-bold text-foreground mt-4 mb-3">
          Página não encontrada
        </h1>
        <p className="text-muted-foreground max-w-md mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link
          to="/"
          className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm"
        >
          <ArrowLeft size={16} /> Voltar para o início
        </Link>
      </section>
    </Layout>
  );
};

export default NotFound;
