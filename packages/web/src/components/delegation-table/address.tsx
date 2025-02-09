import { AddressAvatar } from '../address-avatar';
import { AddressResolver } from '../address-resolver';

interface AddressProps {
  address: `0x${string}`;
}
export const Address = ({ address }: AddressProps) => {
  return (
    <div className="flex items-center gap-[10px]">
      <AddressAvatar address={address} size={30} />
      <AddressResolver address={address} showShortAddress>
        {(ensName) => <span className="text-[14px] text-foreground">{ensName}</span>}
      </AddressResolver>
    </div>
  );
};
