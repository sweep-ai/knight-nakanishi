import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Miguel",
      age: 28,
      location: "Philippines",
      result: "Lost 35lbs eating sisig and adobo weekly",
      quote: "Knight taught me how to fit my favorite foods into my macros. I'm leaner than ever and I never feel deprived.",
      foodHighlight: "Sisig & Adobo",
    },
    {
      name: "Linh",
      age: 24,
      location: "Vietnam",
      result: "Built muscle eating pho and banh mi",
      quote: "I thought I'd have to eat like a bodybuilder. Nope. I still eat at my family's restaurant twice a week.",
      foodHighlight: "Pho & Banh Mi",
    },
    {
      name: "Aziz",
      age: 32,
      location: "Malaysia",
      result: "Down 40lbs, still eating nasi lemak",
      quote: "Finally, someone who gets it. You don't have to be white to get fit.",
      foodHighlight: "Nasi Lemak",
    },
  ];

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 section-dark">
      {/* Accent borders */}
      <div className="absolute top-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-primary via-accent to-primary" />
      
      <div className="container px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4 px-2">
            Real People. Real Food.{" "}
            <span className="text-primary">Real Results.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto px-4">
            200+ Southeast Asians transformed without giving up lumpia, banh mi, or curry.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="group relative"
            >
              {/* Gradient border */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-sm p-[2px]">
                <div className="absolute inset-[2px] bg-card rounded-sm" />
              </div>

              <div className="relative p-5 sm:p-6 lg:p-8">
                {/* Quote icon */}
                <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-primary/30 mb-3 sm:mb-4" />

                {/* Stars */}
                <div className="flex gap-1 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-accent text-accent" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-base text-foreground mb-4 sm:mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>

                {/* Result badge */}
                <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 mb-3 sm:mb-4 bg-primary/10 border border-primary/20 rounded-sm">
                  <span className="text-xs sm:text-sm font-bold text-primary">
                    {testimonial.result}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Avatar placeholder */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-accent-foreground font-bold text-sm sm:text-base flex-shrink-0">
                    {testimonial.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm sm:text-base text-foreground">
                      {testimonial.name}, {testimonial.age}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                </div>

                {/* Food highlight */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-accent/20 rounded-sm">
                  <span className="text-[10px] sm:text-xs font-bold text-accent uppercase">
                    {testimonial.foodHighlight}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
