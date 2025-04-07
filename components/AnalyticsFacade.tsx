"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";

// Chargement dynamique de Vercel Analytics avec priorité réduite
const Analytics = dynamic(
  () => import("@vercel/analytics/react").then((mod) => mod.Analytics),
  {
    ssr: false,
    loading: () => null,
  }
);

export function AnalyticsFacade() {
  const [shouldLoad, setShouldLoad] = useState(false);

  // Utiliser useCallback pour mémoriser la fonction
  const loadAnalytics = useCallback(() => {
    // Charger Analytics uniquement quand la page est inactive
    if (document.visibilityState === 'hidden') {
      setShouldLoad(true);
    }
  }, []);

  useEffect(() => {
    // Observer les changements de visibilité de la page
    document.addEventListener('visibilitychange', loadAnalytics);

    // Charger Analytics après un délai si la page reste active
    const timer = setTimeout(() => {
      if (document.visibilityState === 'visible') {
        setShouldLoad(true);
      }
    }, 5000); // Augmenter le délai à 5 secondes

    return () => {
      document.removeEventListener('visibilitychange', loadAnalytics);
      clearTimeout(timer);
    };
  }, [loadAnalytics]);

  if (!shouldLoad) {
    return null;
  }

  return <Analytics />;
} 