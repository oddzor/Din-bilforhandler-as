"use client";

import { useRouter } from "next/navigation";

/**
 * Setter bilen i kontaktskjemaets nedtrekk og ruller dit. På sider uten
 * skjema sendes man til kontaktsiden med bilen forhåndsvalgt.
 * Holdt som en liten klientknapp slik at selve lagerveggen kan
 * bli servergjengitt.
 */
export default function SporOmDenne({ kode }: { kode: string }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        const felt = document.getElementById("bil") as HTMLSelectElement | null;
        if (!felt) {
          router.push(`/kontakt-oss?bil=${encodeURIComponent(kode)}`);
          return;
        }
        felt.value = kode;
        felt.dispatchEvent(new Event("change", { bubbles: true }));
        felt.closest("form")?.scrollIntoView({ behavior: "smooth", block: "center" });
        felt.focus({ preventScroll: true });
      }}
    >
      Spør om denne
    </button>
  );
}
