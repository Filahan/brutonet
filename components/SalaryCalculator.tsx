"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Input } from "@heroui/input";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { 
  SOCIAL_CONTRIBUTIONS, 
  DEFAULT_VALUES, 
  INCOME_TAX_BRACKETS,
  MONTHS_PER_YEAR
} from "@/config/taxRates2025";

type StatusType = "cadre" | "non-cadre";

export default function SalaryCalculator() {
  // State for all inputs
  const [monthlySalaryGross, setMonthlySalaryGross] = useState<number>(DEFAULT_VALUES.defaultMonthlyGross);
  const [monthlySalaryNet, setMonthlySalaryNet] = useState<number>(0);
  const [annualSalaryGross, setAnnualSalaryGross] = useState<number>(0);
  const [annualSalaryNet, setAnnualSalaryNet] = useState<number>(0);
  const [taxRate, setTaxRate] = useState<number>(DEFAULT_VALUES.defaultTaxRate);
  const [status, setStatus] = useState<StatusType>(DEFAULT_VALUES.defaultStatus);
  
  // Calculate all values when any input changes
  useEffect(() => {
    calculateFromMonthlyGross(monthlySalaryGross);
  }, [monthlySalaryGross, taxRate, status]);

  // Different calculation functions depending on which field was modified
  const calculateFromMonthlyGross = (value: number) => {
    const grossCoefficient = SOCIAL_CONTRIBUTIONS[status].coefficient;
    const netBeforeTax = value * grossCoefficient;
    const netAfterTax = netBeforeTax * (1 - taxRate / 100);
    
    setMonthlySalaryNet(Math.round(netAfterTax));
    setAnnualSalaryGross(Math.round(value * MONTHS_PER_YEAR));
    setAnnualSalaryNet(Math.round(netAfterTax * MONTHS_PER_YEAR));
  };

  const calculateFromMonthlyNet = (value: number) => {
    const grossCoefficient = SOCIAL_CONTRIBUTIONS[status].coefficient;
    const netBeforeTax = value / (1 - taxRate / 100);
    const grossValue = netBeforeTax / grossCoefficient;
    
    setMonthlySalaryGross(Math.round(grossValue));
    setAnnualSalaryGross(Math.round(grossValue * MONTHS_PER_YEAR));
    setAnnualSalaryNet(Math.round(value * MONTHS_PER_YEAR));
  };

  const calculateFromAnnualGross = (value: number) => {
    const monthlyGross = value / MONTHS_PER_YEAR;
    calculateFromMonthlyGross(monthlyGross);
  };

  const calculateFromAnnualNet = (value: number) => {
    const monthlyNet = value / MONTHS_PER_YEAR;
    calculateFromMonthlyNet(monthlyNet);
  };

  // Handle input changes
  const handleMonthlyGrossChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setMonthlySalaryGross(value);
      calculateFromMonthlyGross(value);
    }
  };

  const handleMonthlyNetChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setMonthlySalaryNet(value);
      calculateFromMonthlyNet(value);
    }
  };

  const handleAnnualGrossChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setAnnualSalaryGross(value);
      calculateFromAnnualGross(value);
    }
  };

  const handleAnnualNetChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setAnnualSalaryNet(value);
      calculateFromAnnualNet(value);
    }
  };

  // Calculate suggested tax rate based on annual gross salary
  const getSuggestedTaxRate = (annualGross: number): number => {
    // Approximate annual net before tax
    const annualNetBeforeTax = annualGross * SOCIAL_CONTRIBUTIONS[status].coefficient;
    
    // Find applicable tax bracket
    const bracket = INCOME_TAX_BRACKETS.reduce((prev, current) => {
      return annualNetBeforeTax >= current.threshold ? current : prev;
    }, INCOME_TAX_BRACKETS[0]);
    
    return Math.round(bracket.rate * 100);
  };

  // Format numbers for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Column - Monthly values */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-medium mb-4">Mensuel</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Brut</label>
                <Input
                  type="number"
                  value={monthlySalaryGross.toString()}
                  onChange={handleMonthlyGrossChange}
                  placeholder="Mensuel Brut"
                  label="€"
                  labelPlacement="outside"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Net</label>
                <Input
                  type="number"
                  value={monthlySalaryNet.toString()}
                  onChange={handleMonthlyNetChange}
                  placeholder="Mensuel Net"
                  label="€"
                  labelPlacement="outside"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Second Column - Annual values */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-medium mb-4">Annuel</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Brut</label>
                <Input
                  type="number"
                  value={annualSalaryGross.toString()}
                  onChange={handleAnnualGrossChange}
                  placeholder="Annuel Brut"
                  label="€"
                  labelPlacement="outside"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Net</label>
                <Input
                  type="number"
                  value={annualSalaryNet.toString()}
                  onChange={handleAnnualNetChange}
                  placeholder="Annuel Net"
                  label="€"
                  labelPlacement="outside"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Parameters Row */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tax Rate Slider */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Taux de prélèvement à la source: {taxRate}%
            {annualSalaryGross > 0 && (
              <span className="text-xs ml-2 text-default-500">
                (Suggestion: {getSuggestedTaxRate(annualSalaryGross)}%)
              </span>
            )}
          </label>
          <div className="flex items-center space-x-2">
            <span>0%</span>
            <input
              type="range"
              min="0"
              max="45"
              step="0.5"
              value={taxRate}
              onChange={(e) => setTaxRate(parseFloat(e.target.value))}
              className="w-full"
            />
            <span>45%</span>
          </div>
        </div>
        
        {/* Status Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-2">Statut</label>
          <Listbox
            aria-label="Statut"
            selectedKeys={[status]}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as StatusType;
              setStatus(selected);
            }}
            className="w-full"
          >
            <ListboxItem key="cadre">Cadre</ListboxItem>
            <ListboxItem key="non-cadre">Non-cadre</ListboxItem>
          </Listbox>
        </div>
      </div>
      
      {/* Summary Section */}
      <div className="mt-8 p-4 rounded-md border border-default-200 bg-default-50">
        <h3 className="text-lg font-semibold mb-4">Résumé</h3>
        
        {/* Summary Grid - 4 columns on desktop, 2 on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-white rounded-md shadow-sm">
            <div className="text-sm text-default-500">Mensuel Brut</div>
            <div className="font-medium text-lg">{formatCurrency(monthlySalaryGross)}</div>
          </div>
          
          <div className="p-3 bg-white rounded-md shadow-sm">
            <div className="text-sm text-default-500">Mensuel Net</div>
            <div className="font-medium text-lg">{formatCurrency(monthlySalaryNet)}</div>
          </div>
          
          <div className="p-3 bg-white rounded-md shadow-sm">
            <div className="text-sm text-default-500">Annuel Brut</div>
            <div className="font-medium text-lg">{formatCurrency(annualSalaryGross)}</div>
          </div>
          
          <div className="p-3 bg-white rounded-md shadow-sm">
            <div className="text-sm text-default-500">Annuel Net</div>
            <div className="font-medium text-lg">{formatCurrency(annualSalaryNet)}</div>
          </div>
        </div>
        
        {/* Details Section */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-white rounded-md shadow-sm">
            <div className="text-sm font-medium mb-2">Cotisations ({(SOCIAL_CONTRIBUTIONS[status].rate * 100).toFixed(1)}%)</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Retraite:</div>
              <div>{(SOCIAL_CONTRIBUTIONS[status].details.retraite * 100).toFixed(1)}%</div>
              
              <div>Maladie:</div>
              <div>{(SOCIAL_CONTRIBUTIONS[status].details.maladie * 100).toFixed(1)}%</div>
              
              <div>Chômage:</div>
              <div>{(SOCIAL_CONTRIBUTIONS[status].details.chomage * 100).toFixed(1)}%</div>
              
              <div>Autres:</div>
              <div>{(SOCIAL_CONTRIBUTIONS[status].details.autres * 100).toFixed(1)}%</div>
            </div>
          </div>
          
          <div className="p-3 bg-white rounded-md shadow-sm">
            <div className="text-sm font-medium mb-2">Impôt sur le revenu</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Taux appliqué:</div>
              <div>{taxRate}%</div>
              
              <div>Taux suggéré:</div>
              <div>{getSuggestedTaxRate(annualSalaryGross)}%</div>
              
              <div>Statut:</div>
              <div>{status === "cadre" ? "Cadre" : "Non-cadre"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 