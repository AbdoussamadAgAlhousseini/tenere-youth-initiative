"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

// Persists across client navigations (the module is not re-evaluated), but
// resets on a full page load — so the very first paint is never animated
// (keeps the hero's LCP fast). Subsequent route changes fade in.
let hasMountedOnce = false;

export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const skip = !hasMountedOnce;

  React.useEffect(() => {
    hasMountedOnce = true;
  }, []);

  if (reduce || skip) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
