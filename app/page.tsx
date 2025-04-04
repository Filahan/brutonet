"use client";

import { useState } from "react";
import Image from "next/image";
import Script from "next/script";

import SalaryCalculator from "@/components/SalaryCalculator";
import HorizontalBlogList from "@/components/HorizontalBlogList";
import blogData from "@/data/blog.json";

export default function Home() {
  const [status, setStatus] = useState<"cadre" | "non-cadre">("cadre");
  const rate = status === "cadre" ? "25%" : "22%";

  return (
    <section className="flex flex-col items-center justify-center gap-2 md:mb-1">
      <Script id="salary-calculator-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Calculateur de Salaire Brut en Net",
            "url": "https://brutonet.fr",
            "description": "Calculez instantanément votre salaire net à partir du brut. Notre calculateur de salaire prend en compte les charges sociales et les impôts sur le revenu.",
            "applicationCategory": "FinanceApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR"
            }
          }
        `}
      </Script>

      <div className="relative w-full max-w-xl h-[200px] md:h-[250px] rounded-2xl bg-gray-100 mb-5">
        <Image
          fill
          priority
          alt="Simulateur de Salaire"
          className="object-cover rounded-2xl"
          src="/blog/salary-calculator-banner.png"
        />
      </div>

      <div className="w-full max-w-2xl mt-0">
        <SalaryCalculator onStatusChange={setStatus} />
      </div>

      {/* Blog Section */}
      <div className="w-full max-w-6xl mt-20">
        <HorizontalBlogList articles={blogData.articles} />
      </div>
    </section>
  );
}
