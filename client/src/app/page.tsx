"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/components/withAuth";
import getCurrentUserId from "@/utils/getUser";
import FinancialHealthScore from "@/components/FinancialHealthScore";
import { FinancialData, calculateFinancialHealthScore } from "@/utils/metrics";
import Topbar from "@/components/topbar";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

function Home() {
  const [userType, setUserType] = useState("");
  const userId = getCurrentUserId();
  const router = useRouter();
  // const { user, loading } = UserAuth();

  // useEffect(() => {
  //   if (!loading && !user) {
  //     router.push("/login");
  //   }
  // }, [user, loading, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const userRef = doc(db, "users", userId);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (userData.userType) {
            setUserType(userData.userType);
          } else {
            router.push("/kyc");
          }
        } else {
          router.push("/kyc");
        }
      }
    };

    fetchUserData();
  }, [userId, router]);

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
        <h1>{userType === "professional" ? "Professional" : "Student"}</h1>
        <FinancialHealthScore score={financialScore} />
      </div>
    </div>
  );
}

export default withAuth(Home);
