interface AuthoritySectionProps {
  variant?: "default" | "whop";
}

const credentials = [
  "ISSA Certified Personal Trainer",
  "Sports Nutrition Specialist",
  "5+ years coaching",
  "200+ clients coached",
];

const AuthoritySection = ({ variant: _variant = "default" }: AuthoritySectionProps) => {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 section-dark">
      <div className="container px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:items-center">
          <div className="relative max-w-sm w-[88%] mx-auto lg:w-full lg:max-w-none">
            <img
              src="/Headshot.jpg"
              alt="Knight Nakanishi"
              className="w-full aspect-square object-cover object-[center_18%] rounded-[22px] border-2 border-border"
              loading="lazy"
            />
            <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-accent text-accent-foreground flex flex-col items-center justify-center text-center shadow-xl rotate-3">
              <p className="font-display text-3xl sm:text-4xl leading-none">200+</p>
              <p className="text-[10px] font-bold uppercase tracking-wider leading-tight max-w-[4.5rem] mt-1">
                Clients Coached
              </p>
            </div>
          </div>

          <div className="text-left">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.04] mb-4">
              Hey, I&apos;m Knight.
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-[#e6d8cb] leading-relaxed mb-6">
              <p>
                Thai and Japanese, ex-football player.
                <br />
                After losing family I put on 50 lbs.
              </p>
              <p>
                The gym became my outlet, and I learned to get in shape without giving up my food.
                Now I teach that.
              </p>
            </div>
            <p className="font-display text-2xl sm:text-3xl text-accent uppercase leading-[1.1] mb-6">
              &ldquo;Find your outlet and keep going.&rdquo;
            </p>
            <ul className="grid grid-cols-2 gap-2 sm:gap-3">
              {credentials.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-border bg-card px-3 py-3 text-sm font-medium leading-snug"
                >
                  <span className="text-accent font-bold">✓ </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthoritySection;
