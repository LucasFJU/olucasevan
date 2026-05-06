import Layout from "@/components/Layout";
import { Helmet } from "react-helmet-async";
import Hero from "@/components/Hero";
import LogosSection from "@/components/LogosSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>Folioblox — Design Estratégico que Posiciona e Converte</title>
        <meta name="description" content="Identidades visuais, social media e sites que geram autoridade e atraem clientes. Design estratégico por Lucas Evan." />
      </Helmet>
      <Hero />
      <LogosSection />
      <AboutSection />
      <TestimonialsSection />
      <ServicesSection />
      <FeaturedProjects />
      <CTASection />
    </Layout>
  );
};

export default Index;
