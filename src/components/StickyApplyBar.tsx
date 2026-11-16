import { Button } from "@/components/ui/button";

const StickyApplyBar = () => {
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
