import QuizHeroSection from "@/components/QuizHeroSection";
import StorySection from "@/components/StorySection";
import PainPointsSection from "@/components/PainPointsSection";
import BookCallSection from "@/components/BookCallSection";
import AuthoritySection from "@/components/AuthoritySection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

/**
 * Whop-compliant landing page: same as Index but without client transformation
 * photos or before/after content. Whop prohibits transformation imagery,
 * guaranteeing results, and fat-loss claims; sections use variant="whop" copy.
 */
const Whop = () => {
  return (
    <main className="overflow-hidden">
      <QuizHeroSection variant="whop" />
      <BookCallSection />
      <StorySection variant="whop" />
      <PainPointsSection variant="whop" />
      <AuthoritySection variant="whop" />
      <FinalCTASection variant="whop" />
      <Footer variant="whop" />
    </main>
  );
};

export default Whop;
