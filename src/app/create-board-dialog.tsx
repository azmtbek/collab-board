'use client';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from '@radix-ui/react-icons';
import { kv } from '@vercel/kv';
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { nanoid } from 'nanoid';
import { redirect, useRouter } from "next/navigation";


interface Props {
  createBoard: (name: string) => Promise<void>;
}

export default function CreateBoardDialog({ createBoard }: Props) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const router = useRouter();
  const [nickname, setNickname] = useLocalStorageState('nickname', { defaultValue: 'doe' });

  // const createBoard = () => { };

  // const boards = await kv.lrange<string>('boards', 0, -1);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-64 text-lg py-4 gap-1" ><PlusIcon /> create new board</Button>
        {/* <Button variant="outline">Edit Profile</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a board</DialogTitle>
          <DialogDescription>
            Please name your board. Choose a nickname for yourself to enter.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Board Name
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nickname" className="text-right">
              Nickname (used to access)
            </Label>
            <Input id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={async (e) => {
            e.preventDefault();
            try {
              await createBoard(name);
            } catch (e) {
              console.log(e);
            }
          }}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
