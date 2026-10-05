"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";

export interface Sporsmal {
  sporsmal: string;
  svar: string;
}

/** Spørsmål og svar. Ett svar åpent om gangen, høyden animeres. */
export default function Accordion({ punkter }: { punkter: readonly Sporsmal[] }) {
  const [apen, setApen] = useState<number | null>(0);
  const id = useId();

  return (
    <div className="faq">
      {punkter.map((p, i) => {
        const erApen = apen === i;
        return (
          <div className="faq-rad" key={p.sporsmal}>
            <h3>
              <button
                type="button"
                id={`${id}-knapp-${i}`}
                aria-expanded={erApen}
                aria-controls={`${id}-svar-${i}`}
                onClick={() => setApen(erApen ? null : i)}
              >
                <span>{p.sporsmal}</span>
                <motion.svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  aria-hidden="true"
                  animate={{ rotate: erApen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                >
                  <path d="M12 5v14M5 12h14" />
                </motion.svg>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {erApen && (
                <motion.div
                  id={`${id}-svar-${i}`}
                  role="region"
                  aria-labelledby={`${id}-knapp-${i}`}
                  className="faq-svar"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                >
                  <p>{p.svar}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
