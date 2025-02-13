import { AddressAvatar } from '@/components/address-avatar';
import { AddressResolver } from '@/components/address-resolver';
import { useAccount } from 'wagmi';

interface PreviewPanelProps {
  title: string;
  html: string;
}

export const PreviewPanel = ({ title, html }: PreviewPanelProps) => {
  const { address } = useAccount();
  return (
    <div className="flex flex-col gap-[20px] rounded-[14px] bg-card p-[20px]">
      <header className="flex flex-col">
        <h2 className="text-[18px] font-semibold">{title || 'Untitled'}</h2>

        <div className="flex items-center gap-[5px]">
          <span>Proposed by </span>
          {address && (
            <AddressAvatar address={address} className="h-[24px] w-[24px] rounded-full" />
          )}
          {address && (
            <AddressResolver address={address} showShortAddress>
              {(address) => <span className="text-[14px] font-normal">{address}</span>}
            </AddressResolver>
          )}
        </div>
      </header>

      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};
