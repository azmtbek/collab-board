'use server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { getBoards } from './actions';


export default async function Boards() {
  const boards = await getBoards();

  return (
    <div className='flex flex-col gap-2 pb-3'>
      {boards?.map(board => {
        const splitIndex = board.indexOf(':');
        const id = board.slice(0, splitIndex);
        const name = board.slice(splitIndex + 1);
        return <Link href={'board/' + id} key={id} >
          <Button variant='outline' className='truncate w-64 py-4 text-lg'>
            {name}
          </Button>
        </Link>;
      }
      )}
    </div>
  );
}
