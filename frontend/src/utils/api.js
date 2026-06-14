/* ─────────────────────────────────────────────────────────────
   api.js — API client for DiabetesAI backend
   ───────────────────────────────────────────────────────────── */

const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "" : "https://your-render-url.onrender.com");

/**
 * POST /api/predict
 * @param {Object} formData  - feature values keyed by FEATURE_NAMES
 * @returns {Promise<Object>} prediction response
 */
export async function predictDiabetes(formData) {
  const res = await fetch(`${API_URL}/api/predict`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(formData),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

/**
 * GET /api/model-stats
 * @returns {Promise<Object>} model performance stats
 */
export async function fetchModelStats() {
  const res = await fetch(`${API_URL}/api/model-stats`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
