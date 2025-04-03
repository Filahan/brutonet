"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Input } from "@heroui/input";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Slider } from "@heroui/slider";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { 
  SOCIAL_CONTRIBUTIONS, 
  DEFAULT_VALUES, 
  INCOME_TAX_BRACKETS,
  MONTHS_PER_YEAR
} from "@/config/taxRates2025";

type StatusType = "cadre" | "non-cadre";

interface SalaryCalculatorProps {
  onStatusChange: (status: StatusType) => void;
}

export default function SalaryCalculator({ onStatusChange }: SalaryCalculatorProps) {
  // State for all inputs
  const [monthlySalaryGross, setMonthlySalaryGross] = useState<number>(DEFAULT_VALUES.defaultMonthlyGross);
  const [monthlyNetBeforeTax, setMonthlyNetBeforeTax] = useState<number>(0);
  const [monthlySalaryNet, setMonthlySalaryNet] = useState<number>(0);
  const [annualSalaryGross, setAnnualSalaryGross] = useState<number>(0);
  const [annualNetBeforeTax, setAnnualNetBeforeTax] = useState<number>(0);
  const [annualSalaryNet, setAnnualSalaryNet] = useState<number>(0);
  const [taxRate, setTaxRate] = useState<number>(DEFAULT_VALUES.defaultTaxRate);
  const [status, setStatus] = useState<StatusType>(DEFAULT_VALUES.defaultStatus);
  
  // Update parent component when status changes
  useEffect(() => {
    onStatusChange(status);
  }, [status, onStatusChange]);
  
  // Calculate initial values and when status changes
  useEffect(() => {
    // Only calculate everything on initial render or when status changes
    const updatedValues = { ...calculateAllExcept('monthlyGross', monthlySalaryGross) };
    updateValues(updatedValues);
  }, [status]); // Only depends on status changes
  
  // Handle tax rate changes separately
  useEffect(() => {
    // When tax rate changes, recalculate all values based on the first non-zero value available
    if (monthlySalaryGross > 0) {
      calculateFromMonthlyGross(monthlySalaryGross, false);
    } else if (monthlyNetBeforeTax > 0) {
      calculateFromMonthlyNetBeforeTax(monthlyNetBeforeTax, false);
    } else if (monthlySalaryNet > 0) {
      calculateFromMonthlyNet(monthlySalaryNet, false);
    } else if (annualSalaryGross > 0) {
      calculateFromAnnualGross(annualSalaryGross, false);
    } else if (annualNetBeforeTax > 0) {
      calculateFromAnnualNetBeforeTax(annualNetBeforeTax, false);
    } else if (annualSalaryNet > 0) {
      calculateFromAnnualNet(annualSalaryNet, false);
    }
  }, [taxRate]);

  // Different calculation functions depending on which field was modified
  const calculateFromMonthlyGross = (value: number, updateTaxRate = true) => {
    const grossCoefficient = SOCIAL_CONTRIBUTIONS[status].coefficient;
    const netBeforeTax = value * grossCoefficient;
    
    // Annual values for tax calculation
    const annualNetBeforeTax = netBeforeTax * MONTHS_PER_YEAR;
    
    // Calculate tax based on tax rate instead of progressive calculation
    const monthlyTax = (netBeforeTax * taxRate) / 100;
    
    // Apply calculated tax
    const netAfterTax = netBeforeTax - monthlyTax;
    
    // Update all state values
    setMonthlyNetBeforeTax(Math.round(netBeforeTax));
    setMonthlySalaryNet(Math.round(netAfterTax));
    setMonthlySalaryGross(Math.round(value));
    setAnnualSalaryGross(Math.round(value * MONTHS_PER_YEAR));
    setAnnualNetBeforeTax(Math.round(annualNetBeforeTax));
    setAnnualSalaryNet(Math.round(netAfterTax * MONTHS_PER_YEAR));
  };

  const calculateFromMonthlyNet = (value: number, updateTaxRate = false) => {
    // Calculate net before tax from net after tax using tax rate
    const netBeforeTax = value / (1 - taxRate / 100);
    
    // Calculate gross salary
    const grossCoefficient = SOCIAL_CONTRIBUTIONS[status].coefficient;
    const grossValue = netBeforeTax / grossCoefficient;
    
    // Update all state values
    setMonthlySalaryGross(Math.round(grossValue));
    setMonthlyNetBeforeTax(Math.round(netBeforeTax));
    setMonthlySalaryNet(Math.round(value));
    setAnnualSalaryGross(Math.round(grossValue * MONTHS_PER_YEAR));
    setAnnualNetBeforeTax(Math.round(netBeforeTax * MONTHS_PER_YEAR));
    setAnnualSalaryNet(Math.round(value * MONTHS_PER_YEAR));
  };

  // Add new calculation function for net before tax
  const calculateFromMonthlyNetBeforeTax = (value: number, updateTaxRate = false) => {
    // Calculate gross salary
    const grossCoefficient = SOCIAL_CONTRIBUTIONS[status].coefficient;
    const grossValue = value / grossCoefficient;
    
    // Calculate tax based on tax rate
    const monthlyTax = (value * taxRate) / 100;
    
    // Calculate net after tax
    const netAfterTax = value - monthlyTax;
    
    // Update all state values
    setMonthlySalaryGross(Math.round(grossValue));
    setMonthlyNetBeforeTax(Math.round(value));
    setMonthlySalaryNet(Math.round(netAfterTax));
    setAnnualSalaryGross(Math.round(grossValue * MONTHS_PER_YEAR));
    setAnnualNetBeforeTax(Math.round(value * MONTHS_PER_YEAR));
    setAnnualSalaryNet(Math.round(netAfterTax * MONTHS_PER_YEAR));
  };

  const calculateFromAnnualNetBeforeTax = (value: number, updateTaxRate = false) => {
    const monthlyNetBeforeTax = value / MONTHS_PER_YEAR;
    calculateFromMonthlyNetBeforeTax(monthlyNetBeforeTax, updateTaxRate);
  };

  const calculateFromAnnualGross = (value: number, updateTaxRate = false) => {
    // Calculer le salaire mensuel brut exact sans arrondir
    const monthlyGross = value / MONTHS_PER_YEAR;
    
    // Calculer le salaire mensuel net avant impôt sans arrondir
    const grossCoeff = SOCIAL_CONTRIBUTIONS[status].coefficient;
    const nBeforeTax = monthlyGross * grossCoeff;
    
    // Calculer le salaire annuel net avant impôt
    const aNBeforeTax = nBeforeTax * MONTHS_PER_YEAR;
    const aTax = calculateProgressiveTax(aNBeforeTax);
    const mTax = aTax / MONTHS_PER_YEAR;
    
    // Calculer le salaire net après impôt
    const nAfterTax = nBeforeTax - mTax;
    
    // Mettre à jour tous les états avec les valeurs exactes
    setMonthlySalaryGross(monthlyGross);
    setMonthlyNetBeforeTax(nBeforeTax);
    setMonthlySalaryNet(nAfterTax);
    setAnnualSalaryGross(value);
    setAnnualNetBeforeTax(aNBeforeTax);
    setAnnualSalaryNet(nAfterTax * MONTHS_PER_YEAR);
  };

  const calculateFromAnnualNet = (value: number, updateTaxRate = false) => {
    const monthlyNet = value / MONTHS_PER_YEAR;
    calculateFromMonthlyNet(monthlyNet, updateTaxRate);
  };

  // Handle input changes
  const handleMonthlyGrossChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      setMonthlySalaryGross(0);
      // Keep other fields as they are
      return;
    }
    
    const value = parseFloat(inputValue);
    if (!isNaN(value)) {
      calculateFromMonthlyGross(value, true);
      
      // Apply suggested tax rate automatically
      const suggestedRate = getSuggestedTaxRate(value * MONTHS_PER_YEAR);
      setTaxRate(suggestedRate);
    }
  };

  const handleMonthlyNetBeforeTaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      setMonthlyNetBeforeTax(0);
      // Keep other fields as they are
      return;
    }
    
    const value = parseFloat(inputValue);
    if (!isNaN(value)) {
      calculateFromMonthlyNetBeforeTax(value, true);
      
      // Apply suggested tax rate automatically
      const annualNetBeforeTax = value * MONTHS_PER_YEAR;
      const suggestedRate = (calculateProgressiveTax(annualNetBeforeTax) / annualNetBeforeTax) * 100;
      setTaxRate(suggestedRate);
    }
  };

  const handleMonthlyNetChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      setMonthlySalaryNet(0);
      // Keep other fields as they are
      return;
    }
    
    const value = parseFloat(inputValue);
    if (!isNaN(value)) {
      calculateFromMonthlyNet(value, true);
      
      // Apply suggested tax rate using the same approach as annual net
      let netBeforeTax = value / (1 - taxRate / 100);
      let annualNetBeforeTax = netBeforeTax * MONTHS_PER_YEAR;
      
      // Refine our guess with a few iterations
      for (let i = 0; i < 5; i++) {
        const annualTax = calculateProgressiveTax(annualNetBeforeTax);
        const monthlyTax = annualTax / MONTHS_PER_YEAR;
        netBeforeTax = value + monthlyTax;
        annualNetBeforeTax = netBeforeTax * MONTHS_PER_YEAR;
      }
      
      const suggestedRate = (calculateProgressiveTax(annualNetBeforeTax) / annualNetBeforeTax) * 100;
      setTaxRate(suggestedRate);
    }
  };

  const handleAnnualGrossChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      setAnnualSalaryGross(0);
      // Keep other fields as they are
      return;
    }
    
    const value = parseFloat(inputValue);
    if (!isNaN(value)) {
      // Garder la valeur exacte saisie
      setAnnualSalaryGross(value);
      
      // Calculer le salaire mensuel brut
      const monthlyGross = value / MONTHS_PER_YEAR;
      
      // Calculer le salaire mensuel net avant impôt
      const grossCoeff = SOCIAL_CONTRIBUTIONS[status].coefficient;
      const nBeforeTax = monthlyGross * grossCoeff;
      
      // Calculer le salaire annuel net avant impôt
      const aNBeforeTax = nBeforeTax * MONTHS_PER_YEAR;
      const aTax = calculateProgressiveTax(aNBeforeTax);
      const mTax = aTax / MONTHS_PER_YEAR;
      
      // Calculer le salaire net après impôt
      const nAfterTax = nBeforeTax - mTax;
      
      // Mettre à jour les autres valeurs
      setMonthlySalaryGross(monthlyGross);
      setMonthlyNetBeforeTax(nBeforeTax);
      setMonthlySalaryNet(nAfterTax);
      setAnnualNetBeforeTax(aNBeforeTax);
      setAnnualSalaryNet(nAfterTax * MONTHS_PER_YEAR);
      
      // Appliquer le taux d'imposition suggéré
      const suggestedRate = getSuggestedTaxRate(value);
      setTaxRate(suggestedRate);
    }
  };

  const handleAnnualNetBeforeTaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      setAnnualNetBeforeTax(0);
      // Keep other fields as they are
      return;
    }
    
    const value = parseFloat(inputValue);
    if (!isNaN(value)) {
      setAnnualNetBeforeTax(value);
      // Don&apos;t recalculate the annual net before tax value when directly editing it
      const updatedValues = { ...calculateAllExcept("annualNetBeforeTax", value) };
      updateValues(updatedValues);
      
      // Apply suggested tax rate automatically without rounding
      const suggestedRate = (calculateProgressiveTax(value) / value) * 100;
      setTaxRate(suggestedRate);
    }
  };

  const handleAnnualNetChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      setAnnualSalaryNet(0);
      // Keep other fields as they are
      return;
    }
    
    const value = parseFloat(inputValue);
    if (!isNaN(value)) {
      setAnnualSalaryNet(value);
      // Don&apos;t recalculate the annual net value when directly editing it
      const updatedValues = { ...calculateAllExcept("annualNet", value) };
      updateValues(updatedValues);
      
      // Apply suggested tax rate automatically
      const monthlyNet = value / MONTHS_PER_YEAR;
      let netBeforeTax = monthlyNet / (1 - taxRate / 100);
      let annualNetBeforeTax = netBeforeTax * MONTHS_PER_YEAR;
      
      // Refine our guess with a few iterations
      for (let i = 0; i < 5; i++) {
        const annualTax = calculateProgressiveTax(annualNetBeforeTax);
        const monthlyTax = annualTax / MONTHS_PER_YEAR;
        netBeforeTax = monthlyNet + monthlyTax;
        annualNetBeforeTax = netBeforeTax * MONTHS_PER_YEAR;
      }
      
      // Apply suggested tax rate without rounding
      const suggestedRate = (calculateProgressiveTax(annualNetBeforeTax) / annualNetBeforeTax) * 100;
      setTaxRate(suggestedRate);
    }
  };

  // Function to calculate all values except the one being edited
  const calculateAllExcept = (exceptField: string, value: number) => {
    const calculatedValues: any = {};
    
    switch (exceptField) {
      case 'monthlyGross':
        // Calculate all values based on monthly gross except the monthly gross itself
        const grossCoefficient = SOCIAL_CONTRIBUTIONS[status].coefficient;
        const netBeforeTax = value * grossCoefficient;
        const annualNetBeforeTax = netBeforeTax * MONTHS_PER_YEAR;
        const annualTax = calculateProgressiveTax(annualNetBeforeTax);
        const monthlyTax = annualTax / MONTHS_PER_YEAR;
        const netAfterTax = netBeforeTax - monthlyTax;
        
        calculatedValues.monthlyNetBeforeTax = Math.round(netBeforeTax);
        calculatedValues.monthlySalaryNet = Math.round(netAfterTax);
        calculatedValues.annualSalaryGross = Math.round(value * MONTHS_PER_YEAR);
        calculatedValues.annualNetBeforeTax = Math.round(annualNetBeforeTax);
        calculatedValues.annualSalaryNet = Math.round(netAfterTax * MONTHS_PER_YEAR);
        break;
        
      case 'monthlyNetBeforeTax':
        // Calculate all values based on monthly net before tax except the monthly net before tax itself
        const grossCoeff = SOCIAL_CONTRIBUTIONS[status].coefficient;
        const grossValue = value / grossCoeff;
        const annNetBeforeTax = value * MONTHS_PER_YEAR;
        const annualTx = calculateProgressiveTax(annNetBeforeTax);
        const monthlyTx = annualTx / MONTHS_PER_YEAR;
        const netAfterTx = value - monthlyTx;
        
        calculatedValues.monthlySalaryGross = Math.round(grossValue);
        calculatedValues.monthlySalaryNet = Math.round(netAfterTx);
        calculatedValues.annualSalaryGross = Math.round(grossValue * MONTHS_PER_YEAR);
        calculatedValues.annualNetBeforeTax = Math.round(annNetBeforeTax);
        calculatedValues.annualSalaryNet = Math.round(netAfterTx * MONTHS_PER_YEAR);
        break;
        
      case 'monthlyNet':
        // Start with an initial guess for netBeforeTax
        let netBeforeTx = value / (1 - taxRate / 100);
        let annNetBeforeTx = netBeforeTx * MONTHS_PER_YEAR;
        
        // Refine our guess with a few iterations
        for (let i = 0; i < 5; i++) {
          const annTax = calculateProgressiveTax(annNetBeforeTx);
          const monTax = annTax / MONTHS_PER_YEAR;
          
          // Adjust netBeforeTax based on tax calculation
          netBeforeTx = value + monTax;
          annNetBeforeTx = netBeforeTx * MONTHS_PER_YEAR;
        }
        
        const gCoefficient = SOCIAL_CONTRIBUTIONS[status].coefficient;
        const gValue = netBeforeTx / gCoefficient;
        
        calculatedValues.monthlySalaryGross = Math.round(gValue);
        calculatedValues.monthlyNetBeforeTax = Math.round(netBeforeTx);
        calculatedValues.annualSalaryGross = Math.round(gValue * MONTHS_PER_YEAR);
        calculatedValues.annualNetBeforeTax = Math.round(annNetBeforeTx);
        calculatedValues.annualSalaryNet = Math.round(value * MONTHS_PER_YEAR);
        break;
        
      case 'annualGross':
        // Calculate monthly gross and then use that to calculate other values
        const monthlyGross = value / MONTHS_PER_YEAR;
        const gCoeff = SOCIAL_CONTRIBUTIONS[status].coefficient;
        const nBeforeTax = monthlyGross * gCoeff;
        
        const aNBeforeTax = nBeforeTax * MONTHS_PER_YEAR;
        const aTax = calculateProgressiveTax(aNBeforeTax);
        const mTax = aTax / MONTHS_PER_YEAR;
        
        const nAfterTax = nBeforeTax - mTax;
        
        calculatedValues.monthlySalaryGross = Math.round(monthlyGross);
        calculatedValues.monthlyNetBeforeTax = Math.round(nBeforeTax);
        calculatedValues.monthlySalaryNet = Math.round(nAfterTax);
        calculatedValues.annualNetBeforeTax = Math.round(aNBeforeTax);
        calculatedValues.annualSalaryNet = Math.round(nAfterTax * MONTHS_PER_YEAR);
        break;
        
      case 'annualNetBeforeTax':
        const monthlyNBT = value / MONTHS_PER_YEAR;
        const gcCoeff = SOCIAL_CONTRIBUTIONS[status].coefficient;
        const gVal = monthlyNBT / gcCoeff;
        
        const aTx = calculateProgressiveTax(value);
        const mTx = aTx / MONTHS_PER_YEAR;
        
        const nAftTax = monthlyNBT - mTx;
        
        calculatedValues.monthlySalaryGross = Math.round(gVal);
        calculatedValues.monthlyNetBeforeTax = Math.round(monthlyNBT);
        calculatedValues.monthlySalaryNet = Math.round(nAftTax);
        calculatedValues.annualSalaryGross = Math.round(gVal * MONTHS_PER_YEAR);
        calculatedValues.annualSalaryNet = Math.round(nAftTax * MONTHS_PER_YEAR);
        break;
        
      case 'annualNet':
        const monthlyNet = value / MONTHS_PER_YEAR;
        
        // Start with an initial guess for netBeforeTax
        let nbTax = monthlyNet / (1 - taxRate / 100);
        let anbTax = nbTax * MONTHS_PER_YEAR;
        
        // Refine our guess with a few iterations
        for (let i = 0; i < 5; i++) {
          const annT = calculateProgressiveTax(anbTax);
          const monT = annT / MONTHS_PER_YEAR;
          
          // Adjust netBeforeTax based on tax calculation
          nbTax = monthlyNet + monT;
          anbTax = nbTax * MONTHS_PER_YEAR;
        }
        
        const gfCoeff = SOCIAL_CONTRIBUTIONS[status].coefficient;
        const gfValue = nbTax / gfCoeff;
        
        calculatedValues.monthlySalaryGross = Math.round(gfValue);
        calculatedValues.monthlyNetBeforeTax = Math.round(nbTax);
        calculatedValues.monthlySalaryNet = Math.round(monthlyNet);
        calculatedValues.annualSalaryGross = Math.round(gfValue * MONTHS_PER_YEAR);
        calculatedValues.annualNetBeforeTax = Math.round(anbTax);
        break;
    }
    
    return calculatedValues;
  };

  // Function to update all state values except the one being edited
  const updateValues = (values: any) => {
    if (values.monthlySalaryGross !== undefined) setMonthlySalaryGross(values.monthlySalaryGross);
    if (values.monthlyNetBeforeTax !== undefined) setMonthlyNetBeforeTax(values.monthlyNetBeforeTax);
    if (values.monthlySalaryNet !== undefined) setMonthlySalaryNet(values.monthlySalaryNet);
    if (values.annualSalaryGross !== undefined) setAnnualSalaryGross(values.annualSalaryGross);
    if (values.annualNetBeforeTax !== undefined) setAnnualNetBeforeTax(values.annualNetBeforeTax);
    if (values.annualSalaryNet !== undefined) setAnnualSalaryNet(values.annualSalaryNet);
  };

  // Calculate suggested tax rate based on annual gross salary
  const getSuggestedTaxRate = (annualGross: number): number => {
    // Approximate annual net before tax
    const annualNetBeforeTax = annualGross * SOCIAL_CONTRIBUTIONS[status].coefficient;
    
    // Calculate progressive tax
    const totalTax = calculateProgressiveTax(annualNetBeforeTax);
    
    // Return effective tax rate (total tax / income) without rounding
    return (totalTax / annualNetBeforeTax) * 100;
  };

  // Calculate tax progressively applying each rate to its bracket portion
  const calculateProgressiveTax = (annualNetBeforeTax: number): number => {
    let remainingIncome = annualNetBeforeTax;
    let totalTax = 0;

    // Sort brackets by threshold (ascending)
    const sortedBrackets = [...INCOME_TAX_BRACKETS].sort((a, b) => a.threshold - b.threshold);
    
    // Apply each bracket&apos;s rate to the portion of income that falls within it
    for (let i = 0; i < sortedBrackets.length; i++) {
      const currentBracket = sortedBrackets[i];
      const nextBracket = sortedBrackets[i + 1];
      
      // Calculate taxable amount in this bracket
      let taxableInThisBracket;
      if (nextBracket) {
        // Income between current threshold and next threshold
        taxableInThisBracket = Math.min(
          remainingIncome,
          nextBracket.threshold - currentBracket.threshold
        );
      } else {
        // Income above the highest threshold
        taxableInThisBracket = remainingIncome;
      }
      
      // Apply tax rate to this bracket&apos;s portion
      if (taxableInThisBracket > 0) {
        totalTax += taxableInThisBracket * currentBracket.rate;
        remainingIncome -= taxableInThisBracket;
      }
      
      // If no income left to tax, exit loop
      if (remainingIncome <= 0) break;
    }
    
    return totalTax;
  };



  return (
    <div className="w-full px-4 sm:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ring-1 ring-gray-300 rounded-2xl p-4">
        {/* First Column - Monthly values */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-medium mb-4">Mensuel</h2>
            <div className="space-y-4">
              <div>
                <Input
                  type="number"
                  value={monthlySalaryGross === 0 ? "" : monthlySalaryGross.toString()}
                  onChange={handleMonthlyGrossChange}
                  label="Mensuel Brut"
                  placeholder="Saisir le montant brut"
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">€</span>
                    </div>
                  }
                  className="w-full"
                />
              </div>
              
              <div>
                <Input
                  type="number"
                  value={monthlyNetBeforeTax === 0 ? "" : monthlyNetBeforeTax.toString()}
                  onChange={handleMonthlyNetBeforeTaxChange}
                  label="Mensuel Net Avant Impôt"
                  placeholder="Saisir le montant"
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">€</span>
                    </div>
                  }
                  className="w-full"
                />
              </div>
              
              <div>
                <Input
                  type="number"
                  value={monthlySalaryNet === 0 ? "" : monthlySalaryNet.toString()}
                  onChange={handleMonthlyNetChange}
                  label="Mensuel Net Après Impôt"
                  placeholder="Saisir le montant net"
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">€</span>
                    </div>
                  }
                  color="success"
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
                <Input
                  type="number"
                  value={annualSalaryGross === 0 ? "" : annualSalaryGross.toString()}
                  onChange={handleAnnualGrossChange}
                  label="Annuel Brut"
                  placeholder="Saisir le montant brut"
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">€</span>
                    </div>
                  }
                  className="w-full"
                />
              </div>
              
              <div>
                <Input
                  type="number"
                  value={annualNetBeforeTax === 0 ? "" : annualNetBeforeTax.toString()}
                  onChange={handleAnnualNetBeforeTaxChange}
                  label="Annuel Net Avant Impôt"
                  placeholder="Saisir le montant"
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">€</span>
                    </div>
                  }
                  className="w-full"
                />
              </div>
              
              <div>
                <Input
                  type="number"
                  value={annualSalaryNet === 0 ? "" : annualSalaryNet.toString()}
                  onChange={handleAnnualNetChange}
                  label="Annuel Net Après Impôt"
                  placeholder="Saisir le montant"
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">€</span>
                    </div>
                  }
                  className="w-full"
                  color="success"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Parameters Row */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tax Rate Slider */}
        <div className="flex flex-col">
          <label htmlFor="taxRate" className="block text-sm font-medium mb-4">
            Taux de prélèvement à la source: {taxRate.toFixed(1)}%
          </label>
          <div className="flex items-center space-x-2">
            <span className="text-sm">0%</span>
            <Slider
              id="taxRate"
              aria-label="Taux de prélèvement"
              className="flex-1"
              color="primary"
              value={taxRate}
              onChange={(value: number | number[]) => {
                const newValue = Array.isArray(value) ? value[0] : value;
                setTaxRate(newValue);
              }}
              maxValue={45}
              minValue={0}
              step={0.1}
            />
            <span className="text-sm">45%</span>
          </div>
        </div>
        
        {/* Status Dropdown */}
        <div className="flex flex-col">
          <label htmlFor="status" className="block text-sm font-medium mb-1">Statut</label>
          <Dropdown>
            <DropdownTrigger>
              <button id="status" className="w-full px-4 py-2 text-left border rounded-full shadow-sm flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span>{status === "cadre" ? "Cadre" : "Non-cadre"}</span>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {SOCIAL_CONTRIBUTIONS[status].rate * 100}%
                  </span>
                </div>
                <svg 
                  className="w-5 h-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 9l-7 7-7-7" 
                  />
                </svg>
              </button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="cadre" onPress={() => setStatus("cadre")}>
                Cadre
              </DropdownItem>
              <DropdownItem key="non-cadre" onPress={() => setStatus("non-cadre")}>
                Non-cadre
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      {/* Tax Brackets Table */}
      <div className="mt-8 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm">

        <Table aria-label="Table des tranches d&apos;imposition">
          <TableHeader>
            <TableColumn>Tranche</TableColumn>
            <TableColumn>Taux d&apos;imposition</TableColumn>
            <TableColumn>Montant imposable</TableColumn>
          </TableHeader>
          <TableBody>
            {INCOME_TAX_BRACKETS.map((bracket, index) => {
              const nextBracket = INCOME_TAX_BRACKETS[index + 1];
              const range = nextBracket 
                ? `${bracket.threshold.toLocaleString('fr-FR')} € - ${(nextBracket.threshold - 1).toLocaleString('fr-FR')} €`
                : `Plus de ${bracket.threshold.toLocaleString('fr-FR')} €`;
              
              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{(bracket.rate * 100).toFixed(0)}%</TableCell>
                  <TableCell>{range}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 