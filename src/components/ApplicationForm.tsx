import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { QUIZ_SHEET_WEB_APP_URL } from "@/config/quizSheetConfig";
import { APPLICANT_STORAGE_KEY, FORM_ID, funnelEvent } from "@/config/funnel";
import { trackMeta } from "@/lib/metaPixel";
import CalBookingEmbed, { preloadCalBooking } from "@/components/CalBookingEmbed";
import { getSessionId, getUtm, trackEvent } from "@/lib/sweep";
import {
  findOption,
  getQuizSteps,
  type ChoiceStep,
  type MultiStep,
  type QuizVariant,
} from "@/data/applicationForm";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Answers = {
  culturalFoods: string;
  situation: string;
  goal: string;
  readiness: string;
  priorAttempts: string[];
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
  priorAttempts: [],
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
  const steps = getQuizSteps(variant);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disqualified, setDisqualified] = useState(false);
  // Qualified leads book inside the quiz card instead of being sent to /booking.
  const [booking, setBooking] = useState(false);
  const startedRef = useRef(false);
  const lastPartialRef = useRef("");
  const advanceTimer = useRef<number | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const skipCenterRef = useRef(true);

  const step = steps[stepIndex];
  const total = steps.length;

  useEffect(() => {
    return () => {
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    };
  }, []);

  // Warm the Cal script + booking page so the in-quiz calendar renders without a cold load.
  // No-op if the page already started the preload.
  useEffect(() => {
    preloadCalBooking();
  }, []);

  useEffect(() => {
    if (!booking) return;
    const sessionId = getSessionId();
    void trackEvent(
      funnelEvent.bookingPageView,
      { page_id: "booking", placement: "quiz" },
      `${funnelEvent.bookingPageView}_${sessionId}`
    );
  }, [booking]);

  const markStarted = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    const sessionId = getSessionId();
    void trackEvent(funnelEvent.quizStart, { form_id: FORM_ID }, `${funnelEvent.quizStart}_${sessionId}_${FORM_ID}`);
  };

  useEffect(() => {
    const current = getQuizSteps(variant)[stepIndex];
    if (!current) return;
    const sessionId = getSessionId();
    const n = stepIndex + 1;
    void trackEvent(
      funnelEvent.quizStep(n),
      { form_id: FORM_ID, step: n, step_id: current.id },
      `${funnelEvent.quizStep(n)}_${sessionId}_${FORM_ID}`
    );
  }, [stepIndex, variant]);

  useEffect(() => {
    if (skipCenterRef.current) {
      skipCenterRef.current = false;
      return;
    }
    const frame = window.requestAnimationFrame(() => {
      const el = formRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const top =
        rect.height > window.innerHeight
          ? window.scrollY + rect.top - 16
          : window.scrollY + rect.top - (window.innerHeight - rect.height) / 2;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [stepIndex, disqualified, booking]);

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

  const toggleMulti = (value: string) => {
    if (step.type !== "multi") return;
    markStarted();
    const option = findOption(step, value);
    setAnswers((prev) => {
      const current = prev.priorAttempts;
      if (current.includes(value)) {
        return { ...prev, priorAttempts: current.filter((v) => v !== value) };
      }
      if (option?.exclusive) return { ...prev, priorAttempts: [value] };
      const exclusive = new Set(step.options.filter((o) => o.exclusive).map((o) => o.value));
      return { ...prev, priorAttempts: [...current.filter((v) => !exclusive.has(v)), value] };
    });
  };

  const handleHistoryContinue = () => {
    if (!answers.priorAttempts.length) {
      toast({
        title: "One more thing",
        description: "Select everything you've tried before.",
        variant: "destructive",
      });
      return;
    }
    goNext();
  };

  const handleGoalContinue = () => {
    if (!answers.goal.trim()) {
      toast({
        title: "One more thing",
        description: "Tell us your main goal for the next 6 months.",
        variant: "destructive",
      });
      return;
    }
    markStarted();
    goNext();
  };

  // Selected prior-attempt options as labels (joined for CRM/sheet fields) and codes.
  const priorAttemptsAnswer = () => {
    const s = steps.find((st): st is MultiStep => st.id === "priorAttempts");
    const codes = answers.priorAttempts;
    const labels = codes.map((code) => (s ? findOption(s, code)?.label : undefined) ?? code);
    return { prompt: s?.prompt ?? "priorAttempts", codes, text: labels.join(", ") };
  };

  const goalAnswer = () => {
    const s = steps.find((st) => st.id === "goal");
    const text = answers.goal.trim();
    return { prompt: s?.prompt ?? "goal", code: "", label: text };
  };

  const handleOccupationContinue = () => {
    const age = Number(answers.age.trim());
    if (!answers.age.trim() || !answers.occupation.trim() || !Number.isFinite(age)) {
      toast({
        title: "A little more detail",
        description: "Add your age and what you do for work.",
        variant: "destructive",
      });
      return;
    }
    if (age < 18) {
      toast({
        title: "18 or older",
        description: "Coaching applications are for adults 18 and up.",
        variant: "destructive",
      });
      return;
    }
    goNext();
  };

  const labeled = (id: ChoiceStep["id"]) => {
    const s = steps.find((st): st is ChoiceStep => st.id === id);
    const opt = s ? findOption(s, answers[id]) : undefined;
    return {
      prompt: s?.prompt ?? id,
      code: answers[id],
      label: opt?.label ?? answers[id],
    };
  };

  const readinessDq = () => {
    const readinessStep = steps.find((s): s is ChoiceStep => s.id === "readiness");
    const readinessOption = readinessStep ? findOption(readinessStep, answers.readiness) : undefined;
    const isDq = Boolean(readinessOption?.disqualify);
    return { isDq, dqReason: isDq ? readinessOption?.label ?? "Not looking to invest" : null };
  };

  // Partial lead: Instagram + answers so far, sent before contact info so drop-offs are still captured.
  const sendPartial = (social: string) => {
    if (lastPartialRef.current === social) return;
    lastPartialRef.current = social;
    const sessionId = getSessionId();
    const { dqReason } = readinessDq();
    const culturalFoods = labeled("culturalFoods");
    const situation = labeled("situation");
    const goal = goalAnswer();
    const prior = priorAttemptsAnswer();
    const readiness = labeled("readiness");
    const visitorId =
      typeof localStorage !== "undefined" ? localStorage.getItem("sweep_visitor_id") || undefined : undefined;

    void fetch("/api/quiz-submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        partial: true,
        social,
        occupation: answers.occupation.trim(),
        age: answers.age.trim(),
        priorAttempts: prior.text,
        leadStatus: "partial",
        dqReason,
        formId: FORM_ID,
        visitorId,
        sessionId,
        idempotencyKey: `partial_${sessionId}_${FORM_ID}_${social.toLowerCase()}`,
        quizAnswers: { culturalFoods, situation, goal, readiness, priorAttempts: prior.text, priorAttempts_codes: prior.codes },
        notes: `partial. Goal: ${goal.label}. Readiness: ${readiness.label}. Instagram: ${social}.`,
        utm: getUtm(),
        pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
        pageTitle: typeof document !== "undefined" ? document.title : undefined,
      }),
    }).catch((error) => console.error("quiz partial:", error));
  };

  const handleSocialContinue = () => {
    const handle = answers.social.trim().replace(/^@+/, "").replace(/^https?:\/\/(www\.)?instagram\.com\//i, "").replace(/\/.*$/, "");
    if (!handle || /\s/.test(handle)) {
      toast({
        title: "Add your Instagram",
        description: "Enter your handle, like @yourname.",
        variant: "destructive",
      });
      return;
    }
    const social = `@${handle}`;
    setAnswers((prev) => ({ ...prev, social }));
    sendPartial(social);
    goNext();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContact()) return;

    const { isDq, dqReason } = readinessDq();
    const leadStatus = isDq ? "disqualified" : "qualified";

    const culturalFoods = labeled("culturalFoods");
    const situation = labeled("situation");
    const goal = goalAnswer();
    const prior = priorAttemptsAnswer();
    const readiness = labeled("readiness");

    const quizAnswers = {
      culturalFoods,
      situation,
      goal,
      readiness,
      priorAttempts: prior.text,
      priorAttempts_codes: prior.codes,
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
      const visitorId =
        typeof localStorage !== "undefined"
          ? localStorage.getItem("sweep_visitor_id") || undefined
          : undefined;

      // Saved first: the booking embed reads this to prefill name, email, and phone.
      sessionStorage.setItem(
        APPLICANT_STORAGE_KEY,
        JSON.stringify({
          name: answers.name.trim(),
          email: answers.email.trim(),
          phone: answers.phone.trim(),
          leadStatus,
        })
      );

      trackMeta("Lead", {
        email: answers.email.trim(),
        phone: answers.phone.trim(),
        name: answers.name.trim(),
      });

      // Server proxies Sweep + Zapier + GHL (avoids browser CORS / empty Zapier bodies)
      // Not awaited: the calendar shows right away while the lead saves. keepalive lets the
      // request finish even if they book and leave quickly.
      void fetch("/api/quiz-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          name: answers.name.trim(),
          email: answers.email.trim(),
          phone: answers.phone.trim(),
          social: answers.social.trim(),
          occupation: answers.occupation.trim(),
          age: answers.age.trim(),
          priorAttempts: prior.text,
          leadStatus,
          dqReason,
          formId: FORM_ID,
          visitorId,
          sessionId,
          idempotencyKey,
          quizAnswers,
          notes: `${leadStatus}. Goal: ${goal.label}. Tried: ${prior.text}. Readiness: ${readiness.label}. Work: ${answers.occupation.trim()}.`,
          culturalFoods: culturalFoods.label,
          culturalFoods_code: culturalFoods.code,
          situation: situation.label,
          situation_code: situation.code,
          goal: goal.label,
          goal_code: goal.code,
          readiness: readiness.label,
          readiness_code: readiness.code,
          utm: getUtm(),
          pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
          pageTitle: typeof document !== "undefined" ? document.title : undefined,
        }),
      })
        .then(async (submitRes) => {
          const detail = await submitRes.json().catch(() => ({}));
          if (!submitRes.ok) console.error("quiz-submit:", detail);
          else console.info("quiz-submit results:", detail);
        })
        .catch((error) => console.error("quiz-submit:", error));

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
            priorAttempts: prior.text,
            goal: goal.label,
            situation: situation.code,
            readiness: readiness.code,
            leadStatus,
          }),
        });
      }

      if (isDq) {
        setDisqualified(true);
        return;
      }
      setBooking(true);
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
      <div ref={formRef} className="gold-hairline bg-card rounded-3xl border border-accent/20 p-5 sm:p-8 shadow-2xl">
        <h2 className="font-display text-2xl sm:text-3xl mb-3 text-center">We received your application</h2>
        <p className="text-sm sm:text-base text-muted-foreground text-center mb-6">
          Thanks for applying. Our team will reach out to you shortly by text at the number you gave us.
        </p>
        <p className="text-sm text-muted-foreground text-center">
          In the meantime, watch the video above again or grab the free resource on this page.
        </p>
      </div>
    );
  }

  if (booking) {
    return (
      <div
        ref={formRef}
        id="application-form"
        className="gold-hairline bg-card rounded-3xl border border-accent/20 px-2 pt-6 pb-2 sm:p-6 shadow-2xl overflow-hidden"
      >
        <div className="px-3 sm:px-2 mb-5 text-center">
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-5">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-[hsl(var(--knight-gold-deep))] via-accent to-[hsl(var(--knight-gold-light))]" />
          </div>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-accent mb-2">You qualified · Final step</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-2">Book your Gameplan call</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Pick a time below. We&apos;ll build your plan around your schedule and the foods you already eat.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden">
          <CalBookingEmbed />
        </div>
      </div>
    );
  }

  const selectedChoice =
    step.type === "yesno" || step.type === "single" ? answers[step.id] : "";

  return (
    <div ref={formRef} id="application-form" className="gold-hairline bg-card rounded-3xl border border-accent/20 p-5 sm:p-8 shadow-2xl">
      <div className="flex justify-center mb-4 sm:mb-5">
        <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-accent/10 border border-accent/30">
          <span className="inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-accent animate-dot-pulse" />
          <span className="text-xs sm:text-sm font-bold text-accent uppercase tracking-wider">
            Limited Slots Available
          </span>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-sm text-muted-foreground">
            {stepIndex + 1} / {total}
          </span>
          <span className="text-xs sm:text-sm text-muted-foreground">
            {Math.round(((stepIndex + 1) / total) * 100)}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[hsl(var(--knight-gold-deep))] via-accent to-[hsl(var(--knight-gold-light))] transition-all duration-300"
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
              className={`w-full p-4 sm:p-5 rounded-2xl border text-left transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                selectedChoice === option.value
                  ? "border-primary bg-primary/10"
                  : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    selectedChoice === option.value ? "border-primary" : "border-muted-foreground/60"
                  }`}
                >
                  {selectedChoice === option.value && <span className="w-2.5 h-2.5 rounded-full bg-primary" />}
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

      {step.type === "text" && (
        <div className="space-y-4 sm:space-y-6">
          <Textarea
            id={step.id}
            placeholder={step.placeholder}
            value={answers.goal}
            onChange={(e) => setAnswers({ ...answers, goal: e.target.value })}
            className="min-h-36 rounded-2xl bg-white/[0.03] border-white/10 p-4 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base"
          />
          <Button type="button" variant="hero" size="xl" className="w-full rounded-2xl font-display" onClick={handleGoalContinue}>
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

      {step.type === "multi" && (
        <div className="space-y-3 sm:space-y-4">
          <p className="-mt-3 sm:-mt-5 mb-2 text-center text-xs sm:text-sm uppercase tracking-wider text-accent/80">
            {step.hint}
          </p>
          {step.options.map((option) => {
            const checked = answers.priorAttempts.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                role="checkbox"
                aria-checked={checked}
                onClick={() => toggleMulti(option.value)}
                className={`w-full p-4 sm:p-5 rounded-2xl border text-left transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  checked
                    ? "border-primary bg-primary/10"
                    : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                      checked ? "border-primary bg-primary" : "border-muted-foreground/60"
                    }`}
                  >
                    {checked && <Check className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={3} />}
                  </div>
                  <div className="font-semibold text-sm sm:text-base">{option.label}</div>
                </div>
              </button>
            );
          })}
          <Button type="button" variant="hero" size="xl" className="w-full rounded-2xl font-display !mt-6" onClick={handleHistoryContinue}>
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

      {step.type === "occupation" && (
        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="age" className="text-xs sm:text-sm font-medium uppercase tracking-wider">
              Age
            </Label>
            <Input
              id="age"
              inputMode="numeric"
              placeholder="e.g. 28"
              value={answers.age}
              onChange={(e) => setAnswers({ ...answers, age: e.target.value })}
              className="h-12 rounded-xl bg-white/[0.03] border-white/10 px-4 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="occupation" className="text-xs sm:text-sm font-medium uppercase tracking-wider">
              What do you do for work?
            </Label>
            <Input
              id="occupation"
              placeholder="Student, nurse, business owner..."
              value={answers.occupation}
              onChange={(e) => setAnswers({ ...answers, occupation: e.target.value })}
              className="h-12 rounded-xl bg-white/[0.03] border-white/10 px-4 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base"
            />
          </div>
          <Button type="button" variant="hero" size="xl" className="w-full rounded-2xl font-display" onClick={handleOccupationContinue}>
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

      {step.type === "social" && (
        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="social" className="text-xs sm:text-sm font-medium uppercase tracking-wider">
              Instagram
            </Label>
            <Input
              id="social"
              placeholder="@handle"
              autoCapitalize="none"
              autoCorrect="off"
              value={answers.social}
              onChange={(e) => setAnswers({ ...answers, social: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSocialContinue();
                }
              }}
              className="h-12 rounded-xl bg-white/[0.03] border-white/10 px-4 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base"
            />
          </div>
          <Button type="button" variant="hero" size="xl" className="w-full rounded-2xl font-display" onClick={handleSocialContinue}>
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

      {step.type === "contact" && (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs sm:text-sm font-medium uppercase tracking-wider">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={answers.name}
              onChange={(e) => setAnswers({ ...answers, name: e.target.value })}
              className="h-12 rounded-xl bg-white/[0.03] border-white/10 px-4 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base"
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
              className="h-12 rounded-xl bg-white/[0.03] border-white/10 px-4 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-xs sm:text-sm font-medium uppercase tracking-wider">
              Phone number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={answers.phone}
              onChange={(e) => setAnswers({ ...answers, phone: e.target.value })}
              className="h-12 rounded-xl bg-white/[0.03] border-white/10 px-4 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base"
              required
            />
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground text-center leading-relaxed">
            By applying you agree to our{" "}
            <Link to="/tos" className="text-foreground underline underline-offset-2">
              Terms
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-foreground underline underline-offset-2">
              Privacy Policy
            </Link>
            , and to receive calls and texts about your application at the number above. Msg &amp; data rates may apply. Reply STOP to opt out.
          </p>
          <Button type="submit" variant="hero" size="xl" className="w-full rounded-2xl font-display text-base sm:text-lg" disabled={isSubmitting}>
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
          <Button type="button" variant="ghost" onClick={handleBack} className="text-muted-foreground hover:text-foreground hover:bg-white/5">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      )}
    </div>
  );
};

export default ApplicationForm;
