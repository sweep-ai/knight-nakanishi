import Index from "./Index";

// Duplicates of the root landing page with audience-specific headline copy.

export const FilipinaLanding = () => (
  <Index
    headline={
      <>
        <span className="text-gold">Filipina Women</span> are dropping{" "}
        <span className="text-gold whitespace-nowrap">20+ lbs</span> without giving up rice, adobo, or Sunday lutong bahay
      </>
    }
    subheadline={
      <>
        Every diet told you to quit the food you were raised on. We build your plan around adobo, sinigang, and garlic rice. Real results, no sacrifice. See how ↓
      </>
    }
  />
);

export const ThaiLaoLanding = () => (
  <Index
    headline={
      <>
        <span className="text-gold">Thai &amp; Lao Americans</span> Lose{" "}
        <span className="text-gold whitespace-nowrap">25+ lbs</span> Without quitting the food they love
      </>
    }
    subheadline={
      <>
        No extreme dieting, no hours in the gym. Your plan is built around sticky rice, larb, and som tum. See if you're a fit ↓
      </>
    }
  />
);
