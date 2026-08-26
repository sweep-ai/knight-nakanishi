import { X } from "lucide-react";

interface PainPointsSectionProps {
  variant?: "default" | "whop";
}

const PainPointsSection = ({ variant = "default" }: PainPointsSectionProps) => {
  const points =
    variant === "whop"
      ? [
          "You're not ready to invest in coaching and just want free tips",
          "You want someone else to do the work while you stay inconsistent",
          "You need a guarantee that a specific body will happen on a specific date",
          "You'll quit as soon as the plan asks for any structure",
        ]
      : [
          "You're not ready to invest in coaching and just want free tips",
          "You want someone else to do the work while you stay inconsistent",
          "You need a guaranteed number on the scale before you'll try",
          "You'll quit as soon as the plan asks for any structure",
        ];

  return (
    <section className="relative py-12 sm:py-16 section-light">
      <div className="container px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-secondary-foreground mb-6 text-center">
            This won&apos;t work for you <span className="text-primary">if...</span>
          </h2>
          <ul className="space-y-3">
            {points.map((point) => (
              <li key={point} className="flex gap-3 text-sm sm:text-base text-muted-foreground">
                <X className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground text-center">
            If that&apos;s you, skip the application. If it isn&apos;t, apply above.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;
