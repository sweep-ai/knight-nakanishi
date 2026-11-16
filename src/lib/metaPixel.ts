type MetaEvent = "PageView" | "Lead" | "Schedule";

type MetaMatch = {
  eventId?: string;
  eventTime?: number;
  email?: string;
  phone?: string;
  name?: string;
};

const PIXEL_ID = "2443434819397044";
const LEAD_EVENT_KEY = "meta_lead_event_id";
const LEAD_TIME_KEY = "meta_lead_event_time";
const SCHEDULE_EVENT_KEY = "meta_schedule_event_id";
const SCHEDULE_TIME_KEY = "meta_schedule_event_time";
const MATCH_KEY = "meta_match";
const FBP_WAIT_MS = 800;

function visitorId(): string {
  let id = localStorage.getItem("sweep_visitor_id");
  if (!id) {
    id = `visitor_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    localStorage.setItem("sweep_visitor_id", id);
  }
  return id;
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function cookie(name: string): string | undefined {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function ensureFbc(): string | undefined {
  const existing = cookie("_fbc");
  if (existing) return existing;
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  if (!fbclid) return undefined;
  const value = `fb.1.${Date.now()}.${fbclid}`;
  document.cookie = `_fbc=${encodeURIComponent(value)}; path=/; max-age=7776000; samesite=lax`;
  return value;
}

async function waitForFbp(): Promise<string | undefined> {
  const started = Date.now();
  let fbp = cookie("_fbp");
  while (!fbp && Date.now() - started < FBP_WAIT_MS) {
    await new Promise((resolve) => window.setTimeout(resolve, 100));
    fbp = cookie("_fbp");
  }
  return fbp;
}

export function normalizeEmail(email: string | undefined): string | undefined {
  const value = email?.trim().toLowerCase();
  if (!value || !value.includes("@")) return undefined;
  return value;
}

export function normalizePhone(phone: string | undefined): string | undefined {
  if (!phone) return undefined;
  let digits = phone.replace(/\D/g, "").replace(/^0+/, "");
  if (digits.length === 10) digits = `1${digits}`;
  if (digits.length < 11) return undefined;
  return digits;
}

export function splitName(name: string | undefined): { first?: string; last?: string } {
  if (!name) return {};
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const clean = (part: string) => part.toLowerCase().replace(/[^\p{L}]/gu, "");
  const first = parts[0] ? clean(parts[0]) : "";
  const last = parts.length > 1 ? clean(parts.slice(1).join("")) : "";
  return { first: first || undefined, last: last || undefined };
}

function readMatch(): MetaMatch {
  // sessionStorage first, localStorage fallback so a new tab / reset session keeps match data.
  for (const store of [sessionStorage, localStorage]) {
    try {
      const raw = store.getItem(MATCH_KEY);
      if (raw) return JSON.parse(raw) as MetaMatch;
    } catch {
      // try next store
    }
  }
  return {};
}

function saveMatch(details: MetaMatch) {
  if (!details.email && !details.phone && !details.name) return;
  const prev = readMatch();
  const value = JSON.stringify({
    email: details.email || prev.email,
    phone: details.phone || prev.phone,
    name: details.name || prev.name,
  });
  for (const store of [sessionStorage, localStorage]) {
    try {
      store.setItem(MATCH_KEY, value);
    } catch {
      // storage blocked or full
    }
  }
}

function attachAdvancedMatch(match: MetaMatch) {
  if (typeof window.fbq !== "function") return;
  const userData: Record<string, string> = {};
  const email = normalizeEmail(match.email);
  const phone = normalizePhone(match.phone);
  const { first, last } = splitName(match.name);
  const externalId = visitorId();
  if (email) userData.em = email;
  if (phone) userData.ph = phone;
  if (first) userData.fn = first;
  if (last) userData.ln = last;
  if (externalId) userData.external_id = externalId;
  if (Object.keys(userData).length) window.fbq("init", PIXEL_ID, userData);
}

function sendCapi(body: Record<string, unknown>) {
  void waitForFbp().then((fbp) => {
    void fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, fbp: fbp || body.fbp }),
      keepalive: true,
    }).catch(() => {});
  });
}

export function trackMeta(event: MetaEvent, details: MetaMatch = {}) {
  const eventId = details.eventId || crypto.randomUUID();
  const eventTime = details.eventTime || Math.floor(Date.now() / 1000);
  saveMatch(details);
  if (!details.eventId && event === "Lead") {
    sessionStorage.setItem(LEAD_EVENT_KEY, eventId);
    sessionStorage.setItem(LEAD_TIME_KEY, String(eventTime));
  }
  if (!details.eventId && event === "Schedule") {
    sessionStorage.setItem(SCHEDULE_EVENT_KEY, eventId);
    sessionStorage.setItem(SCHEDULE_TIME_KEY, String(eventTime));
  }

  const match = { ...readMatch(), ...details };
  attachAdvancedMatch(match);
  if (typeof window.fbq === "function") {
    window.fbq("track", event, {}, { eventID: eventId });
  }

  const { first, last } = splitName(match.name);
  sendCapi({
    event_name: event,
    event_id: eventId,
    event_time: eventTime,
    event_source_url: window.location.href,
    fbp: cookie("_fbp"),
    fbc: ensureFbc(),
    email: normalizeEmail(match.email),
    phone: normalizePhone(match.phone),
    first_name: first,
    last_name: last,
    external_id: visitorId(),
  });

  return eventId;
}

export function replayMeta(event: "Lead" | "Schedule") {
  const eventId = sessionStorage.getItem(event === "Lead" ? LEAD_EVENT_KEY : SCHEDULE_EVENT_KEY);
  if (!eventId) return;
  const timeKey = event === "Lead" ? LEAD_TIME_KEY : SCHEDULE_TIME_KEY;
  const storedTime = Number(sessionStorage.getItem(timeKey));
  trackMeta(event, {
    ...readMatch(),
    eventId,
    eventTime: Number.isFinite(storedTime) && storedTime > 0 ? storedTime : undefined,
  });
}
