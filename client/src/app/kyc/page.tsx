"use client";
import React, { useState } from "react";
import Topbar from "@/components/topbar";
import Tooltip from "@/components/tooltip";

function KYCForm() {

    const [formData, setFormData] = useState({
        annualIncome: '',
        totalSavings: '',
        totalDebt: '',
        totalAssets: '',
        monthlyExpenses: '',
        monthlyDebtPayments: ''
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

      const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("Financial Data Submitted:", formData);
        alert("Financial Information Submitted!");
      };

      return (
        <div
          className="bg-white p-10 flex flex-col justify-between mt-[4vh] mb-[5vh]"
          style={{
            width: "1000px",
            boxShadow: "0px 0px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h1 className="text-4xl mb-12 text-center">Financial Health Survey</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <label htmlFor="annualIncome" className="font-semibold text-gray-700">Annual Income</label>
                <Tooltip content="The total amount of money earned annually before taxes." />
              </div>
              <input
                type="number"
                id="annualIncome"
                name="annualIncome"
                value={formData.annualIncome}
                onChange={handleChange}
                className="border px-4 py-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <label htmlFor="totalSavings" className="font-semibold text-gray-700">Total Savings</label>
                <Tooltip content="All funds saved across different bank accounts and liquid assets." />
              </div>
              <input
                type="number"
                id="totalSavings"
                name="totalSavings"
                value={formData.totalSavings}
                onChange={handleChange}
                className="border px-4 py-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <label htmlFor="monthlyExpenses" className="font-semibold text-gray-700">Monthly Expenses</label>
                <Tooltip content="Total monthly spending on bills, groceries, entertainment, etc." />
              </div>
              <input
                type="number"
                id="monthlyExpenses"
                name="monthlyExpenses"
                value={formData.monthlyExpenses}
                onChange={handleChange}
                className="border px-4 py-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <label htmlFor="totalAssets" className="font-semibold text-gray-700">Total Assets</label>
                <Tooltip content="The total value of all assets including investments, real estate, and other personal property." />
              </div>
              <input
                type="number"
                id="totalAssets"
                name="totalAssets"
                value={formData.totalAssets}
                onChange={handleChange}
                className="border px-4 py-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <label htmlFor="totalDebt" className="font-semibold text-gray-700">Total Debt</label>
                <Tooltip content="Sum of all personal debts, including loans and credit cards." />
              </div>
              <input
                type="number"
                id="totalDebt"
                name="totalDebt"
                value={formData.totalDebt}
                onChange={handleChange}
                className="border px-4 py-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <label htmlFor="monthlyDebtPayments" className="font-semibold text-gray-700">Monthly Debt Payments</label>
                <Tooltip content="Monthly total of all payments made towards debts." />
              </div>
              <input
                type="number"
                id="monthlyDebtPayments"
                name="monthlyDebtPayments"
                value={formData.monthlyDebtPayments}
                onChange={handleChange}
                className="border px-4 py-2"
                required
              />
            </div>
            <button type="submit" className="bg-secondary text-primary px-4 py-2 rounded self-end">Submit</button>
          </form>
        </div>
      );
      
}

export default function KYCPage() {
  return (
    <div className="bg-primary min-h-screen">
      <Topbar />
      <div className="flex flex-col items-center">
        <KYCForm />
      </div>
    </div>
  );
}
