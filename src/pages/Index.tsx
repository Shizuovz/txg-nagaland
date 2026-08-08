import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import GamingSection from "@/components/GamingSection";
import VisionSection from "@/components/VisionSection";
import WhyGamingSection from "@/components/WhyGamingSection";
import ExpoSection from "@/components/ExpoSection";
import GamesSection from "@/components/GamesSection";
import OpenCategorySection from "@/components/OpenCategorySection";
import StatsSection from "@/components/StatsSection";
import WhyPartnerSection from "@/components/WhyPartnerSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  useEffect(() => {
    // Check if there is a hash in the URL on initial load
    if (window.location.hash) {
      const id = window.location.hash.substring(1); // remove '#'
      // Add a slight delay to ensure all components are rendered
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); 
    }
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <GamingSection />
      <VisionSection />
      <WhyGamingSection />
      <ExpoSection />
      <GamesSection />
      <OpenCategorySection />
      <StatsSection />
      <WhyPartnerSection />
      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default Index;
