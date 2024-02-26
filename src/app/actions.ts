import { revalidatePath } from "next/cache";
import { kv } from "@vercel/kv";


interface Board {
  id: string,
  name: string;
}



export async function getBoards() {
  try {
    const boards = await kv.lrange(`boards`, 0, -1);
    console.log('boards', boards);
    console.log('len', -1);
    revalidatePath('/');
    return boards;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteBoard(boarId: string) {
  try {
    //TODO: delete a board
  } catch (e) {

  }
}