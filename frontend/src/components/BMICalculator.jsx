import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, X } from "lucide-react";
import { bmiCategory } from "../utils/formatters";

export default function BMICalculator({ onBmiCalculated }) {
  const [open, setOpen]     = useState(false);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // cm → m
    if (!w || !h || h <= 0) return;
    const bmi = w / (h * h);
    const rounded = Math.round(bmi * 10) / 10;
    const cat = bmiCategory(rounded);
    setResult({ bmi: rounded, ...cat });
  };

  const handleApply = () => {
    if (!result) return;
    onBmiCalculated(result.bmi.toFixed(1));
    setOpen(false);
    setWeight("");
    setHeight("");
    setResult(null);
  };

  return (
    <div className="mt-4">
      <button
        id="bmi-calculator-toggle"
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-medium text-[#667EEA] hover:text-[#764BA2] transition-colors"
      >
        <Calculator className="w-4 h-4" />
        {open ? "Hide BMI Calculator" : "Don't know your BMI? Calculate it"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-3 p-5 rounded-2xl border border-[rgba(102,126,234,0.2)] bg-[rgba(102,126,234,0.05)]">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-sm text-[var(--text-primary)] flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#667EEA]" />
                  BMI Calculator
                </h4>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-6 h-6 flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-1.5">
                    Weight (kg)
                  </label>
                  <input
                    id="bmi-weight"
                    type="number"
                    min="1"
                    max="300"
                    value={weight}
                    onChange={(e) => { setWeight(e.target.value); setResult(null); }}
                    placeholder="e.g. 70"
                    className="input-field py-2.5 px-3 text-sm"
                    style={{ paddingTop: "0.625rem" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-1.5">
                    Height (cm)
                  </label>
                  <input
                    id="bmi-height"
                    type="number"
                    min="50"
                    max="300"
                    value={height}
                    onChange={(e) => { setHeight(e.target.value); setResult(null); }}
                    placeholder="e.g. 170"
                    className="input-field py-2.5 px-3 text-sm"
                    style={{ paddingTop: "0.625rem" }}
                  />
                </div>
              </div>

              <button
                id="bmi-calculate-btn"
                type="button"
                onClick={calculate}
                disabled={!weight || !height}
                className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-40"
                style={{
                  background: "linear-gradient(135deg,#667EEA,#764BA2)",
                  color: "white",
                }}
              >
                Calculate BMI
              </button>

              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mt-3 p-3 rounded-xl flex items-center justify-between"
                    style={{ background: `${result.color}18`, border: `1px solid ${result.color}40` }}
                  >
                    <div>
                      <p className="text-xs text-[var(--text-secondary)]">Your BMI</p>
                      <p className="text-2xl font-bold font-mono" style={{ color: result.color }}>
                        {result.bmi}
                      </p>
                      <p className="text-xs font-semibold mt-0.5" style={{ color: result.color }}>
                        {result.label}
                      </p>
                    </div>

                    <button
                      id="bmi-apply-btn"
                      type="button"
                      onClick={handleApply}
                      className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all"
                      style={{ background: result.color }}
                    >
                      Apply ↗
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* BMI scale */}
              <div className="mt-3 grid grid-cols-4 gap-1 text-center">
                {[
                  { label: "Underweight", range: "< 18.5", color: "#F59E0B" },
                  { label: "Normal",      range: "18.5–24.9", color: "#10B981" },
                  { label: "Overweight",  range: "25–29.9",   color: "#F59E0B" },
                  { label: "Obese",       range: "≥ 30",      color: "#EF4444" },
                ].map((cat) => (
                  <div key={cat.label} className="p-1.5 rounded-lg" style={{ background: `${cat.color}18` }}>
                    <p className="text-[10px] font-semibold" style={{ color: cat.color }}>{cat.label}</p>
                    <p className="text-[9px] text-[var(--text-secondary)] font-mono">{cat.range}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
