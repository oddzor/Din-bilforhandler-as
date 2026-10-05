"use client";

import { useId, useState } from "react";
import { bildeUrl, finnUrl, navn, nok, type Bil } from "@/lib/cars";
import SporOmDenne from "./SporOmDenne";

/**
 * Innholdet i én rute på lagerveggen. Selve ruta (<article>) eies av den som
 * tegner veggen, slik at den kan velge animasjon selv.
 *
 * Stor skjerm: bilde øverst, nøkkeltall og handlinger alltid synlige under.
 * Mobil: en lav rad med lite bilde. Trykk folder ut nøkkeltall og handlinger.
 * Utfoldingen styres av data-apen og gjelder bare i mobilvisningen (CSS).
 */
export default function BilRute({ bil: b }: { bil: Bil }) {
  const [apen, setApen] = useState(false);
  const id = useId();

  return (
    <div className="cell-in" data-apen={apen}>
      <div className="cell-hode">
        <div className="cell-img">
          <img
            src={bildeUrl(b.kode)}
            alt={`${navn(b)} ${b.aar}, ${b.farge.toLowerCase()}`}
            width={560}
            height={420}
            loading="lazy"
          />
          <span className="cell-tag">{b.drivstoff}</span>
          {b.solgt && <span className="badge-solgt">Solgt</span>}
        </div>

        <div className="cell-top">
          <h3 className="cell-name">
            {navn(b)}
            <em>{b.variant}</em>
          </h3>
          <p className="cell-kort">
            {b.aar} · {nok(b.km)} km
          </p>
          <span className="cell-pris">{b.solgt ? "Solgt" : `${nok(b.pris)} kr`}</span>
          <button
            type="button"
            className="cell-veksle"
            aria-expanded={apen}
            aria-controls={id}
            aria-label={`${apen ? "Skjul" : "Vis"} detaljer for ${navn(b)} ${b.aar}`}
            onClick={() => setApen((v) => !v)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="cell-mer" id={id}>
        <div className="cell-mer-in">
          <ul className="cell-spec">
            <li className="kun-stor">{b.aar}</li>
            <li className="kun-stor">{nok(b.km)} km</li>
            <li className="kun-mobil">{b.drivstoff}</li>
            <li>{b.drivlinje}</li>
            {b.rekkevidde && <li>{b.rekkevidde} rekkevidde</li>}
          </ul>

          {!b.solgt && (
            <div className="cell-cta">
              <a href={finnUrl(b.kode)} target="_blank" rel="noopener">
                Se annonsen på FINN
              </a>
              <SporOmDenne kode={b.kode} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
