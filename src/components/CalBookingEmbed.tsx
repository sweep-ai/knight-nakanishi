import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { APPLICANT_STORAGE_KEY, CAL_LINK, funnelEvent } from "@/config/funnel";
import { trackMeta } from "@/lib/metaPixel";
import { getSessionId, trackEvent } from "@/lib/sweep";

const CAL_ORIGIN = "https://app.cal.com";
const CAL_NAMESPACE = "coaching-gameplan-call";
const CONTAINER_ID = "cal-booking-inline";

type CalFn = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, CalFn>;
  q?: unknown[];
};

declare global {
  interface Window {
    Cal?: CalFn;
  }
}

/** Standard Cal.com embed loader snippet, typed. */
function loadCal(): CalFn {
  if (window.Cal) return window.Cal;
  const cal: CalFn = function (...args: unknown[]) {
    const api = window.Cal as CalFn;
    if (!api.loaded) {
      api.ns = {};
      api.q = api.q || [];
      const script = document.createElement("script");
      script.src = `${CAL_ORIGIN}/embed/embed.js`;
      script.async = true;
      document.head.appendChild(script);
      api.loaded = true;
    }
    if (args[0] === "init") {
      const namespace = args[1];
      const queued: CalFn = function (...a: unknown[]) {
        (queued.q = queued.q || []).push(a);
      };
      if (typeof namespace === "string") {
        api.ns![namespace] = api.ns![namespace] || queued;
        (api.ns![namespace].q = api.ns![namespace].q || []).push(args);
        (api.q = api.q || []).push(["initNamespace", namespace]);
      } else {
        (api.q = api.q || []).push(args);
      }
      return;
    }
    (api.q = api.q || []).push(args);
  } as CalFn;
  window.Cal = cal;
  return cal;
}

/** Contact info saved by the quiz, used to prefill the Cal booking form. */
function readApplicant(): { name?: string; email?: string; phone?: string } {
  try {
    const raw = sessionStorage.getItem(APPLICANT_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as { name?: string; email?: string; phone?: string }) : {};
  } catch {
    return {};
  }
}

/** Cal phone fields expect E.164. Assume US for 10-digit numbers. */
function toE164(phone: string | undefined): string | undefined {
  if (!phone) return undefined;
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length >= 11) return `+${digits}`;
  return undefined;
}

const CalBookingEmbed = () => {
  const navigate = useNavigate();
  const routed = useRef(false);

  useEffect(() => {
    const Cal = loadCal();
    Cal("init", CAL_NAMESPACE, { origin: CAL_ORIGIN });
    const ns = Cal.ns![CAL_NAMESPACE] as CalFn;

    const applicant = readApplicant();
    const phone = toE164(applicant.phone);
    const prefill: Record<string, string> = {};
    if (applicant.name?.trim()) prefill.name = applicant.name.trim();
    if (applicant.email?.trim()) prefill.email = applicant.email.trim();
    if (phone) {
      prefill.smsReminderNumber = phone; // "text notifications" field
      prefill.attendeePhoneNumber = phone; // plain phone field, if enabled
    }

    ns("inline", {
      elementOrSelector: `#${CONTAINER_ID}`,
      config: { layout: "month_view", ...prefill },
      calLink: CAL_LINK,
    });
    ns("ui", { hideEventTypeDetails: false, layout: "month_view" });

    ns("on", {
      action: "bookingSuccessful",
      callback: () => {
        if (routed.current) return;
        routed.current = true;
        const sessionId = getSessionId();
        void trackEvent(funnelEvent.callBooked, { page_id: "booking" }, `${funnelEvent.callBooked}_${sessionId}`);
        trackMeta("Schedule");
        navigate("/post-booking", { replace: true });
      },
    });
  }, [navigate]);

  return (
    <div
      id={CONTAINER_ID}
      className="block w-full bg-card"
      style={{ width: "100%", minHeight: "700px", overflow: "auto" }}
    />
  );
};

export default CalBookingEmbed;
