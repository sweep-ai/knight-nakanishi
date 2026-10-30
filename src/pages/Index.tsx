import { useEffect } from "react";
import QuizHeroSection from "@/components/QuizHeroSection";
import StorySection from "@/components/StorySection";
import AuthoritySection from "@/components/AuthoritySection";
import ScrollingBanner from "@/components/ScrollingBanner";
import TestimonialVideosSection from "@/components/TestimonialVideosSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import StickyApplyBar from "@/components/StickyApplyBar";
import { funnelEvent } from "@/config/funnel";
import { getSessionId, trackEvent } from "@/lib/sweep";

const Index = () => {
  useEffect(() => {
    const sessionId = getSessionId();
    void trackEvent(funnelEvent.quizPageView, { page_id: "intro" }, `${funnelEvent.quizPageView}_intro_${sessionId}`);
  }, []);

  return (
    <main className="overflow-hidden">
      <QuizHeroSection />
      <ScrollingBanner />
      <TestimonialVideosSection />
      <StorySection />
      <AuthoritySection />
      <FinalCTASection />
      <Footer />
      <StickyApplyBar />
    </main>
  );
};

export default Index;
