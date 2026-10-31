export type QuizVariant = "default" | "whop";

export type ChoiceOption = {
  value: string;
  label: string;
  description?: string;
  disqualify?: boolean;
};

export type ChoiceStep = {
  id: "culturalFoods" | "situation" | "goal" | "readiness";
  type: "yesno" | "single";
  prompt: string;
  options: ChoiceOption[];
};

export type OccupancyStep = {
  id: "occupation";
  type: "occupation";
  prompt: string;
};

export type HistoryStep = {
  id: "priorAttempts";
  type: "history";
  prompt: string;
};

export type ContactStep = {
  id: "contact";
  type: "contact";
  prompt: string;
};

export type QuizStep = ChoiceStep | OccupancyStep | HistoryStep | ContactStep;

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

const historyStep: HistoryStep = {
  id: "priorAttempts",
  type: "history",
  prompt: "What have you tried before and what happened?",
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

const contactStep: ContactStep = {
  id: "contact",
  type: "contact",
  prompt: "Contact info",
};

function goalStep(variant: QuizVariant): ChoiceStep {
  const loseFat: ChoiceOption =
    variant === "whop"
      ? {
          value: "lose-fat",
          label: "Get in better shape",
          description: "Without giving up the food I grew up on",
        }
      : {
          value: "lose-fat",
          label: "Lose fat",
          description: "Without giving up the food I grew up on",
        };

  return {
    id: "goal",
    type: "single",
    prompt: "What is your primary goal over the next 6 months?",
    options: [
      loseFat,
      {
        value: "build-muscle",
        label: "Build muscle and get strong",
        description: "Without living in the gym",
      },
      {
        value: "body-confidence",
        label: "Feel confident in my body again",
        description: "Look in the mirror and like what I see",
      },
      {
        value: "healthiest",
        label: "Be the healthiest I've ever been",
        description: "And still eat with my family",
      },
    ],
  };
}

export function getQuizSteps(variant: QuizVariant = "default"): QuizStep[] {
  return [culturalFoodsStep, goalStep(variant), situationStep, historyStep, readinessStep, occupationStep, contactStep];
}

export function findOption(step: ChoiceStep, value: string): ChoiceOption | undefined {
  return step.options.find((o) => o.value === value);
}
