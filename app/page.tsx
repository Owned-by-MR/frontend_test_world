import Countries from "@/components/Countries";

export default function Page() {
  return (
    <div className="flex flex-col items-center  min-h-screen">
      <h1 className="text-2xl font-bold mb-4 justify-center">World Explorer</h1>
      <Countries />
    </div>
  );
}
