import { createHash } from "crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const PIXEL_ID = "2443434819397044";
const EVENTS = new Set(["PageView", "Lead", "Schedule"]);

function env(name: string): string {
  return (process.env[name] || "").trim();
}

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function hashEmail(email: unknown): string | undefined {
  if (typeof email !== "string") return undefined;
  const value = email.trim().toLowerCase();
  if (!value.includes("@")) return undefined;
  return sha256(value);
}

function hashPhone(phone: unknown): string | undefined {
  if (typeof phone !== "string") return undefined;
  let digits = phone.replace(/\D/g, "").replace(/^0+/, "");
  if (digits.length === 10) digits = `1${digits}`;
  if (digits.length < 11) return undefined;
  return sha256(digits);
}

function hashToken(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const cleaned = value.trim().toLowerCase().replace(/[^\p{L}]/gu, "");
  if (!cleaned) return undefined;
  return sha256(cleaned);
}

function hashExternalId(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const id = value.trim();
  if (!id) return undefined;
  return sha256(id);
}

function eventTime(value: unknown): number {
  const now = Math.floor(Date.now() / 1000);
  const time = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(time)) return now;
  if (time > now + 60 || time < now - 7 * 24 * 60 * 60) return now;
  return Math.floor(time);
}

function clientIp(req: VercelRequest): string | undefined {
  const forwarded = req.headers["x-forwarded-for"];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  const ip = raw?.split(",")[0]?.trim();
  if (!ip || ip === "::1" || ip === "127.0.0.1") return undefined;
  return ip;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = env("CAPI_TOKEN");
  if (!token) {
    return res.status(500).json({ error: "CAPI_TOKEN not configured" });
  }

  let body: Record<string, unknown>;
  try {
    body = (typeof req.body === "string" ? JSON.parse(req.body) : req.body) || {};
  } catch {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const eventName = typeof body.event_name === "string" ? body.event_name : "";
  const eventId = typeof body.event_id === "string" ? body.event_id.trim() : "";
  const sourceUrl = typeof body.event_source_url === "string" ? body.event_source_url : "";
  if (!EVENTS.has(eventName) || !eventId || !sourceUrl) {
    return res.status(400).json({ error: "Invalid event" });
  }

  const userData: Record<string, string> = {};
  const email = hashEmail(body.email);
  const phone = hashPhone(body.phone);
  const first = hashToken(body.first_name);
  const last = hashToken(body.last_name);
  const externalId = hashExternalId(body.external_id);
  const ip = clientIp(req);
  const ua = req.headers["user-agent"];
  if (email) userData.em = email;
  if (phone) userData.ph = phone;
  if (first) userData.fn = first;
  if (last) userData.ln = last;
  if (externalId) userData.external_id = externalId;
  if (typeof body.fbp === "string" && body.fbp) userData.fbp = body.fbp;
  if (typeof body.fbc === "string" && body.fbc) userData.fbc = body.fbc;
  if (ip) userData.client_ip_address = ip;
  if (typeof ua === "string" && ua) userData.client_user_agent = ua;

  try {
    const graph = await fetch(
      `https://graph.facebook.com/v23.0/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [
            {
              event_name: eventName,
              event_time: eventTime(body.event_time),
              event_id: eventId,
              action_source: "website",
              event_source_url: sourceUrl,
              user_data: userData,
            },
          ],
        }),
      }
    );
    const data = (await graph.json().catch(() => ({}))) as { events_received?: number; error?: { message?: string } };
    if (!graph.ok) {
      console.error("meta capi:", data.error?.message || graph.status);
      return res.status(502).json({ ok: false });
    }
    return res.status(200).json({ ok: true, events_received: data.events_received ?? 0 });
  } catch (error) {
    console.error("meta capi:", error);
    return res.status(502).json({ ok: false });
  }
}
