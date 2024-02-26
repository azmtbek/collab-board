'use server';
import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";
// import { RowElements } from "./utils";
import _ from "lodash";
import { Elements } from "./board";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";

export interface RowElements {
  [id: string]: string;
}


export const getBoardElements = async (boardId: string) => {
  'use server';
  try {
    const els = await kv.hgetall<Record<string, unknown>>(`board:${boardId}`) || {};
    // revalidatePath(`board/${boardId}`);
    console.log('get els', typeof els);

    const elements: Elements = {};
    Object.keys(els).forEach(el => {
      console.log('el', el);
      console.log('el val', typeof els[el]);
      elements[el] = els[el] as ExcalidrawElement;
    });
    console.log('getBoard', elements);
    return elements;
  } catch (e) {
    console.log(e);
  }
  return {};
};

export const setBoardElement = _.throttle(async (boardId: string, els: Elements) => {
  'use server';
  try {
    const elements: RowElements = {};
    Object.keys(els).forEach(el => {
      elements[el] = JSON.stringify(els[el]);
    });
    // return elements;

    console.log('calling it');
    const idx = await kv.hset(`board:${boardId}`, { ...elements });
    // revalidatePath(`board/${boardId}`);
    return idx;
  } catch (e) {
    console.log(e);
  }
}, 200);

//TODO: delete element
export const deleteBoardElement = async (boardId: string, elId: string) => {
  'use server';
  const exists = await kv.hexists(`board:${boardId}`, elId);
  if (!exists) return;
};