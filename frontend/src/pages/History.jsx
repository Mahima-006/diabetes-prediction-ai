import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Trash2, ArrowRight, Clock, Activity } from "lucide-react";
import { formatDateTime } from "../utils/formatters";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("diabetesai-history") || "[]");
    setHistory(stored);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("diabetesai-history");
    setHistory([]);
  };

  return (
    <motion.main
      id="history-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-28 pb-24 px-6 min-h-screen"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-bold uppercase tracking-widest text-[#667EEA] mb-2"
            >
              Your Records
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-bold text-[var(--text-primary)]"
            >
              Prediction <span className="text-gradient">History</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[var(--text-secondary)] mt-2"
            >
              Your last {Math.min(history.length, 10)} predictions — stored locally in your browser.
            </motion.p>
          </div>

          {history.length > 0 && (
            <motion.button
              id="clear-history-btn"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={clearHistory}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#EF4444] border border-[rgba(239,68,68,0.3)] hover:bg-[rgba(239,68,68,0.06)] transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <Trash2 className="w-4 h-4" />
              Clear History
            </motion.button>
          )}
        </div>

        {/* Empty state */}
        {history.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-16 text-center flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-3xl bg-[rgba(102,126,234,0.1)] flex items-center justify-center mx-auto mb-6 animate-float">
              <Activity className="w-10 h-10 text-[#667EEA]" />
            </div>
            <h3 className="text-xl font-display font-bold text-[var(--text-primary)] mb-3">
              No predictions yet
            </h3>
            <p className="text-[var(--text-secondary)] mb-8 max-w-xs">
              Your prediction history will appear here after you run your first assessment.
            </p>
            <Link to="/predict" id="history-cta">
              <motion.button
                className="btn-primary flex items-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Make My First Prediction
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Summary chips */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="badge badge-primary">
                {history.length} prediction{history.length !== 1 ? "s" : ""} total
              </div>
              <div className="badge badge-success">
                {history.filter((h) => h.result === "Low Risk").length} Low Risk
              </div>
              <div className="badge badge-danger">
                {history.filter((h) => h.result === "High Risk").length} High Risk
              </div>
            </div>

            {/* Desktop table */}
            <div className="hidden md:block glass rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    {["Date & Time", "Patient", "Age", "Glucose", "BMI", "Risk", "Probability"].map((col) => (
                      <th
                        key={col}
                        className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)]"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {history.map((item, i) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-[var(--border)] last:border-0 hover:bg-[rgba(102,126,234,0.04)] transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                            <span className="text-[var(--text-secondary)] text-xs">
                              {formatDateTime(item.date)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs font-semibold text-[var(--text-primary)]">
                          {item.patientName || "Anonymous"}
                        </td>
                        <td className="px-6 py-4 font-mono text-[var(--text-primary)]">
                          {item.age}
                        </td>
                        <td className="px-6 py-4 font-mono text-[var(--text-primary)]">
                          {item.glucose}
                        </td>
                        <td className="px-6 py-4 font-mono text-[var(--text-primary)]">
                          {item.bmi}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`badge text-xs ${
                              item.result === "Low Risk" ? "badge-success" : "badge-danger"
                            }`}
                          >
                            {item.result === "Low Risk" ? "✅" : "⚠️"} {item.result}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-1.5 w-24 rounded-full bg-[rgba(102,126,234,0.1)] overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{
                                  width: `${item.probability}%`,
                                  background:
                                    item.probability < 40
                                      ? "#10B981"
                                      : item.probability < 70
                                      ? "#F59E0B"
                                      : "#EF4444",
                                }}
                              />
                            </div>
                            <span className="font-mono font-bold text-[var(--text-primary)]">
                              {item.probability}%
                            </span>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Mobile card list */}
            <div className="md:hidden space-y-4">
              <AnimatePresence>
                {history.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.07 }}
                    className="glass p-5 rounded-2xl"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                          <Clock className="w-3 h-3" />
                          {formatDateTime(item.date)}
                        </div>
                        {item.patientName && (
                          <p className="text-xs font-semibold text-[var(--text-primary)] mt-1">
                            Patient: {item.patientName}
                          </p>
                        )}
                      </div>
                      <span
                        className={`badge text-xs ${
                          item.result === "Low Risk" ? "badge-success" : "badge-danger"
                        }`}
                      >
                        {item.result === "Low Risk" ? "✅" : "⚠️"} {item.result}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-3">
                      {[
                        { label: "Age",     value: item.age },
                        { label: "Glucose", value: item.glucose },
                        { label: "BMI",     value: item.bmi },
                      ].map(({ label, value }) => (
                        <div key={label} className="text-center p-2 rounded-xl bg-[rgba(102,126,234,0.06)]">
                          <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider">{label}</p>
                          <p className="font-mono font-bold text-sm text-[var(--text-primary)]">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-1.5 flex-1 rounded-full bg-[rgba(102,126,234,0.1)] overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${item.probability}%`,
                            background:
                              item.probability < 40
                                ? "#10B981"
                                : item.probability < 70
                                ? "#F59E0B"
                                : "#EF4444",
                          }}
                        />
                      </div>
                      <span className="font-mono text-sm font-bold text-[var(--text-primary)]">
                        {item.probability}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Footer note */}
            <p className="text-center text-xs text-[var(--text-secondary)] mt-8">
              🔒 History is stored locally in your browser. It is never sent to any server.
              Maximum 10 records are kept.
            </p>
          </>
        )}
      </div>
    </motion.main>
  );
}
