import { useCallback, useEffect, useState } from 'react';
import { MembersTable } from '@/components/members-table';
import { DelegateAction } from '@/components/delegate-action';
import type { Address } from 'viem';
import type { Member } from '@/components/members-table';

const data: Member[] = [
  {
    rank: '1',
    member: '0x3d6d656c1bf92f7028Ce4C352563E1C363C58ED5',
    delegateStatement:
      'Understanding color theory: the color wheel and finding complementary colors',
    votingPower: '1.11B'
  },
  {
    rank: '2',
    member: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    delegateStatement:
      'Yo Reddit! What’s a small thing that anyone can do at nearly anytime to improve their mood and make Yo Reddit! What’s a small thing that anyone can do at nearly anytime to improve their mood and make Yo Reddit! What’s a small thing that anyone can do at nearly anytime to improve their mood and make ',
    votingPower: '1.11B'
  },
  {
    rank: '3',
    member: '0x3d6d656c1bf92f7028Ce4C352563E1C363C58ED5',
    delegateStatement:
      'Understanding color theory: the color wheel and finding complementary colors',
    votingPower: '1.11B'
  }
] as Member[];

export const Members = () => {
  const [address, setAddress] = useState<Address | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const handleDelegate = useCallback((value: Member) => {
    console.log(value);
    setAddress(value.member);
    setOpen(true);
  }, []);

  useEffect(() => {
    return () => {
      setAddress(undefined);
      setOpen(false);
    };
  }, []);

  return (
    <div className="flex flex-col gap-[30px] p-[30px]">
      <div className="flex items-center justify-between gap-[20px]">
        <h3 className="text-[18px] font-extrabold">Members</h3>
      </div>
      <MembersTable caption="View more" data={data} onDelegate={handleDelegate} />
      <DelegateAction address={address} open={open} onOpenChange={setOpen} />
    </div>
  );
};
