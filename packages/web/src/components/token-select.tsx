import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export function TokenSelect() {
  return (
    <Select defaultValue="eth">
      <SelectTrigger className="w-[180px] rounded-[10px] border border-border bg-card p-[10px]">
        <SelectValue placeholder="Select a token" />
      </SelectTrigger>
      <SelectContent className="bg-card">
        <SelectGroup>
          <SelectItem value="eth">
            <div className="flex items-center gap-[10px]">
              <img src="/example/eth.svg" alt="eth" className="h-[24px] w-[24px]" />
              <span className="truncate">ETH</span>
            </div>
          </SelectItem>
          <SelectItem value="eth2">
            <div className="flex items-center gap-[10px]">
              <img src="/example/eth.svg" alt="eth" className="h-[24px] w-[24px]" />
              <span className="truncate">ETH</span>
            </div>
          </SelectItem>
          <SelectItem value="eth3">
            <div className="flex items-center gap-[10px]">
              <img src="/example/eth.svg" alt="eth" className="h-[24px] w-[24px]" />
              <span className="truncate">ETH</span>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
