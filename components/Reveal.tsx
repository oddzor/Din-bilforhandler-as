"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Tagg = "div" | "li" | "article" | "section" | "p";

interface RevealProps {
  as?: Tagg;
  className?: string;
  /** sekunder, brukes til å forskyve naboer i samme rad */
  delay?: number;
  children: ReactNode;
}

const UTE = { opacity: 0, y: 22, filter: "blur(6px)" };
const INNE = { opacity: 1, y: 0, filter: "blur(0px)" };

/**
 * Innhold tones og glir inn første gang det rulles fram ("blur fade").
 * Én gang per element, så siden står stille når man ruller opp igjen.
 */
export default function Reveal({ as = "div", className, delay = 0, children }: RevealProps) {
  const Komp = motion[as] as typeof motion.div;
  return (
    <Komp
      className={className}
      initial={UTE}
      whileInView={INNE}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.19, 1, 0.22, 1] }}
    >
      {children}
    </Komp>
  );
}
