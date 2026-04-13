"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { HeroTheme } from "@/lib/storefront/home";

export function ThemeBackgroundLayer({ theme }: { theme: HeroTheme }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${theme.from}-${theme.via}-${theme.to}`}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 14% 18%, ${theme.glow}, transparent 26%),
              radial-gradient(circle at 86% 12%, rgba(255,255,255,0.42), transparent 20%),
              linear-gradient(145deg, ${theme.from} 0%, ${theme.via} 45%, ${theme.to} 100%)
            `,
          }}
        />
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[var(--color-background)]" />
      <div className="absolute left-[8%] top-14 h-40 w-40 rounded-full bg-white/26 blur-[72px]" />
      <div className="absolute right-[10%] top-[18%] h-52 w-52 rounded-full bg-[rgba(255,255,255,0.16)] blur-[80px]" />
    </div>
  );
}
