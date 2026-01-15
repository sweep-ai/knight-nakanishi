import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, BookOpen, Calendar, ChefHat, CheckCircle } from "lucide-react";
import Footer from "@/components/Footer";

const Cookbook = () => {
  const [searchParams] = useSearchParams();
  const goal = searchParams.get("goal") || "lose-fat";
  const experience = searchParams.get("experience") || "beginner";
  const challenge = searchParams.get("challenge") || "time";

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBookCall = () => {
    window.location.href = "https://calendly.com/knightnakanishi/the-next-step-in-your-fitness-journey";
  };

  // Personalized copy based on quiz answers
  const copyVariations: Record<string, {
    heroHeadline: string;
    heroSubheadline: string;
    cookbookTitle: string;
    cookbookDescription: string;
    urgencyLine: string;
    authorityLine: string;
    actionLine: string;
    ctaHeadline: string;
    ctaSubheadline: string;
    finalUrgency: string;
    confirmationLine: string;
  }> = {
    "lose-fat": {
      heroHeadline: "Your Free Fat Loss Cookbook is Waiting",
      heroSubheadline: "50+ recipes that help you lose fat while eating adobo, pho, nasi lemak, and pad thai—no bland meals required.",
      cookbookTitle: "The Southeast Asian Fat Loss Cookbook",
      cookbookDescription: "Proven recipes that fit your macros and your culture. Lose 15-30lbs while keeping your favorite foods on the menu.",
      urgencyLine: "Every recipe in this cookbook has helped real people lose fat without sacrificing flavor or family meals.",
      authorityLine: "I've tested every single recipe with 200+ Southeast Asian clients. These aren't 'healthy' versions—they're optimized versions that actually taste good.",
      actionLine: "Inside, you'll find meal plans, macro breakdowns, and cooking tips that make fat loss feel effortless—not restrictive.",
      ctaHeadline: "Ready to Transform Your Meals?",
      ctaSubheadline: "The cookbook gives you the recipes. A strategy call with me gives you the personalized plan to make them work for YOUR life.",
      finalUrgency: "The cookbook is powerful. But knowing exactly how to implement it for your schedule, your family, and your goals? That's where real results happen.",
      confirmationLine: "Your cookbook is ready below. While you browse the recipes, let's discuss how to make them work for your specific situation.",
    },
    "gain-muscle": {
      heroHeadline: "Your Free Muscle Building Cookbook is Waiting",
      heroSubheadline: "High-protein recipes that help you build muscle while eating the cultural foods you love—no meal prep hell required.",
      cookbookTitle: "The Southeast Asian Muscle Building Cookbook",
      cookbookDescription: "Protein-packed recipes designed for muscle growth. Build lean mass while enjoying your traditional meals.",
      urgencyLine: "Building muscle requires protein, but it doesn't require you to eat like a bodybuilder. These recipes prove it.",
      authorityLine: "I've helped 200+ Southeast Asians build lean muscle while eating pho, adobo, and nasi lemak. The secret? Smart recipe optimization.",
      actionLine: "Inside, you'll find protein targets, meal timing strategies, and recipes that support muscle growth without changing your lifestyle.",
      ctaHeadline: "Ready to Build Your Best Physique?",
      ctaSubheadline: "The cookbook gives you the recipes. A strategy call with me gives you the personalized nutrition plan to maximize your gains.",
      finalUrgency: "The cookbook shows you what to eat. Personalized coaching shows you when, how much, and how to adapt it to your training schedule.",
      confirmationLine: "Your cookbook is ready below. Let's discuss how to optimize these recipes for your specific muscle-building goals.",
    },
    "body-confidence": {
      heroHeadline: "Your Free Confidence Cookbook is Waiting",
      heroSubheadline: "Recipes and strategies that help you feel strong, confident, and proud in your own body—while eating the foods that connect you to your culture.",
      cookbookTitle: "The Southeast Asian Confidence Cookbook",
      cookbookDescription: "A holistic approach to feeling your best. Recipes that nourish your body and honor your heritage.",
      urgencyLine: "Confidence comes from feeling strong, capable, and in control. These recipes help you build that foundation—one meal at a time.",
      authorityLine: "I've helped 200+ people transform not just their bodies, but their relationship with food and themselves. The recipes inside reflect that journey.",
      actionLine: "Inside, you'll find more than recipes—you'll find a framework for building confidence through food, movement, and mindset.",
      ctaHeadline: "Ready to Feel Your Best?",
      ctaSubheadline: "The cookbook gives you the foundation. A strategy call with me helps you build a personalized plan that addresses your unique journey.",
      finalUrgency: "The cookbook is a starting point. Personalized support helps you navigate the deeper work of building lasting confidence and self-trust.",
      confirmationLine: "Your cookbook is ready below. Let's discuss how to create a plan that addresses both your physical and mental transformation.",
    },
    "healthy-traditional": {
      heroHeadline: "Your Free Health Optimization Cookbook is Waiting",
      heroSubheadline: "Recipes that help you achieve optimal health while maintaining your cultural food traditions—the best of both worlds.",
      cookbookTitle: "The Southeast Asian Health Optimization Cookbook",
      cookbookDescription: "Science-backed recipes that optimize your health without compromising your cultural identity. Eat traditional, feel optimal.",
      urgencyLine: "Optimal health doesn't mean abandoning your heritage. These recipes prove you can have both—vibrant health and cultural connection.",
      authorityLine: "I've spent years optimizing traditional Southeast Asian recipes for maximum health benefits. Every recipe balances nutrition science with cultural authenticity.",
      actionLine: "Inside, you'll find recipes optimized for energy, longevity, and performance—all while keeping the flavors and traditions you love.",
      ctaHeadline: "Ready to Optimize Your Health?",
      ctaSubheadline: "The cookbook gives you the recipes. A strategy call with me helps you create a personalized plan that optimizes your health for the long term.",
      finalUrgency: "The cookbook provides the foundation. Personalized guidance helps you adapt it to your specific health goals, lifestyle, and preferences.",
      confirmationLine: "Your cookbook is ready below. Let's discuss how to optimize these recipes for your specific health goals and lifestyle.",
    },
  };

  const currentCopy = copyVariations[goal] || copyVariations["lose-fat"];

  // Personalized pain points and solutions based on quiz answers
  const personalizationContent: Record<string, {
    painPoints: string[];
    solutions: string[];
    headline: string;
    subheadline: string;
  }> = {
    "lose-fat": {
      headline: "Make This Cookbook Work For YOUR Life",
      subheadline: "The recipes are powerful, but your situation is unique. Let's personalize them to fit exactly what you need.",
      painPoints: experience === "beginner" 
        ? ["You're new to tracking macros and don't know where to start", "Family dinners make it hard to stick to a plan", "You're not sure how to adapt recipes for your schedule"]
        : experience === "tried-before"
        ? ["Past attempts failed because they didn't fit your lifestyle", "You know what to do but can't make it stick with family meals", "Generic meal plans don't account for your cultural foods"]
        : ["You know the basics but need help optimizing for your goals", "Balancing macros with traditional meals feels complicated", "You want results faster with a personalized approach"],
      solutions: challenge === "time"
        ? ["Custom meal prep strategies that fit your busy schedule", "Quick recipe modifications for your family dinners", "A plan that works with your work hours and lifestyle"]
        : challenge === "family"
        ? ["How to adapt these recipes for family meals everyone will love", "Strategies for eating differently without cooking separate meals", "Ways to make traditional dishes work for your goals"]
        : challenge === "motivation"
        ? ["Accountability and support to keep you consistent", "A personalized plan that feels sustainable, not restrictive", "Clear milestones and strategies to maintain momentum"]
        : ["Step-by-step guidance on implementing these recipes", "Answers to your specific questions about macros and timing", "A roadmap tailored to your exact starting point"],
    },
    "gain-muscle": {
      headline: "Optimize These Recipes For YOUR Muscle Goals",
      subheadline: "Building muscle requires precision. Let's customize these recipes to maximize your gains.",
      painPoints: experience === "beginner"
        ? ["You don't know how much protein you actually need", "Traditional meals don't seem high enough in protein", "You're unsure about meal timing for muscle growth"]
        : experience === "tried-before"
        ? ["Previous plans required eating like a bodybuilder", "You couldn't maintain high protein with cultural foods", "Generic plans didn't account for your training schedule"]
        : ["You need help optimizing protein intake with these recipes", "Meal timing strategies for your specific workout schedule", "How to adjust portions for your current body composition"],
      solutions: challenge === "time"
        ? ["Protein-rich meal prep that fits your schedule", "Quick high-protein modifications for traditional dishes", "Strategies for hitting protein goals around your work hours"]
        : challenge === "family"
        ? ["How to boost protein in family meals everyone enjoys", "Ways to add protein without changing the whole meal", "Family-friendly high-protein versions of your favorites"]
        : challenge === "motivation"
        ? ["A plan that makes muscle building feel achievable", "Support to stay consistent with your protein goals", "Clear progress tracking to maintain motivation"]
        : ["Exact protein targets for your body and goals", "Meal timing strategies for optimal muscle growth", "How to track and adjust these recipes for your needs"],
    },
    "body-confidence": {
      headline: "Build Confidence Through Personalized Support",
      subheadline: "These recipes are a foundation. Let's create a plan that addresses your unique journey.",
      painPoints: experience === "beginner"
        ? ["You're starting your confidence journey and need guidance", "Past negative experiences with food make this feel scary", "You're not sure how to build a healthy relationship with food"]
        : experience === "tried-before"
        ? ["Previous attempts left you feeling more discouraged", "You've tried diets that made you feel worse about yourself", "You need a different approach that honors your body"]
        : ["You want deeper support beyond just recipes", "Building confidence requires more than meal plans", "You need help navigating the mental and emotional aspects"],
      solutions: challenge === "time"
        ? ["A sustainable approach that fits your life", "Strategies for building confidence without overwhelming yourself", "A plan that works with your schedule and commitments"]
        : challenge === "family"
        ? ["How to build confidence while honoring family traditions", "Ways to feel good about food choices in social settings", "Strategies for maintaining confidence during family meals"]
        : challenge === "motivation"
        ? ["Ongoing support to maintain your confidence journey", "Accountability that feels encouraging, not judgmental", "A plan that builds self-trust over time"]
        : ["Personalized guidance for your unique situation", "Support for both physical and mental transformation", "A holistic approach that addresses your specific needs"],
    },
    "healthy-traditional": {
      headline: "Optimize These Recipes For YOUR Health Goals",
      subheadline: "Optimal health looks different for everyone. Let's personalize these recipes to your specific needs.",
      painPoints: experience === "beginner"
        ? ["You're not sure which recipes fit your health goals", "You want to optimize health but don't know where to start", "Balancing traditional foods with health feels confusing"]
        : experience === "tried-before"
        ? ["Previous 'healthy' versions didn't taste good", "You've tried optimizing but didn't see the results you wanted", "Generic health advice doesn't account for your preferences"]
        : ["You need help optimizing for your specific health concerns", "You want to maximize benefits while keeping flavors", "You need guidance on adapting recipes for your goals"],
      solutions: challenge === "time"
        ? ["Health-optimized meal prep for your schedule", "Quick modifications that boost nutrition without extra time", "Strategies for maintaining health goals with a busy life"]
        : challenge === "family"
        ? ["How to optimize family meals for everyone's health", "Ways to boost nutrition without changing flavors", "Family-friendly health improvements everyone will enjoy"]
        : challenge === "motivation"
        ? ["A sustainable approach to optimal health", "Support to maintain healthy habits long-term", "Clear benefits to keep you motivated"]
        : ["Personalized nutrition strategies for your goals", "Specific modifications based on your health priorities", "A roadmap for optimizing these recipes for your needs"],
    },
  };

  const personalization = personalizationContent[goal] || personalizationContent["lose-fat"];

  const features = [
    {
      number: "01",
      title: "50+ Optimized Recipes",
      description: "Traditional Southeast Asian dishes optimized for your goals—same flavors, better macros",
    },
    {
      number: "02",
      title: "Complete Macro Breakdowns",
      description: "Every recipe includes protein, carbs, and fats so you can track without guessing",
    },
    {
      number: "03",
      title: "Meal Planning Templates",
      description: "Weekly meal plans that fit your schedule and family dinners",
    },
    {
      number: "04",
      title: "Cooking Tips & Swaps",
      description: "Simple tweaks to make your favorite dishes work for your goals",
    },
    {
      number: "05",
      title: "Restaurant Guide",
      description: "How to order at your favorite spots without derailing progress",
    },
    {
      number: "06",
      title: "Shopping Lists",
      description: "Pre-made grocery lists organized by meal plan to save you time",
    },
  ];

  const testimonials = [
    { name: "Maria, 27", location: "Philippines", result: "Lost 28lbs using the adobo and pancit recipes" },
    { name: "Duc, 31", location: "Vietnam", result: "Built muscle eating pho and banh mi from the cookbook" },
    { name: "Siti, 25", location: "Malaysia", result: "Lost 18lbs while still eating rendang weekly" },
  ];

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-8 sm:py-12 md:py-16 section-dark">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />
        
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 border border-primary/30 bg-primary/10 rounded-sm">
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              <span className="text-xs sm:text-sm font-bold text-primary uppercase tracking-wider">
                Free Cookbook
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight sm:leading-none mb-3 sm:mb-4 px-2">
              {goal === "lose-fat" && (
                <>Your Free <span className="text-gradient">Fat Loss Cookbook</span> is <span className="text-gradient">Waiting</span></>
              )}
              {goal === "gain-muscle" && (
                <>Your Free <span className="text-gradient">Muscle Building Cookbook</span> is <span className="text-gradient">Waiting</span></>
              )}
              {goal === "body-confidence" && (
                <>Your Free <span className="text-gradient">Confidence Cookbook</span> is <span className="text-gradient">Waiting</span></>
              )}
              {goal === "healthy-traditional" && (
                <>Your Free <span className="text-gradient">Health Optimization Cookbook</span> is <span className="text-gradient">Waiting</span></>
              )}
              {!goal || (goal !== "lose-fat" && goal !== "gain-muscle" && goal !== "body-confidence" && goal !== "healthy-traditional") && (
                <>Your Free <span className="text-gradient">Cookbook</span> is <span className="text-gradient">Waiting</span></>
              )}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-4 sm:mb-6 px-4">
              {currentCopy.heroSubheadline}
            </p>

            {/* Personalized confirmation line */}
            <div className="max-w-2xl mx-auto mb-4 sm:mb-6 px-4">
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-medium">
                {currentCopy.confirmationLine}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PDF Cookbook Embed Section - Above the fold */}
      <section className="py-8 sm:py-12 md:py-16 section-light">
        <div className="container px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-4 sm:mb-6 md:mb-8">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-secondary-foreground mb-2 sm:mb-3 px-2">
                Your <span className="text-primary">Free Resource</span>  is Below
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-xl mx-auto px-4">
                Browse the recipes below or download to keep forever
              </p>
            </div>

            {/* Book a Call CTA */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <Button
                variant="hero"
                size="lg"
                onClick={handleBookCall}
                className="font-display text-sm sm:text-base"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Book a Strategy Call
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </div>

            {/* PDF Embed */}
            <div className="bg-card rounded-sm border border-border shadow-2xl overflow-hidden">
              <div className="relative w-full" style={{ minHeight: "500px", height: "70vh" }}>
                <iframe
                  src="/SEA RECIPES.pdf"
                  className="w-full h-full border-0"
                  title="Southeast Asian Fitness Cookbook"
                  style={{ minHeight: "500px" }}
                />
              </div>
            </div>

            {/* Mobile fallback message */}
            <div className="mt-3 sm:mt-4 text-center">
              <p className="text-xs sm:text-sm text-muted-foreground px-4">
                Having trouble viewing? <a href="/SEA RECIPES.pdf" download className="text-primary hover:underline">Download the PDF</a> to view on your device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Personalization CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 section-dark">
        <div className="container px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-3 sm:mb-4 px-2">
                {personalization.headline}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                {personalization.subheadline}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
              {/* Pain Points */}
              <div className="bg-card rounded-sm border border-border p-5 sm:p-6">
                <h3 className="font-display text-xl sm:text-2xl text-foreground mb-4 sm:mb-5">
                  Your Specific Challenges
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {personalization.painPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions */}
              <div className="bg-primary/10 rounded-sm border border-primary/30 p-5 sm:p-6">
                <h3 className="font-display text-xl sm:text-2xl text-foreground mb-4 sm:mb-5">
                  How We'll Personalize It
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {personalization.solutions.map((solution, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                        {solution}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Button
                variant="hero"
                size="xl"
                onClick={handleBookCall}
                className="font-display text-base sm:text-lg md:text-xl w-full sm:w-auto mb-3 sm:mb-4"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Book Your Strategy Call
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
              <p className="text-xs sm:text-sm text-muted-foreground px-4">
                Get personalized guidance to make these recipes work for YOUR life, YOUR schedule, and YOUR goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 section-light">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-secondary-foreground mb-3 sm:mb-4 px-2">
              Real Results. <span className="text-primary">Real Recipes.</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-4 mt-2 mb-4 sm:mb-6">
              People are getting results using these exact recipes.
            </p>
            {/* Personalized authority line */}
            <p className="text-sm sm:text-base text-secondary-foreground/80 max-w-2xl mx-auto px-4">
              {currentCopy.authorityLine}
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
          {/* Personalized action line */}
          <p className="text-sm sm:text-base text-primary-foreground/90 mb-4 sm:mb-6 max-w-2xl mx-auto px-4">
            {currentCopy.actionLine}
          </p>
          <p className="text-sm sm:text-base text-primary-foreground/70 mb-6 sm:mb-8 max-w-lg mx-auto px-4 italic">
            {currentCopy.finalUrgency}
          </p>
          <Button 
            variant="cta" 
            size="xl" 
            onClick={handleBookCall}
            className="font-display text-base sm:text-lg md:text-xl w-full sm:w-auto"
          >
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Book Your Strategy Call
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
          </Button>
          <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-primary-foreground/60 px-4">
            Join 200+ Southeast Asians who transformed with personalized coaching support
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Cookbook;

