export const SITE = {
  navn: "Din Bilforhandler AS",
  orgnr: "936 875 882",
  gate: "Burmaveien 1A",
  post: "3083 Holmestrand",
  instagram: "https://www.instagram.com/din.bilforhandler/",
  // Fylles inn av forhandleren. Vises ikke i UI mens de er tomme.
  telefon: "",
  epost: "",
} as const;

export const NAV = [
  { href: "/vare-biler", tekst: "Våre biler" },
  { href: "/selge-bil", tekst: "Selge bil" },
  { href: "/om-oss", tekst: "Om oss" },
  { href: "/kontakt-oss", tekst: "Kontakt oss" },
] as const;
