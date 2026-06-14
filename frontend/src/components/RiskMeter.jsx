import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * RiskMeter — animated SVG arc gauge that sweeps to the probability value.
 * @param {number} probability  0–100
 * @param {boolean} diabetic
 */
export default function RiskMeter({ probability = 0, diabetic }) {
  const [animated, setAnimated] = useState(false);
  const [display, setDisplay] = useState(0);
  const rafRef = useRef(null);

  /* Colour based on risk */
  const meterColor =
    probability < 40
      ? "#10B981"
      : probability < 70
      ? "#F59E0B"
      : "#EF4444";

  /* Animate the number counter */
  useEffect(() => {
    const duration = 1200; // ms
    const start = performance.now();
    const from = 0;
    const to = probability;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
      else setAnimated(true);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [probability]);

  /* SVG arc maths */
  const radius = 70;
  const cx = 100;
  const cy = 100;
  const startAngle = 180; // degrees (left)
  const endAngle   = 0;   // degrees (right)

  const polarToCartesian = (angle) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  };

  const describeArc = (startDeg, endDeg) => {
    const s = polarToCartesian(startDeg);
    const e = polarToCartesian(endDeg);
    const largeArc = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${largeArc} 1 ${e.x} ${e.y}`;
  };

  // Map 0–100% to 180°–0°
  const needleAngle = 180 - (probability / 100) * 180;

  // Circumference of the half-arc
  const arcLength = Math.PI * radius;
  const fillLength = (probability / 100) * arcLength;

  return (
    <div className="flex flex-col items-center" id="risk-meter">
      <svg
        viewBox="0 0 200 120"
        className="w-full max-w-[240px]"
        aria-label={`Risk meter showing ${probability}% risk`}
      >
        {/* Background track (grey arc) */}
        <path
          d={describeArc(180, 0)}
          fill="none"
          stroke="rgba(0,0,0,0.08)"
          strokeWidth="14"
          strokeLinecap="round"
        />

        {/* Coloured fill arc */}
        <motion.path
          d={describeArc(180, 0)}
          fill="none"
          stroke={meterColor}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={arcLength}
          initial={{ strokeDashoffset: arcLength }}
          animate={{ strokeDashoffset: arcLength - fillLength }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        />

        {/* Needle */}
        <motion.line
          x1={cx}
          y1={cy}
          x2={cx + (radius - 10) * Math.cos((needleAngle * Math.PI) / 180)}
          y2={cy + (radius - 10) * Math.sin((needleAngle * Math.PI) / 180)}
          stroke={meterColor}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        />

        {/* Needle base circle */}
        <circle cx={cx} cy={cy} r="6" fill={meterColor} />

        {/* Zone labels */}
        <text x="30"  y="112" fill="#10B981" fontSize="9" fontWeight="600" fontFamily="Inter,sans-serif">Low</text>
        <text x="84"  y="100" fill="#F59E0B" fontSize="9" fontWeight="600" fontFamily="Inter,sans-serif">Mid</text>
        <text x="152" y="112" fill="#EF4444" fontSize="9" fontWeight="600" fontFamily="Inter,sans-serif">High</text>

        {/* Percentage text in center */}
        <text
          x={cx}
          y={cy - 10}
          textAnchor="middle"
          fontSize="26"
          fontWeight="800"
          fill={meterColor}
          fontFamily="DM Mono,monospace"
        >
          {display}%
        </text>
      </svg>

      {/* Risk label */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
        className="mt-1 px-4 py-1.5 rounded-full text-sm font-bold text-white"
        style={{ background: meterColor }}
      >
        {probability < 40 ? "Low Risk" : probability < 70 ? "Moderate Risk" : "High Risk"}
      </motion.div>
    </div>
  );
}
