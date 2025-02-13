import { useAccount } from 'wagmi';
import { AddressAvatar } from '@/components/address-avatar';
import { AddressResolver } from '@/components/address-resolver';
import ClipboardIconButton from '@/components/clipboard-icon-button';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatShortAddress } from '@/utils/address';
import { ReceivedDelegations } from './received-delegations';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useCallback, useState } from 'react';
import { DelegateAction } from '@/components/delegate-action';
import { DelegateSelector } from '@/components/delegate-selector';
import { useNavigate } from '@tanstack/react-router';
import { WithConnect } from '@/components/with-connect';

export const Profile = () => {
  const { address } = useAccount();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [delegateOpen, setDelegateOpen] = useState(false);
  const handleDelegate = useCallback(() => {
    setOpen(true);
  }, []);

  const handleSelect = useCallback(
    (value: 'myself' | 'else') => {
      setOpen(false);
      if (value === 'myself') {
        setDelegateOpen(true);
      } else {
        navigate({
          to: '/members'
        });
      }
    },
    [navigate]
  );
  const handleEditProfile = useCallback(() => {
    navigate({
      to: '/profile/edit'
    });
  }, [navigate]);

  const socials = [
    {
      key: 'email',
      value: 'l2beat@gmail.com'
    },
    {
      key: 'twitter',
      value: 'l2beat'
    },
    {
      key: 'telegram',
      value: 'l2beat'
    },
    {
      key: 'github',
      value: 'l2beat'
    },
    {
      key: 'discord',
      value: 'l2beat'
    }
  ];

  return (
    <WithConnect>
      <div className="flex flex-col gap-[30px] p-[30px]">
        <div className="flex items-center gap-1 text-[18px] font-extrabold">
          <span className="text-muted-foreground">Delegate</span>
          <span className="text-muted-foreground">/</span>
          <AddressResolver address={address as `0x${string}`} showShortAddress>
            {(value) => <span>{value}</span>}
          </AddressResolver>
        </div>

        <div className="grid grid-cols-[1fr_400px] gap-[20px]">
          {/* personal info */}
          <div className="flex flex-col gap-[20px] rounded-[14px] bg-card p-[20px]">
            <div className="flex items-center justify-between gap-[10px]">
              <div className="flex items-center gap-[20px]">
                <AddressAvatar address={address as `0x${string}`} className="size-[70px]" />
                <div>
                  <div className="flex items-center gap-[5px]">
                    <AddressResolver address={address as `0x${string}`} showShortAddress>
                      {(value) => <span className="text-[26px] font-semibold">{value}</span>}
                    </AddressResolver>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <span className="flex size-[24px] cursor-pointer items-center justify-center transition-opacity hover:opacity-80">
                          <img
                            src="/assets/image/share.svg"
                            alt="delegate-link"
                            className="size-[16px]"
                          />
                        </span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="flex w-[160px] flex-col rounded-[10px] border-border/20 bg-card"
                        side="right"
                      >
                        <DropdownMenuItem className="cursor-pointer py-[10px]">
                          Copy Profile URL
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer py-[10px]">
                          Share To Forecaster
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer py-[10px]">
                          Share To Lens
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center gap-[5px]">
                    <span className="text-[14px] text-white/40">{formatShortAddress(address)}</span>
                    <ClipboardIconButton text={address} className="size-[16px]" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-[20px]">
                <Button
                  className="rounded-full border-border bg-card"
                  variant="outline"
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </Button>
                <Button className="rounded-full" onClick={handleDelegate}>
                  Delegate
                </Button>
              </div>
            </div>
            <Separator className="bg-border/40" />
            <p className="mb-0 line-clamp-2 text-[14px] font-normal leading-normal text-foreground">
              L2BEAT is an independent, public goods company who acts as an impartial watchdog for
              the Ethereum Layer2 ecosystem. Our mission is to provide comprehensive and unbiased
              analysis and comparative evaluations of Layer 2 solutions . We are committed to the
              verification and fact-checking of the claims made by each project, with a special
              focus on the security aspects. What sets L2BEAT apart is our unwavering commitment to
              delivering accurate and reliable information.
            </p>

            <div className="flex items-center gap-[20px]">
              {socials?.map((social) => (
                <span
                  className="flex size-[24px] cursor-pointer items-center justify-center rounded-full bg-white transition-opacity hover:opacity-80"
                  key={social.key}
                >
                  <img src={`/assets/image/user_social/${social.key}.svg`} alt={social.key} />
                </span>
              ))}
            </div>
          </div>

          {/* Voting Power */}
          <div className="flex items-center justify-center gap-[20px] rounded-[14px] bg-card p-[20px]">
            <img src="/assets/image/power.svg" alt="voting-power" className="size-[90px]" />
            <div className="flex flex-col justify-center gap-[10px]">
              <span className="text-[18px] font-semibold leading-none text-muted-foreground/80">
                Voting Power
              </span>
              <span className="text-[56px] font-extrabold leading-none text-foreground">5.43M</span>
            </div>
          </div>
        </div>

        <ReceivedDelegations />
        <DelegateAction address={address} open={delegateOpen} onOpenChange={setDelegateOpen} />
        <DelegateSelector open={open} onOpenChange={setOpen} onSelect={handleSelect} />
      </div>
    </WithConnect>
  );
};
