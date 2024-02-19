import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

interface Board {
  id: string,
  name: string;
}

const boards: Board[] = [
  {
    id: 'ui32465fdds',
    name: 'dsds'
  },
  {
    id: 'uidsavd322ds',
    name: 'new board'
  },
  {
    id: 'uifadfa2342ddsds',
    name: 'board 2'
  },
  {
    id: 'uifadfa2342dsdsds',
    name: 'this is board too'
  },
  {
    id: 'uifadfa2342dsdsds',
    name: 'check out my drawing'
  },
];


export default function Boards() {
  return (
    <div className='flex flex-col gap-2 pb-3'>
      {boards.map(board =>
        <Link href={'boards/' + board.id} key={board.id}>
          <Button variant='outline'>
            <span className='truncate w-64 text-lg'>{board.name}</span>
          </Button>
        </Link>
      )}
    </div>
  );
}
