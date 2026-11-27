import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
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

let calPreloadStarted = false;

/** Warm the Cal script and calendar assets while the quiz is still on screen. */
export function preloadCalBooking() {
  if (calPreloadStarted) return;
  calPreloadStarted = true;
  const Cal = loadCal();
  Cal("init", CAL_NAMESPACE, { origin: CAL_ORIGIN });
  const ns = Cal.ns?.[CAL_NAMESPACE];
  ns?.("preload", { calLink: CAL_LINK });
}

const CalBookingEmbed = () => {
  const navigate = useNavigate();
  const routed = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const Cal = loadCal();
    Cal("init", CAL_NAMESPACE, { origin: CAL_ORIGIN });
    const ns = Cal.ns![CAL_NAMESPACE] as CalFn;

    const goPostBooking = (e?: { detail?: { data?: { startTime?: unknown; endTime?: unknown } } }) => {
      if (routed.current) return;
      routed.current = true;
      try {
        const sessionId = getSessionId();
        void trackEvent(funnelEvent.callBooked, { page_id: "booking" }, `${funnelEvent.callBooked}_${sessionId}`);
        trackMeta("Schedule");
      } catch (error) {
        console.error("booking tracking:", error);
      }
      // Move the lead to CloseLoop's "booked" scenario. keepalive survives the route change.
      try {
        const applicant = readApplicant();
        const data = e?.detail?.data;
        if (applicant.phone) {
          void fetch("/api/closeloop-booked", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            keepalive: true,
            body: JSON.stringify({
              name: applicant.name,
              email: applicant.email,
              phone: applicant.phone,
              callStart: typeof data?.startTime === "string" ? data.startTime : undefined,
              callEnd: typeof data?.endTime === "string" ? data.endTime : undefined,
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            }),
          }).catch((error) => console.error("closeloop-booked:", error));
        }
      } catch (error) {
        console.error("closeloop-booked:", error);
      }
      navigate("/post-booking", { replace: true });
    };

    // bookingSuccessful is deprecated. Current embeds emit bookingSuccessfulV2.
    const successActions = ["bookingSuccessfulV2", "bookingSuccessful"] as const;
    for (const action of successActions) {
      ns("on", { action, callback: goPostBooking });
    }

    // Hide the loading state once the calendar has rendered (or failed, so it never hangs).
    const markReady = () => setReady(true);
    const readyActions = ["linkReady", "linkFailed"] as const;
    for (const action of readyActions) {
      ns("on", { action, callback: markReady });
    }
    const readyFallback = window.setTimeout(markReady, 8000);

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

    return () => {
      for (const action of successActions) {
        ns("off", { action, callback: goPostBooking });
      }
      for (const action of readyActions) {
        ns("off", { action, callback: markReady });
      }
      window.clearTimeout(readyFallback);
    };
  }, [navigate]);

  return (
    <div className="relative w-full">
      <div
        id={CONTAINER_ID}
        className="block w-full bg-card"
        style={{ width: "100%", minHeight: "700px", overflow: "auto" }}
      />
      {!ready && (
        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-start gap-3 bg-card pt-24 text-muted-foreground"
          role="status"
          aria-live="polite"
        >
          <Loader2 className="h-7 w-7 animate-spin text-accent" aria-hidden />
          <span className="text-sm">Loading available times…</span>
        </div>
      )}
    </div>
  );
};

export default CalBookingEmbed;
