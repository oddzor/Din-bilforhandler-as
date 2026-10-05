import { useId, type CSSProperties } from "react";
import type { Omrade, Spenn } from "@/lib/lagerfilter";

interface OmradeskyverProps {
  etikett: string;
  /** ytterpunktene på skyveren */
  spenn: Spenn;
  steg: number;
  /** valgt område. null i en ende betyr at knotten står ytterst */
  verdi: Omrade;
  /** tekst når hele spennet er med, f.eks. «Alle år» */
  alleTekst: string;
  formater: (verdi: number) => string;
  enhet?: string;
  onChange: (verdi: Omrade) => void;
}

/**
 * Skyver med to knotter for et fra–til-område. Bygget som to av nettleserens
 * egne range-inputs lagt oppå hverandre, så tastatur, berøring og skjermleser
 * virker uten egen håndtering. Selve sporet tegnes av omslaget.
 */
export default function Omradeskyver({
  etikett,
  spenn: { min, maks },
  steg,
  verdi,
  alleTekst,
  formater,
  enhet,
  onChange,
}: OmradeskyverProps) {
  const id = useId();
  const fra = verdi.fra ?? min;
  const til = verdi.til ?? maks;
  const bredde = maks - min;
  const prosent = (v: number) => (bredde > 0 ? ((v - min) / bredde) * 100 : 0);
  const medEnhet = (v: number) => (enhet ? `${formater(v)} ${enhet}` : formater(v));

  const tekst =
    verdi.fra === null && verdi.til === null
      ? alleTekst
      : fra === til
        ? medEnhet(fra)
        : `${formater(fra)} – ${medEnhet(til)}`;

  // Ytterst betyr «ingen grense», så filteret regnes som av i den enden.
  const meld = (nyFra: number, nyTil: number) =>
    onChange({ fra: nyFra <= min ? null : nyFra, til: nyTil >= maks ? null : nyTil });

  // Når knottene står oppå hverandre må den som kan flyttes ligge øverst:
  // nedre knott i øvre halvdel (kan bare gå ned), øvre knott ellers.
  const nedreOverst = fra > min + bredde / 2;

  return (
    <div className="omrade" role="group" aria-labelledby={id}>
      <div className="omrade-topp">
        <span id={id}>{etikett}</span>
        <b>{tekst}</b>
      </div>
      <div
        className="omrade-spor"
        style={{ "--fra": `${prosent(fra)}%`, "--til": `${prosent(til)}%` } as CSSProperties}
      >
        <input
          type="range"
          min={min}
          max={maks}
          step={steg}
          value={fra}
          disabled={bredde <= 0}
          aria-label={`${etikett}, fra`}
          aria-valuetext={medEnhet(fra)}
          style={{ zIndex: nedreOverst ? 2 : 1 }}
          onChange={(e) => meld(Math.min(Number(e.target.value), til), til)}
        />
        <input
          type="range"
          min={min}
          max={maks}
          step={steg}
          value={til}
          disabled={bredde <= 0}
          aria-label={`${etikett}, til`}
          aria-valuetext={medEnhet(til)}
          style={{ zIndex: nedreOverst ? 1 : 2 }}
          onChange={(e) => meld(fra, Math.max(Number(e.target.value), fra))}
        />
      </div>
    </div>
  );
}
