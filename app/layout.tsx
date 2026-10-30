import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import MotionProvider from "@/components/ui/MotionProvider";
import { SITE } from "@/data/site";
import { GITHUB_URL, LINKEDIN_URL } from "@/data/social";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Sadeed Mahamood — Python & Django Developer",
  description: SITE.description,
  authors: [{ name: SITE.fullName }],
  keywords: [
    "Sadeed Mahamood",
    "Python developer",
    "Django developer",
    "Django REST Framework",
    "PostgreSQL",
    "React",
    "portfolio",
  ],
  openGraph: {
    title: "Sadeed Mahamood — Python & Django Developer",
    description: SITE.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#02050A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.fullName,
  jobTitle: SITE.role,
  sameAs: [GITHUB_URL, LINKEDIN_URL],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable}`}
    >
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:border focus:border-mist/50 focus:bg-void focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-foam"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}