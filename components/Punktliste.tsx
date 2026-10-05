import Ikon, { type IkonNavn } from "./Ikon";
import Reveal from "./Reveal";

export interface Punkt {
  ikon: IkonNavn;
  tittel: string;
  tekst: string;
}

interface PunktlisteProps {
  punkter: readonly Punkt[];
  /** "stripe" ligger kant i kant under hero, "ramme" står inne i en seksjon */
  variant?: "stripe" | "ramme";
}

/** Korte punkter med ikon, satt med samme 1px fuge som lagerveggen. */
export default function Punktliste({ punkter, variant = "stripe" }: PunktlisteProps) {
  return (
    <ul className={`fakta ${variant === "ramme" ? "ramme" : ""}`}>
      {punkter.map((p, i) => (
        <Reveal as="li" key={p.tittel} delay={i * 0.07}>
          <Ikon navn={p.ikon} />
          <div>
            <b>{p.tittel}</b>
            <span>{p.tekst}</span>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
