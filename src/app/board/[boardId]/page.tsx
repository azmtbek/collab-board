'use server';
import dynamic from "next/dynamic";

// Since client components get prerenderd on server as well hence importing 
// the excalidraw stuff dynamically with ssr false

const ExcalidrawWrapper = dynamic(
  async () => (await import("./board")).default,
  {
    ssr: false,
  },
);

export default async function Page() {
  return (
    <ExcalidrawWrapper data={'st'} />
  );
}