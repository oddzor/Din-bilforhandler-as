import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import Bevegelse from "@/components/Bevegelse";
import { SITE } from "@/lib/site";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://din-bilforhandler.vercel.app"),
  title: {
    default: "Din Bilforhandler AS — bruktbil i Holmestrand",
    template: "%s | Din Bilforhandler AS",
  },
  description:
    "Bruktbilforhandler på Burmaveien i Holmestrand. Et lite, håndplukket lager med el- og hybridbiler, solgt med inntil 36 måneders garanti.",
  openGraph: {
    type: "website",
    locale: "nb_NO",
    siteName: SITE.navn,
    title: "Din Bilforhandler AS — bruktbil i Holmestrand",
    description:
      "Et lite, håndplukket lager med el- og hybridbiler. Inntil 36 måneders garanti.",
    images: ["/hero-bmw.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#171114",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb" className={archivo.variable}>
      <body>
        <Bevegelse>{children}</Bevegelse>
      </body>
    </html>
  );
}
