import { title, subtitle } from "@/components/primitives";
import SalaryCalculator from "@/components/SalaryCalculator";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Simulateur de&nbsp;</span>
        <span className={title({ color: "blue" })}>Salaire&nbsp;</span>
        <br />
        <span className={title()}>
          2025
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Calculez instantanément votre rémunération selon les règles de la loi de finance 2025.
        </div>
      </div>

      <div className="w-full max-w-xl mt-8">
        <SalaryCalculator />
      </div>
      
      <div className="mt-8 text-sm text-default-500 max-w-xl text-center">
        <p>Note: Ce simulateur utilise les taux de la loi de finance 2025 (25% pour cadres, 22% pour non-cadres). 
        Les tranches d'imposition sont également celles prévues par la loi de finance 2025.</p>
      </div>
    </section>
  );
}


