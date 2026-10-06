import Link from "next/link";
import CarWall from "./CarWall";
import type { Bil } from "@/lib/cars";

/**
 * Forsiden viser de tre dyreste bilene som fremhevede, og lenker videre
 * til /vare-biler for hele lageret med filter og sortering.
 */
export default function Lagervegg({
  biler,
  forhandsvis = 3,
}: {
  biler: readonly Bil[];
  forhandsvis?: number;
}) {
  const resten = biler.length - forhandsvis;

  return (
    <>
      <CarWall biler={biler.slice(0, forhandsvis)} />
      {resten > 0 && (
        <div className="vis-mer">
          <Link className="btn btn-s" href="/vare-biler">
            Se alle {biler.length} bilene
          </Link>
        </div>
      )}
    </>
  );
}
