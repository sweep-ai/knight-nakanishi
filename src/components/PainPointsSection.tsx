import { UtensilsCrossed, Clock, RefreshCw } from "lucide-react";

const PainPointsSection = () => {
  const painPoints = [
    {
      icon: UtensilsCrossed,
      title: "Tired of 'Fitness Plans' That Ignore Your Food",
      text: "You're sick of coaches telling you to eat grilled chicken and rice (the bland kind). You want results but not at the cost of your identity.",
    },
    {
      icon: Clock,
      title: "Busy Schedule, Zero Time for 2-Hour Gym Sessions",
      text: "Between work, family, and life, you need workouts that fit your reality—not some influencer's fantasy schedule.",
    },
    {
      icon: RefreshCw,
      title: "Tried Everything, Nothing Sticks",
      text: "Diets failed. Apps didn't work. You're tired of starting over. You need a system that actually fits YOUR life.",
    },
  ];

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 section-light diagonal-top">
      <div className="container px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-secondary-foreground mb-3 sm:mb-4 px-2">
            Sound <span className="text-primary">Familiar?</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto px-4">
            These are the struggles I hear every single day from Southeast Asians trying to get fit
          </p>
        </div>

        {/* Pain point cards */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {painPoints.map((point, index) => (
            <div
              key={point.title}
              className="group relative p-6 sm:p-8 bg-background rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-4 sm:mb-6 bg-primary/10 rounded-sm flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <point.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
              </div>

              {/* Title */}
              <h3 className="font-display text-xl sm:text-2xl text-foreground mb-3 sm:mb-4">
                {point.title}
              </h3>

              {/* Text */}
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {point.text}
              </p>

              {/* Accent corner */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] sm:border-t-[40px] border-t-primary border-l-[30px] sm:border-l-[40px] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;
