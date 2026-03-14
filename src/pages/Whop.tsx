import QuizHeroSection from "@/components/QuizHeroSection";
import StorySection from "@/components/StorySection";
import PainPointsSection from "@/components/PainPointsSection";
import BookCallSection from "@/components/BookCallSection";
import AuthoritySection from "@/components/AuthoritySection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

/**
 * Whop-compliant landing page: same as Index but without client transformation
 * photos or before/after content. Whop prohibits transformation imagery and
 * guaranteeing results; this version keeps story, authority, and CTAs only.
 */
const Whop = () => {
  return (
    <main className="overflow-hidden">
      <QuizHeroSection />
      <BookCallSection />
      <StorySection />
      <PainPointsSection />
      <AuthoritySection />
      <FinalCTASection />
      <Footer />
    </main>
  );
};

export default Whop;
