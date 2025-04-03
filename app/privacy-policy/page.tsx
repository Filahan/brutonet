import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Brutonet",
  description:
    "Notre politique de confidentialité expliquant que nous ne collectons aucune donnée personnelle.",
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Politique de Confidentialité</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
          <p>
            Chez Brutonet, nous attachons une grande importance à la protection
            de votre vie privée. Notre politique est simple : nous ne collectons
            aucune donnée personnelle.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Collecte de données</h2>
          <p>
            <strong>Nous ne collectons aucune donnée personnelle</strong> lors
            de votre utilisation du calculateur de salaire brut en net ou de
            toute autre fonctionnalité de notre site.
          </p>
          <p>
            Toutes les opérations de calcul sont effectuées localement dans
            votre navigateur, et aucune information saisie n&apos;est transmise à nos
            serveurs ou stockée.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Cookies</h2>
          <p>
            Notre site utilise uniquement des cookies strictement nécessaires
            pour assurer son bon fonctionnement technique. Nous n&apos;utilisons pas
            de cookies pour le suivi, l&apos;analyse ou le marketing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Vercel Analytics</h2>
          <p>
            Notre site utilise Vercel Analytics uniquement pour collecter des
            métriques agrégées anonymes sur l&apos;utilisation du site (comme le
            nombre total de visiteurs). Ces données sont entièrement anonymes et
            ne peuvent pas être utilisées pour identifier des utilisateurs
            individuels.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Informations à titre informatif
          </h2>
          <p>
            <strong>
              Toutes les informations présentes sur ce site sont fournies à
              titre purement informatif.
            </strong>
            Les résultats des calculs et les informations présentées ne
            constituent pas un conseil juridique, fiscal ou comptable.
          </p>
          <p>
            Bien que nous nous efforcions de fournir des informations exactes et
            à jour, nous ne pouvons garantir l&apos;exactitude, l&apos;exhaustivité ou la
            pertinence des informations pour votre situation particulière. Nous
            vous recommandons de consulter un professionnel qualifié pour
            obtenir des conseils adaptés à votre situation spécifique.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Modifications de cette politique
          </h2>
          <p>
            Nous nous réservons le droit de modifier cette politique de
            confidentialité à tout moment. Toute modification sera publiée sur
            cette page.
          </p>
          <p>Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</p>
        </section>

        {/* <section>
          <h2 className="text-2xl font-semibold mb-3">Contact</h2>
          <p>
            Si vous avez des questions concernant notre politique de confidentialité, 
            n&apos;hésitez pas à nous contacter.
          </p>
        </section> */}
      </div>
    </div>
  );
}
