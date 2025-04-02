'use client'

import { title, subtitle } from "@/components/primitives";
import SalaryCalculator from "@/components/SalaryCalculator";
import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState<"cadre" | "non-cadre">("cadre");
  const rate = status === "cadre" ? "25%" : "22%";

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-0 md:py-1">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Simulateur de </span>
        <span className={title({ color: "blue" })}>Salaire </span>
        <br />
        <div className={subtitle({ class: "mt-5" })}>
          Calculez instantanément votre rémunération.
        </div>
      </div>

      <div className="w-full max-w-xl mt-0">
        <SalaryCalculator onStatusChange={setStatus} />
      </div>
      
    </section>
  );
}


