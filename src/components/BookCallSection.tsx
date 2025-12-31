import { Button } from "@/components/ui/button";
import { Calendar, Clock, CheckCircle } from "lucide-react";

const BookCallSection = () => {
  const handleBookCall = () => {
    // TODO: Implement booking logic
    // This should open a calendar booking widget (e.g., Calendly, Acuity, etc.)
    // or navigate to a booking page
    window.open("https://calendly.com/knight-nakanishi", "_blank");
  };

  const benefits = [
    "Personalized strategy session",
    "Customized meal plan framework",
    "30-minute implementation call",
    "No commitment required",
  ];

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden bg-primary">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      {/* Diagonal accents */}
      <div className="absolute top-0 left-0 w-full h-1 sm:h-2 bg-accent" />
      <div className="hidden sm:block absolute top-20 left-0 w-1/3 h-0.5 bg-accent/30 -rotate-3" />
      <div className="hidden sm:block absolute bottom-20 right-0 w-1/4 h-0.5 bg-accent/30 rotate-3" />

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-6 sm:mb-8 bg-accent/20 rounded-sm">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
            <span className="text-xs sm:text-sm font-bold text-accent uppercase tracking-wider">
              Ready to Get Started?
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-accent mb-4 sm:mb-6 px-2">
            Book a Free Strategy Call
          </h2>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-primary-foreground/80 mb-8 sm:mb-10 max-w-xl mx-auto px-4">
            Skip the guide. Let's talk directly about your goals and create a personalized plan that fits your lifestyle.
          </p>

          {/* Benefits */}
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-accent/10 rounded-sm"
              >
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                <span className="text-sm sm:text-base text-primary-foreground text-left">
                  {benefit}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Button 
            variant="cta" 
            size="xl" 
            onClick={handleBookCall}
            className="font-display text-base sm:text-lg md:text-xl group w-full sm:w-auto mb-4 sm:mb-6"
          >
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Book Your Free Call
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:rotate-12 transition-transform" />
          </Button>

          {/* Trust line */}
          <p className="text-xs sm:text-sm text-primary-foreground/60 px-4">
            Limited spots available this week. Book now to secure your session.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BookCallSection;

