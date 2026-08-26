import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GHL_BOOKING_URL } from "@/config/funnel";

const BOOKING_SRC = GHL_BOOKING_URL;
const EMBED_SCRIPT = "https://link.msgsndr.com/js/form_embed.js";
const IFRAME_ID = "ghl-booking-oHvLoFT0GF89AbUm91OG";

function isBookingComplete(data: unknown): boolean {
  if (Array.isArray(data) && data[0] === "msgsndr-booking-complete") return true;
  if (data === "msgsndr-booking-complete" || data === "booking_complete") return true;
  if (data && typeof data === "object") {
    const rec = data as Record<string, unknown>;
    const type = String(rec.type ?? rec.event ?? rec.name ?? "");
    if (type.includes("booking-complete") || type.includes("booking_complete")) return true;
  }
  return false;
}

const GhlBookingEmbed = () => {
  const navigate = useNavigate();
  const routed = useRef(false);

  useEffect(() => {
    if (!document.querySelector(`script[src="${EMBED_SCRIPT}"]`)) {
      const script = document.createElement("script");
      script.src = EMBED_SCRIPT;
      script.async = true;
      document.body.appendChild(script);
    }

    const goPostBooking = () => {
      if (routed.current) return;
      routed.current = true;
      navigate("/post-booking", { replace: true });
    };

    const onMessage = (e: MessageEvent) => {
      const origin = e.origin || "";
      if (
        origin &&
        !origin.includes("leadconnectorhq.com") &&
        !origin.includes("msgsndr.com") &&
        !origin.includes("gohighlevel.com")
      ) {
        return;
      }
      if (isBookingComplete(e.data)) goPostBooking();
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [navigate]);

  return (
    <iframe
      src={BOOKING_SRC}
      id={IFRAME_ID}
      title="Book your strategy call"
      allow="payment"
      scrolling="no"
      className="block w-full border-0 bg-card"
      style={{ width: "100%", minHeight: "800px", overflow: "hidden" }}
    />
  );
};

export default GhlBookingEmbed;
