"use client";

import { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import Link from "next/link";

export const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consentGiven = localStorage.getItem("cookieConsent");
    if (!consentGiven) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="max-w-3xl">
          <h3 className="text-lg font-semibold mb-1">Cookies</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Ce site utilise uniquement des cookies techniques nécessaires à son bon fonctionnement. 
            Nous ne collectons aucune donnée personnelle. Pour plus d'informations, consultez notre{" "}
            <Link href="/privacy-policy" className="text-blue-600 hover:underline">
              politique de confidentialité
            </Link>.
          </p>
        </div>
        <div>
          <Button color="primary" onClick={acceptCookies}>
            J'ai compris
          </Button>
        </div>
      </div>
    </div>
  );
}; 