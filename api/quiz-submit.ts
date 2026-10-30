import type { VercelRequest, VercelResponse } from "@vercel/node";

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";
const WARM_LEAD_TAG = "warm lead";

function env(name: string, fallback = ""): string {
  return (process.env[name] || fallback).trim();
}

function sweepConfig() {
  return {
    apiBase: env("API_BASE_URL") || env("VITE_API_BASE_URL") || "https://api.sweepai.site",
    funnelId: env("FUNNEL_ID") || env("VITE_FUNNEL_ID"),
  };
}

function zapierUrl() {
  return env("ZAPIER_WEBHOOK_URL") || env("VITE_ZAPIER_WEBHOOK_URL");
}

function splitName(fullName: string): { firstName?: string; lastName?: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return {};
  if (parts.length === 1) return { firstName: parts[0] };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

type QuizSubmitBody = {
  name?: string;
  email?: string;
  phone?: string;
  social?: string;
  occupation?: string;
  age?: string;
  priorAttempts?: string;
  leadStatus?: string;
  dqReason?: string | null;
  formId?: string;
  visitorId?: string;
  sessionId?: string;
  idempotencyKey?: string;
  quizAnswers?: Record<string, unknown>;
  notes?: string;
  culturalFoods?: string;
  culturalFoods_code?: string;
  situation?: string;
  situation_code?: string;
  goal?: string;
  goal_code?: string;
  readiness?: string;
  readiness_code?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
  pageUrl?: string;
  pageTitle?: string;
};

function definedFields(fields: Record<string, unknown>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (typeof value !== "string") continue;
    const trimmed = value.trim();
    if (!trimmed) continue;
    out[key] = trimmed;
  }
  return out;
}

function answerPair(entry: unknown): { prompt?: string; label?: string } {
  if (!entry || typeof entry !== "object") return {};
  const row = entry as { prompt?: unknown; label?: unknown };
  return {
    prompt: typeof row.prompt === "string" ? row.prompt : undefined,
    label: typeof row.label === "string" ? row.label : undefined,
  };
}

async function forwardSweepEvent(body: QuizSubmitBody) {
  const { apiBase, funnelId } = sweepConfig();
  if (!funnelId) return { skipped: true, reason: "FUNNEL_ID missing" };

  const res = await fetch(`${apiBase}/funnels/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      funnel_id: funnelId,
      event_name: "form_submit",
      visitor_id: body.visitorId || `visitor_server_${Date.now()}`,
      session_id: body.sessionId || `session_server_${Date.now()}`,
      idempotency_key: body.idempotencyKey,
      metadata: {
        form_id: body.formId || "root-quiz",
        leadStatus: body.leadStatus,
        page_url: body.pageUrl,
        page_title: body.pageTitle,
        source: "quiz",
        ...(body.utm && Object.values(body.utm).some((value) => value?.trim()) ? { utm: body.utm } : {}),
      },
      event_timestamp: new Date().toISOString(),
    }),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

async function forwardSweepWebhook(body: QuizSubmitBody) {
  const url = env("SWEEP_WEBHOOK_URL");
  if (!url) return { skipped: true, reason: "SWEEP_WEBHOOK_URL missing" };

  const { firstName, lastName } = splitName(body.name || "");
  const qa = body.quizAnswers || {};
  const answers: Record<string, string> = {};
  for (const key of ["culturalFoods", "situation", "goal", "readiness"] as const) {
    const { prompt, label } = answerPair(qa[key]);
    if (prompt && label) answers[prompt] = label;
  }
  const prior =
    body.priorAttempts || (typeof qa.priorAttempts === "string" ? qa.priorAttempts : "");
  if (prior.trim()) answers["What have you tried before and what happened?"] = prior.trim();
  const age = body.age || (typeof qa.age === "string" ? qa.age : "");
  if (age.trim()) answers.Age = age.trim();
  const work = body.occupation || (typeof qa.occupation === "string" ? qa.occupation : "");
  if (work.trim()) answers["What do you do for work?"] = work.trim();
  if (body.leadStatus) answers["Lead status"] = body.leadStatus;
  if (body.dqReason) answers["Disqualify reason"] = body.dqReason;
  if (body.notes) answers.Notes = body.notes;

  const payload = definedFields({
    name: body.name,
    first_name: firstName,
    last_name: lastName,
    email: body.email,
    phone: body.phone,
    instagram: body.social,
    visitor_id: body.visitorId,
    session_id: body.sessionId,
    utm_source: body.utm?.source,
    utm_medium: body.utm?.medium,
    utm_campaign: body.utm?.campaign,
    utm_term: body.utm?.term,
    utm_content: body.utm?.content,
    ...answers,
  });

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "User-Agent": "KnightFitFunnel/1.0",
  };
  if (body.idempotencyKey) headers["Idempotency-Key"] = body.idempotencyKey;

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

async function forwardZapier(body: QuizSubmitBody) {
  const url = zapierUrl();
  if (!url) return { skipped: true, reason: "ZAPIER_WEBHOOK_URL missing" };

  const payload = {
    name: body.name || "",
    email: body.email || "",
    phone: body.phone || "",
    social: body.social || "",
    occupation: body.occupation || "",
    age: body.age || "",
    priorAttempts: body.priorAttempts || "",
    culturalFoods: body.culturalFoods || "",
    culturalFoods_code: body.culturalFoods_code || "",
    situation: body.situation || "",
    situation_code: body.situation_code || "",
    goal: body.goal || "",
    goal_code: body.goal_code || "",
    readiness: body.readiness || "",
    readiness_code: body.readiness_code || "",
    leadStatus: body.leadStatus || "",
    dqReason: body.dqReason ?? null,
    timestamp: new Date().toISOString(),
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await res.text().catch(() => "");
  return { ok: res.ok, status: res.status, body: text.slice(0, 500) };
}

async function forwardGhl(body: QuizSubmitBody) {
  const token = env("GHL_INTEGRATION_TOKEN");
  const locationId = env("GHL_LOCATION_ID");
  if (!token || !locationId) {
    return { skipped: true, reason: "GHL_INTEGRATION_TOKEN or GHL_LOCATION_ID missing" };
  }

  const email = body.email?.trim();
  const phone = body.phone?.trim();
  const name = body.name?.trim() || "";
  if (!email && !phone) return { skipped: true, reason: "email/phone missing" };

  const { firstName, lastName } = splitName(name);
  const headers = {
    Authorization: `Bearer ${token}`,
    Version: GHL_VERSION,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const upsertRes = await fetch(`${GHL_BASE}/contacts/upsert`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      locationId,
      name: name || undefined,
      firstName,
      lastName,
      email: email || undefined,
      phone: phone || undefined,
      source: "quiz",
    }),
  });
  const upsertJson = (await upsertRes.json().catch(() => ({}))) as {
    contact?: { id?: string };
    new?: boolean;
  };
  if (!upsertRes.ok || !upsertJson.contact?.id) {
    return { ok: false, status: upsertRes.status, data: upsertJson };
  }

  const contactId = upsertJson.contact.id;
  const tagRes = await fetch(`${GHL_BASE}/contacts/${contactId}/tags`, {
    method: "POST",
    headers,
    body: JSON.stringify({ tags: [WARM_LEAD_TAG] }),
  });
  const tagJson = await tagRes.json().catch(() => ({}));
  return {
    ok: tagRes.ok,
    status: tagRes.status,
    contactId,
    new: upsertJson.new ?? null,
    tag: WARM_LEAD_TAG,
    tagData: tagJson,
  };
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

  let body: QuizSubmitBody;
  try {
    body = (typeof req.body === "string" ? JSON.parse(req.body) : req.body) || {};
  } catch {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  if (!body.email?.trim() && !body.phone?.trim()) {
    return res.status(400).json({ error: "email or phone required" });
  }

  const results = {
    sweepEvent: await forwardSweepEvent(body).catch((e) => ({
      ok: false,
      error: e instanceof Error ? e.message : "sweep event failed",
    })),
    sweepWebhook: await forwardSweepWebhook(body).catch((e) => ({
      ok: false,
      error: e instanceof Error ? e.message : "sweep webhook failed",
    })),
    zapier: await forwardZapier(body).catch((e) => ({
      ok: false,
      error: e instanceof Error ? e.message : "zapier failed",
    })),
    ghl: await forwardGhl(body).catch((e) => ({
      ok: false,
      error: e instanceof Error ? e.message : "ghl failed",
    })),
  };

  console.log("quiz-submit results", JSON.stringify(results));

  return res.status(200).json({ ok: true, results });
}
