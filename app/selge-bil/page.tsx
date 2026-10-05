import type { Metadata } from "next";
import Link from "next/link";
import Accordion, { type Sporsmal } from "@/components/Accordion";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InnbytteSkjema from "@/components/InnbytteSkjema";
import Punktliste, { type Punkt } from "@/components/Punktliste";
import Reveal from "@/components/Reveal";
import SideTopp from "@/components/SideTopp";

export const metadata: Metadata = {
  title: "Selge bil",
  description:
    "Selg bilen din til Din Bilforhandler AS i Holmestrand, eller bytt den inn når du kjøper av oss. Du får et konkret bud, ikke et estimat.",
};

const STEG: Punkt[] = [
  {
    ikon: "skjema",
    tittel: "Send oss opplysningene",
    tekst: "Registreringsnummer og kilometerstand er nok til at vi kan begynne.",
  },
  {
    ikon: "se",
    tittel: "Vi ser på bilen",
    tekst: "Vi går gjennom bilen sammen med deg på Burmaveien.",
  },
  {
    ikon: "bud",
    tittel: "Du får et konkret bud",
    tekst: "Et beløp du kan si ja eller nei til, ikke et estimat.",
  },
];

const SPORSMAL: Sporsmal[] = [
  {
    sporsmal: "Må jeg kjøpe bil av dere for å selge?",
    svar: "Nei. Vi kjøper biler direkte, også når du ikke skal ha ny bil av oss.",
  },
  {
    sporsmal: "Kan jeg bytte inn bilen min?",
    svar: "Ja. Vi tar gjerne bilen din i innbytte når du kjøper av oss. Velg bilen du er interessert i nederst i skjemaet.",
  },
  {
    sporsmal: "Hva trenger dere for å gi et bud?",
    svar: "Registreringsnummer og kilometerstand. Fortell gjerne om service, skader og ekstrautstyr, så blir budet mer treffsikkert.",
  },
  {
    sporsmal: "Er budet et estimat?",
    svar: "Nei. Du får et konkret bud, ikke et anslag som endrer seg senere.",
  },
];

export default function SelgeBil() {
  return (
    <>
      <Header />
      <main id="innhold">
        <SideTopp
          tittel="Selg bilen din til oss"
          ingress="Vi kjøper biler direkte, og tar gjerne bilen din i innbytte når du kjøper av oss. Du får et konkret bud, ikke et estimat."
        >
          <a className="btn btn-p" href="#bud">
            Be om bud
          </a>
          <Link className="btn btn-s" href="/vare-biler">
            Se bilene våre
          </Link>
        </SideTopp>

        <section className="seksjon">
          <h2 className="seksjon-h">Slik foregår det</h2>
          <Punktliste punkter={STEG} variant="ramme" />
        </section>

        <section className="seksjon" id="bud">
          <Reveal className="kontakt-grid">
            <div>
              <h2 className="seksjon-h">Be om bud på bilen</h2>
              <p className="lead">
                Fyll inn registreringsnummer og kilometerstand, så tar vi kontakt. Vil
                du bytte inn mot en av bilene våre, velger du den i skjemaet.
              </p>
            </div>
            <InnbytteSkjema />
          </Reveal>
        </section>

        <section className="seksjon">
          <div className="smal">
            <h2 className="seksjon-h">Vanlige spørsmål</h2>
            <Accordion punkter={SPORSMAL} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
