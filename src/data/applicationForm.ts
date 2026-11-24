export type QuizVariant = "default" | "whop";

export type ChoiceOption = {
  value: string;
  label: string;
  description?: string;
  disqualify?: boolean;
  /** Multi-select only: picking this clears every other option (e.g. "nothing yet"). */
  exclusive?: boolean;
};

export type ChoiceStep = {
  id: "culturalFoods" | "situation" | "readiness";
  type: "yesno" | "single";
  prompt: string;
  options: ChoiceOption[];
};

export type OccupancyStep = {
  id: "occupation";
  type: "occupation";
  prompt: string;
};

export type TextStep = {
  id: "goal";
  type: "text";
  prompt: string;
  placeholder: string;
};

export type MultiStep = {
  id: "priorAttempts";
  type: "multi";
  prompt: string;
  hint: string;
  options: ChoiceOption[];
};

export type SocialStep = {
  id: "social";
  type: "social";
  prompt: string;
};

export type ContactStep = {
  id: "contact";
  type: "contact";
  prompt: string;
};

export type QuizStep = ChoiceStep | TextStep | MultiStep | OccupancyStep | SocialStep | ContactStep;

const culturalFoodsStep: ChoiceStep = {
  id: "culturalFoods",
  type: "yesno",
  prompt: "Are you Southeast Asian?",
  options: [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ],
};

const situationStep: ChoiceStep = {
  id: "situation",
  type: "single",
  prompt: "What has been the biggest challenge keeping you from achieving your goal?",
  options: [
    {
      value: "family-events",
      label: "Issues at family dinners and events",
      description: "Mom's cooking, parties, people always offering food",
    },
    {
      value: "time",
      label: "Finding the time",
      description: "Work and life eat up the whole day",
    },
    {
      value: "consistency",
      label: "Staying consistent",
      description: "I start strong, then fall off",
    },
    {
      value: "conflicting-advice",
      label: "Not knowing what actually works",
      description: "Too much advice that contradicts itself",
    },
  ],
};

const historyStep: MultiStep = {
  id: "priorAttempts",
  type: "multi",
  prompt: "What have you tried before?",
  hint: "Select all that apply",
  options: [
    { value: "keto-fasting", label: "Keto or intermittent fasting" },
    { value: "gym-solo", label: "Going to the gym on my own" },
    { value: "apps-programs", label: "Apps or online programs" },
    { value: "trainer-coach", label: "A personal trainer or coach" },
    { value: "meal-plans", label: "Meal plans or meal prep" },
    { value: "nothing-yet", label: "Nothing yet, this is my first real try", exclusive: true },
  ],
};

const readinessStep: ChoiceStep = {
  id: "readiness",
  type: "single",
  prompt: "Coaching is a real investment. If things are a perfect fit, how ready are you to start?",
  options: [
    { value: "ready-now", label: "I'm ready, I need this now" },
    { value: "ready-this-week", label: "I can be ready in the week" },
    { value: "ready-30-days", label: "Hopefully in the next 30 days" },
    {
      value: "just-curious",
      label: "Just curious and looking around",
      disqualify: true,
    },
  ],
};

const occupationStep: OccupancyStep = {
  id: "occupation",
  type: "occupation",
  prompt: "A little about you",
};

const socialStep: SocialStep = {
  id: "social",
  type: "social",
  prompt: "What's your Instagram?",
};

const contactStep: ContactStep = {
  id: "contact",
  type: "contact",
  prompt: "Contact info",
};

const goalStep: TextStep = {
  id: "goal",
  type: "text",
  prompt: "What is your primary goal over the next 6 months?",
  placeholder: "e.g. Lose 20 lbs, fit into my old clothes, have energy to keep up with my kids...",
};

export function getQuizSteps(_variant: QuizVariant = "default"): QuizStep[] {
  return [culturalFoodsStep, goalStep, situationStep, historyStep, readinessStep, occupationStep, socialStep, contactStep];
}

export function findOption(step: ChoiceStep | MultiStep, value: string): ChoiceOption | undefined {
  return step.options.find((o) => o.value === value);
}
