import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import React from 'react';

export default function CreateBoard() {
  return (
    <Button className='text-md'><PlusIcon />create board</Button>
  );
}
