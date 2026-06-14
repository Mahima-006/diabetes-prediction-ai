import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { CheckCircle, AlertTriangle, Download, RotateCcw, Heart, Shield } from "lucide-react";
import RiskMeter from "./RiskMeter";
import { formatDateTime } from "../utils/formatters";
import jsPDF from "jspdf";

/**
 * ResultCard — animated result display shown after a prediction.
 * @param {Object} result  - API response object
 * @param {Function} onReset - callback to reset form
 */
export default function ResultCard({ result, onReset }) {
  const confettiFired = useRef(false);

  /* Confetti for non-diabetic result */
  useEffect(() => {
    if (result && !result.diabetic && !confettiFired.current) {
      confettiFired.current = true;
      const end = Date.now() + 1500;
      const colors = ["#667EEA", "#764BA2", "#10B981", "#4FACFE", "#FBC2EB"];
      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    }
  }, [result]);

  const handleDownloadPDF = () => {
    if (!result) return;
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageW = 210;
    const margin = 20;
    let y = margin;

    // ── Header ─────────────────────────────────────────────
    doc.setFillColor(102, 126, 234);
    doc.rect(0, 0, pageW, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Diabetes Risk Assessment Report", margin, 20);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated: ${formatDateTime(new Date().toISOString())}`, margin, 32);
    y = 55;

    // Patient Name (if provided)
    if (result.patientName) {
      doc.setTextColor(30, 30, 50);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(`Patient Name: ${result.patientName}`, margin, y);
      y += 8;
    }

    // ── Result summary ──────────────────────────────────────
    doc.setTextColor(30, 30, 50);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    const resultLabel = result.diabetic
      ? "HIGH RISK DETECTED"
      : "LOW RISK DETECTED";
    const resultColor = result.diabetic ? [239, 68, 68] : [16, 185, 129];
    doc.setTextColor(...resultColor);
    doc.text(resultLabel, margin, y);
    y += 10;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(107, 114, 128);
    const msgLines = doc.splitTextToSize(result.message, pageW - 2 * margin);
    doc.text(msgLines, margin, y);
    y += msgLines.length * 7 + 6;

    // Probability bar
    doc.setFillColor(229, 231, 235);
    doc.roundedRect(margin, y, pageW - 2 * margin, 8, 4, 4, "F");
    const barW = ((pageW - 2 * margin) * result.probability) / 100;
    doc.setFillColor(...resultColor);
    doc.roundedRect(margin, y, Math.max(barW, 8), 8, 4, 4, "F");
    doc.setTextColor(30, 30, 50);
    doc.setFontSize(10);
    doc.text(`Risk Score: ${result.probability}%`, margin, y + 16);
    y += 28;

    // ── Input values table ──────────────────────────────────
    doc.setTextColor(30, 30, 50);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("Your Health Metrics", margin, y);
    y += 8;

    const inputs = result.input_summary || {};
    const rows = Object.entries(inputs);
    const labels = {
      Pregnancies: "Pregnancies", Glucose: "Glucose (mg/dL)",
      BloodPressure: "Blood Pressure (mmHg)", SkinThickness: "Skin Thickness (mm)",
      Insulin: "Insulin (µU/mL)", BMI: "BMI",
      DiabetesPedigreeFunction: "Diabetes Pedigree Function", Age: "Age (yrs)",
    };

    rows.forEach(([key, val], i) => {
      const bg = i % 2 === 0 ? [248, 249, 255] : [255, 255, 255];
      doc.setFillColor(...bg);
      doc.rect(margin, y, pageW - 2 * margin, 8, "F");
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(107, 114, 128);
      doc.text(labels[key] || key, margin + 2, y + 5.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 30, 50);
      doc.text(String(val), pageW - margin - 2, y + 5.5, { align: "right" });
      y += 9;
    });
    y += 6;

    // ── Rx Prescriptions ─────────────────────────────────────
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 30, 50);
    doc.text("Rx - Lifestyle & Clinical Prescriptions", margin, y);
    y += 8;

    const rxItems = [
      { label: "Dietary Plan", text: result.prescriptions?.diet },
      { label: "Physical Activity", text: result.prescriptions?.exercise },
      { label: "Clinical Care", text: result.prescriptions?.clinical },
    ];

    rxItems.forEach((rx) => {
      if (!rx.text) return;
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(102, 126, 234);
      doc.text(`${rx.label}:`, margin + 2, y);
      
      doc.setFont("helvetica", "normal");
      doc.setTextColor(60, 60, 80);
      const lines = doc.splitTextToSize(rx.text, pageW - 2 * margin - 35);
      doc.text(lines, margin + 32, y);
      y += Math.max(lines.length * 6 + 3, 8);
    });
    y += 6;

    // ── Disclaimer ──────────────────────────────────────────
    doc.setFillColor(255, 251, 235);
    doc.roundedRect(margin, y, pageW - 2 * margin, 18, 4, 4, "F");
    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(146, 64, 14);
    const disc = "DISCLAIMER: This report is generated by an AI model for informational purposes only. It is NOT a medical diagnosis. Please consult a qualified healthcare professional for proper medical advice.";
    const discLines = doc.splitTextToSize(disc, pageW - 2 * margin - 8);
    doc.text(discLines, margin + 4, y + 6);
    y += 26;

    // ── Footer ───────────────────────────────────────────────
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(180, 180, 200);
    doc.text("Generated by DiabetesAI | Powered by Machine Learning (Random Forest)", margin, 285);

    const reportName = result.patientName
      ? `DiabetesAI_Report_${result.patientName.replace(/[^a-z0-9]/gi, '_')}.pdf`
      : `DiabetesAI_Report_${Date.now()}.pdf`;
    doc.save(reportName);
  };

  if (!result) return null;

  const { diabetic, probability, risk_level, message, recommendations = [], prescriptions = {}, patientName } = result;

  return (
    <motion.div
      id="result-card"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="glass overflow-hidden"
    >
      {/* Gradient header */}
      <div
        className={`px-6 pt-8 pb-6 ${diabetic ? "gradient-danger" : "gradient-success"}`}
      >
        <div className="flex items-start justify-between mb-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center"
          >
            {diabetic ? (
              <AlertTriangle className="w-7 h-7 text-white" />
            ) : (
              <CheckCircle className="w-7 h-7 text-white" />
            )}
          </motion.div>
          <span className="text-white/80 text-xs font-mono bg-white/10 px-3 py-1 rounded-full">
            {risk_level}
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-2xl font-display font-bold text-white leading-tight mb-1"
        >
          {diabetic ? "High Risk Detected" : "Great News! Low Risk Detected"}
        </motion.h2>
        {patientName && (
          <p className="text-white/95 text-sm font-semibold mb-3">
            Patient: {patientName}
          </p>
        )}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-white/85 text-sm leading-relaxed"
        >
          {message}
        </motion.p>
      </div>

      <div className="p-6 space-y-6">
        {/* Risk Meter */}
        <div>
          <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
            Risk Score
          </p>
          <RiskMeter probability={probability} diabetic={diabetic} />
        </div>

        {/* Probability bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
              Probability
            </span>
            <span className="text-sm font-bold font-mono text-[var(--text-primary)]">
              {probability}%
            </span>
          </div>
          <div className="progress-track">
            <motion.div
              className="progress-fill"
              style={{
                background: diabetic
                  ? "linear-gradient(90deg,#F093FB,#F5576C)"
                  : "linear-gradient(90deg,#10B981,#059669)",
              }}
              initial={{ width: "0%" }}
              animate={{ width: `${probability}%` }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
            />
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            {diabetic
              ? <Shield className="w-4 h-4 text-[#F5576C]" />
              : <Heart className="w-4 h-4 text-[#10B981]" />
            }
            <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
              Recommendations
            </p>
          </div>
          <div className="space-y-2.5">
            {recommendations.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-[rgba(102,126,234,0.06)] border border-[rgba(102,126,234,0.1)]"
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5"
                  style={{
                    background: diabetic
                      ? "linear-gradient(135deg,#F093FB,#F5576C)"
                      : "linear-gradient(135deg,#10B981,#059669)",
                  }}
                >
                  {i + 1}
                </span>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{rec}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Rx Lifestyle Prescriptions */}
        {prescriptions && (
          <div className="border-t border-[var(--border)] pt-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-bold text-[#667EEA] font-mono">Rx</span>
              <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                Lifestyle & Medical Prescriptions
              </p>
            </div>
            <div className="space-y-3">
              {[
                { label: "Dietary Plan", value: prescriptions.diet, icon: "🍏", color: "from-[#10B981]/5 to-[#059669]/5 border-[rgba(16,185,129,0.15)] text-[#10B981]" },
                { label: "Physical Activity", value: prescriptions.exercise, icon: "🏃", color: "from-[#667EEA]/5 to-[#764BA2]/5 border-[rgba(102,126,234,0.15)] text-[#667EEA]" },
                { label: "Clinical Care", value: prescriptions.clinical, icon: "🩺", color: "from-[#F5576C]/5 to-[#EF4444]/5 border-[rgba(245,87,108,0.15)] text-[#F5576C]" }
              ].map(({ label, value, icon, color }) => value && (
                <div key={label} className={`p-4 rounded-2xl bg-gradient-to-r ${color} border flex gap-3`}>
                  <span className="text-2xl shrink-0">{icon}</span>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider mb-1">{label}</h4>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <motion.button
            id="download-pdf-btn"
            type="button"
            onClick={handleDownloadPDF}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all"
            style={{
              background: diabetic
                ? "linear-gradient(135deg,#F093FB,#F5576C)"
                : "linear-gradient(135deg,#10B981,#059669)",
            }}
          >
            <Download className="w-4 h-4" />
            PDF Report
          </motion.button>

          <motion.button
            id="try-again-btn"
            type="button"
            onClick={onReset}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border-2 border-[var(--border)] text-[var(--text-secondary)] hover:border-[#667EEA] hover:text-[#667EEA] transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </motion.button>
        </div>

        {/* Medical disclaimer */}
        <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed text-center px-2 pt-1 border-t border-[var(--border)]">
          ⚠ This is not a medical diagnosis. Please consult a qualified healthcare professional for proper medical advice.
        </p>
      </div>
    </motion.div>
  );
}
