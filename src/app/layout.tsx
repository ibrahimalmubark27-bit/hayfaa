import type { Metadata, Viewport } from "next";
import { Amiri, Tajawal, Great_Vibes, Aref_Ruqaa } from "next/font/google";
import "./globals.css";

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

const arefRuqaa = Aref_Ruqaa({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-aref-ruqaa",
  display: "swap",
});

export const metadata: Metadata = {
  title: "هيفاء بيوتي | Hayfaa Beauty — شنط نسائية ومكياج",
  description:
    "متجر هيفاء بيوتي — شنط نسائية من الجلد الطبيعي ومكياج مختار بعناية. ألوان هادئة، جودة تدوم، وتوصيل لكل المناطق.",
  icons: {
    icon: "/images/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f2ea",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${amiri.variable} ${tajawal.variable} ${greatVibes.variable} ${arefRuqaa.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
