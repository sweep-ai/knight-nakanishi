import { useEffect } from "react";
import CalBookingEmbed from "@/components/CalBookingEmbed";
import Footer from "@/components/Footer";
import ScrollingBanner from "@/components/ScrollingBanner";
import { funnelEvent } from "@/config/funnel";
import { replayMeta } from "@/lib/metaPixel";
import { getSessionId, trackEvent } from "@/lib/sweep";

const BookingPage = () => {
  useEffect(() => {
    replayMeta("Lead");
    const sessionId = getSessionId();
    void trackEvent(
      funnelEvent.bookingPageView,
      { page_id: "booking" },
      `${funnelEvent.bookingPageView}_${sessionId}`
    );
  }, []);

  return (
    <main className="section-dark min-h-screen">
      <div className="container px-4 sm:px-6 py-10 sm:py-14">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">You qualified</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl mb-3">
            Book Your Gameplan call
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            On this complimentary call we&apos;ll build you a custom plan around the your real circumstances and the foods you already eat.
          </p>
        </div>
        <div className="max-w-3xl mx-auto w-full">
          <CalBookingEmbed />
        </div>
      </div>
      <ScrollingBanner />
      <Footer />
    </main>
  );
};

export default BookingPage;
