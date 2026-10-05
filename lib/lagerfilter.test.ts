import assert from "node:assert/strict";
import { test } from "node:test";
import type { Bil } from "./cars.ts";
import {
  antallAktive,
  filtrer,
  sorter,
  spenn,
  TOMT_FILTER,
  type Filter,
} from "./lagerfilter.ts";

const bil = (over: Partial<Bil>): Bil => ({
  kode: "1",
  merke: "Tesla",
  modell: "Model 3",
  variant: "",
  aar: 2020,
  km: 100000,
  pris: 200000,
  drivstoff: "El",
  drivlinje: "Firehjulsdrift",
  hk: 100,
  farge: "Svart",
  kar: "Sedan",
  ...over,
});

const LAGER: Bil[] = [
  bil({ kode: "a", merke: "Tesla", modell: "Model Y", aar: 2022, km: 80000, pris: 330000 }),
  bil({ kode: "b", merke: "BMW", modell: "330e", aar: 2021, km: 108000, pris: 340000, drivstoff: "Ladbar hybrid" }),
  bil({ kode: "c", merke: "Audi", modell: "A3", aar: 2018, km: 92500, pris: 160000, drivstoff: "Ladbar hybrid" }),
  bil({ kode: "d", merke: "Fiat", modell: "500e", aar: 2015, km: 57000, pris: 60000, solgt: true }),
];

const koder = (biler: readonly Bil[]) => biler.map((b) => b.kode).join("");
const med = (over: Partial<Filter>): Filter => ({ ...TOMT_FILTER, ...over });

test("tomt filter slipper gjennom alt", () => {
  assert.equal(koder(filtrer(LAGER, TOMT_FILTER)), "abcd");
});

test("filtrerer på merke", () => {
  assert.equal(koder(filtrer(LAGER, med({ merke: "BMW" }))), "b");
});

test("filtrerer på drivstoff", () => {
  assert.equal(koder(filtrer(LAGER, med({ drivstoff: "Ladbar hybrid" }))), "bc");
});

test("årsmodell, kilometerstand og pris er områder med inklusive grenser", () => {
  assert.equal(koder(filtrer(LAGER, med({ aar: { fra: 2021, til: null } }))), "ab");
  assert.equal(koder(filtrer(LAGER, med({ aar: { fra: 2018, til: 2021 } }))), "bc");
  assert.equal(koder(filtrer(LAGER, med({ aar: { fra: 2021, til: 2021 } }))), "b");
  assert.equal(koder(filtrer(LAGER, med({ km: { fra: null, til: 92500 } }))), "acd");
  assert.equal(koder(filtrer(LAGER, med({ km: { fra: 80000, til: 92500 } }))), "ac");
  assert.equal(koder(filtrer(LAGER, med({ pris: { fra: null, til: 160000 } }))), "cd");
  assert.equal(koder(filtrer(LAGER, med({ pris: { fra: 160000, til: 330000 } }))), "ac");
});

test("flere filtre kombineres med OG", () => {
  assert.equal(
    koder(filtrer(LAGER, med({ drivstoff: "Ladbar hybrid", pris: { fra: null, til: 200000 } }))),
    "c"
  );
  assert.equal(koder(filtrer(LAGER, med({ merke: "Tesla", aar: { fra: 2023, til: null } }))), "");
});

test("filtrering endrer ikke lista den får inn", () => {
  const kopi = [...LAGER];
  filtrer(LAGER, med({ merke: "Audi" }));
  sorter(LAGER, "pris-opp");
  assert.deepEqual(LAGER, kopi);
});

test("sorterer på pris, alder, kilometerstand og merke", () => {
  const tilSalgs = LAGER.filter((b) => !b.solgt);
  assert.equal(koder(sorter(tilSalgs, "pris-ned")), "bac");
  assert.equal(koder(sorter(tilSalgs, "pris-opp")), "cab");
  assert.equal(koder(sorter(tilSalgs, "aar-ned")), "abc");
  assert.equal(koder(sorter(tilSalgs, "aar-opp")), "cba");
  assert.equal(koder(sorter(tilSalgs, "km-opp")), "acb");
  assert.equal(koder(sorter(tilSalgs, "merke")), "cba");
});

test("solgte biler står sist uansett sortering", () => {
  assert.equal(koder(sorter(LAGER, "pris-opp")), "cabd");
  assert.equal(koder(sorter(LAGER, "km-opp")), "acbd");
});

test("teller aktive filtre", () => {
  assert.equal(antallAktive(TOMT_FILTER), 0);
  assert.equal(antallAktive(med({ merke: "BMW", km: { fra: null, til: 100000 } })), 2);
  // et område teller som ett filter, også når begge grensene er satt
  assert.equal(antallAktive(med({ pris: { fra: 100000, til: 300000 } })), 1);
});

test("spenn runder utover til hele steg, så alle verdier ligger innenfor", () => {
  assert.deepEqual(spenn([57000, 92500, 108000], 10000), { min: 50000, maks: 110000 });
  assert.deepEqual(spenn([2013, 2022], 1), { min: 2013, maks: 2022 });
  assert.deepEqual(spenn([60000], 10000), { min: 60000, maks: 60000 });
  assert.deepEqual(spenn([], 10000), { min: 0, maks: 0 });
});
