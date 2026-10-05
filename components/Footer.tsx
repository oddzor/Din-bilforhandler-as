import Link from "next/link";
import { FINN_BUTIKK } from "@/lib/cars";
import { NAV, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="foot-grid">
        <div>
          <img
            className="foot-logo"
            src="/logo.png"
            alt=""
            width={810}
            height={219}
            loading="lazy"
          />
          <h2 className="visually-hidden">{SITE.navn}</h2>
          <p className="org">
            {SITE.gate}, {SITE.post}
            <br />
            Org.nr {SITE.orgnr}
            <br />
            Bruktbil med inntil 36 måneders garanti gjennom GoSafe.
          </p>
        </div>
        <div>
          <h2>Sider</h2>
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.tekst}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Finn oss</h2>
          <ul>
            <li>
              <a href={FINN_BUTIKK} target="_blank" rel="noopener">
                Alle annonser på FINN
              </a>
            </li>
            <li>
              <a href={SITE.instagram} target="_blank" rel="noopener">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="foot-base">
        <span>&copy; {new Date().getFullYear()} {SITE.navn}</span>
        <span>Org.nr {SITE.orgnr}</span>
      </div>
    </footer>
  );
}
