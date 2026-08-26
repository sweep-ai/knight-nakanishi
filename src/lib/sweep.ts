import { API_BASE_URL, FUNNEL_ID } from "@/config/funnel";

export type TrackResult =
  | { ok: true; status: "accepted" | "duplicate"; eventId?: string }
  | { ok: false; error: string };

export type LeadPayload = {
  email?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  instagram?: string;
  notes?: string;
  source?: string;
  quiz_answers?: Record<string, unknown>;
  opt_in_data?: Record<string, unknown>;
  funnel_step_reached?: string;
};

function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  let v = localStorage.getItem("sweep_visitor_id");
  if (!v) {
    v = `visitor_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    localStorage.setItem("sweep_visitor_id", v);
  }
  return v;
}

export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let s = sessionStorage.getItem("sweep_session_id");
  if (!s) {
    s = `session_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    sessionStorage.setItem("sweep_session_id", s);
  }
  return s;
}

export async function trackEvent(
  eventName: string,
  metadata: Record<string, unknown> = {},
  idempotencyKey?: string
): Promise<TrackResult> {
  if (!FUNNEL_ID) return { ok: false, error: "FUNNEL_ID not configured" };

  const body: Record<string, unknown> = {
    funnel_id: FUNNEL_ID,
    event_name: eventName,
    visitor_id: getVisitorId(),
    session_id: getSessionId(),
    metadata: {
      ...metadata,
      page_url: typeof window !== "undefined" ? window.location.href : undefined,
      page_title: typeof document !== "undefined" ? document.title : undefined,
      referrer: typeof document !== "undefined" ? document.referrer || undefined : undefined,
    },
    event_timestamp: new Date().toISOString(),
  };
  if (idempotencyKey) body.idempotency_key = idempotencyKey;

  try {
    const res = await fetch(`${API_BASE_URL}/funnels/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const detail = await res.json().catch(() => ({}));
      return { ok: false, error: (detail as { detail?: string }).detail ?? res.statusText };
    }
    const data = (await res.json()) as { event_id?: string; status?: string };
    return {
      ok: true,
      status: data.status === "duplicate" ? "duplicate" : "accepted",
      eventId: data.event_id,
    };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "network error" };
  }
}

export async function submitLead(
  fields: LeadPayload
): Promise<{ clientId?: string; created?: boolean; error?: string }> {
  if (!FUNNEL_ID) return { error: "FUNNEL_ID not configured" };

  try {
    const res = await fetch(`${API_BASE_URL}/funnels/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ funnel_id: FUNNEL_ID, ...fields }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { error: (data as { detail?: string }).detail ?? res.statusText };
    }
    const row = data as { client_id: string; created: boolean };
    return { clientId: row.client_id, created: row.created };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "network error" };
  }
}
