import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Database, FlaskConical, Brain, ArrowRight } from "lucide-react";

const FEATURES = [
  { name: "Pregnancies",              desc: "Number of times pregnant. Higher values correlate with increased risk.",   unit: "integer 0–17"   },
  { name: "Glucose",                  desc: "Plasma glucose concentration (2-hour OGTT). Most predictive feature.",     unit: "mg/dL"           },
  { name: "Blood Pressure",           desc: "Diastolic blood pressure. Hypertension is a known diabetes risk factor.",  unit: "mmHg"            },
  { name: "Skin Thickness",           desc: "Triceps skinfold thickness, a proxy for body fat.",                        unit: "mm"              },
  { name: "Insulin",                  desc: "2-hour serum insulin level; elevated values may indicate insulin resistance.", unit: "µU/mL"        },
  { name: "BMI",                      desc: "Body Mass Index — weight in kg / (height in m)². Key obesity indicator.",  unit: "kg/m²"           },
  { name: "Diabetes Pedigree Fn.",    desc: "A function scoring diabetes likelihood based on family history.",           unit: "0.078 – 2.42"   },
  { name: "Age",                      desc: "Age of the patient in years. Risk increases with age.",                    unit: "years"           },
];

export default function About() {
  return (
    <motion.main
      id="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-28 pb-24 px-6"
    >
      <div className="max-w-[1200px] mx-auto space-y-20">

        {/* ── Section A: About This Project ───────────────── */}
        <section id="about-project">
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-widest text-[#667EEA] mb-3"
            >
              About This Project
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-bold text-[var(--text-primary)] mb-4"
            >
              Early detection via <span className="text-gradient">AI Technology</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto"
            >
              DiabetesAI is a clinical screening assistant designed to assess diabetes risk instantly.
              It uses machine learning to analyse key physiological indicators and provide lifestyle guidance.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Database,      title: "Pima Indian Dataset", desc: "Built using study records from the National Institute of Diabetes and Digestive and Kidney Diseases, mapping 8 key clinical indicators." },
              { icon: FlaskConical,  title: "Predictive Analytics",desc: "Driven by a Random Forest algorithm trained on cleaned physiological data, delivering instant statistical probability of risk." },
              { icon: Brain,         title: "Patient Center",      desc: "Designed for immediate usability with readable metrics, private local history logs, and download-ready PDF health reports." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="glass p-6 rounded-2xl"
              >
                <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display font-bold text-[var(--text-primary)] mb-2">{title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Section B: Features ───────────────────────────── */}
        <section id="features-used">
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-widest text-[#667EEA] mb-3"
            >
              Input Features
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-display font-bold text-[var(--text-primary)]"
            >
              8 Clinically Relevant Metrics
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map(({ name, desc, unit }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass p-5 rounded-2xl group hover:shadow-[0_8px_32px_rgba(102,126,234,0.18)] transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-sm text-[var(--text-primary)] leading-tight">{name}</h4>
                  <span className="text-[10px] font-mono text-[#667EEA] bg-[rgba(102,126,234,0.1)] px-2 py-0.5 rounded-full shrink-0 ml-2">
                    {unit}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────── */}
        <section id="about-cta" className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-12 rounded-3xl"
          >
            <h2 className="text-3xl font-display font-bold text-[var(--text-primary)] mb-4">
              Ready to check your risk?
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
              Get an instant assessment and lifestyle recommendations using our Random Forest predictor.
            </p>
            <Link to="/predict" id="about-cta-btn">
              <motion.button
                className="btn-primary px-8 py-4 text-base inline-flex items-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Try the Predictor
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </section>

      </div>
    </motion.main>
  );
}
