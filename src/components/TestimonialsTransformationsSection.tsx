import { Star, Quote } from "lucide-react";

const TestimonialsTransformationsSection = () => {
  const testimonials = [
    {
      name: "Maria",
      age: 27,
      location: "Philippines",
      quote: "I lost 28lbs while still eating adobo and pancit every week. Knight showed me how to make my favorite foods work for my goals.",
      result: "Lost 28lbs",
      foodHighlight: "Adobo & Pancit",
      transformationImage: "/transf1.jpg",
    },
    {
      name: "Duc",
      age: 31,
      location: "Vietnam",
      quote: "Built lean muscle eating pho and banh mi. Finally found a way to gain muscle without giving up my cultural foods.",
      result: "Gained 15lbs Muscle",
      foodHighlight: "Pho & Banh Mi",
      transformationImage: "/transf2.jpg",
    },
    {
      name: "Knight",
      age: 22,
      location: "Football player",
      quote: "Lost 18lbs while still eating rendang weekly. The recipes in the cookbook changed everything for me.",
      result: "Lost 18lbs",
      foodHighlight: "Rendang",
      transformationImage: "/transf3.jpeg",
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 section-light">
      <div className="container px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-secondary-foreground mb-3 sm:mb-4 px-2">
            Real Results. <span className="text-primary">Real Food.</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto px-4 mt-2">
            See how Southeast Asians transformed their bodies while keeping their favorite cultural foods.
          </p>
        </div>

        {/* Testimonials with Transformations */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="group relative"
            >
              {/* Card with gradient border effect */}
              <div className="relative bg-card rounded-sm border border-border overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Transformation Image */}
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={testimonial.transformationImage}
                    alt={`${testimonial.name}'s transformation`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Result badge overlay */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-primary/90 backdrop-blur-sm rounded-sm">
                    <span className="text-xs sm:text-sm font-bold text-accent uppercase tracking-wider">
                      {testimonial.result}
                    </span>
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="p-5 sm:p-6">
                  {/* Quote icon */}
                  <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-primary/30 mb-3 sm:mb-4" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-3 sm:mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-accent text-accent" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm sm:text-base text-foreground mb-4 sm:mb-5 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-border">
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm sm:text-base text-foreground">
                        {testimonial.name}, {testimonial.age}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </div>
                    {/* Food highlight badge */}
                    <div className="px-2 sm:px-2.5 py-1 sm:py-1.5 bg-accent/20 rounded-sm flex-shrink-0">
                      <span className="text-[10px] sm:text-xs font-bold text-accent uppercase">
                        {testimonial.foodHighlight}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicator */}
        <div className="text-center mt-10 sm:mt-12 md:mt-16">
          <p className="text-xs sm:text-sm text-muted-foreground px-4">
            Join 200+ Southeast Asians who transformed without giving up their culture
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsTransformationsSection;

