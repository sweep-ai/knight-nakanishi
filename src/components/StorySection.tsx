import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface StorySectionProps {
  variant?: "default" | "whop";
}

const StorySection = ({ variant = "default" }: StorySectionProps) => {
  const scrollToApply = () => {
    document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const points = [
    "You want to keep eating pho, adobo, pad thai, and family meals",
    "You don't need to be Southeast Asian. The method still works if you just refuse crash diets",
    "You don't have hours a day. Training has to fit a real job and real life",
    "You don't want to restrict your diet into bland chicken and rice",
    "You don't want to skip social events or family dinners to 'stay on track'",
    "You're ready to follow a plan if it's built around your actual week",
  ];

  return (
    <section className="relative py-12 sm:py-16 section-dark">
      <div className="container px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-6 text-center">
            Knight Fit is for you <span className="text-primary">if...</span>
          </h2>
          <ul className="space-y-3 mb-8">
            {points.map((point) => (
              <li key={point} className="flex gap-3 text-sm sm:text-base text-foreground/90">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="text-center">
            <Button variant="cta" size="lg" onClick={scrollToApply} className="font-display w-full sm:w-auto">
              {variant === "whop" ? "Start Your Application" : "Start Your Transformation"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
