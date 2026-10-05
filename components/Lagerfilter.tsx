"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { nok, ruteKlasse, type Bil } from "@/lib/cars";
import {
  antallAktive,
  erSortering,
  filtrer,
  sorter,
  SORTERING,
  spenn,
  TOMT_FILTER,
  type Filter,
  type Sortering,
} from "@/lib/lagerfilter";
import BilRute from "./BilRute";
import Omradeskyver from "./Omradeskyver";

const KM_STEG = 10_000;
const PRIS_STEG = 10_000;

/**
 * Hele lageret med filter på drivstoff, merke, årsmodell, kilometerstand og
 * pris, pluss sortering. Rutene flytter seg til ny plass i stedet for å
 * hoppe, så man ser hva som ble igjen.
 */
export default function Lagerfilter({ biler }: { biler: readonly Bil[] }) {
  const [filter, setFilter] = useState<Filter>(TOMT_FILTER);
  const [sortering, setSortering] = useState<Sortering>("pris-ned");

  const sett = (endring: Partial<Filter>) => setFilter((f) => ({ ...f, ...endring }));

  const valg = useMemo(
    () => ({
      drivstoff: [...new Set(biler.map((b) => b.drivstoff))],
      merker: [...new Set(biler.map((b) => b.merke))].sort((a, b) => a.localeCompare(b, "nb")),
      aar: spenn(biler.map((b) => b.aar), 1),
      km: spenn(biler.map((b) => b.km), KM_STEG),
      pris: spenn(biler.map((b) => b.pris), PRIS_STEG),
    }),
    [biler]
  );

  const synlige = useMemo(
    () => sorter(filtrer(biler, filter), sortering),
    [biler, filter, sortering]
  );

  // Tallene på hvert valg viser hva man får med de andre filtrene uendret.
  const utenDrivstoff = useMemo(() => filtrer(biler, { ...filter, drivstoff: "" }), [biler, filter]);
  const utenMerke = useMemo(() => filtrer(biler, { ...filter, merke: "" }), [biler, filter]);
  const antallDrivstoff = (v: string) =>
    v === "" ? utenDrivstoff.length : utenDrivstoff.filter((b) => b.drivstoff === v).length;

  const aktive = antallAktive(filter);
  const nullstill = () => setFilter(TOMT_FILTER);

  return (
    <>
      <div className="filter">
        <div className="chips" role="group" aria-label="Filtrer på drivstoff">
          {["", ...valg.drivstoff].map((v) => (
            <button
              key={v}
              type="button"
              className="chip"
              aria-pressed={filter.drivstoff === v}
              onClick={() => sett({ drivstoff: v })}
            >
              {filter.drivstoff === v && (
                <motion.span
                  layoutId="chip-valgt"
                  className="chip-valgt"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
              <span className="chip-tekst">
                {v === "" ? "Alle" : v} <i>{antallDrivstoff(v)}</i>
              </span>
            </button>
          ))}
        </div>

        <div className="filter-felt">
          <label className="velg">
            <span>Merke</span>
            <select value={filter.merke} onChange={(e) => sett({ merke: e.target.value })}>
              <option value="">Alle merker</option>
              {valg.merker.map((m) => (
                <option key={m} value={m}>
                  {m} ({utenMerke.filter((b) => b.merke === m).length})
                </option>
              ))}
            </select>
          </label>

          <Omradeskyver
            etikett="Årsmodell"
            spenn={valg.aar}
            steg={1}
            verdi={filter.aar}
            alleTekst="Alle år"
            formater={String}
            onChange={(aar) => sett({ aar })}
          />

          <Omradeskyver
            etikett="Kilometerstand"
            spenn={valg.km}
            steg={KM_STEG}
            verdi={filter.km}
            alleTekst="Alle"
            formater={nok}
            enhet="km"
            onChange={(km) => sett({ km })}
          />

          <Omradeskyver
            etikett="Pris"
            spenn={valg.pris}
            steg={PRIS_STEG}
            verdi={filter.pris}
            alleTekst="Alle"
            formater={nok}
            enhet="kr"
            onChange={(pris) => sett({ pris })}
          />

          <label className="velg">
            <span>Sorter</span>
            <select
              value={sortering}
              onChange={(e) => {
                if (erSortering(e.target.value)) setSortering(e.target.value);
              }}
            >
              {Object.entries(SORTERING).map(([k, s]) => (
                <option key={k} value={k}>
                  {s.tekst}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="filter-status">
          <p aria-live="polite">
            Viser {synlige.length} av {biler.length} biler
          </p>
          {aktive > 0 && (
            <button type="button" className="nullstill" onClick={nullstill}>
              Nullstill filter ({aktive})
            </button>
          )}
        </div>
      </div>

      {synlige.length === 0 ? (
        <div className="tomt">
          <p>Ingen biler passer disse valgene akkurat nå.</p>
          <button type="button" className="btn btn-s" onClick={nullstill}>
            Vis alle bilene
          </button>
        </div>
      ) : (
        <div className="wall">
          <AnimatePresence mode="popLayout" initial={false}>
            {synlige.map((b) => (
              <motion.article
                key={b.kode}
                layout
                className={ruteKlasse(b)}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
              >
                <BilRute bil={b} />
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
