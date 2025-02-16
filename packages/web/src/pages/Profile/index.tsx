import { useAccount } from 'wagmi';
import { WithConnect } from '@/components/with-connect';
import { Profile } from './profile';

export const HomePage = () => {
  const { address } = useAccount();

  return <WithConnect>{!!address && <Profile address={address} />}</WithConnect>;
};
