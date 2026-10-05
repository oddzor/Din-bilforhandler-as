"use client";

import { useState } from "react";
import { navn, tilSalgs } from "@/lib/cars";
export default function InnbytteSkjema() {
  const [sendt, setSendt] = useState<string | null>(null);

  if (sendt) {
    return (
      <p className="sent" role="status">
        {sendt} I den ferdige løsningen sendes opplysningene til forhandleren på e-post.
      </p>
    );
  }

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const regnr = String(f.get("regnr") ?? "").toUpperCase().replace(/\s+/g, "");
        setSendt(`Takk! Vi har registrert ${regnr} og tar kontakt med et bud.`);
      }}
    >
      <div className="f-row">
        <label className="field" htmlFor="regnr">
          <span>Registreringsnummer</span>
          <input
            id="regnr"
            name="regnr"
            placeholder="AB 12345"
            autoCapitalize="characters"
            autoComplete="off"
            pattern="[A-Za-z]{2}\s?[0-9]{4,5}"
            title="To bokstaver og fire eller fem tall, for eksempel AB 12345"
            required
          />
        </label>
        <label className="field" htmlFor="km">
          <span>Kilometerstand</span>
          <input
            id="km"
            name="km"
            type="number"
            inputMode="numeric"
            min={0}
            max={999999}
            placeholder="85000"
            required
          />
        </label>
      </div>

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

      <label className="field" htmlFor="innbytte">
        <span>Vil du bytte inn mot en av bilene våre? (valgfritt)</span>
        <select id="innbytte" name="innbytte" defaultValue="">
          <option value="">Nei, jeg vil bare selge</option>
          {tilSalgs.map((b) => (
            <option key={b.kode} value={b.kode}>
              {navn(b)} {b.aar}
            </option>
          ))}
        </select>
      </label>

      <label className="field" htmlFor="tilstand">
        <span>Noe vi bør vite om bilen? (valgfritt)</span>
        <textarea
          id="tilstand"
          name="tilstand"
          placeholder="Service, skader, ekstra hjulsett og lignende"
        />
      </label>

      <button className="btn-send" type="submit">
        Be om bud
      </button>
    </form>
  );
}
