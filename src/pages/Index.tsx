import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <hr className="border-border" />
      <ServicesSection />
      <hr className="border-border" />
      <AboutSection />
      <hr className="border-border" />
      <FeaturedProjects />
      <hr className="border-border" />
      <ProcessSection />
      <hr className="border-border" />
      <CTASection />
    </Layout>
  );
};

export default Index;
