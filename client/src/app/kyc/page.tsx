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

function ProfessionalKYCForm() {
  const [formData, setFormData] = useState({
    annualIncome: "",
    totalCashSavings: "",
    totalAssets: "",
    monthlyExpenses: "",
    studentDebt: "",
    otherDebt: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
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
          userType: "professional",
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
      className="bg-white p-10 rounded-lg shadow-lg mx-auto my-10"
      style={{ width: "1000px", boxShadow: "0px 0px 8px rgba(0,0,0,0.1)" }}
    >
      <h1 className="text-4xl mb-12 text-center">
        Working Professional Questionnaire
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Income</h2>
          <div className="space-y-6">
            <FormField
              label="Annual Income"
              name="annualIncome"
              value={formData.annualIncome}
              handleChange={handleChange}
              tooltip="The total amount of money earned annually before taxes."
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Expenses</h2>
          <div className="space-y-6">
            <FormField
              label="Monthly Expenses"
              name="monthlyExpenses"
              value={formData.monthlyExpenses}
              handleChange={handleChange}
              tooltip="Total monthly spending on bills, groceries, entertainment, etc."
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Savings and Assets</h2>
          <div className="space-y-6">
            <FormField
              label="Total Cash Savings"
              name="totalCashSavings"
              value={formData.totalCashSavings}
              handleChange={handleChange}
              tooltip="All funds saved across different bank accounts and liquid assets."
            />
            <FormField
              label="Total Assets"
              name="totalAssets"
              value={formData.totalAssets}
              handleChange={handleChange}
              tooltip="The total value of all assets including investments, real estate, and other personal property."
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Debt</h2>
          <div className="space-y-6">
            <FormField
              label="Student Debt"
              name="studentDebt"
              value={formData.studentDebt}
              handleChange={handleChange}
              tooltip="Sum of all government student debt, or student lines of credit."
            />
            <FormField
              label="Other Debt"
              name="otherDebt"
              value={formData.otherDebt}
              handleChange={handleChange}
              tooltip="Sum of all personal debts, including loans and credit cards."
            />
          </div>
        </section>

        <button
          type="submit"
          className="bg-secondary text-primary px-4 py-2 rounded self-end"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

function StudentKYCForm() {
  const [formData, setFormData] = useState({
    totalCashSavings: "",
    totalAssets: "",
    monthlyExpenses: "",
    studentDebt: "",
    otherDebt: "",
    numAcademicTermsLeft: "",
    tuitionPerTerm: "",
    numCoopsLeft: "",
    expectedCoopHourlyRate: "",
    expectedFulltimeIncome: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
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
          userType: "student",
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
      className="bg-white p-10 rounded-lg shadow-lg mx-auto my-10"
      style={{ width: "1000px", boxShadow: "0px 0px 8px rgba(0,0,0,0.1)" }}
    >
      <h1 className="text-4xl mb-12 text-center">Student Questionnaire</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Savings</h2>
          <div className="space-y-6">
            <FormField
              label="Total Cash Savings"
              name="totalCashSavings"
              value={formData.totalCashSavings}
              handleChange={handleChange}
              tooltip="All funds saved across different bank accounts and liquid assets."
            />
            <FormField
              label="Total Assets"
              name="totalAssets"
              value={formData.totalAssets}
              handleChange={handleChange}
              tooltip="The total value of all assets including investments, real estate, and other personal property."
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Expenses</h2>
          <div className="space-y-6">
            <FormField
              label="Monthly Expenses"
              name="monthlyExpenses"
              value={formData.monthlyExpenses}
              handleChange={handleChange}
              tooltip="Total monthly spending on bills, groceries, entertainment, etc."
            />
            <FormField
              label="Tuition per Academic Term"
              name="tuitionPerTerm"
              value={formData.tuitionPerTerm}
              handleChange={handleChange}
              tooltip="The cost of tuition per academic term."
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">School</h2>
          <div className="space-y-6">
            <FormField
              label="Number of Academic Terms Left"
              name="numAcademicTermsLeft"
              value={formData.numAcademicTermsLeft}
              handleChange={handleChange}
              tooltip="The number of academic terms left before graduation."
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Co-op</h2>
          <div className="space-y-6">
            <FormField
              label="Number of Co-op Terms Left"
              name="numCoopsLeft"
              value={formData.numCoopsLeft}
              handleChange={handleChange}
              tooltip="The number of co-op terms left before graduation."
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Debt</h2>
          <div className="space-y-6">
            <FormField
              label="Student Debt"
              name="studentDebt"
              value={formData.studentDebt}
              handleChange={handleChange}
              tooltip="Sum of all government student debt, or student lines of credit."
            />
            <FormField
              label="Other Debt"
              name="otherDebt"
              value={formData.otherDebt}
              handleChange={handleChange}
              tooltip="Sum of all personal debts, including loans and credit cards."
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Income</h2>
          <div className="space-y-6">
            <FormField
              label="Expected Co-op Hourly Rate"
              name="expectedCoopHourlyRate"
              value={formData.expectedCoopHourlyRate}
              handleChange={handleChange}
              tooltip="The expected hourly rate for co-op positions."
            />
            <FormField
              label="Expected Annual Income After Graduation"
              name="expectedFulltimeIncome"
              value={formData.expectedFulltimeIncome}
              handleChange={handleChange}
              tooltip="The expected annual income after graduation."
            />
          </div>
        </section>

        <button
          type="submit"
          className="bg-secondary text-primary px-4 py-2 rounded self-end"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

function KYCPage() {
  const [userType, setUserType] = useState("");

  const handleSelection = (type: "student" | "professional") => {
    setUserType(type);
  };

  const userId = getCurrentUserId();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const userRef = doc(db, "users", userId);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists() && docSnap.data().userType) {
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
        {userType === "" && (
          <div className="text-center">
            <h2 className="text-xl mb-4">Select Your Status</h2>
            <button
              className="bg-secondary text-primary px-4 py-2 rounded mx-2"
              onClick={() => handleSelection("student")}
            >
              Student
            </button>
            <button
              className="bg-secondary text-primary px-4 py-2 rounded mx-2"
              onClick={() => handleSelection("professional")}
            >
              Working Professional
            </button>
          </div>
        )}

        {userType === "student" && <StudentKYCForm />}
        {userType === "professional" && <ProfessionalKYCForm />}
      </div>
    </div>
  );
}

export default withAuth(KYCPage);
