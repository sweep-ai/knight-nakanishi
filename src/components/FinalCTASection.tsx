import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

const FinalCTASection = () => {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

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
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
            <span className="text-xs sm:text-sm font-bold text-accent uppercase tracking-wider">
              Limited Spots Available
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-accent mb-4 sm:mb-6 px-2">
            Stop Waiting. Start Winning.
          </h2>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-primary-foreground/80 mb-8 sm:mb-10 max-w-xl mx-auto px-4">
            Get your personalized transformation plan—designed around YOUR food, YOUR schedule, YOUR goals.
          </p>

          {/* CTA Button */}
          <Button 
            variant="cta" 
            size="xl" 
            onClick={scrollToForm}
            className="font-display text-base sm:text-lg md:text-xl group w-full sm:w-auto"
          >
            Get My Plan Now
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Trust line */}
          <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-primary-foreground/60 px-4">
            Join 200+ Southeast Asians who transformed without giving up their culture
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
