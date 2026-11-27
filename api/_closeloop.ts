// CloseLoop lead API (AI appointment setter that texts leads). Server-side only:
// LEAD_API_SECRET must never reach the browser.
// Files starting with "_" in /api are not deployed as their own functions.

export type CloseLoopScenario = "booked" | "not_booked";

export type CloseLoopResult =
  | { skipped: true; reason: string }
  | { ok: boolean; status: number; data: unknown };

function leadApiConfig() {
  return {
    url: (process.env.LEAD_API_URL || "").trim().replace(/\/+$/, ""),
    secret: (process.env.LEAD_API_SECRET || "").trim(),
  };
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * POST to CloseLoop with a 10s timeout. Retries once on network errors, 5xx, and the
 * "created concurrently" 409. Other 4xx are payload problems and are not retried.
 * Retries are safe: CloseLoop never sends a second opener for the same number.
 */
export async function closeLoopPost(path: string, body: Record<string, unknown>): Promise<CloseLoopResult> {
  const { url, secret } = leadApiConfig();
  if (!url || !secret) return { skipped: true, reason: "LEAD_API_URL or LEAD_API_SECRET missing" };

  let last: CloseLoopResult = { ok: false, status: 0, data: { detail: "not attempted" } };
  for (let attempt = 0; attempt < 2; attempt++) {
    if (attempt > 0) await sleep(2000);
    try {
      const res = await fetch(`${url}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Lead-Secret": secret },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(10_000),
      });
      const data = await res.json().catch(() => ({}));
      last = { ok: res.ok, status: res.status, data };
      const detail = String((data as { detail?: unknown }).detail ?? "");
      const retryable = res.status >= 500 || (res.status === 409 && /concurrently/i.test(detail));
      if (res.ok || !retryable) break;
    } catch (error) {
      last = { ok: false, status: 0, data: { detail: error instanceof Error ? error.message : "network error" } };
    }
  }
  if (!("skipped" in last) && !last.ok) console.error("CloseLoop", path, last.status, JSON.stringify(last.data));
  return last;
}

/** Keep only non-empty string/number/boolean values (CloseLoop drops nested values anyway). */
export function flatFields(fields: Record<string, unknown>, maxLen: number): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value === null || value === undefined) continue;
    if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") continue;
    const text = String(value).trim();
    if (!text) continue;
    out[key] = text.slice(0, maxLen);
  }
  return out;
}
