import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import LogosSection from "@/components/LogosSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <LogosSection />
      <AboutSection />
      <FeaturedProjects />
      <ProcessSection />
      <ServicesSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
