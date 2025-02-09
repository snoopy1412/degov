import type { TokenDetails } from '@/types/config';

interface AssetProps {
  asset: TokenDetails;
  explorer: string;
}
export const Asset = ({ asset, explorer }: AssetProps) => {
  return (
    <div className="flex items-center gap-[10px]">
      <img src={asset.logo} alt={asset.symbol} className="h-[30px] w-[30px] rounded-full" />
      <span className="text-[14px] capitalize text-foreground">{asset.symbol}</span>
      <a
        className="text-[14px] text-foreground transition-opacity hover:opacity-80"
        href={`${explorer}/token/${asset.contract}`}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src="/assets/image/external-link.svg"
          alt="external-link"
          className="h-[16px] w-[16px]"
        />
      </a>
    </div>
  );
};
