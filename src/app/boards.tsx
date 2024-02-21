'use server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { kv } from "@vercel/kv";
interface Board {
  id: string,
  name: string;
}


async function getBoards() {
  try {
    // 0 is the first element; -1 is the last element
    // So this returns the whole list
    let boards = [];
    const len = await kv.llen(`boards`);

    boards = await kv.lrange(`boards`, 0, len);
    console.log('boards', boards);
    console.log('len', len);
    return boards;
  } catch (error) {
    // Handle errors
    console.log(error);
  }
}


export default async function Boards() {
  const boards = await getBoards();
  // console.log('boards', boards);
  return (
    <div className='flex flex-col gap-2 pb-3'>
      {boards?.map(board => {
        const splitIndex = board.indexOf(':');
        const id = board.slice(0, splitIndex);
        const name = board.slice(splitIndex + 1);
        return <Link href={'board/' + id} key={id}>
          <Button variant='outline'>
            <span className='truncate w-64 text-lg'>{name}</span>
          </Button>
        </Link>;
      }
      )}
      this is not working
    </div>
  );
}
