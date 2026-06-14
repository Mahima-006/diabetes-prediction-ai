import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, Activity } from "lucide-react";

const NAV_LINKS = [
  { to: "/",        label: "Home"    },
  { to: "/predict", label: "Predict" },
  { to: "/about",   label: "About"   },
  { to: "/history", label: "History" },
];

export default function Navbar({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  /* Close mobile menu on route change */
  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      setMobileOpen(false);
      prevPath.current = location.pathname;
    }
  }, [location.pathname]);

  /* Scroll detection */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isHome = location.pathname === "/";

  return (
    <>
      <nav
        className={`navbar ${scrolled ? "scrolled" : ""}`}
        style={{
          background: scrolled
            ? dark
              ? "rgba(15,15,26,0.85)"
              : "rgba(248,249,255,0.85)"
            : isHome
            ? "transparent"
            : dark
            ? "rgba(15,15,26,0.6)"
            : "rgba(248,249,255,0.6)",
        }}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" id="nav-logo">
            <motion.div
              className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 10, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
            </motion.div>
            <span
              className="font-display font-800 text-xl tracking-tight"
              style={{ color: isHome && !scrolled ? "white" : "var(--text-primary)" }}
            >
              Diabetes<span className="text-gradient">AI</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  id={`nav-${link.label.toLowerCase()}`}
                  className={`
                    relative px-4 py-2 rounded-xl font-medium text-sm transition-colors duration-200
                    ${active
                      ? "text-[#667EEA]"
                      : isHome && !scrolled
                      ? "text-white/80 hover:text-white"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }
                  `}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: "rgba(102,126,234,0.12)" }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            {/* Dark mode toggle */}
            <motion.button
              id="dark-mode-toggle"
              onClick={() => setDark(!dark)}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200"
              style={{
                background: isHome && !scrolled
                  ? "rgba(255,255,255,0.15)"
                  : "rgba(102,126,234,0.1)",
                color: isHome && !scrolled ? "white" : "var(--text-secondary)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait">
                {dark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-4.5 h-4.5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-4.5 h-4.5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* CTA button */}
            <Link to="/predict" id="nav-cta">
              <motion.button
                className="hidden md:flex items-center gap-2 btn-primary text-sm py-2.5 px-5"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Try Now →
              </motion.button>
            </Link>

            {/* Hamburger */}
            <motion.button
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: isHome && !scrolled
                  ? "rgba(255,255,255,0.15)"
                  : "rgba(102,126,234,0.1)",
                color: isHome && !scrolled ? "white" : "var(--text-primary)",
              }}
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[68px] left-0 right-0 z-50 mx-4 rounded-2xl glass p-4 flex flex-col gap-1"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`
                  px-4 py-3 rounded-xl font-medium text-sm transition-colors duration-200
                  ${location.pathname === link.to
                    ? "gradient-primary text-white"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(102,126,234,0.08)]"
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/predict" className="mt-2">
              <button className="btn-primary w-full text-sm py-3">
                Check My Risk →
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
