import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Ikon from "@/components/Ikon";
import KontaktSkjema from "@/components/KontaktSkjema";
import Reveal from "@/components/Reveal";
import SideTopp from "@/components/SideTopp";
import { FINN_BUTIKK } from "@/lib/cars";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt oss",
  description: "Kontakt Din Bilforhandler AS i Holmestrand — adresse, åpningstider og henvendelser.",
};

const ADRESSE = `${SITE.gate}, ${SITE.post}`;
const KART = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADRESSE)}`;
const MANGLER = "Fylles inn av forhandleren";

export default function KontaktOss() {
  // Tomme strenger i SITE betyr at forhandleren ikke har oppgitt dem ennå.
  const telefon: string = SITE.telefon;
  const epost: string = SITE.epost;

  return (
    <>
      <Header />
      <main id="innhold">
        <SideTopp
          tittel="Kontakt oss"
          ingress="Vi holder til på Burmaveien 1A i Holmestrand. Kom innom, eller send oss en melding om bilen du lurer på."
        />

        <section className="seksjon">
          <Reveal className="kontakt-grid">
            <ul className="info">
              <li>
                <Ikon navn="kart" />
                <div>
                  <b>Besøksadresse</b>
                  <span>{ADRESSE}</span>
                  <a href={KART} target="_blank" rel="noopener">
                    Åpne i kart
                  </a>
                </div>
              </li>
              <li>
                <Ikon navn="klokke" />
                <div>
                  <b>Åpningstider</b>
                  <span className="mangler">{MANGLER}</span>
                </div>
              </li>
              <li>
                <Ikon navn="telefon" />
                <div>
                  <b>Telefon</b>
                  {telefon ? (
                    <a href={`tel:${telefon.replace(/\s+/g, "")}`}>{telefon}</a>
                  ) : (
                    <span className="mangler">{MANGLER}</span>
                  )}
                </div>
              </li>
              <li>
                <Ikon navn="epost" />
                <div>
                  <b>E-post</b>
                  {epost ? (
                    <a href={`mailto:${epost}`}>{epost}</a>
                  ) : (
                    <span className="mangler">{MANGLER}</span>
                  )}
                </div>
              </li>
              <li>
                <Ikon navn="lager" />
                <div>
                  <b>Følg lageret</b>
                  <a href={FINN_BUTIKK} target="_blank" rel="noopener">
                    Alle annonser på FINN
                  </a>
                  <a href={SITE.instagram} target="_blank" rel="noopener">
                    Instagram
                  </a>
                </div>
              </li>
            </ul>

            <div>
              <h2 className="seksjon-h">Send oss en melding</h2>
              <KontaktSkjema />
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
