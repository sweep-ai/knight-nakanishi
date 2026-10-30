import { useEffect } from "react";
import QuizHeroSection from "@/components/QuizHeroSection";
import StorySection from "@/components/StorySection";
import AuthoritySection from "@/components/AuthoritySection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import StickyApplyBar from "@/components/StickyApplyBar";
import { funnelEvent } from "@/config/funnel";
import { getSessionId, trackEvent } from "@/lib/sweep";

const Whop = () => {
  useEffect(() => {
    const sessionId = getSessionId();
    void trackEvent(funnelEvent.quizPageView, { page_id: "whop" }, `${funnelEvent.quizPageView}_whop_${sessionId}`);
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
