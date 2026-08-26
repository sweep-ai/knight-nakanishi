import { Award, Users, Calendar, Dumbbell } from "lucide-react";

interface AuthoritySectionProps {
  variant?: "default" | "whop";
}

const AuthoritySection = ({ variant = "default" }: AuthoritySectionProps) => {
  const isWhop = variant === "whop";
  const credentials = [
    { icon: Award, text: "Certified Personal Trainer" },
    { icon: Dumbbell, text: "Sports Nutrition Specialist" },
    { icon: Calendar, text: "5+ Years Coaching Experience" },
    { icon: Users, text: isWhop ? "200+ Clients Coached" : "200+ Clients Transformed" },
  ];

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 section-light">
      <div className="container px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Headshot image */}
            <div className="relative aspect-[4/5] max-w-sm mx-auto rounded-sm overflow-hidden shadow-2xl">
              <img
                src="/Headshot.jpg"
                alt="Knight Nakanishi"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Accent overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary/20 to-transparent" />
              
              {/* Floating accent card */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 p-3 sm:p-4 bg-primary rounded-sm shadow-xl">
                <p className="font-display text-2xl sm:text-3xl md:text-4xl text-accent">100+</p>
                <p className="text-xs sm:text-sm text-accent/80 uppercase tracking-wider">
                  {isWhop ? "Clients Coached" : "Lives Changed"}
                </p>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-secondary-foreground mb-4 sm:mb-6">
                Why I Do This
              </h2>

              <p className="text-sm sm:text-base text-secondary-foreground/80 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                {isWhop ? (
                  <>
                    I'm Knight Nakanishi—grew up in a Thai household with my single mom after losing my dad at 10. I know the struggle of trying to get fit while everyone around you says you have to give up pho, adobo, and pad thai. I gained 50 pounds after losing family, got it off, became ISSA certified, and built a method that keeps Southeast Asian food in the plan. I help clients from Vietnam, Thailand, the Philippines, Malaysia, and beyond get results without the BS restrictions that never worked for us in the first place.
                  </>
                ) : (
                  <>
                    I'm Knight Nakanishi—grew up in a Thai household with my single mom after losing my dad at 10. I know the struggle of trying to get fit while everyone around you says you have to give up pho, adobo, and pad thai. I gained 50 pounds after losing family, got it off, became ISSA certified, and built a method that keeps Southeast Asian food in the plan. I help clients from Vietnam, Thailand, the Philippines, Malaysia, and beyond drop 15-50 lbs without the BS restrictions that never worked for us in the first place.
                  </>
                )}
              </p>

              {/* Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto">
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
