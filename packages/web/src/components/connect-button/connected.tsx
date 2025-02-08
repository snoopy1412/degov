import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { AddressResolver } from '../AddressResolver';
import { AddressAvatar } from '../address-avatar';
import ClipboardIconButton from '../clipboard-icon-button';
import { useDisconnectWallet } from '@/hooks/useDisconnectWallet';
import { useCallback } from 'react';
import { Button } from '../ui/button';
import { Power } from 'lucide-react';

interface ConnectedProps {
  address: `0x${string}`;
}

export const Connected = ({ address }: ConnectedProps) => {
  const { disconnectWallet } = useDisconnectWallet();

  const handleDisconnect = useCallback(() => {
    disconnectWallet(address);
  }, [disconnectWallet, address]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AddressResolver address={address} showShortAddress>
          {(value) => (
            <Button
              className="flex items-center gap-[10px] rounded-[10px] border-white"
              variant="outline"
            >
              <AddressAvatar address={address} className="size-[24px] rounded-full" />
              <span className="text-[14px]">{value}</span>
            </Button>
          )}
        </AddressResolver>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-[26px] p-[20px]" align="end">
        <AddressResolver address={address} showShortAddress>
          {(value) => (
            <div className="flex items-center gap-[10px]">
              <AddressAvatar address={address} className="rounded-full" />
              <span className="text-[18px] font-extrabold text-white/80">{value}</span>
              <ClipboardIconButton text={address} size={20} />
            </div>
          )}
        </AddressResolver>
        <DropdownMenuSeparator className="my-[20px]" />
        <div className="flex items-center justify-center">
          <Button
            onClick={handleDisconnect}
            className="w-full gap-[10px] rounded-[100px] border-white"
            variant="outline"
          >
            <Power size={20} className="text-white" strokeWidth={2} />
            <span className="text-[14px]">Disconnect</span>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
