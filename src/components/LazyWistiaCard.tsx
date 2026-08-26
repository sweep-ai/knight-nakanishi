import { useEffect, useRef, useState } from "react";
import { WistiaPlayer } from "@wistia/wistia-player-react";

export type WistiaClip = {
  name?: string;
  caption?: string;
  mediaId: string;
  poster: string;
  aspect: number;
};

export const LazyWistiaCard = ({ video }: { video: WistiaClip }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "280px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="overflow-hidden rounded-sm border border-border bg-card">
      <div className="relative w-full overflow-hidden bg-muted" style={{ aspectRatio: `${video.aspect}` }}>
        {active ? (
          <WistiaPlayer mediaId={video.mediaId} aspect={video.aspect} />
        ) : (
          <img src={video.poster} alt="" className="h-full w-full object-cover" loading="lazy" />
        )}
      </div>
      {video.name ? (
        <div className="px-3 py-2.5">
          <p className="font-bold text-sm text-foreground">{video.name}</p>
          {video.caption ? <p className="text-xs text-muted-foreground mt-0.5">{video.caption}</p> : null}
        </div>
      ) : null}
    </div>
  );
};
