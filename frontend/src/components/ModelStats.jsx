import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, TrendingUp } from "lucide-react";

const MODELS = [
  { name: "Random Forest",       accuracy: 82.4, winner: true  },
  { name: "SVM",                 accuracy: 78.9, winner: false },
  { name: "Logistic Regression", accuracy: 77.3, winner: false },
  { name: "KNN",                 accuracy: 75.0, winner: false },
  { name: "Decision Tree",       accuracy: 73.1, winner: false },
];

const FEATURE_IMPORTANCE = [
  { name: "Glucose",                    importance: 100 },
  { name: "BMI",                        importance: 82  },
  { name: "Age",                        importance: 66  },
  { name: "Diabetes Pedigree Function", importance: 52  },
  { name: "Pregnancies",                importance: 38  },
  { name: "Blood Pressure",             importance: 28  },
  { name: "Insulin",                    importance: 24  },
  { name: "Skin Thickness",             importance: 18  },
];

function AnimatedBar({ width, color, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(102,126,234,0.1)" }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${width}%` } : { width: 0 }}
        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay }}
      />
    </div>
  );
}

export default function ModelStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("/api/model-stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() =>
        setStats({
          accuracy:  82.4,
          precision: 79.3,
          recall:    76.8,
          f1_score:  78.0,
          models_compared: {
            "Random Forest":       82.4,
            "SVM":                 78.9,
            "Logistic Regression": 77.3,
            "KNN":                 75.0,
            "Decision Tree":       73.1,
          },
        })
      );
  }, []);

  const METRICS = [
    { label: "Accuracy",  value: stats?.accuracy,  color: "#667EEA" },
    { label: "Precision", value: stats?.precision, color: "#4FACFE" },
    { label: "Recall",    value: stats?.recall,    color: "#10B981" },
    { label: "F1 Score",  value: stats?.f1_score,  color: "#F59E0B" },
  ];

  return (
    <div className="space-y-10">
      {/* Best model metrics */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-display font-bold text-[var(--text-primary)]">
            Best Model Metrics (Random Forest)
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {METRICS.map(({ label, value, color }) => (
            <div key={label} className="glass p-4 rounded-2xl text-center">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-2">
                {label}
              </p>
              <p
                className="text-3xl font-bold font-mono"
                style={{ color }}
              >
                {value != null ? `${value}%` : "—"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Model comparison bars */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-xl gradient-sky flex items-center justify-center">
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-display font-bold text-[var(--text-primary)]">
            Algorithm Comparison
          </h3>
        </div>

        <div className="space-y-4">
          {MODELS.map(({ name, accuracy, winner }, i) => (
            <div key={name} className={`p-4 rounded-2xl transition-all ${winner ? "glass border-2 border-[rgba(102,126,234,0.3)]" : "glass"}`}>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2.5">
                  {winner && (
                    <span className="text-base" title="Best model">🏆</span>
                  )}
                  <span className={`text-sm font-semibold ${winner ? "text-[#667EEA]" : "text-[var(--text-primary)]"}`}>
                    {name}
                  </span>
                  {winner && (
                    <span className="badge badge-primary text-[10px] py-0.5">WINNER</span>
                  )}
                </div>
                <span className="text-sm font-bold font-mono text-[var(--text-primary)]">
                  {accuracy}%
                </span>
              </div>
              <AnimatedBar
                width={accuracy}
                color={winner
                  ? "linear-gradient(90deg,#667EEA,#764BA2)"
                  : "linear-gradient(90deg,#4FACFE,#00F2FE)"
                }
                delay={i * 0.1}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Feature importance */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-xl gradient-success flex items-center justify-center">
            <span className="text-white text-xs font-bold">FI</span>
          </div>
          <h3 className="text-lg font-display font-bold text-[var(--text-primary)]">
            Feature Importance
          </h3>
        </div>

        <div className="space-y-4">
          {FEATURE_IMPORTANCE.map(({ name, importance }, i) => {
            const level =
              importance >= 70 ? { label: "High",   color: "#10B981" } :
              importance >= 40 ? { label: "Medium", color: "#F59E0B" } :
                                 { label: "Low",    color: "#9CA3AF" };
            return (
              <div key={name} className="glass p-4 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[var(--text-primary)]">{name}</span>
                  <span
                    className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                    style={{
                      background: `${level.color}18`,
                      color: level.color,
                      border: `1px solid ${level.color}40`,
                    }}
                  >
                    {level.label}
                  </span>
                </div>
                <AnimatedBar
                  width={importance}
                  color={`linear-gradient(90deg,${level.color}cc,${level.color})`}
                  delay={i * 0.08}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
