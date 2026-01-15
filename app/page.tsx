import Image from "next/image";
import WorldMap from "./Components/WorldMap/WorldMap";

export default function Home() {
  return (
      <main id="main" className="flex min-h-screen flex-col items-center justify-between">
        <h1 className="text-3xl fixed m-auto z-100 pl-2 mt-2 mb-2 pr-2 bg-black">Map Test</h1>
        <WorldMap />
      </main>
  );
}
