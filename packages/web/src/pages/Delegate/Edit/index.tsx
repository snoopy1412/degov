import { Route } from '@/routes/delegate/edit.$address';

import { InputForm } from './form';
import { AvatarEdit } from './avatar-edit';

export function Edit() {
  const { address } = Route.useParams();
  console.log(address);
  return (
    <div className="mx-auto w-full max-w-[820px] space-y-[20px] p-[30px]">
      <h3 className="text-[18px] font-semibold">Edit Profile</h3>
      <div className="grid w-full grid-cols-[600px_200px] gap-[20px]">
        <InputForm />
        <AvatarEdit />
      </div>
    </div>
  );
}
