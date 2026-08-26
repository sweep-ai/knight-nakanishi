const TRANSFORMATIONS = [
  { name: "Jorge", result: "-60lbs in 7 months", image: "/transf1.jpg" },
  { name: "Meadow", result: "-25lbs in 3 months", image: "/transf2.jpg" },
  { name: "Knight", result: "Lost 18lbs", image: "/transf3.jpeg" },
  { name: "Prong", result: "Healthiest ever", image: "/transf6.jpeg" },
  { name: "Toss", result: "Lost 150 lbs in 1.5 years", image: "/transf7.jpg" },
];

const ScrollingBanner = () => {
  const loop = [...TRANSFORMATIONS, ...TRANSFORMATIONS];

  return (
    <div className="overflow-hidden border-y border-border bg-background">
      <div className="flex w-max animate-proof-marquee">
        {loop.map((item, i) => (
          <div
            key={`${item.image}-${i}`}
            className="flex-shrink-0 w-40 sm:w-52 md:w-56"
          >
            <div
              className={`h-52 sm:h-64 md:h-72 overflow-hidden ${
                item.image === "/transf7.jpg" ? "bg-white" : "bg-muted"
              }`}
            >
              <img
                src={item.image}
                alt={`${item.name} transformation`}
                className={`h-full w-full ${
                  item.image === "/transf7.jpg" ? "object-contain" : "object-cover"
                }`}
                loading="lazy"
              />
            </div>
            <div className="px-2 py-2 border-t border-border">
              <p className="text-xs font-bold text-foreground truncate">{item.name}</p>
              <p className="text-[10px] sm:text-xs font-semibold text-primary uppercase tracking-wider truncate">
                {item.result}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingBanner;
