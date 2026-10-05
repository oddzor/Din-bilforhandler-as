import type { Bil } from "./cars";

/** Et område med inklusive grenser. null betyr «ingen grense» i den enden. */
export interface Omrade {
  fra: number | null;
  til: number | null;
}

const APENT: Omrade = { fra: null, til: null };

/** Tom streng og åpent område betyr «ikke filtrert på dette». */
export interface Filter {
  drivstoff: string;
  merke: string;
  aar: Omrade;
  km: Omrade;
  pris: Omrade;
}

export const TOMT_FILTER: Filter = {
  drivstoff: "",
  merke: "",
  aar: APENT,
  km: APENT,
  pris: APENT,
};

const innenfor = (verdi: number, o: Omrade): boolean =>
  (o.fra === null || verdi >= o.fra) && (o.til === null || verdi <= o.til);

const erSatt = (o: Omrade): boolean => o.fra !== null || o.til !== null;

type Sammenlign = (a: Bil, b: Bil) => number;

interface Sorteringsvalg {
  tekst: string;
  sammenlign: Sammenlign;
}

export const SORTERING = {
  "pris-ned": { tekst: "Pris, høy til lav", sammenlign: (a, b) => b.pris - a.pris },
  "pris-opp": { tekst: "Pris, lav til høy", sammenlign: (a, b) => a.pris - b.pris },
  "aar-ned": { tekst: "Årsmodell, nyeste først", sammenlign: (a, b) => b.aar - a.aar },
  "aar-opp": { tekst: "Årsmodell, eldste først", sammenlign: (a, b) => a.aar - b.aar },
  "km-opp": { tekst: "Kilometer, lav til høy", sammenlign: (a, b) => a.km - b.km },
  "km-ned": { tekst: "Kilometer, høy til lav", sammenlign: (a, b) => b.km - a.km },
  merke: {
    tekst: "Merke, A til Å",
    sammenlign: (a, b) =>
      a.merke.localeCompare(b.merke, "nb") || a.modell.localeCompare(b.modell, "nb"),
  },
} as const satisfies Record<string, Sorteringsvalg>;

export type Sortering = keyof typeof SORTERING;

export const erSortering = (v: string): v is Sortering => v in SORTERING;

export function filtrer(biler: readonly Bil[], f: Filter): Bil[] {
  return biler.filter(
    (b) =>
      (f.drivstoff === "" || b.drivstoff === f.drivstoff) &&
      (f.merke === "" || b.merke === f.merke) &&
      innenfor(b.aar, f.aar) &&
      innenfor(b.km, f.km) &&
      innenfor(b.pris, f.pris)
  );
}

/** Returnerer en ny, sortert liste. Solgte biler står alltid sist. */
export function sorter(biler: readonly Bil[], sortering: Sortering): Bil[] {
  const { sammenlign } = SORTERING[sortering];
  return [...biler].sort(
    (a, b) => Number(Boolean(a.solgt)) - Number(Boolean(b.solgt)) || sammenlign(a, b)
  );
}

export function antallAktive(f: Filter): number {
  return [f.drivstoff !== "", f.merke !== "", erSatt(f.aar), erSatt(f.km), erSatt(f.pris)]
    .filter(Boolean).length;
}

export interface Spenn {
  min: number;
  maks: number;
}

/**
 * Ytterpunktene til en skyver: laveste og høyeste verdi rundet utover til
 * hele steg, slik at alle verdiene ligger innenfor.
 */
export function spenn(verdier: readonly number[], steg: number): Spenn {
  if (verdier.length === 0) return { min: 0, maks: 0 };
  return {
    min: Math.floor(Math.min(...verdier) / steg) * steg,
    maks: Math.ceil(Math.max(...verdier) / steg) * steg,
  };
}
