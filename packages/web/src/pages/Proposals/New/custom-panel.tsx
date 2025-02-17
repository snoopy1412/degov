import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCallback, useMemo, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { CallDataInputForm } from './calldata-input-form';
import { FileUploader } from '@/components/file-uploader';
import { abiList } from '@/config/contract';
import { isValidAbi } from '@/utils/abi';
import type { Abi, AbiItem, Address } from 'viem';
import type { ProposalActionType } from '@/config/proposals';
import { useBytecode } from 'wagmi';

export type CustomContentType = {
  target: Address;
  abi: string;
  method: string;
};
// 0x393cEb2013494A6129dd049Be1A88c93337Aebfe

interface CustomPanelProps {
  index: number;
  content?: CustomContentType;
  onChange: (content: CustomContentType) => void;
  onReplace: (type: Omit<ProposalActionType, 'add'>, index: number) => void;
  onRemove: (index: number) => void;
}

export const CustomPanel = ({ index, content, onChange, onRemove }: CustomPanelProps) => {
  const [abiKey, setAbiKey] = useState<string>('');
  const [abiJson, setAbiJson] = useState<AbiItem[] | null>(null);
  const [methodName, setMethodName] = useState<string>('');

  const handleChangeAbi = useCallback((value: string) => {
    setAbiKey(value);
    if (value && value !== 'upload') {
      const abiJson = abiList.find((abi) => abi.name === value)?.abi as Abi;
      if (isValidAbi(abiJson)) {
        setAbiJson(
          abiJson?.filter(
            (item) => item.type === 'function' && item.stateMutability === 'nonpayable'
          )
        );
      }
    }
  }, []);

  const handleUploadAbi = useCallback((jsonContent: AbiItem[]) => {
    if (isValidAbi(jsonContent)) {
      setAbiJson(
        jsonContent?.filter(
          (item) => item.type === 'function' && item.stateMutability === 'nonpayable'
        )
      );
    }
  }, []);

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
  // const result = useBytecode({
  //   address: '0x57Aa601A0377f5AB313C5A955ee874f5D495fC92'
  // });

  // console.log(result);

  const method = useMemo(() => {
    return abiJson?.find((item) => item.type === 'function' && item.name === methodName);
  }, [abiJson, methodName]);

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
        </div>
        <div className="flex flex-col gap-[10px]">
          <label className="text-[14px] text-foreground">
            Use the imported ABl or upload yours
          </label>
          <Select value={abiKey} onValueChange={handleChangeAbi}>
            <SelectTrigger className="border-border/20 bg-card">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent className="border-border/20 bg-card">
              {abiList.map((abi) => (
                <SelectItem key={abi.name} value={abi.name}>
                  {abi.label}
                </SelectItem>
              ))}
              <SelectItem value="upload">Upload an ABI</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {abiKey === 'upload' && <FileUploader onUpload={handleUploadAbi} />}

        {abiJson && (
          <div className="flex flex-col gap-[10px]">
            <label className="text-[14px] text-foreground">Contract method</label>
            <Select value={methodName} onValueChange={setMethodName}>
              <SelectTrigger className="border-border/20 bg-card text-foreground/50">
                <SelectValue placeholder="Select the contract method..." />
              </SelectTrigger>
              <SelectContent className="border-border/20 bg-card">
                {abiJson?.map(
                  (item) =>
                    item?.type === 'function' && (
                      <SelectItem key={item?.name} value={item?.name}>
                        {item?.name}
                      </SelectItem>
                    )
                )}
              </SelectContent>
            </Select>
          </div>
        )}
        {methodName && (
          <div className="flex flex-col gap-[10px]">
            <h4 className="text-[18px] font-semibold text-foreground">Calldatas</h4>
            <label className="text-[14px] text-foreground" htmlFor="abi">
              The data for the function arguments you wish to send when the action executes
            </label>
            <CallDataInputForm functionAbi={method} />
          </div>
        )}
      </div>
    </div>
  );
};
