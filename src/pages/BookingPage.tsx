import { useEffect } from "react";
import GhlBookingEmbed from "@/components/GhlBookingEmbed";
import Footer from "@/components/Footer";
import ScrollingBanner from "@/components/ScrollingBanner";
import { trackEvent } from "@/lib/sweep";

const BookingPage = () => {
  useEffect(() => {
    void trackEvent("quiz_page_view", { page_id: "booking" });
  }, []);

  return (
    <main className="section-dark min-h-screen">
      <div className="container px-4 sm:px-6 py-10 sm:py-14">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">You qualified</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl mb-3">
            Book your free strategy call
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Pick a time. We&apos;ll build a plan around the foods you already eat.
          </p>
        </div>
        <div className="max-w-3xl mx-auto w-full">
          <GhlBookingEmbed />
        </div>
      </div>
      <ScrollingBanner />
      <Footer />
    </main>
  );
};

export default BookingPage;
