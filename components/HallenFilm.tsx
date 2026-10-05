"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Filmen toner ut til svart de siste 0,6 sekundene (laget for å gå i løkke).
 * Vi stopper derfor her, på det siste bildet der alt står ferdig.
 */
const HOLD_SEKUNDER = 12;

const FILMER = [
  { klasse: "film-bred", src: "/videos/hallen-16x9.mp4", bredde: 1920, hoyde: 1080 },
  { klasse: "film-hoy", src: "/videos/hallen-9x16.mp4", bredde: 1080, hoyde: 1920 },
] as const;

/**
 * Seksjonen under hero: filmen skriver ut løftet vårt og krysser av det vi
 * har sjekket. Den spilles én gang, første gang den rulles fram, og blir
 * stående på siste bilde. CSS viser bred eller høy utgave etter skjermbredde,
 * og bare den synlige lastes ned.
 */
export default function HallenFilm() {
  const seksjon = useRef<HTMLElement>(null);
  const iSyne = useInView(seksjon, { once: true, amount: 0.35 });
  const rolig = useReducedMotion();

  useEffect(() => {
    if (!iSyne) return;
    const filmer = seksjon.current?.querySelectorAll("video") ?? [];
    const rydd: Array<() => void> = [];

    for (const film of filmer) {
      // offsetParent er null på den utgaven CSS har skjult
      if (film.offsetParent === null) continue;

      const stopp = () => {
        if (film.currentTime < HOLD_SEKUNDER) return;
        film.pause();
        film.currentTime = HOLD_SEKUNDER;
        film.removeEventListener("timeupdate", stopp);
      };

      if (rolig) {
        // ingen avspilling: gå rett til det ferdige bildet
        film.currentTime = HOLD_SEKUNDER;
        continue;
      }

      film.addEventListener("timeupdate", stopp);
      rydd.push(() => film.removeEventListener("timeupdate", stopp));
      // Nettleseren kan nekte avspilling (strømsparing). Da hopper vi til
      // det ferdige bildet i stedet for å la seksjonen stå tom.
      film.play().catch(() => {
        film.currentTime = HOLD_SEKUNDER;
      });
    }

    return () => rydd.forEach((f) => f());
  }, [iSyne, rolig]);

  return (
    <section className="film" ref={seksjon}>
      {/* Teksten står inne i filmen, så den gjentas her for skjermlesere og søk. */}
      <p className="visually-hidden">
        Hver bil står i hallen vår før den legges ut. Vi kjenner historikken,
        servicehefte og hva som er gjort — og sier fra om det vi selv ville sjekket.
        Du skal vite hva du kjøper før du skriver under.
      </p>
      {FILMER.map((f) => (
        <video
          key={f.src}
          className={f.klasse}
          width={f.bredde}
          height={f.hoyde}
          muted
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={f.src} type="video/mp4" />
        </video>
      ))}
    </section>
  );
}
