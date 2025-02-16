import type { TokenDetails } from '@/types/config';

interface AssetProps {
  asset: TokenDetails;
  explorer: string;
}
export const Asset = ({ asset, explorer }: AssetProps) => {
  return (
    <a
      className="flex items-center gap-[10px] text-[14px] text-foreground transition-opacity hover:underline hover:opacity-80"
      href={`${explorer}/token/${asset.contract}`}
      target="_blank"
      rel="noreferrer"
    >
      <img src={asset.logo} alt={asset.symbol} className="h-[30px] w-[30px] rounded-full" />
      <span className="text-[14px] capitalize text-foreground">{asset.symbol}</span>
      <img
        src="/assets/image/external-link.svg"
        alt="external-link"
        className="h-[16px] w-[16px]"
      />
    </a>
  );
};
