import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lagerfilter from "@/components/Lagerfilter";
import SideTopp from "@/components/SideTopp";
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
        <SideTopp
          tittel="Våre biler"
          ingress={`${tilSalgs.length} biler på lager akkurat nå. Alle er fotografert i hallen vår og har full annonse på FINN.`}
        >
          <a className="btn btn-s" href={FINN_BUTIKK} target="_blank" rel="noopener">
            Alle annonser på FINN
          </a>
        </SideTopp>
        <Lagerfilter biler={biler} />
      </main>
      <Footer />
    </>
  );
}
