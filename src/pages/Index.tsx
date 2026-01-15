import QuizHeroSection from "@/components/QuizHeroSection";
import StorySection from "@/components/StorySection";
import PainPointsSection from "@/components/PainPointsSection";
import BookCallSection from "@/components/BookCallSection";
import AuthoritySection from "@/components/AuthoritySection";
import TestimonialsTransformationsSection from "@/components/TestimonialsTransformationsSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="overflow-hidden">
      <QuizHeroSection />
      <BookCallSection />
      <TestimonialsTransformationsSection />
      <StorySection />
      <PainPointsSection />
      <AuthoritySection />
      <FinalCTASection />
      <Footer />
    </main>
  );
};

export default Index;
