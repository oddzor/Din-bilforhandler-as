"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site";

/**
 * Headeren ligger fast i toppen på hele siden, slik at «Selge bil» og resten
 * av menyen alltid er innen rekkevidde.
 *
 * variant="over"  – forsiden: transparent over hero-bildet, og legger på egen
 *                   bunn så snart man ruller (.scrolled).
 * variant="solid" – undersidene: egen bunn fra start, med en avstandskloss
 *                   under så innholdet ikke havner bak den faste linja.
 */
export default function Header({ variant = "solid" }: { variant?: "over" | "solid" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sti = usePathname();

  useEffect(() => {
    if (variant !== "over") return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const klasser = [
    "topwrap",
    variant === "solid" || scrolled ? "solid" : "",
    open ? "menu-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <a className="skip" href="#innhold">
        Hopp til innholdet
      </a>
      <div className={klasser}>
        <div className="top">
          <Link className="mark" href="/" onClick={() => setOpen(false)}>
            {/* Logoen bærer navnet, så bildet trenger ingen tekst ved siden av */}
            <img src="/logo.png" alt={SITE.navn} width={810} height={219} />
          </Link>

          <nav className="nav-desk" aria-label="Hovedmeny">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} aria-current={sti === n.href ? "page" : undefined}>
                {n.tekst}
              </Link>
            ))}
          </nav>

          <button
            className="burger"
            aria-label={open ? "Lukk meny" : "Åpne meny"}
            aria-expanded={open}
            aria-controls="mobilmeny"
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>

        <div className="drawer" id="mobilmeny">
          <div className="drawer-in">
            <nav aria-label="Meny">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={sti === n.href ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {n.tekst}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {variant === "solid" && <div className="topspacer" aria-hidden="true" />}
    </>
  );
}
