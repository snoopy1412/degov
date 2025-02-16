import { AddressAvatar } from '@/components/address-avatar';
import { AddressResolver } from '@/components/address-resolver';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { formatShortAddress } from '@/utils/address';

interface AddressWithAvatarFullProps {
  address: `0x${string}`;
  avatarSize?: number;
  className?: string;
  textClassName?: string;
}

export function AddressWithAvatarFull({
  address,
  avatarSize = 34,
  className,
  textClassName
}: AddressWithAvatarFullProps) {
  return (
    <span className={cn('flex items-center gap-[10px]', className)}>
      <AddressAvatar address={address} size={avatarSize} />
      <AddressResolver address={address} showShortAddress>
        {(ensName) => (
          <span
            className={cn('line-clamp-1 text-[16px] font-semibold', textClassName)}
            title={address}
          >
            {ensName}
          </span>
        )}
      </AddressResolver>

      <Tooltip>
        <TooltipTrigger asChild>
          <span className="text-[14px] font-normal hover:underline">
            ({formatShortAddress(address)})
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{address}</p>
        </TooltipContent>
      </Tooltip>
    </span>
  );
}
