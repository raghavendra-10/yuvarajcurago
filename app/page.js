import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import GutBrainIndexSection from "@/components/GutBrainIndexSection";
import EducationalSection from "@/components/EducationalSection";
import PriorityCircleSection from "@/components/PriorityCircleSection";
import AboutDoctorSection from "@/components/AboutDoctorSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <GutBrainIndexSection />
      <EducationalSection />
      <PriorityCircleSection />
      <AboutDoctorSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
