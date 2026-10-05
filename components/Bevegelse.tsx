"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Felles oppsett for all bevegelse på siden. reducedMotion="user" gjør at
 * forflytning og layout-animasjon slås av for dem som har bedt om det i
 * systemet, mens rene toninger beholdes.
 */
export default function Bevegelse({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
