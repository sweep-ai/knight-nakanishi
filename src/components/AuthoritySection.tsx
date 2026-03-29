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
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Image side */}
            <div className="relative order-2 lg:order-1">
              {/* Headshot image */}
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
                <img
                  src="/Headshot.jpg"
                  alt="Knight Nakanishi"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Accent overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>

              {/* Floating accent card - repositioned for mobile */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 p-3 sm:p-4 bg-primary rounded-sm shadow-xl">
                <p className="font-display text-2xl sm:text-3xl md:text-4xl text-accent">100+</p>
                <p className="text-xs sm:text-sm text-accent/80 uppercase tracking-wider">
                  {isWhop ? "Clients Coached" : "Lives Changed"}
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
                  I'm Knight Nakanishi. Born in Broward County to a Thai mom and Japanese dad, I grew up in a full Thai household. At 10 I lost my father. Football became my outlet and saved my life.
                </p>
                <p>
                  {isWhop ? (
                    <>
                      In high school anhidrosis took football away. I turned to lifting; a year later I was cleared to play. My senior year I lost my uncle and my grandpa within months. I coped with binge eating and partying and my health and energy took a hit. I had 14 scholarship offers but didn&apos;t feel like myself. I rebuilt my training and nutrition habits, became ISSA certified, and launched online coaching in July 2024. My clients stayed more consistent with the accountability that in-person coaching couldn&apos;t match.
                    </>
                  ) : (
                    <>
                      In high school anhidrosis took football away. I turned to lifting; a year later I was cleared to play. My senior year I lost my uncle and my grandpa within months. I coped with binge eating and partying and gained 50 pounds. I had 14 scholarship offers but didn&apos;t feel like myself. I got the weight off, became ISSA certified, and launched online coaching in July 2024. My clients got better results with the accountability that in-person coaching couldn&apos;t match.
                    </>
                  )}
                </p>
                <p>
                  {isWhop ? (
                    <>
                      I&apos;ve seen the struggle of growing up with a Thai single mom. Our food is the best in the world—and it belongs in your plan. I help people from Vietnam, Malaysia, Thailand, the Philippines, and beyond build fitness and nutrition habits around the foods they grew up with. No BS. No gimmicks—just coaching that fits real life.
                    </>
                  ) : (
                    <>
                      I&apos;ve seen the struggle of growing up with a Thai single mom. Our food is the best in the world. Why give it up to get in shape? I help people from Vietnam, Malaysia, Thailand, the Philippines, and beyond transform their bodies while eating the foods they grew up with. No BS. No restrictions. Just results.
                    </>
                  )}
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
