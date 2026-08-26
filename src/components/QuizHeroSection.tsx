import { WistiaPlayer } from "@wistia/wistia-player-react";
import ApplicationForm from "@/components/ApplicationForm";

interface QuizHeroSectionProps {
  variant?: "default" | "whop";
}

const QuizHeroSection = ({ variant = "default" }: QuizHeroSectionProps) => {
  const isWhop = variant === "whop";

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
      <div className="container relative z-10 px-4 sm:px-6 pt-2 sm:pt-8 pb-4 sm:pb-8 md:py-10">
        <div className="max-w-3xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-2 sm:mb-3">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              aria-label="Knight Fit - Go to top"
            >
              <img
                src="/Logo.png"
                alt="Knight Fit"
                className="h-28 sm:h-36 md:h-44 lg:h-52 xl:h-56 w-auto object-contain"
              />
            </button>
          </div>
          {/* Pre-headline badge */}
          <div className="flex justify-center mb-3 sm:mb-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-primary/10 border border-primary/30">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-primary uppercase tracking-wider">
                Limited Slots Available
              </span>
            </div>
          </div>

          {/* Main headline — Problem + Solution + Outcome; Proof + Novelty + Objection Removal */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-2 sm:mb-3 animate-slide-up px-2 text-center">
            {isWhop ? (
              <>
                A Method Built Around{" "}
                <span className="text-gradient">Pho, Adobo, and Pad Thai</span>{" "}
                Instead of Cutting Them Out
              </>
            ) : (
              <>
                The <span className="text-gradient">SYSTEM </span> That Drops{" "}
                <span className="text-gradient">15-50 Lbs</span> Of Fat Without Cutting Out{" "}
                <span className="text-gradient">Pho, Adobo, or Pad Thai</span> 
              </>
            )}
          </h1>

          {/* Subheadline — specificity + social proof */}
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-5 sm:mb-6 animate-slide-up px-4 text-center" style={{ animationDelay: "0.2s" }}>
            {isWhop ? (
              <>
                It keeps Larb, Pad Krapow, and the foods you already love on the menu.
                Clients say they&apos;re getting better results than every diet they tried before.
              </>
            ) : (
              <>
                It keeps Larb, Pad Krapow, and the foods you already love on the menu.
                And they&apos;re getting better results than every diet they tried before.
              </>
            )}
          </p>

          {/* VSL */}
          <div className="video-frame w-full max-w-2xl mx-auto mb-6 sm:mb-8 animate-slide-up overflow-hidden rounded-sm border border-border shadow-2xl" style={{ animationDelay: "0.3s" }}>
            <WistiaPlayer mediaId="hbt4xagwap" aspect={1.7777777777777777} />
          </div>

          <div className="animate-slide-up max-w-2xl mx-auto" style={{ animationDelay: "0.4s" }}>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-center mb-6">
              Apply for a <span className="text-primary">Free Consultation Call</span>
            </h2>
            <ApplicationForm variant={variant} />
          </div>
        </div>
      </div>

      {/* Bottom diagonal divider */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 md:h-24 bg-muted diagonal-top" />
    </section>
  );
};

export default QuizHeroSection;

