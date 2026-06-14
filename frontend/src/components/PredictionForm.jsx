import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Loader2 } from "lucide-react";
import BMICalculator from "./BMICalculator";
import { clinicalRange, validateField } from "../utils/formatters";

const FIELDS = [
  { name: "Pregnancies",              label: "Pregnancies",                   row: 1 },
  { name: "Age",                      label: "Age",                           row: 1 },
  { name: "Glucose",                  label: "Glucose Level (mg/dL)",         row: 2 },
  { name: "BloodPressure",            label: "Blood Pressure (mmHg)",         row: 2 },
  { name: "SkinThickness",            label: "Skin Thickness (mm)",           row: 3 },
  { name: "Insulin",                  label: "Insulin (µU/mL)",               row: 3 },
  { name: "BMI",                      label: "BMI",                           row: 4 },
  { name: "DiabetesPedigreeFunction", label: "Diabetes Pedigree Function",    row: 4 },
];

const SAMPLE_VALUES = {
  Pregnancies: "6",
  Age: "50",
  Glucose: "148",
  BloodPressure: "72",
  SkinThickness: "35",
  Insulin: "0",
  BMI: "33.6",
  DiabetesPedigreeFunction: "0.627",
};

const initialForm = () =>
  FIELDS.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {});

export default function PredictionForm({ onResult }) {
  const [form, setForm]         = useState(initialForm);
  const [patientName, setPatientName] = useState("");
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [touched, setTouched]   = useState({});

  /* Update a single field */
  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const err = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  /* Mark as touched on blur */
  const handleBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, form[name]);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  /* BMI auto-fill */
  const handleBmiCalc = (bmi) => {
    setForm((prev) => ({ ...prev, BMI: bmi }));
    setErrors((prev) => ({ ...prev, BMI: null }));
  };

  /* Load sample data */
  const loadSample = () => {
    setForm(SAMPLE_VALUES);
    setPatientName("Jane Doe");
    setErrors({});
    setTouched({});
  };

  /* Validate entire form */
  const validateAll = () => {
    const newErrors = {};
    let valid = true;
    FIELDS.forEach(({ name }) => {
      const err = validateField(name, form[name]);
      if (err) { newErrors[name] = err; valid = false; }
    });
    setErrors(newErrors);
    setTouched(FIELDS.reduce((acc, f) => ({ ...acc, [f.name]: true }), {}));
    return valid;
  };

  /* Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    setLoading(true);
    try {
      // Build numeric payload
      const payload = {};
      FIELDS.forEach(({ name }) => { payload[name] = parseFloat(form[name]); });

      const res = await fetch("/api/predict", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Prediction failed");
      }

      const data = await res.json();

      /* Persist to history (localStorage) */
      const history = JSON.parse(localStorage.getItem("diabetesai-history") || "[]");
      history.unshift({
        id:          Date.now(),
        date:        new Date().toISOString(),
        patientName: patientName.trim() || "Anonymous",
        age:         payload.Age,
        glucose:     payload.Glucose,
        bmi:         payload.BMI,
        result:      data.diabetic ? "High Risk" : "Low Risk",
        probability: data.probability,
        risk_level:  data.risk_level,
        input:       payload,
      });
      localStorage.setItem(
        "diabetesai-history",
        JSON.stringify(history.slice(0, 10))
      );

      onResult({ ...data, input_summary: payload, patientName: patientName.trim() });
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  /* Reset */
  const handleReset = () => {
    setForm(initialForm());
    setPatientName("");
    setErrors({});
    setTouched({});
    onResult(null);
  };

  /* Tooltip for each field */
  const Tooltip = ({ name }) => {
    const range = clinicalRange(name);
    return (
      <div className="tooltip ml-1">
        <Info className="w-3.5 h-3.5 text-[var(--text-secondary)] cursor-help" />
        <span className="tooltip-content">{range.hint}</span>
      </div>
    );
  };

  return (
    <div className="glass p-6 md:p-8">
      {/* Card header */}
      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-1">
          Enter Your Health Details
        </h2>
        <p className="text-sm text-[var(--text-secondary)]">
          All fields are required for an accurate prediction.
        </p>
      </div>

      {/* Sample data button */}
      <button
        id="load-sample-btn"
        type="button"
        onClick={loadSample}
        className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-[#667EEA] hover:text-[#764BA2] transition-colors border border-[rgba(102,126,234,0.3)] rounded-xl px-3 py-1.5 hover:bg-[rgba(102,126,234,0.06)]"
      >
        ✨ Load Sample Data
      </button>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <div className="input-group sm:col-span-2">
            <input
              id="field-patientName"
              type="text"
              placeholder=" "
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="input-field"
              aria-label="Patient Name"
            />
            <label className="input-label">
              Patient Name (Optional)
            </label>
            <p className="input-hint">
              Enter the patient's name to customise the downloadable report and history record.
            </p>
          </div>

          {FIELDS.map(({ name, label }) => {
            const range = clinicalRange(name);
            const error = errors[name];
            const hasValue = form[name] !== "";

            return (
              <div key={name} className="input-group">
                <input
                  id={`field-${name}`}
                  type="number"
                  step="any"
                  placeholder=" "
                  value={form[name]}
                  onChange={(e) => handleChange(name, e.target.value)}
                  onBlur={() => handleBlur(name)}
                  className={`input-field ${error ? "border-[#EF4444] focus:border-[#EF4444] focus:shadow-none" : ""}`}
                  aria-label={label}
                  aria-describedby={`hint-${name}`}
                  min={range.min}
                  max={range.max}
                />
                <label className="input-label flex items-center gap-1">
                  {label}
                  <Tooltip name={name} />
                </label>
                <AnimatePresence>
                  {error ? (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="input-error"
                      id={`hint-${name}`}
                    >
                      ⚠ {error}
                    </motion.p>
                  ) : (
                    <p className="input-hint" id={`hint-${name}`}>
                      {range.hint}
                    </p>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* BMI Calculator */}
        <BMICalculator onBmiCalculated={handleBmiCalc} />

        {/* Submit */}
        <motion.button
          id="predict-submit-btn"
          type="submit"
          disabled={loading}
          className="btn-primary w-full mt-6 h-14 text-base flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
          whileHover={!loading ? { scale: 1.01 } : {}}
          whileTap={!loading ? { scale: 0.99 } : {}}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analysing your data…
            </>
          ) : (
            <>🔍 Predict My Diabetes Risk</>
          )}
        </motion.button>

        <button
          id="reset-form-btn"
          type="button"
          onClick={handleReset}
          className="w-full mt-3 py-2.5 text-sm text-[var(--text-secondary)] hover:text-[#667EEA] transition-colors"
        >
          Clear form
        </button>
      </form>
    </div>
  );
}
