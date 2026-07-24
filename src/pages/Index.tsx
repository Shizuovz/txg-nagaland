import Navbar from "@/components/Navbar";
import SubHeader from "@/components/SubHeader";
import HeroCarousel from "@/components/HeroCarousel";
import AboutUsSection from "@/components/AboutUsSection";
import PurposeSection from "@/components/PurposeSection";
import SeminarsSection from "@/components/SeminarsSection";
import TechExhibitionSection from "@/components/TechExhibitionSection";
import CompetitionsSection from "@/components/CompetitionsSection";
import VisitorExperienceSection from "@/components/VisitorExperienceSection";
import PartnersSection from "@/components/PartnersSection";
import FoodVendorsSection from "@/components/FoodVendorsSection";
import GovernmentSupportSection from "@/components/GovernmentSupportSection";
import EventMapSection from "@/components/EventMapSection";
// import JioGamingBanner from "@/components/JioGamingBanner";
import ActivitySection from "@/components/ActivitySection";
import CareerPathSection from "@/components/CareerPathSection";
import CosplaySection from "@/components/CosplaySection";
import GamingSection from "@/components/GamingSection";

import HeroSection from "@/components/HeroSection";
import WhyGamingSection from "@/components/WhyGamingSection";
import AboutSection from "@/components/AboutSection";
import ExpoSection from "@/components/ExpoSection";
import GamesSection from "@/components/GamesSection";
import OpenCategorySection from "@/components/OpenCategorySection";
import StatsSection from "@/components/StatsSection";
import SponsorsSection from "@/components/SponsorsSection";
import BudgetOverviewSection from "@/components/BudgetOverviewSection";
import MediaContentSection from "@/components/MediaContentSection";
import WhyPartnerSection from "@/components/WhyPartnerSection";
import ContactSection from "@/components/ContactSection";
import RegistrationSection from "@/components/RegistrationSection";
import Footer from "@/components/Footer";
import VisionSection from "@/components/VisionSection";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* NEW WIREFRAME LAYOUT ADDITIONS & REORDERED HERO */}
      <SubHeader />
      <HeroSection />
      <AboutUsSection />
      <PurposeSection />
      <SeminarsSection />
      <TechExhibitionSection />
      <CompetitionsSection />
      <VisitorExperienceSection />
      <PartnersSection />
      <FoodVendorsSection />
      <GovernmentSupportSection />
      <EventMapSection />
      {/* <JioGamingBanner /> */}
      {/* <ActivitySection /> */}
      {/* <CareerPathSection /> */}
      <CosplaySection />
      <GamingSection />

      {/* PREVIOUS CONTENT (PRESERVED) */}

      {/* SLIDE 2 — INTRODUCTION & VISION */}
      <VisionSection />

      {/* SLIDE 3 — WHY GAMING & ESPORTS */}
      <WhyGamingSection />

      {/* SLIDE 4 — ABOUT TECH X GAMING EXPO (Removed as it is now at the top) */}

      {/* SLIDE 5 — WHAT MAKES TECH X GAMING EXPO UNIQUE */}
      <ExpoSection />

      {/* SLIDE 6 — INTER-COLLEGE STATE E-SPORTS SHOWCASE */}
      <GamesSection />

      {/* SLIDE 7 — OPEN CATEGORY TOURNAMENT (ADDED VALUE) */}
      <OpenCategorySection />

      {/* SLIDE 8 — AUDIENCE & FOOTFALL */}
      <StatsSection />

      {/* SLIDE 9 — BRAND VISIBILITY OPPORTUNITIES */}
      {/* <SponsorsSection /> */}

      {/* SLIDE 10 — SPONSORSHIP TIERS */}
      {/* <BudgetOverviewSection /> */}

      {/* SLIDE 11 — BUDGET OVERVIEW */}
      {/* <MediaContentSection /> */}

      {/* SLIDE 12 — WHY PARTNER WITH US */}
      <WhyPartnerSection />

      {/* SLIDE 13 — NEXT STEPS & CONTACT */}
      <ContactSection />

      {/* REGISTRATION FORMS */}
      <RegistrationSection />

      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </main>
  );
};

export default Index;
