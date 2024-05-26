"use client";
import React, { useState, useEffect } from "react";
import Topbar from "@/components/topbar";
import Tooltip from "@/components/tooltip";
import FormField from "./components/FormField";
import { db } from "@/firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import withAuth from "@/components/withAuth";
import getCurrentUserId from "@/utils/getUser";
import { useRouter } from "next/navigation";
import BalanceChart from "./components/BalanceChart";

function KYCForm() {
  const [step, setStep] = useState(1);

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  }

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const [formData, setFormData] = useState({
    monthlyIncome: "",
    liquidAssets: "",
    nonLiquidAssets: "",
    monthlyExpenses: "",
    studentDebt: "",
    otherDebt: "",
  });

  useEffect(() => {
    const savedFormData = localStorage.getItem("kycFormData");
    setFormData(savedFormData ? JSON.parse(savedFormData) : {
      monthlyIncome: "",
      liquidAssets: "",
      nonLiquidAssets: "",
      monthlyExpenses: "",
      studentDebt: "",
      otherDebt: "",
    });
  }, []);

  useEffect(() => {
    if (formData) {
      localStorage.setItem("kycFormData", JSON.stringify(formData));
    }
  }, [formData]);


  useEffect(() => {
    localStorage.setItem("kycFormData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const userId = getCurrentUserId();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (userId) {
      const userRef = doc(db, "users", userId);
      await setDoc(
        userRef,
        {
          kycData: formData,
        },
        { merge: true },
      );

      alert("Financial Information Submitted!");
      router.push("/");
    } else {
      console.error("User ID is null");
    }
  };

  return (
    <div
      className="bg-offwhite p-10 rounded-lg shadow-lg mx-auto my-10"
      style={{ width: "1000px", boxShadow: "0px 0px 8px rgba(0,0,0,0.1)" }}
    >
      <h1 className="text-4xl mb-12 text-center font-tiempos">Financial Health Profile</h1>
      {formData && (
      <form onSubmit={handleSubmit} className="space-y-8">
        {step === 1 && (
          <>
            <section>
              <h2 className="text-2xl font-semibold font-dm mb-4">Income & Expenses</h2>
              <div className="flex space-x-6">
                <div className="w-1/2">
                  <FormField
                    label="Monthly Income"
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    handleChange={handleChange}
                    tooltip="Average monthly recurring income."
                  />
                </div>
                <div className="w-1/2">
                  <FormField
                    label="Monthly Expenses"
                    name="monthlyExpenses"
                    value={formData.monthlyExpenses}
                    handleChange={handleChange}
                    tooltip="Average monthly spending on bills, groceries, entertainment, etc."
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold font-dm mb-4">Savings & Assets</h2>
              <div className="flex space-x-6">
                <div className="w-1/2">
                  <FormField
                    label="Liquid Assets"
                    name="liquidAssets"
                    value={formData.liquidAssets}
                    handleChange={handleChange}
                    tooltip="The total value of all cash and cash equivalents (savings accounts, GICs, etc)."
                  />
                </div>
                <div className="w-1/2">
                  <FormField
                    label="Non-Liquid Assets"
                    name="nonLiquidAssets"
                    value={formData.nonLiquidAssets}
                    handleChange={handleChange}
                    tooltip="The total value of all assets including investments, real estate, and other personal property (Do not include cash and cash equivalents)."
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold font-dm mb-4">Debt</h2>
              <div className="flex space-x-6">
                <div className="w-1/2">
                  <FormField
                    label="Student Debt"
                    name="studentDebt"
                    value={formData.studentDebt}
                    handleChange={handleChange}
                    tooltip="Sum of all government student debt, or student lines of credit."
                  />
                </div>
                <div className="w-1/2">
                  <FormField
                    label="Other Debt"
                    name="otherDebt"
                    value={formData.otherDebt}
                    handleChange={handleChange}
                    tooltip="Sum of all personal debts, including loans and credit cards."
                  />
                </div>
              </div>
            </section>
          </>
        )}

        {step === 2 && (
          <>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePrevStep}
                className="bg-secondary text-primary px-4 py-2 rounded"
              >
                Previous
              </button>
              <button
                type="submit"
                className="bg-secondary text-primary px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </>
        )}

        {step === 1 && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleNextStep}
              className="bg-secondary text-primary px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <BalanceChart
              formData={formData}
            />
          </div>
        )}
      </form>
      )}
    </div>
  );
}

function KYCPage() {

  const userId = getCurrentUserId();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const userRef = doc(db, "users", userId);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists() && docSnap.data().kycData) {
          router.push("/");
        }
      }
    };

    fetchUserData();
  }, [userId, router]);

  return (
    <div className="bg-primary min-h-screen">
      <Topbar />
      <div className="flex flex-col items-center justify-center pt-10">
        <KYCForm />
      </div>
    </div>
  );
}

export default withAuth(KYCPage);
