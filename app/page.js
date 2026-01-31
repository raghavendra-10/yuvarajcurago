import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutDoctorSection from "@/components/AboutDoctorSection";
import ForumSection from "@/components/ForumSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <AboutDoctorSection />
      <ForumSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
