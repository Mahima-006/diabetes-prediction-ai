import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PredictionForm from "../components/PredictionForm";
import ResultCard    from "../components/ResultCard";
import { Sparkles } from "lucide-react";

export default function Predict() {
  const [result, setResult] = useState(null);

  const handleResult = (data) => {
    setResult(data);
    if (data && window.innerWidth < 1024) {
      setTimeout(() => {
        document.getElementById("result-card")?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  };

  return (
    <motion.main
      id="predict-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-28 pb-24 px-6 min-h-screen"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Page header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 badge badge-primary mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Prediction
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-[var(--text-primary)] mb-4"
          >
            Check Your{" "}
            <span className="text-gradient">Diabetes Risk</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto"
          >
            Enter your health metrics below for an instant, AI-powered risk assessment.
          </motion.p>
        </div>

        {/* Two-column layout: form left, result right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <PredictionForm onResult={handleResult} />
          </motion.div>

          {/* Result */}
          <div>
            <AnimatePresence mode="wait">
              {result ? (
                <ResultCard
                  key="result"
                  result={result}
                  onReset={() => setResult(null)}
                />
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass p-10 text-center flex flex-col items-center justify-center min-h-[400px]"
                >
                  <div className="w-20 h-20 rounded-3xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-xl animate-float">
                    <span className="text-4xl">🔬</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-[var(--text-primary)] mb-3">
                    Your result will appear here
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-xs">
                    Fill in your health details on the left and click{" "}
                    <strong>Predict My Diabetes Risk</strong> to see your assessment.
                  </p>

                  <div className="mt-8 grid grid-cols-3 gap-4 w-full max-w-xs">
                    {[
                      { emoji: "🎯", label: "Instant" },
                      { emoji: "🔒", label: "Private" },
                      { emoji: "📄", label: "PDF Ready" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex flex-col items-center gap-1 p-3 rounded-xl bg-[rgba(102,126,234,0.06)] border border-[rgba(102,126,234,0.1)]"
                      >
                        <span className="text-xl">{item.emoji}</span>
                        <span className="text-[10px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
