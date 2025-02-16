import { AddressWithAvatar } from '@/components/address-with-avatar';
import { useAccount } from 'wagmi';
import { ActionsPanel } from './action-panel';

interface PreviewPanelProps {
  title: string;
  html: string;
}
const actions = [
  {
    type: 'custom',
    address: '0x3d6d...8ED5',
    details: 'burn',
    params: [
      { name: 'amount', value: '12' },
      { name: 'from', value: '0x3d6d656c1bf92f7028Ce4C352563E1C363C58ED5' }
    ],
    signature: 'burn(uint256)',
    calldata: {
      uint256: '12'
    },
    target: '0x3d6d656c1bf92f7028Ce4C352563E1C363C58ED5',
    value: '0'
  },
  {
    type: 'transfer',
    address: '0x3d6d...8ED5',
    details: 'transfer',
    amount: '12',
    recipient: '0x3d6d656c1bf92f7028Ce4C352563E1C363C58ED5'
  }
];

export const PreviewPanel = ({ title, html }: PreviewPanelProps) => {
  const { address } = useAccount();
  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex flex-col gap-[20px] rounded-[14px] bg-card p-[20px]">
        <header className="flex flex-col">
          <h2 className="text-[18px] font-semibold">{title || 'Untitled'}</h2>

          <div className="flex items-center gap-[5px]">
            <span>Proposed by </span>
            {address && (
              <AddressWithAvatar address={address} avatarSize={24} className="gap-[5px]" />
            )}
          </div>
        </header>
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <div className="flex flex-col gap-[20px] rounded-[14px] bg-card p-[20px]">
        <ActionsPanel actions={actions} />
      </div>
    </div>
  );
};
