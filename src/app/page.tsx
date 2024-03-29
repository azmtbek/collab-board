import CreateBoard from "./create-board-button";
import Boards from "./boards";

export default function Home() {
  return (
    <div className="flex flex-col items-center pt-20 h-screen gap-3">
      <h2 className="text-3xl py-6">List of boards</h2>
      <CreateBoard />
      <Boards />
    </div>
  );
}
