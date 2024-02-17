'use client';
import { Excalidraw } from "@excalidraw/excalidraw";
import dynamic from "next/dynamic";

// const ExcalidrawWrapper = dynamic(
//   async () => (await import("@excalidraw/excalidraw")).Excalidraw,
//   {
//     ssr: false,
//   },
// );
export default function Home() {
  return (
    <div>
      <div className="h-screen">
        <Excalidraw />
      </div>
    </div>
  );
}
