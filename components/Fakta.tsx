import Punktliste, { type Punkt } from "./Punktliste";

/**
 * Fire korte løfter rett under hero. Alt her er ting forhandleren allerede
 * sier om seg selv; ingen tall eller påstander er diktet opp.
 */
export default function Fakta({ antall }: { antall: number }) {
  const punkter: Punkt[] = [
    {
      ikon: "garanti",
      tittel: "Inntil 36 måneders garanti",
      tekst: "Gjennom GoSafe når du kjøper bruktbil hos oss.",
    },
    {
      ikon: "utvalg",
      tittel: "Få biler om gangen",
      tekst: "Et lite lager vi selv har valgt ut.",
    },
    {
      ikon: "hall",
      tittel: "Fotografert i egen hall",
      tekst: "Bildene viser bilen slik den står hos oss.",
    },
    {
      ikon: "lager",
      tittel: `${antall} biler på lager nå`,
      tekst: "Alle med full annonse på FINN.",
    },
  ];

  return <Punktliste punkter={punkter} />;
}
