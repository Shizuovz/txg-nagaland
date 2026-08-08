import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegistrationSection from "@/components/RegistrationSection";
import ScrollToTop from "@/components/ScrollToTop";

const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden pt-20 bg-[#0a0a0a]">
      <Navbar />
      <RegistrationSection />
      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default Register;
