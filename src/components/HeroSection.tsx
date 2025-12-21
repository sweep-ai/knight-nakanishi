import { Button } from "@/components/ui/button";
import { ArrowDown, Play } from "lucide-react";

const HeroSection = () => {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-dark">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
      
      {/* Diagonal accent lines - hidden on mobile */}
      <div className="hidden md:block absolute top-0 right-0 w-1/2 h-full opacity-10">
        <div className="absolute top-20 right-20 w-96 h-1 bg-primary rotate-45" />
        <div className="absolute top-40 right-10 w-64 h-1 bg-accent rotate-45" />
        <div className="absolute bottom-40 right-32 w-80 h-1 bg-primary rotate-45" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 py-6 sm:py-8 md:py-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Pre-headline badge */}
          <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 mb-3 sm:mb-4 border border-primary/30 bg-primary/10 rounded-sm animate-fade-in">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              100+ Clients Transformed
            </span>
          </div>

          {/* Main headline */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-2 sm:mb-3 animate-slide-up px-2">
            Don't Choose Between{" "}
            <span className="text-gradient">Your Culture</span> and{" "}
            <span className="text-gradient">Your Goals</span>
          </h1>

          {/* Subheadline */}
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-3 sm:mb-4 animate-slide-up px-4" style={{ animationDelay: "0.2s" }}>
            Get lean, strong, and confident while still eating adobo, pho, nasi lemak, and pad thai. 
            I'll show you how 200+ Southeast Asians transformed their bodies without giving up the foods they love.
          </p>

          {/* VSL Video Placeholder */}
          <div className="animate-slide-up mt-3 sm:mt-4 max-w-2xl mx-auto px-4" style={{ animationDelay: "0.4s" }}>
            <div className="relative aspect-video bg-card border-2 border-primary/30 rounded-sm overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors">
              {/* Video placeholder background */}
              <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-background" />
              
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-primary/30">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground ml-1" fill="currentColor" />
                </div>
              </div>
              
              {/* Video label */}
              <div className="absolute bottom-1.5 sm:bottom-2 left-2 sm:left-3 right-2 sm:right-3">
                <p className="text-[10px] sm:text-xs text-muted-foreground text-center">
                  Watch: How 200+ Southeast Asians Transformed Without Giving Up Their Favorite Foods
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="animate-slide-up mt-3 sm:mt-4 px-4" style={{ animationDelay: "0.6s" }}>
            <Button 
              variant="hero" 
              size="xl" 
              onClick={scrollToForm}
              className="font-display text-sm sm:text-base md:text-lg w-full sm:w-auto"
            >
              Start Your Transformation
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute -bottom-8 sm:-bottom-12 md:-bottom-16 left-1/2 -translate-x-1/2 animate-bounce">
            <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Bottom diagonal divider */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 md:h-24 bg-muted diagonal-top" />
    </section>
  );
};

export default HeroSection;
