import { Route } from '@/routes/delegate/edit.$address';

import { InputForm } from './form';

export function Edit() {
  const { address } = Route.useParams();
  console.log(address);
  return (
    <div>
      <h3>Edit</h3>
      <div>
        <InputForm />
      </div>
    </div>
  );
}
