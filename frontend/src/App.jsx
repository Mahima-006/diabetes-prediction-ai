import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home    from "./pages/Home";
import Predict from "./pages/Predict";
import About   from "./pages/About";
import History from "./pages/History";

export default function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("diabetesai-dark");
    if (saved !== null) return saved === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("diabetesai-dark", dark);
  }, [dark]);

  return (
    <BrowserRouter>
      <div className={`min-h-screen transition-colors duration-300 ${dark ? "dark bg-[#0F0F1A]" : "bg-[#F8F9FF]"}`}>
        <Navbar dark={dark} setDark={setDark} />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/"        element={<Home />} />
            <Route path="/predict" element={<Predict />} />
            <Route path="/about"   element={<About />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
