// Types for social contributions
export type StatusType = "cadre" | "non-cadre" | "fonction-publique" | "profession-liberale";

export interface SocialContribution {
  rate: number;
  coefficient: number;
}

export interface SocialContributions {
  [key: string]: SocialContribution;
}

// Default social contributions configuration
export const SOCIAL_CONTRIBUTIONS: SocialContributions = {
  // Taux pour les cadres
  cadre: {
    rate: 0.25, // 25% de charges sociales
    coefficient: 0.75, // Coefficient de conversion (1 - taux)
  },
  // Taux pour les non-cadres
  "non-cadre": {
    rate: 0.22, // 22% de charges sociales
    coefficient: 0.78, // Coefficient de conversion (1 - taux)
  },
  // Taux pour la fonction publique
  "fonction-publique": {
    rate: 0.15, // 15% de charges sociales
    coefficient: 0.85, // Coefficient de conversion (1 - taux)
  },
  // Taux pour les professions libérales
  "profession-liberale": {
    rate: 0.45, // 45% de charges sociales
    coefficient: 0.55, // Coefficient de conversion (1 - taux)
  },
};

// Tranches d&apos;imposition sur le revenu 2025
export const INCOME_TAX_BRACKETS = [
  { threshold: 0, rate: 0 }, // 0% jusqu&apos;à 11 497 €
  { threshold: 11498, rate: 0.11 }, // 11% de 11 498 € à 29 315 €
  { threshold: 29316, rate: 0.3 }, // 30% de 29 316 € à 83 823 €
  { threshold: 83824, rate: 0.41 }, // 41% de 83 824 € à 180 294 €
  { threshold: 180295, rate: 0.45 }, // 45% au-delà de 180 294 €
];

// Taux par défaut pour le simulateur
export const DEFAULT_VALUES = {
  defaultMonthlyGross: 3000,
  defaultTaxRate: 6.5,
  defaultStatus: "non-cadre" as const,
};

// Nombre de mois pour la conversion annuel/mensuel
export const MONTHS_PER_YEAR = 12;
