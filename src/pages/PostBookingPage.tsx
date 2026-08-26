import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { WistiaPlayer } from "@wistia/wistia-player-react";
import Footer from "@/components/Footer";
import { LazyWistiaCard } from "@/components/LazyWistiaCard";
import { trackEvent } from "@/lib/sweep";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Who is this not a good fit for?",
    a: "If you are looking for a quick fix, an extreme crash diet, or you are not willing to log your food and check in consistently, this is not going to be a good fit. This works best for people who are ready to follow a structured plan for at least a few months and want something sustainable rather than a 2 week reset.",
  },
  {
    q: "So how does it actually work day to day?",
    a: "You get a personalized macro target based on your goals, body, and the foods you actually eat. Each week you log your meals and training, your coach reviews your check in, and your plan gets adjusted based on how your body is responding. There is no rigid meal plan to follow exactly, the structure flexes around real life, including work, family meals, and eating out.",
  },
  {
    q: "What actually happens on the call I booked?",
    a: "The call is a conversation to understand your current situation, your goals, your schedule, and what you have tried before. From there we walk you through what the SEA Macro Method would look like for you specifically, and you can ask any questions about pricing, structure, or what coaching actually involves. There is no pressure, it is simply to figure out if this is the right fit.",
  },
  {
    q: "Can I still eat out with friends and family, or does that mess everything up?",
    a: "Yes, eating out is part of real life and the plan is built to handle it. Your coach will show you how to fit restaurant meals, gatherings, and family dinners into your macros without derailing your progress. One meal out does not undo a week of consistency, and you will learn how to navigate those situations instead of avoiding them.",
  },
  {
    q: "I work long or irregular hours, will the plan actually account for that, or just say it will?",
    a: "Yes, and this is one of the most common situations we work with. A large portion of our clients are healthcare workers and overnight shift employees. Your meal timing, portions, and check in schedule are built around your actual shift pattern, not a generic 9 to 5 template that assumes you eat breakfast at 7am and dinner at 6pm.",
  },
  {
    q: "How quickly will I actually start seeing results?",
    a: "Most clients start noticing changes in energy, digestion, and how their clothes fit within the first few weeks, with visible physical changes typically becoming clear within 4 to 8 weeks of consistency. Exact timelines depend on your starting point, but the structure is designed to produce steady week over week progress rather than a slow burn with no feedback.",
  },
  {
    q: "Could I not just figure all of this out myself using free information online?",
    a: "You could piece together information, but most free resources are generic and were not built with your food, schedule, or background in mind, which is often why past attempts have not stuck. What you are paying for here is not information, it is a plan built specifically around your situation and a coach who adjusts it with you as you go, which is very different from trying to figure it out alone from scattered sources.",
  },
];

const PORTRAIT = 960 / 1707;

const resultVideos = [
  {
    mediaId: "kiossjhvcm",
    poster: "https://embed-ssl.wistia.com/deliveries/b52ce1c01440b3e02ecaecd6fd542135772896a8.jpg",
    aspect: PORTRAIT,
  },
  {
    mediaId: "btilh62nfm",
    poster: "https://embed-ssl.wistia.com/deliveries/6d67408567756f924e6e69e5f7b7fc5bed997a67.jpg",
    aspect: PORTRAIT,
  },
  {
    mediaId: "89h8lt0gfg",
    poster: "https://embed-ssl.wistia.com/deliveries/fc97aefaedded7608d29a762925a7dfd84a1cff1.jpg",
    aspect: PORTRAIT,
  },
  {
    mediaId: "zdlqv1nh8a",
    poster: "https://embed-ssl.wistia.com/deliveries/d20a408b4fa93e56cec03c8f4093c72b912a8fbd.jpg",
    aspect: PORTRAIT,
  },
  {
    mediaId: "rvdo5r03se",
    poster: "https://embed-ssl.wistia.com/deliveries/c86fb8a164fa77b5655781ce59341577ea4ecf10.jpg",
    aspect: PORTRAIT,
  },
  {
    mediaId: "3y6urf6jwt",
    poster: "https://embed-ssl.wistia.com/deliveries/0e90acbcb66434e563b5ccc8ec3925fe8cd1c87c.jpg",
    aspect: PORTRAIT,
  },
];

const extraYtIds = ["AcQIp0mGLr4", "AcQIp0mGLr4", "AcQIp0mGLr4"];

const lockInSteps = [
  "Add this call to your calendar now so it does not get buried or forgotten",
  "Find a quiet spot where you can talk for the full call without distractions",
  "Watch the video below beforehand so the call moves straight into your plan, not the basics",
];

const StepPill = ({ n }: { n: number }) => (
  <div className="flex justify-center mb-4">
    <span className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-1 text-xs sm:text-sm font-bold uppercase tracking-wider text-accent">
      Step {n}
    </span>
  </div>
);

const PostBookingPage = () => {
  const [watchedMethod, setWatchedMethod] = useState(false);

  useEffect(() => {
    void trackEvent("quiz_page_view", { page_id: "post-booking" });
    document.title = "Confirm your call | Knight Nakanishi Fitness";
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex, nofollow");
  }, []);

  return (
    <main className="overflow-hidden section-dark min-h-screen">
      <div className="container px-4 sm:px-6 py-10 sm:py-14">
        <div className="max-w-2xl mx-auto space-y-8">
          <header className="text-center space-y-3">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-none">
              Your Call Is <span className="text-primary">Confirmed</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-accent font-bold">
              Complete the steps below to prepare for your transformation call
            </p>
          </header>

          <div>
            <StepPill n={1} />
            <p className="text-sm sm:text-base text-muted-foreground text-center mb-4">
              This video is <span className="text-primary font-bold uppercase tracking-wider">mandatory</span> before your call. Watch it so the session can focus on your specific plan instead of covering basics.
            </p>
            <div className="overflow-hidden rounded-sm border border-border bg-card">
              <WistiaPlayer mediaId="q64tsjd34l" aspect={16 / 9} />
            </div>
            <div className="mt-6 bg-card border-l-4 border-accent rounded-sm p-5 sm:p-6">
              <p className="text-sm sm:text-base text-foreground font-medium mb-2">
                After completing the video resources below
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Check your <span className="text-accent font-semibold">email</span> and <span className="text-accent font-semibold">text messages</span> for confirmation details and expect a <span className="text-accent font-semibold">phone call</span> to finalize your call time. If you don&apos;t see the confirmation, check your spam folder or contact us at <a href="mailto:info@knightfit.io" className="text-accent hover:underline">info@knightfit.io</a>.
              </p>
            </div>
          </div>

          <section>
            <StepPill n={2} />
            <div className="bg-card rounded-lg p-5 sm:p-8">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide mb-6">
              Before the call, <span className="text-accent">lock in your spot</span>
            </h2>
            <ul className="space-y-4 mb-6">
              {lockInSteps.map((step) => (
                <li key={step} className="flex gap-3 text-sm sm:text-base text-foreground">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Spots are limited each week and reserved specifically for you. If something comes up, please reschedule
              rather than no show, this keeps the time open for someone else who is ready.
            </p>
            </div>
          </section>

          <section>
            <StepPill n={3} />
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-3">The SEA Macro Method</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-5 leading-relaxed">
              This is the exact method we will be talking about on your call. It is built around the foods you already
              eat, Pho, Adobo, Larb, Pad Krapow, Pad Thai, and structured to fit your schedule instead of replacing it.
            </p>
            <div className="overflow-hidden rounded-sm border border-border bg-card">
              <WistiaPlayer
                mediaId="hbt4xagwap"
                aspect={16 / 9}
                onEnd={() => setWatchedMethod(true)}
                onPercentWatchedChange={(pct: number) => {
                  if (pct >= 85) setWatchedMethod(true);
                }}
              />
            </div>
            <p
              className={`mt-3 text-sm font-medium ${
                watchedMethod ? "text-accent" : "text-primary"
              }`}
            >
              {watchedMethod
                ? "Watched. You're ready for the call."
                : "Watch this full video before your call. The session assumes you already saw it."}
            </p>
          </section>

          <section>
            <StepPill n={4} />
            <h2 className="font-display text-2xl sm:text-3xl mb-6 text-center">FAQ</h2>
            <Accordion type="single" collapsible className="w-full bg-card border border-border rounded-sm">
              {faqs.map((item, index) => (
                <AccordionItem key={item.q} value={`item-${index}`} className="px-5 last:border-b-0">
                  <AccordionTrigger className="text-left font-display text-base sm:text-lg hover:no-underline hover:text-primary">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section>
            <StepPill n={5} />
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-4 text-center">
              Check out our client results
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {resultVideos.map((video) => (
                <LazyWistiaCard key={video.mediaId} video={video} />
              ))}
            </div>
            <div className="mt-6 space-y-4">
              {extraYtIds.map((id, i) => (
                <div
                  key={`${id}-${i}`}
                  className="relative w-full overflow-hidden rounded-sm border border-border bg-card"
                  style={{ aspectRatio: "16 / 9" }}
                >
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${id}`}
                    title={`Client results video ${i + 1}`}
                    className="absolute inset-0 h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default PostBookingPage;
