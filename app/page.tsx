import { title, subtitle } from "@/components/primitives";
import SalaryCalculator from "@/components/SalaryCalculator";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Calculateur de&nbsp;</span>
        <span className={title({ color: "blue" })}>Salaire&nbsp;</span>
        <br />
        <span className={title()}>
          Brut en Net
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Estimez rapidement votre salaire net à partir de votre salaire brut avec notre calculateur simple.
        </div>
      </div>

      <div className="w-full max-w-xl mt-8">
        <SalaryCalculator />
      </div>
      
      <div className="mt-8 text-sm text-default-500 max-w-xl text-center">
        <p>Note: Ce calculateur utilise un taux d'imposition simplifié de 23% à titre d'exemple. 
        Pour un calcul plus précis, consultez un professionnel de la comptabilité.</p>
      </div>
    </section>
  );
}


