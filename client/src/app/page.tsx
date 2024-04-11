import Image from "next/image";
import FinancialHealthScore from "@/components/FinancialHealthScore"

export default function Home() {
  return (
    <div className="bg-primary min-h-screen">
      <div className="bg-secondary pl-10 pt-3 pb-2 flex justify-between items-center">
        <h1 className="text-5xl text-primary">Fintune</h1>
        <p className="text-primary pr-10">Logout</p>
      </div>
      <div className="flex justify-center items-cente mt-5">
        <FinancialHealthScore score={700} />
      </div>
    </div>
  );
}
