
export interface FinancialData {
    annualIncome: number,
    totalSavings: number,
    totalDebt: number,
    totalAssets: number,
    monthlyExpenses: number,
    monthlyDebtPayments: number
}

export function calculateFinancialHealthScore(data: FinancialData) {
    const savingsRate = data.totalSavings / data.annualIncome;
    const debtToIncomeRatio = data.totalDebt / data.annualIncome;
    const expenseRatio = data.monthlyExpenses * 12 / data.annualIncome;
    const debtPaymentRatio = data.monthlyDebtPayments * 12 / data.annualIncome;
    const assetToDebtRatio = data.totalAssets / data.totalDebt;


    const maxScores = {
        savingsRate: 30,
        debtToIncomeRatio: 20,
        expenseRatio: 20,
        debtPaymentRatio: 20,
        assetToDebtRatio: 10
    };

    let scores = {
        savingsScore: Math.min(savingsRate * 100, maxScores.savingsRate),
        debtToIncomeScore: Math.max(0, maxScores.debtToIncomeRatio - (debtToIncomeRatio * 10)),
        expenseScore: Math.max(0, maxScores.expenseRatio - (expenseRatio * 10)),
        debtPaymentScore: Math.max(0, maxScores.debtPaymentRatio - (debtPaymentRatio * 10)),
        assetToDebtScore: Math.min(assetToDebtRatio * 10, maxScores.assetToDebtRatio)
    };

    let totalScore = scores.savingsScore +
                    scores.debtToIncomeScore +
                    scores.expenseScore +
                    scores.debtPaymentScore +
                    scores.assetToDebtScore;

    let normalizedScore = totalScore / (maxScores.savingsRate +
                                        maxScores.debtToIncomeRatio +
                                        maxScores.expenseRatio +
                                        maxScores.debtPaymentRatio +
                                        maxScores.assetToDebtRatio) * 900;

    return normalizedScore;
}