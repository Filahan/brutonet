'use client'

import { title, subtitle } from "@/components/primitives";
import SalaryCalculator from "@/components/SalaryCalculator";
import { useState } from "react";
import HorizontalBlogList from "@/components/HorizontalBlogList";
import blogData from "@/data/blog.json";
import Image from "next/image";

export default function Home() {
  const [status, setStatus] = useState<"cadre" | "non-cadre">("cadre");
  const rate = status === "cadre" ? "25%" : "22%";

  return (
    <section className="flex flex-col items-center justify-center gap-2 md:mb-1">
      <div className="relative w-full max-w-xl h-[200px] md:h-[250px] rounded-2xl bg-gray-100 mb-5">
        <Image
          src="/blog/salary-calculator-banner.png"
          alt="Simulateur de Salaire"
          fill
          className="object-cover rounded-2xl"
          priority
        />
      </div>

      <div className="w-full max-w-xl mt-0">
        <SalaryCalculator onStatusChange={setStatus} />
      </div>

      {/* Blog Section */}
      <div className="w-full max-w-6xl mt-20 px-4">
        <HorizontalBlogList articles={blogData.articles} />
      </div>
    </section>
  );
}


