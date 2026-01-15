import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, ArrowDown, Loader2, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface QuizAnswers {
  goal: string;
  experience: string;
  biggestChallenge: string;
}

const QuizHeroSection = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<"quiz" | "form">("quiz");
  const [quizStep, setQuizStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answers, setAnswers] = useState<QuizAnswers>({
    goal: "",
    experience: "",
    biggestChallenge: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const questions = [
    {
      id: "goal",
      question: "How can I help you...",
      options: [
        {
          value: "lose-fat",
          label: "Lose fat while eating your favorite foods",
          description: "Get lean without giving up adobo, pho, or pad thai",
        },
        {
          value: "gain-muscle",
          label: "Gain muscle without changing your lifestyle",
          description: "Build strength while keeping your cultural meals",
        },
        {
          value: "body-confidence",
          label: "Be confident in your own body",
          description: "Feel strong and proud in your own skin",
        },
        {
          value: "healthy-traditional",
          label: "Be the healthiest you've ever been, still eating your traditional foods",
          description: "Optimal health that honors your culture",
        },
      ],
    },
    {
      id: "experience",
      question: "What's your experience with fitness?",
      options: [
        {
          value: "beginner",
          label: "Just starting out",
          description: "New to structured fitness and nutrition",
        },
        {
          value: "tried-before",
          label: "Tried before but nothing stuck",
          description: "Past attempts didn't work with your lifestyle",
        },
        {
          value: "some-experience",
          label: "Some experience, need guidance",
          description: "Know the basics but want personalized help",
        },
        {
          value: "experienced",
          label: "Experienced but stuck",
          description: "Know what to do but not getting results",
        },
      ],
    },
    {
      id: "biggestChallenge",
      question: "What's your biggest challenge right now?",
      options: [
        {
          value: "time",
          label: "Finding time for meal prep",
          description: "Busy schedule makes healthy eating hard",
        },
        {
          value: "family-meals",
          label: "Balancing family meals with goals",
          description: "Family dinners make it difficult to stay on track",
        },
        {
          value: "motivation",
          label: "Staying motivated and consistent",
          description: "Starting is easy, sticking with it is hard",
        },
        {
          value: "knowledge",
          label: "Not knowing what actually works",
          description: "Too much conflicting information out there",
        },
      ],
    },
  ];

  const handleAnswer = (questionId: keyof QuizAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    
    // Auto-advance to next question after a short delay
    setTimeout(() => {
      if (quizStep < questions.length - 1) {
        setQuizStep(quizStep + 1);
      } else {
        // Quiz complete, move to form
        setCurrentStep("form");
      }
    }, 300);
  };

  const handleBack = () => {
    if (quizStep > 0) {
      setQuizStep(quizStep - 1);
    } else {
      setCurrentStep("quiz");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Almost there!",
        description: "Please fill in your name and email.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // TODO: Send lead magnet (cookbook) to prospect
      // await sendCookbook(formData.email, formData.name, answers);
      
      toast({
        title: "Resource ready! 🎉",
        description: "Your free resource is ready to view below.",
      });

      // Navigate to personalized resource page
      const params = new URLSearchParams({
        goal: answers.goal,
        experience: answers.experience,
        challenge: answers.biggestChallenge,
      });
      navigate(`/cookbook?${params.toString()}`);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Resource ready! 🎉",
        description: "Your free resource is ready to view below.",
      });
      const params = new URLSearchParams({
        goal: answers.goal,
        experience: answers.experience,
        challenge: answers.biggestChallenge,
      });
      navigate(`/cookbook?${params.toString()}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQuestion = questions[quizStep];
  const selectedAnswer = answers[currentQuestion.id as keyof QuizAnswers];

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
          {/* Pre-headline badge */}
          <div className="flex justify-center mb-3 sm:mb-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 border border-primary/30 bg-primary/10 rounded-sm">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-primary uppercase tracking-wider">
                100+ Clients Transformed
              </span>
            </div>
          </div>

          {/* Main headline */}
          <h1 className="font-display text-4xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-2 sm:mb-3 animate-slide-up px-2 text-center">
            Don't Choose Between{" "}
            <span className="text-gradient">Your Culture</span> and{" "}
            <span className="text-gradient">Your Goals</span>
          </h1>

          {/* Subheadline */}
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 animate-slide-up px-4 text-center" style={{ animationDelay: "0.2s" }}>
            Get lean, strong, and confident while still eating adobo, pho, nasi lemak, and pad thai. 
            I'll show you how 200+ people transformed their bodies without giving up the foods they love.
          </p>

          {/* Quiz or Form */}
          <div className="animate-slide-up max-w-2xl mx-auto" style={{ animationDelay: "0.4s" }}>
            {currentStep === "quiz" ? (
              <div className="bg-card rounded-sm border border-border p-6 sm:p-8 shadow-2xl">
                {/* Progress indicator */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      Question {quizStep + 1} of {questions.length}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {Math.round(((quizStep + 1) / questions.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                      style={{ width: `${((quizStep + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 text-center">
                  {currentQuestion.question}
                </h2>

                {/* Options */}
                <div className="space-y-3 sm:space-y-4">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(currentQuestion.id as keyof QuizAnswers, option.value)}
                      className={`w-full p-4 sm:p-5 rounded-sm border-2 text-left transition-all duration-200 ${
                        selectedAnswer === option.value
                          ? "border-primary bg-primary/10 shadow-lg scale-[1.02]"
                          : "border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswer === option.value
                            ? "border-primary bg-primary"
                            : "border-muted-foreground"
                        }`}>
                          {selectedAnswer === option.value && (
                            <CheckCircle className="w-4 h-4 text-accent fill-accent" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-sm sm:text-base mb-1">
                            {option.label}
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground">
                            {option.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Back button */}
                {quizStep > 0 && (
                  <div className="mt-6">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleBack}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-card rounded-sm border border-border p-6 sm:p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-3">
                    Get Your Free <span className="text-gradient">Resource</span>
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Based on your answers, we've prepared a personalized resource just for you.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs sm:text-sm font-medium uppercase tracking-wider">
                      Your Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-11 sm:h-12 bg-muted border-border focus:border-primary text-sm sm:text-base"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs sm:text-sm font-medium uppercase tracking-wider">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-11 sm:h-12 bg-muted border-border focus:border-primary text-sm sm:text-base"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs sm:text-sm font-medium uppercase tracking-wider">
                      Phone <span className="text-muted-foreground">(Optional)</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-11 sm:h-12 bg-muted border-border focus:border-primary text-sm sm:text-base"
                    />
                  </div>

                  {/* Submit button */}
                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="xl" 
                    className="w-full font-display text-base sm:text-lg md:text-xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Me My Free Resource
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                {/* Trust badges */}
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-4 text-xs sm:text-sm text-muted-foreground">
                  <span>✓ 100% Free</span>
                  <span>✓ No Credit Card</span>
                  <span>✓ Instant Access</span>
                </div>
              </div>
            )}
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

export default QuizHeroSection;

