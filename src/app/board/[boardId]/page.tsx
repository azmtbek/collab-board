// 'use server';
import dynamic from "next/dynamic";

const ExcalidrawWrapper = dynamic(
  async () => (await import("./board")).default,
  {
    ssr: false,
  },
);



export default async function Page({ params }: { params: { boardId: string; }; }) {
  if (!params.boardId) return <div>Loading...</div>;

  return (
    <ExcalidrawWrapper boardId={params.boardId} />
  );
}