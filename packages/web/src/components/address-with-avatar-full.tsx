import { AddressAvatar } from '@/components/address-avatar';
import { AddressResolver } from '@/components/address-resolver';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { formatShortAddress } from '@/utils/address';
import { Link } from '@tanstack/react-router';

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
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          to={`/profile/$address`}
          params={{ address }}
          className={cn('inline-flex items-center gap-[10px] hover:underline', className)}
        >
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

          <span className="text-[14px] font-normal hover:underline">
            ({formatShortAddress(address)})
          </span>
        </Link>
      </TooltipTrigger>

      <TooltipContent>
        <p>{address}</p>
      </TooltipContent>
    </Tooltip>
  );
}
