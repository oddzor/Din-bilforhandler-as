"use client";

import { useState } from "react";
import CarWall from "./CarWall";
import type { Bil } from "@/lib/cars";

/**
 * Forsiden viser de tre dyreste bilene og lar deg folde ut resten.
 * /vare-biler bruker CarWall direkte og viser alt med én gang.
 */
export default function Lagervegg({
  biler,
  forhandsvis = 3,
}: {
  biler: Bil[];
  forhandsvis?: number;
}) {
  const [alle, setAlle] = useState(false);
  const synlige = alle ? biler : biler.slice(0, forhandsvis);
  const resten = biler.length - forhandsvis;

  return (
    <>
      <CarWall biler={synlige} />
      {resten > 0 && (
        <div className="vis-mer">
          <button
            type="button"
            className="btn btn-s"
            aria-expanded={alle}
            onClick={() => setAlle((v) => !v)}
          >
            {alle ? "Vis færre biler" : `Vis alle ${biler.length} bilene`}
          </button>
        </div>
      )}
    </>
  );
}
