import { Button } from '@/components/ui/button';
import type { ProposalActionType } from '@/config/proposals';
import type { Address } from 'viem';
import { Input } from '@/components/ui/input';
import { useCallback } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { CallDataInputForm } from './calldata-input-form';
import { FileUploader } from '@/components/file-uploader';
export type CustomContentType = {
  target: Address;
  abi: string;
  method: string;
};

interface CustomPanelProps {
  index: number;
  content?: CustomContentType;
  onChange: (content: CustomContentType) => void;
  onReplace: (type: Omit<ProposalActionType, 'add'>, index: number) => void;
  onRemove: (index: number) => void;
}

export const CustomPanel = ({ index, content, onChange, onRemove }: CustomPanelProps) => {
  const handleChange = useCallback(
    ({ key, value }: { key: keyof CustomContentType; value: string }) => {
      onChange({
        target: '' as Address,
        abi: '',
        method: '',
        ...(content || {}),
        [key]: value as Address | string
      });
    },
    [onChange, content]
  );
  return (
    <div className="flex flex-col gap-[20px] rounded-[14px] bg-card p-[20px]">
      <header className="flex items-center justify-between">
        <h4 className="text-[18px] font-semibold">Action #{index}</h4>
        <Button
          className="h-[30px] gap-[5px] rounded-[100px] border border-border/20 bg-card"
          variant="outline"
          onClick={() => onRemove(index)}
        >
          <img src="/assets/image/proposal/close.svg" alt="plus" className="h-[16px] w-[16px]" />
          <span>Remove action</span>
        </Button>
      </header>
      <div className="mx-auto flex w-full flex-col gap-[20px]">
        <div className="flex flex-col gap-[10px]">
          <label className="text-[14px] text-foreground" htmlFor="target">
            Target contract address
          </label>
          <Input
            id="target"
            value={content?.target}
            onChange={(e) => handleChange({ key: 'target', value: e.target.value })}
            placeholder="Enter the target address..."
            className="border-border/20 bg-card focus-visible:shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center gap-[10px] text-[14px] text-foreground">
            <svg className="h-5 w-5 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L1 21h22L12 2zm0 3.45l8.27 14.3H3.73L12 5.45zm-1.5 9.5h3v3h-3zm0-6h3v4.5h-3z" />
            </svg>
            Contract not verified on Etherscan. Select an ABl or import a JSON file containing your
            ABl
          </div>
        </div>
        {/* Use the imported ABl or upload yours */}
        <div className="flex flex-col gap-[10px]">
          <label className="text-[14px] text-foreground" htmlFor="abi">
            Use the imported ABl or upload yours
          </label>
          <Select>
            <SelectTrigger className="border-border/20 bg-card">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent className="border-border/20 bg-card">
              <SelectItem value="erc20">ERC-20</SelectItem>
              <SelectItem value="erc721">ERC-721</SelectItem>
              <SelectItem value="erc721-auto">ERC-721 (Auto Increment Ids)</SelectItem>
              <SelectItem value="erc1155">ERC-1155</SelectItem>
              <SelectItem value="oz-governor">OZ Governor</SelectItem>
              <SelectItem value="ownable">Ownable</SelectItem>
              <SelectItem value="roles">Roles</SelectItem>
              <SelectItem value="pausable">Pausable</SelectItem>
              <SelectItem value="iavatar">IAvatar (Gnosis Safe)</SelectItem>
              <SelectItem value="gnosis-safe-l2">GnosisSafeL2</SelectItem>
              <SelectItem value="uups">Upgradeability (UUPS)</SelectItem>
              <SelectItem value="sudoswap">sudoswap: Pair Factory</SelectItem>
              <SelectItem value="upload">Upload an ABI</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <FileUploader />

        <div className="flex flex-col gap-[10px]">
          <label className="text-[14px] text-foreground" htmlFor="abi">
            Contract method
          </label>
          <Select>
            <SelectTrigger className="border-border/20 bg-card text-foreground/50">
              <SelectValue placeholder="Select the contract method..." />
            </SelectTrigger>
            <SelectContent className="border-border/20 bg-card">
              <SelectItem value="approve">approve</SelectItem>
              <SelectItem value="burn">burn</SelectItem>
              <SelectItem value="burnFrom">burnFrom</SelectItem>
              <SelectItem value="decreaseAllowance">decreaseAllowance</SelectItem>
              <SelectItem value="delegate">delegate</SelectItem>
              <SelectItem value="delegateBySig">delegateBySig</SelectItem>
              <SelectItem value="flashLoan">flashLoan</SelectItem>
              <SelectItem value="increaseAllowance">increaseAllowance</SelectItem>
              <SelectItem value="mint">mint</SelectItem>
              <SelectItem value="pause">pause</SelectItem>
              <SelectItem value="permit">permit</SelectItem>
              <SelectItem value="renounceOwnership">renounceOwnership</SelectItem>
              <SelectItem value="snapshot">snapshot</SelectItem>
              <SelectItem value="transfer">transfer</SelectItem>
              <SelectItem value="transferFrom">transferFrom</SelectItem>
              <SelectItem value="transferOwnership">transferOwnership</SelectItem>
              <SelectItem value="unpause">unpause</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-[10px]">
          <h4 className="text-[18px] font-semibold text-foreground">Calldatas</h4>
          <label className="text-[14px] text-foreground" htmlFor="abi">
            The data for the function arguments you wish to send when the action executes
          </label>
          <CallDataInputForm />
        </div>
      </div>
    </div>
  );
};
