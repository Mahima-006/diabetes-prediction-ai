import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Play, Lock, Zap, Stethoscope, Brain, Database, Award } from "lucide-react";

/* ── Staggered fade-in for hero text ─────────────────────── */
const fadeUp = (delay = 0) => ({
  initial:  { opacity: 0, y: 24 },
  animate:  { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1], delay },
});

/* ── Stats counter ─────────────────────────────────────────── */
function StatCard({ number, unit, description, icon: Icon, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="stat-card glass flex-1"
    >
      <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-lg">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <p className="text-3xl font-display font-bold text-gradient mb-1">
        {number}
        <span className="text-lg text-[#667EEA]">{unit}</span>
      </p>
      <p className="text-sm text-[var(--text-secondary)]">{description}</p>
    </motion.div>
  );
}

/* ── How it works step ─────────────────────────────────────── */
function Step({ number, title, description, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex gap-5"
    >
      <div className="shrink-0 w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm shadow-lg">
        {number}
      </div>
      <div className="pb-8 border-b border-[var(--border)] flex-1">
        <h4 className="font-display font-bold text-[var(--text-primary)] mb-1">{title}</h4>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <main>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        id="hero"
        className="bg-hero min-h-screen flex items-center justify-center px-6 pt-24 pb-16"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div {...fadeUp(0.1)} className="mb-8">
            <span className="badge glass-dark text-white/90 border border-white/20 backdrop-blur-sm text-sm px-5 py-2">
              🧬 AI-Powered Health Screening
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.2)}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-white leading-[1.1] mb-6"
          >
            Know Your Diabetes Risk
            <br />
            <span className="text-white/80">Before It Finds You</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            {...fadeUp(0.35)}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Enter 8 simple health metrics. Get an instant, intelligent risk prediction —
            free, private, and powered by machine learning.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            {...fadeUp(0.45)}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link to="/predict" id="hero-cta-primary">
              <button className="btn-primary px-8 py-4 text-base flex items-center gap-2 group">
                Check My Risk
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            <Link to="/about" id="hero-cta-secondary">
              <button className="btn-ghost px-8 py-4 text-base flex items-center gap-2">
                <Play className="w-4 h-4" />
                How It Works
              </button>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            {...fadeUp(0.55)}
            className="flex flex-wrap gap-x-6 gap-y-3 justify-center text-sm text-white/65"
          >
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> No data stored
            </span>
            <span className="text-white/25">·</span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Instant results
            </span>
            <span className="text-white/25">·</span>
            <span className="flex items-center gap-1.5">
              <Stethoscope className="w-3.5 h-3.5" /> Clinically-relevant features
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ROW ─────────────────────────────────────── */}
      <section id="stats" className="py-16 px-6 -mt-2">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            <StatCard number="768" unit="+" description="Patient training records" icon={Database} delay={0} />
            <StatCard number="82.4" unit="%" description="Model accuracy on test data" icon={Award} delay={0.1} />
            <StatCard number="5" unit="" description="ML algorithms compared" icon={Brain} delay={0.2} />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────── */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-xs font-bold uppercase tracking-widest text-[#667EEA] mb-3"
              >
                How It Works
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-display font-bold text-[var(--text-primary)] mb-6"
              >
                From your metrics to
                <span className="text-gradient"> your risk score</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-[var(--text-secondary)] leading-relaxed mb-10"
              >
                DiabetesAI uses a Random Forest classifier trained on 768 real patient records
                to predict your diabetes risk in milliseconds.
              </motion.p>

              <div className="space-y-1">
                {[
                  { title: "Enter your health data",       desc: "Fill in 8 simple clinical values — Glucose, BMI, Age, and more." },
                  { title: "AI analyses your profile",     desc: "Your data is scaled and passed through our trained Random Forest model." },
                  { title: "Get your personalised result", desc: "Receive your risk probability, risk meter, and personalised recommendations." },
                  { title: "Download your PDF report",     desc: "A full, print-ready health assessment report is generated instantly." },
                ].map((step, i) => (
                  <Step
                    key={step.title}
                    number={i + 1}
                    title={step.title}
                    description={step.desc}
                    delay={i * 0.1}
                  />
                ))}
              </div>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: "🎯", title: "82.4% Accuracy",        desc: "Best-in-class Random Forest model, selected after testing 5 algorithms." },
                { icon: "⚡", title: "Instant Results",        desc: "Sub-second prediction with animated visual feedback." },
                { icon: "🔒", title: "100% Private",           desc: "No data is stored or transmitted beyond the prediction request." },
                { icon: "📄", title: "PDF Report",             desc: "Download a professional assessment report to share with your doctor." },
                { icon: "📱", title: "Fully Responsive",       desc: "Works beautifully on mobile, tablet, and desktop." },
                { icon: "🌙", title: "Dark Mode",              desc: "Easy on the eyes, day or night — preference saved automatically." },
              ].map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass p-5 rounded-2xl hover:shadow-[0_8px_32px_rgba(102,126,234,0.18)] transition-shadow"
                >
                  <div className="text-2xl mb-3">{feat.icon}</div>
                  <h4 className="font-semibold text-sm text-[var(--text-primary)] mb-1">{feat.title}</h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{feat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA BANNER ──────────────────────────────── */}
      <section id="cta-banner" className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-hero rounded-3xl p-12 md:p-16 text-center text-white"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-4">
              Take action today
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
              Know your risk in
              <br /> less than a minute
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-lg mx-auto">
              Early awareness is the most powerful tool you have.
              Start your free, instant assessment now.
            </p>
            <Link to="/predict" id="cta-banner-btn">
              <button className="btn-primary bg-white text-[#667EEA] px-10 py-4 text-base font-bold hover:bg-white/90">
                Get My Risk Score →
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
