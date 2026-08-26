import { useEffect } from "react";
import QuizHeroSection from "@/components/QuizHeroSection";
import StorySection from "@/components/StorySection";
import AuthoritySection from "@/components/AuthoritySection";
import ScrollingBanner from "@/components/ScrollingBanner";
import TestimonialVideosSection from "@/components/TestimonialVideosSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import StickyApplyBar from "@/components/StickyApplyBar";
import { trackEvent } from "@/lib/sweep";

const Index = () => {
  useEffect(() => {
    void trackEvent("quiz_page_view", { page_id: "intro" });
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
