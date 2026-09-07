import type { VercelRequest, VercelResponse } from "@vercel/node";

function env(name: string, fallback = ""): string {
  return (process.env[name] || fallback).trim();
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

  const apiBase = env("API_BASE_URL") || env("VITE_API_BASE_URL") || "https://api.sweepai.site";
  const funnelId = env("FUNNEL_ID") || env("VITE_FUNNEL_ID");
  if (!funnelId) {
    return res.status(500).json({ error: "FUNNEL_ID not configured" });
  }

  let body: Record<string, unknown>;
  try {
    body = (typeof req.body === "string" ? JSON.parse(req.body) : req.body) || {};
  } catch {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  try {
    const resUpstream = await fetch(`${apiBase}/funnels/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        funnel_id: funnelId,
        event_name: body.event_name,
        visitor_id: body.visitor_id,
        session_id: body.session_id,
        idempotency_key: body.idempotency_key,
        metadata: body.metadata || {},
        event_timestamp: body.event_timestamp || new Date().toISOString(),
      }),
    });
    const data = await resUpstream.json().catch(() => ({}));
    return res.status(resUpstream.status).json(data);
  } catch (error) {
    console.error("sweep-event proxy error:", error);
    return res.status(500).json({ error: "Failed to forward Sweep event" });
  }
}
