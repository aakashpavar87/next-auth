import { Toaster } from "react-hot-toast";
export default function Home() {
  return (
    <main className="w-screen h-screen bg-black/80 flex justify-center items-center">
      <h1 className="text-xl font-bold text-[#fff] text-center">
        Hello 2 World
      </h1>
      <Toaster />
    </main>
  );
}
