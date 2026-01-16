'use client';
import Image from "next/image";
import dynamic from "next/dynamic";

const WorldMapNoSSR = dynamic(() => import("./Components/WorldMap/WorldMap"), {
  ssr: false,
});

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-between">
        <h1 className="text-3xl fixed m-auto z-100 pl-2 mt-2 mb-2 pr-2 bg-black">Map Test</h1>
        <WorldMapNoSSR />
      </main>
  );
}
