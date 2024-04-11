import FinancialHealthScore from "@/components/FinancialHealthScore"
import { FinancialData, calculateFinancialHealthScore } from "@/utils/metrics";


export default function Home() {

  const financialData: FinancialData = {
    annualIncome: 75000,
    totalSavings: 15000,
    totalDebt: 5000,
    totalAssets: 100000,
    monthlyExpenses: 2000,
    monthlyDebtPayments: 500
  };

  const financialScore = calculateFinancialHealthScore(financialData);

  return (
    <div className="bg-primary min-h-screen">
      <div className="bg-secondary pl-10 pt-3 pb-2 flex justify-between items-center">
        <h1 className="text-5xl text-primary">Fintune</h1>
        <p className="text-primary pr-10">Logout</p>
      </div>
      <div className="flex justify-center items-cente mt-5">
        <FinancialHealthScore score={financialScore} />
      </div>
    </div>
  );
}
