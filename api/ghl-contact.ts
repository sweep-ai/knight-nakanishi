import type { VercelRequest, VercelResponse } from "@vercel/node";

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";
const WARM_LEAD_TAG = "warm lead";

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  source?: string;
  notes?: string;
};

function splitName(fullName: string): { firstName?: string; lastName?: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return {};
  if (parts.length === 1) return { firstName: parts[0] };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
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

  const token = process.env.GHL_INTEGRATION_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!token || !locationId) {
    console.error("Missing GHL_INTEGRATION_TOKEN or GHL_LOCATION_ID");
    return res.status(500).json({ error: "GHL not configured" });
  }

  const body = (typeof req.body === "string" ? JSON.parse(req.body) : req.body) as ContactBody;
  const email = body.email?.trim();
  const phone = body.phone?.trim();
  const name = body.name?.trim() || "";

  if (!email && !phone) {
    return res.status(400).json({ error: "email or phone required" });
  }

  const { firstName, lastName } = splitName(name);
  const headers = {
    Authorization: `Bearer ${token}`,
    Version: GHL_VERSION,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    // Upsert without tags — tags on upsert overwrite existing tags.
    // Docs: https://marketplace.gohighlevel.com/docs/ghl/contacts/upsert-contact
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
        source: body.source || "quiz",
      }),
    });

    const upsertJson = (await upsertRes.json().catch(() => ({}))) as {
      contact?: { id?: string };
      message?: string;
      meta?: { contactId?: string };
    };

    if (!upsertRes.ok) {
      console.error("GHL upsert failed:", upsertRes.status, upsertJson);
      return res.status(upsertRes.status).json({
        error: "Failed to upsert GHL contact",
        details: upsertJson,
      });
    }

    const contactId = upsertJson.contact?.id;
    if (!contactId) {
      console.error("GHL upsert missing contact id:", upsertJson);
      return res.status(502).json({ error: "GHL contact id missing" });
    }

    // Append tag without wiping other tags.
    // Docs: https://marketplace.gohighlevel.com/docs/ghl/contacts/add-tags
    const tagRes = await fetch(`${GHL_BASE}/contacts/${contactId}/tags`, {
      method: "POST",
      headers,
      body: JSON.stringify({ tags: [WARM_LEAD_TAG] }),
    });

    const tagJson = await tagRes.json().catch(() => ({}));
    if (!tagRes.ok) {
      console.error("GHL add tags failed:", tagRes.status, tagJson);
      return res.status(tagRes.status).json({
        error: "Contact created but tag failed",
        contactId,
        details: tagJson,
      });
    }

    return res.status(200).json({
      ok: true,
      contactId,
      tag: WARM_LEAD_TAG,
      new: (upsertJson as { new?: boolean }).new ?? null,
    });
  } catch (error) {
    console.error("GHL contact handler error:", error);
    return res.status(500).json({ error: "Internal GHL error" });
  }
}
