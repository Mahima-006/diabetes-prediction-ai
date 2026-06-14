import React from "react";
import { Link } from "react-router-dom";
import { Activity, Github, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--border)] py-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold text-lg text-[var(--text-primary)]">
                Diabetes<span className="text-gradient">AI</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
              AI-powered early diabetes risk screening. Free, private, and instant — 
              powered by machine learning.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-sm text-[var(--text-primary)] mb-4 uppercase tracking-wider">Navigation</h4>
            <div className="flex flex-col gap-2.5">
              {[
                { to: "/",        label: "Home"       },
                { to: "/predict", label: "Predict"    },
                { to: "/about",   label: "About"      },
                { to: "/history", label: "History"    },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-sm text-[var(--text-secondary)] hover:text-[#667EEA] transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="font-semibold text-sm text-[var(--text-primary)] mb-4 uppercase tracking-wider">Disclaimer</h4>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              DiabetesAI is for informational purposes only. It is <strong>not a medical diagnosis</strong>. 
              Always consult a qualified healthcare professional for medical advice.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-[var(--border)] gap-4">
          <p className="text-xs text-[var(--text-secondary)]">
            © 2026 DiabetesAI. Built with{" "}
            <Heart className="inline w-3 h-3 text-[#F5576C] fill-[#F5576C]" />.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[var(--text-secondary)]">
              Dataset: Pima Indians Diabetes (UCI ML Repository)
            </span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[#667EEA] transition-colors"
              id="footer-github"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
