import { Route as profileRoute } from '@/routes/profile/$address';
import { Profile } from './profile';

export const Detail = () => {
  const { address } = profileRoute.useParams();
  return <Profile address={address as `0x${string}`} />;
};
