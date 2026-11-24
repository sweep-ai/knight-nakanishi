import { useEffect, useRef, useState, type ReactNode } from "react";
import { Volume2 } from "lucide-react";
import { WistiaPlayer } from "@wistia/wistia-player-react";
import ApplicationForm from "@/components/ApplicationForm";
import { useVideoWatch } from "@/hooks/useVideoWatch";

interface QuizHeroSectionProps {
  variant?: "default" | "whop";
  /** Overrides the default headline (used by audience landing pages). */
  headline?: ReactNode;
  /** Overrides the default subheadline (used by audience landing pages). */
  subheadline?: ReactNode;
}

const QuizHeroSection = ({ variant = "default", headline, subheadline }: QuizHeroSectionProps) => {
  const isWhop = variant === "whop";
  const videoRef = useRef<HTMLVideoElement>(null);
  const [coverOn, setCoverOn] = useState(true);
  useVideoWatch(videoRef, !isWhop);

  useEffect(() => {
    if (isWhop) return;
    const video = videoRef.current;
    if (!video) return;
    const start = () => {
      video.muted = true;
      void video.play().catch(() => {});
    };
    start();
    video.addEventListener("canplay", start);
    return () => video.removeEventListener("canplay", start);
  }, [isWhop]);

  const unmute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    void video.play();
    setCoverOn(false);
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
      <div className="container relative z-10 px-4 sm:px-6 pt-2 sm:pt-8 pb-4 sm:pb-8 md:py-10">
        <div className="max-w-3xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center -mb-4 sm:-mb-6 md:-mb-8 lg:-mb-9 xl:-mb-10">
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
          {/* Main headline — Problem + Solution + Outcome; Proof + Novelty + Objection Removal */}
          <h1 className="font-display text-[1.9rem] sm:text-[3.25rem] md:text-[4.25rem] lg:text-[4.75rem] leading-[1.05] mb-4 sm:mb-5 animate-slide-up px-1 text-center max-w-[24ch] mx-auto">
            {headline ?? (isWhop ? (
              <>
                A Method Built Around{" "}
                <span className="text-gold">Pho, Adobo, and Pad Thai</span>{" "}
                Instead of Cutting Them Out
              </>
            ) : (
              <>
                <span className="text-gold">Southeast Asians</span> drop{" "}
                <span className="text-gold whitespace-nowrap">25+ lbs</span> without sacrificing their culture or food
              </>
            ))}
          </h1>

          {/* Subheadline — specificity + social proof */}
          <p className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-6 sm:mb-8 animate-slide-up px-4 text-center leading-relaxed" style={{ animationDelay: "0.2s" }}>
            {subheadline ?? (isWhop ? (
              <>
                Every diet told you to stop eating rice. I build your plan around pho, larb, tinola and whatever's on the table at Sunday dinner, so you're not stuck choosing between your goals and your family.
              </>
            ) : (
              <>
                Every program said you can’t prioritize your health without sacrificing family, food, or tradition. Instead we build your plan around pho, adobo, pad Thai and everything else you thought you needed sacrifice. See how ↓
              </>
            ))}
          </p>

          {/* VSL */}
          <div className="video-frame relative w-full max-w-2xl mx-auto mb-6 sm:mb-8 animate-slide-up overflow-hidden rounded-sm border border-border shadow-2xl aspect-video bg-black" style={{ animationDelay: "0.3s" }}>
            {isWhop ? (
              <WistiaPlayer playerColor="CCAA66" mediaId="hbt4xagwap" aspect={1.7777777777777777} />
            ) : (
              <>
                <video
                  ref={videoRef}
                  src="/vsl.mp4"
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                />
                {coverOn && (
                  <button
                    type="button"
                    onClick={unmute}
                    className="absolute inset-0 z-10 flex items-center justify-center bg-primary/55 px-3 sm:px-6"
                    aria-label="Your video is playing. Click to unmute."
                  >
                    <span className="flex w-full max-w-xl flex-col items-center justify-center gap-3 rounded-[1.35rem] border-[3px] border-white px-5 py-7 sm:gap-4 sm:px-8 sm:py-9 text-white">
                      <Volume2 className="h-12 w-12 sm:h-14 sm:w-14" strokeWidth={2.25} aria-hidden />
                      <span className="text-center text-xl sm:text-2xl md:text-3xl font-bold uppercase leading-[1.15] tracking-wide">
                        Your video is playing
                        <br />
                        Click to unmute
                      </span>
                    </span>
                  </button>
                )}
              </>
            )}
          </div>

          <div className="animate-slide-up max-w-2xl mx-auto" style={{ animationDelay: "0.4s" }}>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-center mb-6 leading-[1.04]">
             APPLY HERE<span className="text-gold"> In 2 Minutes</span>
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

