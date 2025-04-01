import { title, subtitle } from "@/components/primitives";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8 md:py-10">
      <div className="text-center mb-10">
        <h1 className={title({ color: "blue" })}>
          À propos du Calculateur de Salaire Brut en Net
        </h1>
        <p className={subtitle({ class: "mx-auto mt-4" })}>
          Une application simple pour estimer votre salaire net
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-3">Comment fonctionne notre calculateur</h2>
          <p className="text-default-600">
            Notre calculateur de salaire brut en net utilise un modèle simplifié pour estimer votre salaire net en fonction
            de votre salaire brut. Nous appliquons un taux d'imposition standard de 23% qui est une approximation 
            pour la plupart des situations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Limites du calculateur</h2>
          <p className="text-default-600">
            Ce calculateur est fourni à titre indicatif seulement. Le calcul réel du salaire net en France implique de 
            nombreuses variables telles que votre situation familiale, vos revenus annexes, votre lieu de résidence, 
            et divers crédits d'impôt auxquels vous pourriez avoir droit.
          </p>
          <p className="text-default-600 mt-3">
            Pour un calcul précis adapté à votre situation personnelle, veuillez consulter un professionnel de la 
            comptabilité ou utiliser le simulateur officiel des impôts.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Mentions légales</h2>
          <p className="text-default-600">
            Les informations fournies par cette application ne constituent pas un conseil fiscal, juridique ou financier. 
            Les résultats sont des estimations et ne doivent pas être utilisés comme seule source d'information pour 
            prendre des décisions financières.
          </p>
        </section>
      </div>
    </div>
  );
}
