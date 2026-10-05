import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Punktliste, { type Punkt } from "@/components/Punktliste";
import Reveal from "@/components/Reveal";
import SideTopp from "@/components/SideTopp";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Om oss",
  description:
    "Din Bilforhandler AS er en liten bruktbilforhandler på Burmaveien i Holmestrand. Få biler om gangen, solgt med inntil 36 måneders garanti.",
};

const PRINSIPPER: Punkt[] = [
  {
    ikon: "utvalg",
    tittel: "Få biler om gangen",
    tekst: "Vi kjøper inn et lite lager, så vi rekker å bli kjent med hver bil.",
  },
  {
    ikon: "historikk",
    tittel: "Åpne om historikken",
    tekst: "Vi kjenner servicehefte og hva som er gjort, og sier fra om det vi selv ville sjekket.",
  },
  {
    ikon: "garanti",
    tittel: "Garanti gjennom GoSafe",
    tekst: "Bilene selges med inntil 36 måneders garanti.",
  },
];

export default function OmOss() {
  return (
    <>
      <Header />
      <main id="innhold">
        <SideTopp
          tittel="En liten forhandler på Burmaveien"
          ingress="Vi kjøper inn få biler om gangen, fotograferer hver enkelt i hallen vår, og selger dem med inntil 36 måneders garanti gjennom GoSafe."
        />

        <section className="seksjon">
          <Reveal className="split">
            <img
              src="/hero-bmw.jpg"
              alt="Visningshallen på Burmaveien, med firmaskiltet på veggen"
              width={1600}
              height={900}
              loading="lazy"
            />
            <div className="prosa">
              <h2 className="seksjon-h">Hver bil står i hallen før den legges ut</h2>
              <p>
                Vi kjenner historikken, servicehefte og hva som er gjort, og sier fra
                om det vi selv ville sjekket. Du skal vite hva du kjøper før du
                skriver under.
              </p>
              <p>
                Alle bilene fotograferes på samme sted, i samme lys. Det du ser i
                annonsen er bilen slik den står hos oss på {SITE.gate}.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="seksjon">
          <h2 className="seksjon-h">Slik jobber vi</h2>
          <Punktliste punkter={PRINSIPPER} variant="ramme" />
        </section>

        <section className="seksjon">
          <Reveal className="avslutt">
            <h2>Kom innom og se bilene</h2>
            <p className="lead">
              Vi holder til på {SITE.gate} i Holmestrand og tar gjerne en prat før du
              bestemmer deg.
            </p>
            <div className="topp-act">
              <Link className="btn btn-p" href="/vare-biler">
                Se bilene
              </Link>
              <Link className="btn btn-s" href="/kontakt-oss">
                Kontakt oss
              </Link>
            </div>
          </Reveal>
          <p className="kommer">
            En presentasjon av folkene bak og flere bilder fra lokalet kommer her.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
