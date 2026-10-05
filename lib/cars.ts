import data from "./cars.json";

export type Bil = {
  /** FINN-annonsens kode, brukes til lenke og bildefilnavn */
  kode: string;
  merke: string;
  modell: string;
  variant: string;
  aar: number;
  km: number;
  pris: number;
  drivstoff: "El" | "Ladbar hybrid" | "Bensin" | "Diesel";
  drivlinje: string;
  hk: number;
  farge: string;
  kar: string;
  rekkevidde?: string;
  solgt?: boolean;
};

export const biler = data as Bil[];

export const tilSalgs = biler.filter((b) => !b.solgt);

export const finnUrl = (kode: string) =>
  `https://www.finn.no/mobility/item/${kode}`;

export const bildeUrl = (kode: string) => `/biler/${kode}.jpg`;

/** 329900 -> "329 900" med hardt mellomrom slik norske tall settes */
export const nok = (n: number) => n.toLocaleString("nb-NO").replace(/\u00A0/g, " ");

export const navn = (b: Bil) => `${b.merke} ${b.modell}`;

/** CSS-klassene til ruta en bil står i på lagerveggen */
export const ruteKlasse = (b: Bil): string => `cell ${b.solgt ? "er-solgt" : ""}`;

export const FINN_BUTIKK =
  "https://www.finn.no/mobility/search/car?orgId=5960533";
