import Lagervegg from "@/components/Lagervegg";
import Fakta from "@/components/Fakta";
import Footer from "@/components/Footer";
import HallenFilm from "@/components/HallenFilm";
import Header from "@/components/Header";
import KontaktSkjema from "@/components/KontaktSkjema";
import Reveal from "@/components/Reveal";
import { FINN_BUTIKK, tilSalgs } from "@/lib/cars";
import { SITE } from "@/lib/site";

export default function Hjem() {
  const antall = tilSalgs.length;
  return (
    <>
      <header style={{ position: "relative" }}>
        <Header variant="over" />

        <div className="hero">
          <img
            src="/hero-bmw.jpg"
            alt="BMW 330e xDrive Touring i visningshallen på Burmaveien"
            width={1600}
            height={900}
            fetchPriority="high"
          />
          <div className="hero-txt">
            <p className="hero-eyebrow">
              {SITE.navn} · {SITE.gate}
            </p>
            <h1>Bruktbil i Holmestrand, håndplukket og med garanti</h1>
            <p className="hero-sub">
              Vi kjøper inn få biler om gangen, fotograferer hver enkelt i hallen
              vår, og selger dem med inntil 36 måneders garanti.
            </p>
            <div className="hero-act">
              <a className="btn btn-p" href="#biler">
                Se bilene
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a className="btn btn-s" href="#kontakt">
                Snakk med oss
              </a>
            </div>
          </div>
        </div>
      </header>

      <main id="innhold">
        <Fakta antall={antall} />

        <HallenFilm />

        <section id="biler">
          <div className="wall-head">
            <h2>Biler til salgs</h2>
            <p>
              {antall} biler på lager.{" "}
              <a href={FINN_BUTIKK} target="_blank" rel="noopener">
                Alle annonser på FINN
              </a>
            </p>
          </div>
          <Lagervegg biler={tilSalgs} forhandsvis={3} />
        </section>

        <section className="kontakt" id="kontakt">
          <Reveal className="kontakt-grid">
            <div>
              <h2>Kom innom Burmaveien</h2>
              <p className="lead">
                Vi holder til i Holmestrand og tar gjerne en prat før du bestemmer deg.
                Velg bilen du lurer på, så svarer vi på den.
              </p>
              <div className="adr">
                <b>{SITE.navn}</b>
                <br />
                {SITE.gate}, {SITE.post}
                <br />
                Org.nr {SITE.orgnr}
                <br />
                <span style={{ color: "var(--bone-faint)" }}>
                  Telefon og åpningstider fylles inn
                </span>
              </div>
            </div>
            <KontaktSkjema />
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}
