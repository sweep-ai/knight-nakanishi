import { useEffect } from "react";
import QuizHeroSection from "@/components/QuizHeroSection";
import StorySection from "@/components/StorySection";
import AuthoritySection from "@/components/AuthoritySection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import StickyApplyBar from "@/components/StickyApplyBar";
import { trackEvent } from "@/lib/sweep";

const Whop = () => {
  useEffect(() => {
    void trackEvent("quiz_page_view", { page_id: "whop" });
  }, []);

  return (
    <main className="overflow-hidden">
      <QuizHeroSection variant="whop" />
      <StorySection variant="whop" />
      <AuthoritySection variant="whop" />
      <FinalCTASection variant="whop" />
      <Footer variant="whop" />
      <StickyApplyBar />
    </main>
  );
};

export default Whop;
