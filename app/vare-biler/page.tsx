import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lagerfilter from "@/components/Lagerfilter";
import { biler, FINN_BUTIKK, tilSalgs } from "@/lib/cars";

export const metadata: Metadata = {
  title: "Våre biler",
  description:
    "Hele lageret til Din Bilforhandler AS i Holmestrand. El, ladbar hybrid, bensin og diesel — med lenke til annonsen på FINN.",
};

export default function VareBiler() {
  return (
    <>
      <Header />
      <main id="innhold">
        <Lagerfilter biler={biler}>
          <div className="lager-topp">
            <h1>Våre biler</h1>
            <p>
              {tilSalgs.length} biler på lager.{" "}
              <a href={FINN_BUTIKK} target="_blank" rel="noopener">
                Alle annonser på FINN
              </a>
            </p>
          </div>
        </Lagerfilter>
      </main>
      <Footer />
    </>
  );
}
