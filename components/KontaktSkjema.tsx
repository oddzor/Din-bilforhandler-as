"use client";

import { useEffect, useRef, useState } from "react";
import { navn, tilSalgs } from "@/lib/cars";
export default function KontaktSkjema() {
  const [sendt, setSendt] = useState<string | null>(null);
  const bilFelt = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const kode = new URLSearchParams(window.location.search).get("bil");
    if (kode && bilFelt.current && tilSalgs.some((b) => b.kode === kode)) {
      bilFelt.current.value = kode;
    }
  }, []);

  if (sendt) {
    return (
      <p className="sent" role="status">
        {sendt} I den ferdige løsningen sendes henvendelsen til forhandleren på e-post.
      </p>
    );
  }

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const kode = String(f.get("bil") ?? "");
        const bil = tilSalgs.find((b) => b.kode === kode);
        setSendt(
          bil
            ? `Takk! Henvendelsen er registrert og gjelder ${navn(bil)} ${bil.aar}.`
            : "Takk! Henvendelsen er registrert."
        );
      }}
    >
      <div className="f-row">
        <label className="field" htmlFor="navn">
          <span>Navn</span>
          <input id="navn" name="navn" autoComplete="name" required />
        </label>
        <label className="field" htmlFor="tlf">
          <span>Telefon</span>
          <input id="tlf" name="tlf" type="tel" autoComplete="tel" required />
        </label>
      </div>

      <label className="field" htmlFor="epost">
        <span>E-post</span>
        <input id="epost" name="epost" type="email" autoComplete="email" required />
      </label>

      <label className="field" htmlFor="bil">
        <span>Gjelder bil</span>
        <select id="bil" name="bil" defaultValue="" ref={bilFelt}>
          <option value="">Generell henvendelse</option>
          {tilSalgs.map((b) => (
            <option key={b.kode} value={b.kode}>
              {navn(b)} {b.aar}
            </option>
          ))}
        </select>
      </label>

      <label className="field" htmlFor="melding">
        <span>Hva lurer du på?</span>
        <textarea
          id="melding"
          name="melding"
          placeholder="Er den ledig for prøvekjøring til helgen?"
        />
      </label>

      <button className="btn-send" type="submit">
        Send henvendelse
      </button>
    </form>
  );
}
