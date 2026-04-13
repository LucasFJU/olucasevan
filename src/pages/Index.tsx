import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import LogosSection from "@/components/LogosSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import ProcessSection from "@/components/ProcessSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <LogosSection />
      <AboutSection />
      <ServicesSection />
      <FeaturedProjects />
      <ProcessSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
