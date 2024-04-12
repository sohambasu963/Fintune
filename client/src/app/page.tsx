"use client";
import FinancialHealthScore from "@/components/FinancialHealthScore";
import { FinancialData, calculateFinancialHealthScore } from "@/utils/metrics";
import Topbar from "@/components/topbar";

export default function Home() {
  const financialData: FinancialData = {
    annualIncome: 75000,
    totalSavings: 15000,
    totalDebt: 5000,
    totalAssets: 100000,
    monthlyExpenses: 2000,
    monthlyDebtPayments: 500,
  };

  const financialScore = calculateFinancialHealthScore(financialData);

  return (
    <div className="bg-primary min-h-screen">
      <Topbar />
      <div className="flex justify-center items-cente mt-5">
        <FinancialHealthScore score={financialScore} />
      </div>
    </div>
  );
}
