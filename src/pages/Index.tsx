import { useEffect } from "react";
import QuizHeroSection from "@/components/QuizHeroSection";
import StorySection from "@/components/StorySection";
import AuthoritySection from "@/components/AuthoritySection";
import ScrollingBanner from "@/components/ScrollingBanner";
import TestimonialVideosSection from "@/components/TestimonialVideosSection";
import Footer from "@/components/Footer";
import StickyApplyBar from "@/components/StickyApplyBar";
import { preloadCalBooking } from "@/components/CalBookingEmbed";
import { funnelEvent } from "@/config/funnel";
import { trackMeta } from "@/lib/metaPixel";
import { getSessionId, trackEvent } from "@/lib/sweep";

const Index = () => {
  useEffect(() => {
    trackMeta("PageView");
    preloadCalBooking();
    const sessionId = getSessionId();
    void trackEvent(funnelEvent.quizPageView, { page_id: "intro" }, `${funnelEvent.quizPageView}_intro_${sessionId}`);
  }, []);

  return (
    <main className="overflow-hidden">
      <QuizHeroSection />
      {/* <ScrollingBanner /> */}
      <TestimonialVideosSection />
      <StorySection />
      <AuthoritySection />
      <Footer />
      <StickyApplyBar />
    </main>
  );
};

export default Index;
