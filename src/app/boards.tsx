'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { Suspense, useState } from 'react';
import { getBoards } from './actions';
import { useQuery } from '@tanstack/react-query';
import { SymbolIcon } from '@radix-ui/react-icons';

export const runtime = 'edge';

export default function Boards() {
  const query = useQuery({
    queryKey: ['boards'],
    queryFn: async () => {
      const boards = await getBoards();
      return boards;
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingBoardId, setLoadinBoardId] = useState('');
  if (query.isLoading) return <div className='flex gap-1 items-center'>
    <SymbolIcon className='animate-spin-slow' /> Loading
  </div>;
  return (
    <div className='flex flex-col gap-2 pb-3'>
      <Suspense fallback={<div>Loading...</div>}>
        {query.data?.map(board => {
          const splitIndex = board.indexOf(':');
          const id = board.slice(0, splitIndex);
          const name = board.slice(splitIndex + 1);
          return <Link href={'board/' + id} key={id}>
            <Button variant='outline' className='truncate w-64 py-4 text-lg'
              onClick={() => {
                setIsLoading(true);
                setLoadinBoardId(id);
              }}
            >
              {name} {(isLoading && loadingBoardId === id) && <SymbolIcon className='animate-spin-slow' />}
            </Button>
          </Link>;
        }
        )}
      </Suspense>
    </div>
  );
}
