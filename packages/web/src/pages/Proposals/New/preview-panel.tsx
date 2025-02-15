import { AddressWithAvatar } from '@/components/address-with-avatar';
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
          {address && <AddressWithAvatar address={address} avatarSize={24} />}
        </div>
      </header>

      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};
