/* ─────────────────────────────────────────────────────────────
   formatters.js — Data formatting utilities for DiabetesAI
   ───────────────────────────────────────────────────────────── */

/**
 * Format a date as "Jun 14, 2026 · 4:41 PM"
 */
export function formatDateTime(isoString) {
  return new Date(isoString).toLocaleString("en-US", {
    month:  "short",
    day:    "numeric",
    year:   "numeric",
    hour:   "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Calculate BMI category label.
 */
export function bmiCategory(bmi) {
  if (bmi < 18.5) return { label: "Underweight", color: "#F59E0B" };
  if (bmi < 25)   return { label: "Normal",      color: "#10B981" };
  if (bmi < 30)   return { label: "Overweight",  color: "#F59E0B" };
  return              { label: "Obese",           color: "#EF4444" };
}

/**
 * Map risk level string to Tailwind badge class.
 */
export function riskBadgeClass(riskLevel) {
  if (riskLevel === "Low Risk")      return "badge-success";
  if (riskLevel === "Moderate Risk") return "badge-warning";
  return "badge-danger";
}

/**
 * Round a number to specified decimal places.
 */
export function round(value, decimals = 1) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

/**
 * Return clinical range info for a given feature name.
 */
export function clinicalRange(feature) {
  const ranges = {
    Pregnancies:               { min: 0,    max: 17,  unit: "",       hint: "Number of times pregnant (0–17)" },
    Glucose:                   { min: 0,    max: 200, unit: "mg/dL",  hint: "Normal fasting: 70–99 mg/dL. Enter 0 if unknown." },
    BloodPressure:             { min: 0,    max: 122, unit: "mmHg",   hint: "Diastolic pressure (60–80 is normal). Enter 0 if unknown." },
    SkinThickness:             { min: 0,    max: 99,  unit: "mm",     hint: "Triceps skin fold thickness (7–51 mm). Enter 0 if unknown." },
    Insulin:                   { min: 0,    max: 846, unit: "µU/mL",  hint: "2-hour serum insulin (16–166 is normal). Enter 0 if unknown." },
    BMI:                       { min: 0,    max: 70,  unit: "",       hint: "Body Mass Index (18.5–24.9 is healthy). Enter 0 if unknown." },
    DiabetesPedigreeFunction:  { min: 0.05, max: 2.5, unit: "",       hint: "Genetic diabetes influence score (0.078–2.42)" },
    Age:                       { min: 1,    max: 120, unit: "yrs",    hint: "Patient age in years" },
  };
  return ranges[feature] || {};
}

/**
 * Validate a single field value against clinical bounds.
 */
export function validateField(feature, value) {
  const r = clinicalRange(feature);
  if (value === "" || value === null || value === undefined) return "This field is required.";
  const num = parseFloat(value);
  if (isNaN(num)) return "Please enter a valid number.";
  if (num < r.min) return `${feature} should be at least ${r.min}${r.unit ? " " + r.unit : ""}.`;
  if (num > r.max) return `${feature} should not exceed ${r.max}${r.unit ? " " + r.unit : ""}.`;
  return null;
}
