// 'use server';
import dynamic from "next/dynamic";
import { getBoardElements } from "./actions";
import QueryPorvider from "./query-provider";

// Since client components get prerenderd on server as well hence importing 
// the excalidraw stuff dynamically with ssr false

const ExcalidrawWrapper = dynamic(
  async () => (await import("./board")).default,
  {
    ssr: false,
  },
);



export default async function Page({ params }: { params: { boardId: string; }; }) {
  if (!params.boardId) return <div>Loading...</div>;

  return (
    <QueryPorvider>
      <ExcalidrawWrapper boardId={params.boardId} />
    </QueryPorvider>
  );
}