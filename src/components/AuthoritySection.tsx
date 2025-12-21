import { Award, Users, Calendar, Dumbbell } from "lucide-react";

const AuthoritySection = () => {
  const credentials = [
    { icon: Award, text: "Certified Personal Trainer" },
    { icon: Dumbbell, text: "Sports Nutrition Specialist" },
    { icon: Calendar, text: "5+ Years Coaching Experience" },
    { icon: Users, text: "200+ Clients Transformed" },
  ];

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 section-light">
      <div className="container px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Image side */}
            <div className="relative order-2 lg:order-1">
              {/* Main image placeholder */}
              <div className="relative aspect-[4/5] bg-gradient-to-br from-muted to-card rounded-sm overflow-hidden shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6 sm:p-8">
                    <Dumbbell className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-3 sm:mb-4 text-primary/30" />
                    <p className="text-muted-foreground text-xs sm:text-sm uppercase tracking-wider">
                      Knight Nakanishi
                    </p>
                  </div>
                </div>
                {/* Accent overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>

              {/* Floating accent card - repositioned for mobile */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 p-3 sm:p-4 bg-primary rounded-sm shadow-xl">
                <p className="font-display text-2xl sm:text-3xl md:text-4xl text-accent">200+</p>
                <p className="text-xs sm:text-sm text-accent/80 uppercase tracking-wider">
                  Lives Changed
                </p>
              </div>
            </div>

            {/* Content side */}
            <div className="order-1 lg:order-2">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-secondary-foreground mb-4 sm:mb-6">
                Why I Do This
              </h2>

              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-secondary-foreground/80 mb-6 sm:mb-8">
                <p>
                  I'm Knight Nakanishi. I help Southeast Asians get in the best shape of their lives without abandoning their culture.
                </p>
                <p>
                  When I was 10, my family struggled. Football was my outlet—until anhidrosis took it away. Fitness gave me a second chance. It taught me discipline, resilience, and that your circumstances don't define you.
                </p>
                <p>
                  Now, I'm on a mission: prove that you don't need to eat like a Westerner to look and feel incredible. Your food isn't the problem. Bad programming is.
                </p>
                <p className="font-medium text-secondary-foreground">
                  I've helped 200+ people from the Philippines, Vietnam, Malaysia, Thailand, and beyond transform their bodies while eating the foods they grew up with. No BS. No restrictions. Just results.
                </p>
              </div>

              {/* Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {credentials.map((cred) => (
                  <div
                    key={cred.text}
                    className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-background/50 rounded-sm"
                  >
                    <cred.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-secondary-foreground">
                      {cred.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthoritySection;
