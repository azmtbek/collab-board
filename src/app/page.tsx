import CreateBoard from "./create-board-button";
import Boards from "./boards";

import dynamic from "next/dynamic";

// Since client components get prerenderd on server as well hence importing 
// the excalidraw stuff dynamically with ssr false



export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl py-6">List of boards</h2>
      <Boards />
      <CreateBoard />
    </div>
  );
}
