import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import type { Address } from 'viem';

export type TokenInfo = {
  address: Address;
  symbol: string;
  decimals: number;
  icon: string;
  isNative: boolean;
};

export function TokenSelect({
  selectedToken,
  tokenList,
  onTokenChange
}: {
  selectedToken: TokenInfo | null;
  tokenList: TokenInfo[];
  onTokenChange: (token: TokenInfo) => void;
}) {
  const handleTokenChange = (value: string) => {
    const token = tokenList.find((token) => token.address === value);
    if (token) {
      onTokenChange(token);
    }
  };

  return (
    <Select value={selectedToken?.address} onValueChange={handleTokenChange}>
      <SelectTrigger className="w-[180px] rounded-[10px] border border-border bg-card p-[10px]">
        <SelectValue placeholder="Select a token" />
      </SelectTrigger>
      <SelectContent className="bg-card">
        <SelectGroup>
          {tokenList.map((token) => (
            <SelectItem key={token.address} value={token.address}>
              <div className="flex items-center gap-[10px]">
                <img src={token.icon} alt={token.symbol} className="h-[24px] w-[24px]" />
                <span className="truncate">{token.symbol}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
