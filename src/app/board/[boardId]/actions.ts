'use server';

import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";
import { RowElements } from "./utils";



export const getBoardElements = async (boardId: string) => {
  'use server';
  try {
    const els = await kv.hgetall(`board:${boardId}`);
    revalidatePath(`board/${boardId}`);
    return (els || {}) as RowElements;
  } catch (e) {
    console.log(e);
  }
};


export const setBoardElement = async (boardId: string, els: RowElements) => {
  'use server';
  try {
    console.log('calling it');
    const idx = await kv.hset(`board:${boardId}`, { ...els });
    revalidatePath(`board/${boardId}`);
    return idx;
  } catch (e) {
    console.log(e);
  }
};

//TODO: delete element
export const deleteBoardElement = async (boardId: string, elId: string) => {
  'use server';
  const exists = await kv.hexists(`board:${boardId}`, elId);
  if (!exists) return;
};