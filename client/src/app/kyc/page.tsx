import Topbar from "@/components/topbar";

function KYCForm() {
  return (
    <div
      className="bg-white p-10 flex flex-col justify-between mt-[4vh] mb-[5vh]"
      style={{
        width: "1000px",
        height: "1100px",
        boxShadow: "0px 0px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h1 className="text-4xl">KYC</h1>
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
