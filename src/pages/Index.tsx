import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import PainPointsSection from "@/components/PainPointsSection";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import BookCallSection from "@/components/BookCallSection";
import AuthoritySection from "@/components/AuthoritySection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <LeadCaptureForm />
      <BookCallSection />
      <StorySection />
      <PainPointsSection />
      <AuthoritySection />
      <FinalCTASection />
      <Footer />
    </main>
  );
};

export default Index;
