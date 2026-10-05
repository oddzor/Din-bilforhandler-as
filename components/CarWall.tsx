import { ruteKlasse, type Bil } from "@/lib/cars";
import BilRute from "./BilRute";
import Reveal from "./Reveal";

/**
 * Lagerveggen. Alle bilene er fotografert i samme hall, samme vinkel, så
 * rutenettet settes som én sammenhengende vegg: ingen radius, ingen skygge,
 * 1px fuge.
 */
export default function CarWall({ biler }: { biler: readonly Bil[] }) {
  return (
    <div className="wall">
      {biler.map((b, i) => (
        <Reveal as="article" className={ruteKlasse(b)} key={b.kode} delay={(i % 3) * 0.07}>
          <BilRute bil={b} />
        </Reveal>
      ))}
    </div>
  );
}
