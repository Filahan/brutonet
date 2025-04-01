// Configuration des charges sociales et fiscales selon la loi de finance 2025

// Taux de charges sociales (conversion brut -> net avant impôt)
export const SOCIAL_CONTRIBUTIONS = {
  // Taux pour les cadres
  cadre: {
    rate: 0.25, // 25% de charges sociales
    coefficient: 0.75, // Coefficient de conversion (1 - taux)
    details: {
      retraite: 0.12, // Retraite
      maladie: 0.07, // Assurance maladie
      chomage: 0.04, // Assurance chômage
      autres: 0.02, // Autres cotisations
    },
  },
  // Taux pour les non-cadres
  "non-cadre": {
    rate: 0.22, // 22% de charges sociales
    coefficient: 0.78, // Coefficient de conversion (1 - taux)
    details: {
      retraite: 0.10, // Retraite
      maladie: 0.07, // Assurance maladie
      chomage: 0.03, // Assurance chômage
      autres: 0.02, // Autres cotisations
    },
  },
};

// Tranches d'imposition sur le revenu 2025
export const INCOME_TAX_BRACKETS = [
  { threshold: 0, rate: 0 }, // 0%
  { threshold: 11294, rate: 0.11 }, // 11%
  { threshold: 28797, rate: 0.30 }, // 30%
  { threshold: 82341, rate: 0.41 }, // 41%
  { threshold: 177106, rate: 0.45 }, // 45%
];

// Taux par défaut pour le simulateur
export const DEFAULT_VALUES = {
  defaultMonthlyGross: 3000,
  defaultTaxRate: 15,
  defaultStatus: "non-cadre" as const,
};

// Nombre de mois pour la conversion annuel/mensuel
export const MONTHS_PER_YEAR = 12; 