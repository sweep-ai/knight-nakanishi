import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { QUIZ_SHEET_WEB_APP_URL } from "@/config/quizSheetConfig";
import { APPLICANT_STORAGE_KEY, FORM_ID } from "@/config/funnel";
import { getSessionId, submitLead, trackEvent } from "@/lib/sweep";
import {
  findOption,
  getQuizSteps,
  type ChoiceStep,
  type QuizVariant,
} from "@/data/applicationForm";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Answers = {
  culturalFoods: string;
  situation: string;
  goal: string;
  readiness: string;
  occupation: string;
  age: string;
  name: string;
  email: string;
  phone: string;
  social: string;
};

const emptyAnswers: Answers = {
  culturalFoods: "",
  situation: "",
  goal: "",
  readiness: "",
  occupation: "",
  age: "",
  name: "",
  email: "",
  phone: "",
  social: "",
};

interface ApplicationFormProps {
  variant?: QuizVariant;
}

const ApplicationForm = ({ variant = "default" }: ApplicationFormProps) => {
  const navigate = useNavigate();
  const steps = getQuizSteps(variant);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disqualified, setDisqualified] = useState(false);
  const startedRef = useRef(false);
  const advanceTimer = useRef<number | null>(null);

  const step = steps[stepIndex];
  const total = steps.length;

  useEffect(() => {
    return () => {
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    };
  }, []);

  const markStarted = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    void trackEvent("quiz_start", { form_id: FORM_ID });
  };

  const goNext = () => {
    setStepIndex((i) => Math.min(i + 1, total - 1));
  };

  const handleChoice = (value: string) => {
    if (step.type !== "yesno" && step.type !== "single") return;
    markStarted();
    const id = step.id as keyof Answers;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(goNext, 450);
  };

  const handleBack = () => {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    setStepIndex((i) => Math.max(i - 1, 0));
  };

  const validateContact = () => {
    if (!answers.name.trim() || !EMAIL_RE.test(answers.email.trim()) || answers.phone.replace(/\D/g, "").length < 10) {
      toast({
        title: "Almost there",
        description: "Enter a valid name, email, and phone number.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleOccupationContinue = () => {
    if (!answers.occupation.trim()) {
      toast({
        title: "One more thing",
        description: "Tell us your occupation so we can tailor the call.",
        variant: "destructive",
      });
      return;
    }
    goNext();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContact()) return;

    const readinessStep = steps.find((s): s is ChoiceStep => s.id === "readiness");
    const readinessOption = readinessStep ? findOption(readinessStep, answers.readiness) : undefined;
    const isDq = Boolean(readinessOption?.disqualify);
    const leadStatus = isDq ? "disqualified" : "qualified";
    const dqReason = isDq ? readinessOption?.label ?? "Not looking to invest" : null;

    const labeled = (id: ChoiceStep["id"]) => {
      const s = steps.find((st): st is ChoiceStep => st.id === id);
      const opt = s ? findOption(s, answers[id]) : undefined;
      return {
        prompt: s?.prompt ?? id,
        code: answers[id],
        label: opt?.label ?? answers[id],
      };
    };

    const culturalFoods = labeled("culturalFoods");
    const situation = labeled("situation");
    const goal = labeled("goal");
    const readiness = labeled("readiness");

    const quizAnswers = {
      culturalFoods,
      situation,
      goal,
      readiness,
      occupation: answers.occupation.trim(),
      age: answers.age.trim() || null,
      social: answers.social.trim() || null,
      leadStatus,
      dqReason,
      culturalFoods_code: culturalFoods.code,
      situation_code: situation.code,
      goal_code: goal.code,
      readiness_code: readiness.code,
    };

    setIsSubmitting(true);
    try {
      const sessionId = getSessionId();
      const idempotencyKey = `form_submit_${sessionId}_${FORM_ID}`;
      void trackEvent("form_submit", { form_id: FORM_ID, leadStatus }, idempotencyKey);

      const leadResult = await submitLead({
        email: answers.email.trim(),
        name: answers.name.trim(),
        phone: answers.phone.trim(),
        instagram: answers.social.trim() || undefined,
        source: "quiz",
        funnel_step_reached: "form_submit",
        quiz_answers: quizAnswers,
        notes: `${leadStatus}. Goal: ${goal.label}. Readiness: ${readiness.label}. Occupation: ${answers.occupation.trim()}.`,
      });
      if (leadResult.error) {
        console.error("submitLead:", leadResult.error);
      }

      if (QUIZ_SHEET_WEB_APP_URL) {
        void fetch(QUIZ_SHEET_WEB_APP_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: answers.name.trim(),
            email: answers.email.trim(),
            phone: answers.phone.trim(),
            social: answers.social.trim(),
            occupation: answers.occupation.trim(),
            age: answers.age.trim(),
            goal: goal.code,
            situation: situation.code,
            readiness: readiness.code,
            leadStatus,
          }),
        });
      }

      const zapierWebhookUrl = import.meta.env.VITE_ZAPIER_WEBHOOK_URL;
      if (zapierWebhookUrl) {
        void fetch(zapierWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: answers.name.trim(),
            email: answers.email.trim(),
            phone: answers.phone.trim(),
            social: answers.social.trim(),
            occupation: answers.occupation.trim(),
            age: answers.age.trim(),
            culturalFoods: culturalFoods.label,
            culturalFoods_code: culturalFoods.code,
            situation: situation.label,
            situation_code: situation.code,
            goal: goal.label,
            goal_code: goal.code,
            readiness: readiness.label,
            readiness_code: readiness.code,
            leadStatus,
            dqReason,
            timestamp: new Date().toISOString(),
          }),
        }).catch((err) => console.error("Zapier webhook error:", err));
      }

      // Server-side only — token never exposed to Vite client bundle
      void fetch("/api/ghl-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: answers.name.trim(),
          email: answers.email.trim(),
          phone: answers.phone.trim(),
          source: "quiz",
          notes: `${leadStatus}. Goal: ${goal.label}.`,
        }),
      }).catch((err) => console.error("GHL contact error:", err));

      sessionStorage.setItem(
        APPLICANT_STORAGE_KEY,
        JSON.stringify({
          name: answers.name.trim(),
          email: answers.email.trim(),
          phone: answers.phone.trim(),
          leadStatus,
        })
      );

      if (isDq) {
        setDisqualified(true);
        return;
      }
      navigate("/booking");
    } catch (error) {
      console.error("Quiz submit:", error);
      toast({
        title: "Something went wrong",
        description: "Try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (disqualified) {
    return (
      <div className="bg-card rounded-sm border border-border p-6 sm:p-8 shadow-2xl">
        <h2 className="font-display text-2xl sm:text-3xl mb-3 text-center">Not the right time</h2>
        <p className="text-sm sm:text-base text-muted-foreground text-center mb-6">
          Coaching only works when you&apos;re ready to invest. We captured your info. When you&apos;re ready, come back and apply again.
        </p>
        <p className="text-sm text-muted-foreground text-center">
          Start with the free resource on this page, or watch the video above again.
        </p>
      </div>
    );
  }

  const selectedChoice =
    step.type === "yesno" || step.type === "single" ? answers[step.id] : "";

  return (
    <div id="application-form" className="bg-card rounded-sm border border-border p-6 sm:p-8 shadow-2xl">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-sm text-muted-foreground">
            {stepIndex + 1} / {total}
          </span>
          <span className="text-xs sm:text-sm text-muted-foreground">
            {Math.round(((stepIndex + 1) / total) * 100)}%
          </span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
            style={{ width: `${((stepIndex + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 text-center">{step.prompt}</h2>

      {(step.type === "yesno" || step.type === "single") && (
        <div className="space-y-3 sm:space-y-4">
          {step.options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleChoice(option.value)}
              className={`w-full p-4 sm:p-5 rounded-sm border-2 text-left transition-all duration-200 ${
                selectedChoice === option.value
                  ? "border-primary bg-primary/10 shadow-lg scale-[1.02]"
                  : "border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedChoice === option.value ? "border-primary bg-primary" : "border-muted-foreground"
                  }`}
                >
                  {selectedChoice === option.value && <CheckCircle className="w-4 h-4 text-accent fill-accent" />}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm sm:text-base mb-1">{option.label}</div>
                  {option.description && (
                    <div className="text-xs sm:text-sm text-muted-foreground">{option.description}</div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {step.type === "occupation" && (
        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="occupation" className="text-xs sm:text-sm font-medium uppercase tracking-wider">
              Occupation
            </Label>
            <Input
              id="occupation"
              placeholder="Student, nurse, business owner..."
              value={answers.occupation}
              onChange={(e) => setAnswers({ ...answers, occupation: e.target.value })}
              className="h-11 sm:h-12 bg-muted border-border focus:border-primary text-sm sm:text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age" className="text-xs sm:text-sm font-medium uppercase tracking-wider">
              Age <span className="text-muted-foreground normal-case tracking-normal">(optional)</span>
            </Label>
            <Input
              id="age"
              inputMode="numeric"
              placeholder="e.g. 28"
              value={answers.age}
              onChange={(e) => setAnswers({ ...answers, age: e.target.value })}
              className="h-11 sm:h-12 bg-muted border-border focus:border-primary text-sm sm:text-base"
            />
          </div>
          <Button type="button" variant="hero" size="xl" className="w-full font-display" onClick={handleOccupationContinue}>
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

      {step.type === "contact" && (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs sm:text-sm font-medium uppercase tracking-wider">
              Your name
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={answers.name}
              onChange={(e) => setAnswers({ ...answers, name: e.target.value })}
              className="h-11 sm:h-12 bg-muted border-border focus:border-primary text-sm sm:text-base"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs sm:text-sm font-medium uppercase tracking-wider">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={answers.email}
              onChange={(e) => setAnswers({ ...answers, email: e.target.value })}
              className="h-11 sm:h-12 bg-muted border-border focus:border-primary text-sm sm:text-base"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-xs sm:text-sm font-medium uppercase tracking-wider">
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={answers.phone}
              onChange={(e) => setAnswers({ ...answers, phone: e.target.value })}
              className="h-11 sm:h-12 bg-muted border-border focus:border-primary text-sm sm:text-base"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="social" className="text-xs sm:text-sm font-medium uppercase tracking-wider">
              Instagram or social <span className="text-muted-foreground normal-case tracking-normal">(optional)</span>
            </Label>
            <Input
              id="social"
              placeholder="@handle"
              value={answers.social}
              onChange={(e) => setAnswers({ ...answers, social: e.target.value })}
              className="h-11 sm:h-12 bg-muted border-border focus:border-primary text-sm sm:text-base"
            />
          </div>
          <Button type="submit" variant="hero" size="xl" className="w-full font-display text-base sm:text-lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              <>
                Start Your Transformation
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </>
            )}
          </Button>
        </form>
      )}

      {stepIndex > 0 && (
        <div className="mt-6">
          <Button type="button" variant="ghost" onClick={handleBack} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      )}
    </div>
  );
};

export default ApplicationForm;
