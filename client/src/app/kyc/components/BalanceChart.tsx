"use client";
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function BalanceChart({ formData }: any) {
    const generateMonths = () => {
        const months = [];
        const currentDate = new Date();
        for (let i = 0; i < 24; i++) {
            const month = currentDate.toLocaleString('default', { month: 'short' });
            const year = currentDate.getFullYear();
            months.push(`${month} ${year}`);
            currentDate.setMonth(currentDate.getMonth() + 1);
        }
        return months;
    };

    const generateBalances = () => {
        const balances = [];
        let currentBalance = Number(formData.liquidAssets);
        const adjustments = formData.oneTimeAdjustments;

        for (let i = 0; i < 24; i++) {
            balances.push(currentBalance);
            currentBalance += Number(formData.monthlyIncome) - Number(formData.monthlyExpenses);

            adjustments.forEach((adjustment: any) => {
                const adjustmentDate = new Date(adjustment.date);
                const adjustmentMonthIndex = adjustmentDate.getFullYear() * 12 + adjustmentDate.getMonth();
                const currentMonthIndex = new Date().getFullYear() * 12 + new Date().getMonth() + i;
            
                if (currentMonthIndex === adjustmentMonthIndex - 1) {
                    currentBalance += adjustment.type === 'income' ? Number(adjustment.amount) : -Number(adjustment.amount);
                }
            });
            
        }
        return balances;
    };

    const generateNetWorths = () => {
        const netWorths = [];
        const totalDebt = Number(formData.studentDebt) + Number(formData.otherDebt);
        const monthlyDebtReduction = totalDebt / 24;
        let currentNetWorth = Number(formData.liquidAssets) + Number(formData.nonLiquidAssets) - totalDebt;
        const adjustments = formData.oneTimeAdjustments;

        for (let i = 0; i < 24; i++) {
            netWorths.push(currentNetWorth);
            currentNetWorth += Number(formData.monthlyIncome) - Number(formData.monthlyExpenses) + monthlyDebtReduction;

            adjustments.forEach((adjustment: any) => {
                const adjustmentDate = new Date(adjustment.date);
                const adjustmentMonthIndex = adjustmentDate.getFullYear() * 12 + adjustmentDate.getMonth();
                const currentMonthIndex = new Date().getFullYear() * 12 + new Date().getMonth() + i;

                if (currentMonthIndex === adjustmentMonthIndex - 1) {
                    currentNetWorth += adjustment.type === 'income' ? Number(adjustment.amount) : -Number(adjustment.amount);
                }
            });
        }
        return netWorths;
    };

    const data = {
        labels: generateMonths(),
        datasets: [
            {
                label: 'Cash Balance',
                data: generateBalances(),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
            {
                label: 'Net Worth',
                data: generateNetWorths(),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month/Year',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Balance ($)',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    );
}
