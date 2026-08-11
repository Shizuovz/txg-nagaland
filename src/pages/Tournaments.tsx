import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import TournamentHero from "@/components/TournamentHero";
import PurposeSection from "@/components/PurposeSection";
import SeminarsSection from "@/components/SeminarsSection";
import TechExhibitionSection from "@/components/TechExhibitionSection";
import CompetitionsSection from "@/components/CompetitionsSection";
import CosplaySection from "@/components/CosplaySection";
import DigitalArtChallengeSection from "@/components/DigitalArtChallengeSection";
import AICreativeVideoSection from "@/components/AICreativeVideoSection";
import ProfileSection from "@/components/ProfileSection";
import GameJamSection from "@/components/GameJamSection";
import VisitorExperienceSection from "@/components/VisitorExperienceSection";
import PartnersSection from "@/components/PartnersSection";
import FoodVendorsSection from "@/components/FoodVendorsSection";
import GovernmentSupportSection from "@/components/GovernmentSupportSection";
import EventMapSection from "@/components/EventMapSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Tournaments = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0a0a0a]">
      <Navbar />
      <TournamentHero />
      <PurposeSection />
      <SeminarsSection />
      <TechExhibitionSection />
      <ProfileSection />
      <CompetitionsSection />
      <GameJamSection />
      <CosplaySection />
      <DigitalArtChallengeSection />
      <AICreativeVideoSection />
      <VisitorExperienceSection />
      <PartnersSection />
      <FoodVendorsSection />
      <GovernmentSupportSection />
      <EventMapSection />
      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default Tournaments;
