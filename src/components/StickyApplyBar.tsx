import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const StickyApplyBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById("application-form");
    if (!form) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden border-t border-border bg-background/95 backdrop-blur px-4 py-3">
      <Button
        variant="hero"
        className="w-full font-display"
        onClick={() => document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" })}
      >
        Apply Now
      </Button>
    </div>
  );
};

export default StickyApplyBar;
