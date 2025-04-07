"use client";

import { useState } from "react";
import Image from "next/image";
import Script from "next/script";
import Head from "next/head";

import SalaryCalculator from "@/components/SalaryCalculator";
import HorizontalBlogList from "@/components/HorizontalBlogList";
import blogData from "@/data/blog.json";

export default function Home() {
  const [status, setStatus] = useState<"cadre" | "non-cadre">("cadre");
  const rate = status === "cadre" ? "25%" : "22%";

  return (
    <>
      <Head>
        <title>Salaire Brut en Net 2025 | Calculateur Gratuit | Brutonet</title>
        <meta name="description" content="Calculez votre salaire brut en net 2025 gratuitement. Simulateur précis avec prélèvement à la source, charges sociales et impôts. Pour cadres et non-cadres. Résultat instantané." />
        <meta name="keywords" content="salaire brut en net, calcul salaire brut net, convertisseur brut net, simulateur salaire brut net, calcul salaire 2025" />
      </Head>

      <section className="flex flex-col items-center justify-center md:mb-1">
        <Script id="salary-calculator-schema" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Calculateur Salaire Brut en Net 2025",
              "url": "https://brutonet.fr",
              "description": "Calculez instantanément votre salaire brut en net 2025. Notre calculateur prend en compte le prélèvement à la source, les charges sociales et les impôts sur le revenu.",
              "applicationCategory": "FinanceApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR"
              },
              "featureList": [
                "Calcul salaire brut en net instantané",
                "Prélèvement à la source",
                "Charges sociales",
                "Impôts sur le revenu",
                "Différenciation cadre/non-cadre"
              ],
              "keywords": "salaire brut en net, calcul salaire, brut net, simulateur salaire"
            }
          `}
        </Script>

        <div className="relative w-full max-w-xl h-[200px] md:h-[250px] rounded-2xl bg-gray-100 mb-5">
          <Image
            fill
            priority
            alt="Calculateur Salaire Brut en Net 2025 - Simulateur Gratuit"
            className="object-cover rounded-2xl"
            src="/blog/salary-calculator-banner.png"
          />
        </div>

        <div className="w-full max-w-2xl text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Calculateur Salaire Brut en Net 2025</h1>
          <p className="text-lg text-gray-600 mb-6">
            Calculez instantanément votre salaire brut en net 2025. Simulateur gratuit et précis avec prélèvement à la source, charges sociales et impôts.
          </p>
          <div className="text-sm text-gray-500 mb-1">
            <p>✓ Calcul du salaire brut en net</p>
            <p>✓ Prélèvement à la source intégré</p>
            <p>✓ Différenciation cadre/non-cadre</p>
            <p>✓ Résultat instantané</p>
          </div>
        </div>

        <div className="w-full max-w-2xl">
          <SalaryCalculator onStatusChange={setStatus} />
        </div>

        {/* Blog Section */}
        <div className="w-full max-w-6xl mt-20">
          <h2 className="text-2xl font-bold text-center mb-8">Articles sur le Salaire Brut en Net</h2>
          <HorizontalBlogList articles={blogData.articles} />
        </div>
      </section>
    </>
  );
}
