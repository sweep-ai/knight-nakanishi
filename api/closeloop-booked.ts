import type { VercelRequest, VercelResponse } from "@vercel/node";
import { closeLoopPost, flatFields } from "./_closeloop.js";

// Called by the in-quiz Cal embed after a successful booking. Moves the lead into the
// CloseLoop "booked" scenario with the call time, so the AI confirms instead of trying to book.
// Order with /api/quiz-submit does not matter: if the lead is unknown here it is created as booked,
// and the later inbound call returns "exists" without changing the scenario.

type BookedBody = {
  name?: string;
  email?: string;
  phone?: string;
  callStart?: string;
  callEnd?: string;
  timezone?: string;
};

const ISO_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;

function splitName(fullName: string): { first_name?: string; last_name?: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return {};
  if (parts.length === 1) return { first_name: parts[0] };
  return { first_name: parts[0], last_name: parts.slice(1).join(" ") };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  let body: BookedBody;
  try {
    body = (typeof req.body === "string" ? JSON.parse(req.body) : req.body) || {};
  } catch {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const phone = body.phone?.trim();
  if (!phone || phone.replace(/\D/g, "").length < 10) {
    return res.status(400).json({ error: "valid phone required" });
  }

  const context = flatFields(
    {
      call_start: body.callStart && ISO_RE.test(body.callStart) ? body.callStart : undefined,
      call_end: body.callEnd && ISO_RE.test(body.callEnd) ? body.callEnd : undefined,
      timezone: body.timezone,
      call_type: "Gameplan call",
    },
    500
  );

  const result = await closeLoopPost("/leads/event", {
    phone,
    event: "set_scenario",
    scenario: "booked",
    context,
    ...splitName(body.name || ""),
    email: body.email?.trim() || undefined,
    source: "Funnel quiz – booked in quiz",
  });

  console.log("closeloop-booked result", JSON.stringify(result));
  // Never surface CloseLoop failures to the visitor.
  return res.status(200).json({ ok: true });
}
