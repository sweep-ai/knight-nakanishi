import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Play, Star } from "lucide-react";
import Footer from "@/components/Footer";

const FatLossFormula = () => {
  const [searchParams] = useSearchParams();
  const goal = searchParams.get("goal") || "fat-loss";

  // Scroll to top when component mounts or goal changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [goal]);

  // Personalized copy based on goal - focused on implementation call
  const copyVariations = {
    "fat-loss": {
      heroHeadline: "Your Fat Formula Guide is Waiting in Your Inbox",
      heroSubheadline: "You've got the framework. Now let's make it work for YOUR life, YOUR schedule, and YOUR favorite foods.",
      videoLabel: "Watch this to understand why personalization makes all the difference",
      urgencyLine: "The guide gives you the blueprint. But your situation is unique—your family dinners, your work schedule, your specific challenges.",
      authorityLine: "I've helped 200+ Southeast Asians personalize this exact framework to their lives. The difference between those who succeed and those who don't? Implementation support.",
      actionLine: "In a 30-minute call, we'll map out exactly how to adapt these strategies to your daily routine—so you're not guessing, you're executing.",
      ctaHeadline: "Let's Make This Work For You",
      ctaSubheadline: "Book a free implementation call with Knight. We'll personalize the guide to your exact situation and create your action plan.",
      finalUrgency: "The guide is powerful on its own. But with personalized implementation, you'll see results 3x faster. Book your call and let's get you there.",
      confirmationLine: "Your guide has been sent to your email. While you review it, let's strategize how to make it work for you.",
    },
    "muscle-building": {
      heroHeadline: "Your Nutrition Guide is in Your Inbox",
      heroSubheadline: "You have the framework. Now let's customize it to YOUR body, YOUR goals, and YOUR cultural foods.",
      videoLabel: "Why personalized nutrition beats generic meal plans every time",
      urgencyLine: "Generic nutrition plans assume you can meal prep for hours. But you have family dinners, work commitments, and a life to live.",
      authorityLine: "I've coached 200+ Southeast Asians to build lean muscle while eating the foods they love. The secret? Personalizing the framework to fit their reality.",
      actionLine: "In our call, we'll adapt the nutrition strategies to your exact needs—your current body composition, your training schedule, your family meals.",
      ctaHeadline: "Let's Build Your Personalized Plan",
      ctaSubheadline: "Book a free call with Knight. We'll customize the guide to your specific goals and create a plan that actually fits your life.",
      finalUrgency: "The guide gives you the foundation. Personalized implementation gives you the results. Book your call and let's build your best physique.",
      confirmationLine: "Your guide is waiting in your email. Let's discuss how to adapt it to your specific muscle-building goals.",
    },
    "sustainable-habits": {
      heroHeadline: "Your Habit System is in Your Inbox",
      heroSubheadline: "You have the framework. Now let's tailor it to YOUR lifestyle, YOUR family dynamics, and YOUR unique challenges.",
      videoLabel: "How personalized habit design creates lasting change",
      urgencyLine: "Generic habit systems don't account for your family's eating schedule, your cultural celebrations, or your specific obstacles.",
      authorityLine: "After helping 200+ people create lasting change, I know that sustainability comes from personalization—not from following someone else's template.",
      actionLine: "In our call, we'll identify your specific barriers and design habits that work with your culture, not against it.",
      ctaHeadline: "Let's Design Your Sustainable System",
      ctaSubheadline: "Book a free implementation call with Knight. We'll personalize the guide to your life and create habits that actually stick.",
      finalUrgency: "The guide shows you the system. Personalized implementation shows you how to make it yours. Book your call and let's build lasting change.",
      confirmationLine: "Your guide has been sent. Let's strategize how to adapt these habits to your unique situation and lifestyle.",
    },
  };

  const currentCopy = copyVariations[goal as keyof typeof copyVariations] || copyVariations["fat-loss"];

  const features = [
    {
      number: "01",
      title: "The Cultural Macro Method",
      description: "How to fit sisig, laksa, banh xeo, and pad krapow into your plan without sacrificing results",
    },
    {
      number: "02",
      title: "The 3-Meal Framework",
      description: "Eat breakfast, lunch, dinner (family style) and still make progress—no meal prep required",
    },
    {
      number: "03",
      title: "Restaurant Survival Guide",
      description: "How to eat at your favorite spots without derailing progress or feeling guilty",
    },
    {
      number: "04",
      title: "The Rice Rule",
      description: "Yes, you can eat rice every day and still reach your goals. Here's exactly how.",
    },
    {
      number: "05",
      title: "The 48-Hour Reset",
      description: "What to do after a big family feast or celebration meal—so one meal doesn't become a week of setbacks",
    },
    {
      number: "06",
      title: "Macro-Friendly Swaps",
      description: "Simple tweaks to make your favorite dishes work for your goals—without changing the flavor you love",
    },
  ];

  const testimonials = [
    { name: "Maria, 27", location: "Philippines", result: "Lost 28lbs in 12 weeks eating pancit twice a week" },
    { name: "Duc, 31", location: "Vietnam", result: "Dropped 22lbs while still enjoying pho every weekend" },
    { name: "Siti, 25", location: "Malaysia", result: "Lost 18lbs eating rendang at family dinners" },
  ];

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center section-dark">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />
        
        <div className="container relative z-10 px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-6 sm:mb-8 border border-primary/30 bg-primary/10 rounded-sm">
              <span className="text-xs sm:text-sm font-bold text-primary uppercase tracking-wider">
                Guide Sent ✓
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight sm:leading-none mb-4 sm:mb-6 px-2">
              {goal === "fat-loss" && (
                <>Your Guide is Waiting in Your <span className="text-gradient">Inbox</span></>
              )}
              {goal === "muscle-building" && (
                <>Your Nutrition Guide is in Your <span className="text-gradient">Inbox</span></>
              )}
              {goal === "sustainable-habits" && (
                <>Your Habit System is in Your <span className="text-gradient">Inbox</span></>
              )}
              {!goal || (goal !== "fat-loss" && goal !== "muscle-building" && goal !== "sustainable-habits") && (
                <>Your Guide is Waiting in Your <span className="text-gradient">Inbox</span></>
              )}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 px-4">
              {currentCopy.heroSubheadline}
            </p>

            {/* VSL Placeholder */}
            <div className="relative aspect-video max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 px-4 bg-card rounded-sm overflow-hidden border border-border">
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 sm:w-20 sm:h-20 bg-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 text-accent ml-1" fill="currentColor" />
                </button>
              </div>
              <p className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 text-center text-xs sm:text-sm text-muted-foreground">
                {currentCopy.videoLabel}
              </p>
            </div>

            {/* Confirmation & Transition Section */}
            <div className="max-w-2xl mx-auto mb-6 sm:mb-8 space-y-3 sm:space-y-4 px-4">
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-medium">
                {currentCopy.confirmationLine}
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {currentCopy.urgencyLine}
              </p>
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                {currentCopy.authorityLine}
              </p>
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed italic">
                {currentCopy.actionLine}
              </p>
            </div>

            <Button variant="hero" size="xl" className="font-display text-base sm:text-lg md:text-xl w-full sm:w-auto mb-3 sm:mb-4">
              Book an Implementation Call
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>

            <p className="text-xs sm:text-sm text-muted-foreground px-4">
              Strategize with Knight how to personalize the guide to your exact needs.
            </p>
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 section-light">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-secondary-foreground mb-3 sm:mb-4 px-2">
              What's <span className="text-primary">In Your Guide</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto px-4 mt-2">
              Six proven frameworks that work with your culture, not against it. Now let's make them work for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {features.map((feature) => (
              <div
                key={feature.number}
                className="p-5 sm:p-6 bg-background rounded-sm shadow-lg hover:shadow-xl transition-shadow"
              >
                <span className="font-display text-3xl sm:text-4xl text-primary/30">
                  {feature.number}
                </span>
                <h3 className="font-display text-xl sm:text-2xl text-foreground mt-2 mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 section-dark">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4 px-2">
              They Did It. <span className="text-primary">So Can You.</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-4 mt-2">
              Real people. Real food. Real results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="p-5 sm:p-6 bg-card rounded-sm border border-border"
              >
                <div className="flex gap-1 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="font-bold text-sm sm:text-base text-foreground mb-2">
                  {testimonial.result}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  — {testimonial.name}, {testimonial.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-primary">
        <div className="container px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-accent mb-4 sm:mb-6 px-2">
            {currentCopy.ctaHeadline}
          </h2>
          <p className="text-sm sm:text-base text-primary-foreground/70 mb-6 sm:mb-8 max-w-lg mx-auto px-4 italic">
            {currentCopy.finalUrgency}
          </p>
          <Button variant="cta" size="xl" className="font-display text-base sm:text-lg md:text-xl w-full sm:w-auto">
            Book an Implementation Call
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-primary-foreground/60 px-4">
            Join 200+ Southeast Asians who transformed with personalized implementation support
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default FatLossFormula;
