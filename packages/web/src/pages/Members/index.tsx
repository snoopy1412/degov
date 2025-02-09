import { MembersTable } from '@/components/members-table';

export const Members = () => {
  return (
    <div className="flex flex-col gap-[30px] p-[30px]">
      <div className="flex items-center justify-between gap-[20px]">
        <h3 className="text-[18px] font-extrabold">Members</h3>
      </div>
      <MembersTable caption="View more" />
    </div>
  );
};
