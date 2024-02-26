// 'use server';
import dynamic from "next/dynamic";
import { getBoardElements } from "./actions";

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
  const els = await getBoardElements(params.boardId) || {};
  return (
    <ExcalidrawWrapper elements={els} boardId={params.boardId} />
  );
}