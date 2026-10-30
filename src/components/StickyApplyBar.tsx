import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const StickyApplyBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById("application-form");
    const finalCta = document.getElementById("final-cta");
    if (!form) return;

    const seen = { form: true, finalCta: false };
    const update = () => setVisible(!seen.form && !seen.finalCta);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === form) seen.form = entry.isIntersecting;
          if (entry.target === finalCta) seen.finalCta = entry.isIntersecting;
        }
        update();
      },
      { threshold: 0.15 }
    );
    observer.observe(form);
    if (finalCta) observer.observe(finalCta);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden border-t border-border bg-background/95 backdrop-blur px-4 py-3">
      <Button
        variant="hero"
        className="w-full font-display text-base uppercase"
        onClick={() => document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" })}
      >
        Apply Now
      </Button>
    </div>
  );
};

export default StickyApplyBar;
