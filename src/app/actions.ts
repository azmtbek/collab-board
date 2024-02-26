'use server';
import { revalidatePath } from "next/cache";
import { kv } from "@vercel/kv";


interface Board {
  id: string,
  name: string;
}



export async function getBoards() {
  'use server';
  try {
    const boards = await kv.lrange(`boards`, 0, -1);
    revalidatePath('/');
    return boards;
  } catch (error) {
    console.log(error);
  }
  return [];
}

export async function deleteBoard(boarId: string) {
  try {
    //TODO: delete a board
  } catch (e) {

  }
}