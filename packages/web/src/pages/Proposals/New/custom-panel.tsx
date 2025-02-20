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
import { Calldata, CallDataInputForm } from './calldata-input-form';
import { FileUploader } from '@/components/file-uploader';
import { abiList } from '@/config/contract';
import { isValidAbi } from '@/utils/abi';
import { isAddress, type Abi, type AbiItem } from 'viem';
import { useBytecode } from 'wagmi';
import { useConfig } from '@/hooks/useConfig';
import { Skeleton } from '@/components/ui/skeleton';
import type { CustomContentType } from './type';
import { cn } from '@/lib/utils';

interface CustomPanelProps {
  visible: boolean;
  index: number;
  content?: CustomContentType;
  onChange: (content: CustomContentType) => void;
  onRemove: (index: number) => void;
}

export const CustomPanel = ({ index, visible, content, onChange, onRemove }: CustomPanelProps) => {
  const daoConfig = useConfig();
  const [abiJson, setAbiJson] = useState<AbiItem[] | null>(null);

  const { data: bytecode, isFetching: isLoadingBytecode } = useBytecode({
    address: content?.target?.value,
    query: {
      enabled: !!content?.target?.value && isAddress(content?.target?.value)
    }
  });

  const handleChangeAbi = useCallback(
    (value: string) => {
      if (value && value !== 'upload') {
        const abi = abiList.find((abi) => abi.name === value)?.abi as Abi;
        if (isValidAbi(abi)) {
          const abiJson = abi?.filter(
            (item) =>
              item.type === 'function' &&
              (item.stateMutability === 'nonpayable' || item.stateMutability === 'payable')
          );
          setAbiJson(abiJson);
        }
      }
      onChange({
        ...(content as CustomContentType),
        abiType: {
          value,
          error: ''
        }
      });
    },
    [onChange, content]
  );

  const handleUploadAbi = useCallback((jsonContent: AbiItem[]) => {
    if (isValidAbi(jsonContent)) {
      setAbiJson(
        jsonContent?.filter(
          (item) =>
            item.type === 'function' &&
            (item.stateMutability === 'nonpayable' || item.stateMutability === 'payable')
        )
      );
    }
  }, []);

  const handleChange = useCallback(
    ({ key, value }: { key: keyof CustomContentType; value: string | Calldata[] }) => {
      onChange({
        ...(content as CustomContentType),
        [key]: {
          value,
          error: key === 'calldata' ? new Array(value?.length).fill('') : ''
        }
      });
    },
    [onChange, content]
  );

  const isPayable = useMemo(() => {
    const method = abiJson?.find(
      (item) => item.type === 'function' && item.name === content?.abiMethod?.value
    );
    return method?.type === 'function' && method?.stateMutability === 'payable';
  }, [abiJson, content?.abiMethod?.value]);

  const handleChangeMethodName = useCallback(
    (value: string) => {
      const method = abiJson?.find((item) => item.type === 'function' && item.name === value);
      if (method) {
        const calldata =
          method?.type === 'function'
            ? method?.inputs.map((input) => ({
                name: input.name,
                type: input.type,
                value: ''
              }))
            : [];
        onChange({
          ...(content as CustomContentType),
          calldata: {
            value: calldata as Calldata[],
            error: new Array(calldata?.length).fill('')
          },
          abiMethod: {
            value,
            error: ''
          }
        });
      }
    },
    [abiJson, onChange, content]
  );

  const handleChangeCalldata = useCallback(
    (calldata: { value: Calldata[]; error: (string | string[])[] }) => {
      onChange({
        ...(content as CustomContentType),
        calldata: {
          value: calldata.value,
          error: calldata.error.flat()
        }
      });
    },
    [onChange, content]
  );

  return (
    <div
      className={cn(
        'flex flex-col gap-[20px] rounded-[14px] bg-card p-[20px] pb-[50px]',
        !visible && 'hidden'
      )}
    >
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
            value={content?.target?.value || ''}
            onChange={(e) => handleChange({ key: 'target', value: e.target.value })}
            placeholder="Enter the target address..."
            className="border-border/20 bg-card focus-visible:shadow-none focus-visible:ring-0"
          />
        </div>

        {isLoadingBytecode && (
          <div className="flex flex-col gap-[20px]">
            <Skeleton className="h-[37px]" />
            <Skeleton className="h-[37px]" />
            <Skeleton className="h-[37px]" />
          </div>
        )}

        {bytecode && bytecode !== '0x' && (
          <>
            <div className="flex flex-col gap-[10px]">
              <label className="text-[14px] text-foreground">
                Use the imported ABl or upload yours
              </label>
              <Select value={content?.abiType?.value} onValueChange={handleChangeAbi}>
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
            {content?.abiType?.value === 'upload' && <FileUploader onUpload={handleUploadAbi} />}
            {abiJson && (
              <div className="flex flex-col gap-[10px]">
                <label className="text-[14px] text-foreground">Contract method</label>
                <Select value={content?.abiMethod?.value} onValueChange={handleChangeMethodName}>
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
            {!!content?.calldata?.value?.length && (
              <div className="flex flex-col gap-[10px]">
                <h4 className="text-[18px] font-semibold text-foreground">Calldatas</h4>
                <label className="text-[14px] text-foreground" htmlFor="abi">
                  The data for the function arguments you wish to send when the action executes
                </label>
                <CallDataInputForm calldata={content?.calldata} onChange={handleChangeCalldata} />
              </div>
            )}

            {isPayable && (
              <div className="flex flex-col gap-[10px]">
                <h4 className="text-[18px] font-semibold text-foreground">Value</h4>
                <label className="text-[14px] text-foreground">
                  The amount of {daoConfig?.tokenInfo?.symbol} you wish to send the target address (
                  External Account or Smart Contract)
                </label>
                <div className="flex flex-row gap-[10px]">
                  <span className="inline-flex h-[37px] w-[200px] items-center justify-center truncate rounded-[4px] border border-border bg-[#2E2E2E] px-[10px] text-[14px] text-foreground">
                    {daoConfig?.tokenInfo?.symbol}
                  </span>
                  <Input
                    placeholder={`${daoConfig?.tokenInfo?.symbol} amount`}
                    className="h-[37px] border-border bg-card focus-visible:shadow-none focus-visible:ring-0"
                    value={content?.value?.value}
                    onChange={(e) => handleChange({ key: 'value', value: e.target.value })}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
