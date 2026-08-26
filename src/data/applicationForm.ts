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

export type ContactStep = {
  id: "contact";
  type: "contact";
  prompt: string;
};

export type QuizStep = ChoiceStep | OccupancyStep | ContactStep;

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
  prompt: "What's your biggest challenge right now?",
  options: [
    { value: "time", label: "Finding time for meal prep", description: "Busy schedule makes healthy eating hard" },
    { value: "family-meals", label: "Balancing family meals with goals", description: "Family dinners make it difficult to stay on track" },
    { value: "motivation", label: "Staying motivated and consistent", description: "Starting is easy, sticking with it is hard" },
    { value: "knowledge", label: "Not knowing what actually works", description: "Too much conflicting information out there" },
  ],
};

const readinessStep: ChoiceStep = {
  id: "readiness",
  type: "single",
  prompt: "If this is the right fit, are you ready to invest in coaching?",
  options: [
    { value: "ready-now", label: "Yes, I'm ready this month", description: "I want a plan and accountability now" },
    { value: "ready-if-fit", label: "Yes, if it's the right fit", description: "I want to talk it through on a call" },
    { value: "need-to-think", label: "I need to think about budget", description: "I might be ready after we talk" },
    {
      value: "not-investing",
      label: "Not looking to invest right now",
      description: "Just browsing or looking for free tips",
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
  prompt: "Where should we send your next step?",
};

function goalStep(variant: QuizVariant): ChoiceStep {
  const options: ChoiceOption[] =
    variant === "whop"
      ? [
          { value: "cultural-habits", label: "Build sustainable habits with my favorite foods", description: "Structure without giving up adobo, pho, or pad thai" },
          { value: "gain-muscle", label: "Gain muscle without changing your lifestyle", description: "Build strength while keeping cultural meals" },
          { value: "body-confidence", label: "Be confident in your own body", description: "Feel strong and proud in your own skin" },
          { value: "healthy-traditional", label: "Be the healthiest you've ever been, still eating traditional foods", description: "Optimal health that honors your culture" },
        ]
      : [
          { value: "lose-fat", label: "Lose fat while eating your favorite foods", description: "Get lean without giving up adobo, pho, or pad thai" },
          { value: "gain-muscle", label: "Gain muscle without changing your lifestyle", description: "Build strength while keeping cultural meals" },
          { value: "body-confidence", label: "Be confident in your own body", description: "Feel strong and proud in your own skin" },
          { value: "healthy-traditional", label: "Be the healthiest you've ever been, still eating traditional foods", description: "Optimal health that honors your culture" },
        ];

  return {
    id: "goal",
    type: "single",
    prompt: "How can I help you?",
    options,
  };
}

export function getQuizSteps(variant: QuizVariant = "default"): QuizStep[] {
  return [culturalFoodsStep, situationStep, goalStep(variant), readinessStep, occupationStep, contactStep];
}

export function findOption(step: ChoiceStep, value: string): ChoiceOption | undefined {
  return step.options.find((o) => o.value === value);
}
