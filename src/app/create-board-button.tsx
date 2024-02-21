// 'use server';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import { kv } from '@vercel/kv';
import { nanoid } from 'nanoid';
import { redirect } from 'next/navigation';
import React from 'react';
import CreateBoardDialog from './create-board-dialog';

const createBoard = async (name: string) => {
  'use server';
  const id = nanoid(13);
  const boards = await kv.lpush<string>('boards', `${id}:${name}`);
  console.log(boards);
  redirect(`board/${id}`);
};

export default async function CreateBoard() {


  return (
    <CreateBoardDialog createBoard={createBoard} />
  );
}
