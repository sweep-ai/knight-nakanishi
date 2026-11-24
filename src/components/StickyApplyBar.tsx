import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const FORM_ID = "application-form";
// Share of the screen the quiz must fill before the bar hides. A quiz card peeking
// under the video on first load does not count; scrolling onto the quiz does.
const VISIBLE_SHARE = 0.35;

/** True while the quiz is on screen (or gone entirely), so the bar has nothing to scroll to. */
function quizInView(): boolean {
  const form = document.getElementById(FORM_ID);
  if (!form) return true;
  const rect = form.getBoundingClientRect();
  const overlap = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
  return overlap > window.innerHeight * VISIBLE_SHARE;
}

const StickyApplyBar = () => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setHidden(quizInView());
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Quiz steps change height without scrolling; recheck on layout changes too.
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden={hidden}
      className={`fixed bottom-0 inset-x-0 z-50 md:hidden border-t border-border bg-background/95 backdrop-blur px-4 py-3 transition-transform duration-300 ${
        hidden ? "translate-y-full pointer-events-none" : "translate-y-0"
      }`}
    >
      <Button
        variant="hero"
        className="w-full font-display text-base uppercase"
        tabIndex={hidden ? -1 : 0}
        onClick={() => document.getElementById(FORM_ID)?.scrollIntoView({ behavior: "smooth" })}
      >
        Apply Now
      </Button>
    </div>
  );
};

export default StickyApplyBar;
