import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Providers } from "./providers";

import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    default: "Brut en Net 2025 | Calculateur de Salaire Gratuit | Brutonet",
    template: `%s | Brut en Net 2025`,
  },
  description: "Calculez votre brut en net 2025 gratuitement. Simulateur de salaire précis avec prélèvement à la source, charges sociales et impôts. Pour cadres et non-cadres. Résultat instantané.",
  keywords: [
    "brut en net",
    "calculateur brut en net",
    "salaire brut en net",
    "convertir brut en net",
    "brut en net 2025",
    "calcul brut en net",
    "simulateur brut en net",
    "convertisseur brut en net",
    "calculateur salaire",
    "salaire brut net",
    "calcul salaire 2025",
    "prélèvement à la source",
    "charges sociales",
    "impôt sur le revenu",
    "salaire cadre",
    "salaire non cadre",
    "calculateur gratuit",
    "simulateur gratuit",
    "outil calcul salaire",
    "calcul charges sociales"
  ],
  authors: [{ name: "Brutonet" }],
  creator: "Brutonet",
  publisher: "Brutonet",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://brutonet.fr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://brutonet.fr",
    title: "Brut en Net 2025 | Calculateur de Salaire Gratuit | Brutonet",
    description: "Calculez votre brut en net 2025 gratuitement. Simulateur de salaire précis avec prélèvement à la source, charges sociales et impôts. Pour cadres et non-cadres.",
    siteName: "Brutonet - Calculateur Brut en Net",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Calculateur de Salaire Brut en Net 2025 - Calculez facilement votre salaire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brut en Net 2025 | Calculateur de Salaire Gratuit | Brutonet",
    description: "Calculez votre brut en net 2025 gratuitement. Simulateur de salaire précis avec prélèvement à la source, charges sociales et impôts.",
    creator: "@brutonet",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "REPLACE_WITH_ACTUAL_GOOGLE_SITE_VERIFICATION_CODE",
  },
  category: "finance",
  classification: "Calculatrice",
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "white" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="fr">
      <head>
        <link href="/icon.png" rel="icon" type="image/png" />
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-10 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
              <div className="text-center text-sm text-default-500">
                <p>
                  © {new Date().getFullYear()} Brutonet. All rights reserved.
                </p>
                <p className="mt-1">
                  <Link className="hover:underline" href="/privacy-policy">
                    Politique de Confidentialité
                  </Link>
                </p>
              </div>
            </footer>
          </div>
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
