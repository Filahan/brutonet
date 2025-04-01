"use client";

import { useState } from "react";
import { Input } from "@heroui/input";
import { button as buttonStyles } from "@heroui/theme";
import { Switch } from "@heroui/switch";

interface SalaryResult {
  grossSalary: number;
  netSalary: number;
  taxRate: number;
  taxAmount: number;
}

export default function SalaryCalculator() {
  const [grossSalary, setGrossSalary] = useState<string>("");
  const [isMonthly, setIsMonthly] = useState<boolean>(true);
  const [result, setResult] = useState<SalaryResult | null>(null);

  const calculateNetSalary = () => {
    const grossAmount = parseFloat(grossSalary);
    
    if (isNaN(grossAmount) || grossAmount <= 0) {
      return;
    }

    // Simplified French tax calculation (just an example)
    // In a real app, you would have more detailed calculations
    const taxRate = 0.23; // 23% tax rate for simplification
    const taxAmount = grossAmount * taxRate;
    const netAmount = grossAmount - taxAmount;

    setResult({
      grossSalary: grossAmount,
      netSalary: netAmount,
      taxRate: taxRate * 100,
      taxAmount: taxAmount
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col gap-4">
        <div>
          <Input
            label="Salaire Brut"
            placeholder="Entrez votre salaire brut"
            type="number"
            value={grossSalary}
            onChange={(e) => setGrossSalary(e.target.value)}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">€</span>
              </div>
            }
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Switch 
            isSelected={isMonthly}
            onValueChange={setIsMonthly}
          />
          <span>{isMonthly ? "Mensuel" : "Annuel"}</span>
        </div>
        
        <button
          onClick={calculateNetSalary}
          className={buttonStyles({
            color: "primary",
            radius: "md",
            variant: "shadow",
            className: "w-full"
          })}
        >
          Calculer
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 rounded-md border border-default-200 bg-default-50">
          <h3 className="text-xl font-semibold mb-2">Résultat</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Salaire Brut:</span>
              <span className="font-medium">{result.grossSalary.toFixed(2)} €{isMonthly ? "/mois" : "/an"}</span>
            </div>
            <div className="flex justify-between">
              <span>Taux d'imposition:</span>
              <span className="font-medium">{result.taxRate}%</span>
            </div>
            <div className="flex justify-between">
              <span>Montant des taxes:</span>
              <span className="font-medium">{result.taxAmount.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Salaire Net:</span>
              <span className="text-success-600">{result.netSalary.toFixed(2)} €{isMonthly ? "/mois" : "/an"}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 