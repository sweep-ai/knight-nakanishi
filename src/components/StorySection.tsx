import { Button } from "@/components/ui/button";
import { Heart, AlertTriangle, Flame } from "lucide-react";

const StorySection = () => {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const storyCards = [
    {
      icon: Heart,
      age: "Age 10",
      title: "The Struggle",
      text: "At 10 years old, my family faced hard times. Football became my escape—the one place where I could channel everything I was feeling into something powerful.",
      accent: "primary",
    },
    {
      icon: AlertTriangle,
      age: "High School",
      title: "The Roadblock",
      text: "Just when I was hitting my stride, anhidrosis diagnosis ended my football career. My body couldn't regulate heat—the thing I loved most was taken away.",
      accent: "accent",
    },
    {
      icon: Flame,
      age: "Present Day",
      title: "The Breakthrough",
      text: "Fitness saved my life. It gave me purpose again. Now I help people like you—Southeast Asians who've been told they need to eat 'clean' to get results. That's BS.",
      accent: "primary",
    },
  ];

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 section-dark diagonal-divider">
      <div className="container px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4 px-2">
            I Know What It's Like to{" "}
            <span className="text-primary">Feel Stuck</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-primary to-accent mx-auto" />
        </div>

        {/* Timeline cards */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto mb-8 sm:mb-10 md:mb-12">
          {storyCards.map((card, index) => (
            <div
              key={card.title}
              className="relative group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              
              <div className="relative card-glow p-5 sm:p-6 lg:p-8 h-full">
                {/* Age badge */}
                <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 mb-3 sm:mb-4 bg-muted rounded-sm">
                  <card.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${card.accent === 'primary' ? 'text-primary' : 'text-accent'}`} />
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {card.age}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4">
                  {card.title}
                </h3>

                {/* Text */}
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {card.text}
                </p>

                {/* Connection line (hidden on mobile, visible on desktop) */}
                {index < storyCards.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 lg:-right-5 w-8 lg:w-10 h-0.5 bg-gradient-to-r from-primary to-accent" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center px-4">
          <Button 
            variant="cta" 
            size="lg" 
            onClick={scrollToForm}
            className="font-display text-base sm:text-lg w-full sm:w-auto"
          >
            See How I Can Help You
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
