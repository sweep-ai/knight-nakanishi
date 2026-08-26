import { LazyWistiaCard } from "@/components/LazyWistiaCard";

const VIDEOS = [
  {
    name: "Jacean",
    caption: "Body recomp, full transformation",
    mediaId: "widn259h9b",
    poster: "https://embed-ssl.wistia.com/deliveries/8d89e1ee66ebe22c2d0cd23110b8e1bb4ef55fc2.jpg",
    aspect: 960 / 1707,
  },
  {
    name: "Josh",
    mediaId: "kiossjhvcm",
    poster: "https://embed-ssl.wistia.com/deliveries/b52ce1c01440b3e02ecaecd6fd542135772896a8.jpg",
    aspect: 960 / 1707,
  },
  {
    name: "Kriana",
    mediaId: "btilh62nfm",
    poster: "https://embed-ssl.wistia.com/deliveries/6d67408567756f924e6e69e5f7b7fc5bed997a67.jpg",
    aspect: 960 / 1707,
  },
  {
    name: "Margaret",
    mediaId: "89h8lt0gfg",
    poster: "https://embed-ssl.wistia.com/deliveries/fc97aefaedded7608d29a762925a7dfd84a1cff1.jpg",
    aspect: 960 / 1707,
  },
  {
    name: "Prong",
    mediaId: "zdlqv1nh8a",
    poster: "https://embed-ssl.wistia.com/deliveries/d20a408b4fa93e56cec03c8f4093c72b912a8fbd.jpg",
    aspect: 960 / 1707,
  },
  {
    name: "Alman",
    mediaId: "kmgcnh0bjp",
    poster: "https://embed-ssl.wistia.com/deliveries/0a36fb93d155ebffb7e8a8a38c4947c348c37888.jpg",
    aspect: 960 / 1707,
  },
  {
    name: "Phillip",
    mediaId: "9y2yo1t08e",
    poster: "https://embed-ssl.wistia.com/deliveries/117c7317e8597b3910639dd38195761e67e59771.jpg",
    aspect: 960 / 1707,
  },
  {
    name: "Jack",
    mediaId: "ajvyyzyksl",
    poster: "https://embed-ssl.wistia.com/deliveries/983efc820ff5b59282bcc25d618eaa710eb5991f.jpg",
    aspect: 960 / 1707,
  },
];

const TestimonialVideosSection = () => {
  return (
    <section className="py-10 sm:py-14 section-dark">
      <div className="container px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">
            Client <span className="text-primary">Stories</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-3xl mx-auto">
          {VIDEOS.map((video) => (
            <LazyWistiaCard key={video.mediaId} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialVideosSection;
