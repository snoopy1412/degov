import { Input } from '@/components/ui/input';
import { isAddress, isBytes, isHex } from 'viem';
import { useCallback } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export type Calldata = {
  name: string;
  type: string;
  value: string | string[];
  isArray: boolean;
};

interface CallDataInputFormProps {
  calldata: {
    value: Calldata[];
    error: (string | string[])[];
  };
  onChange: (calldata: { value: Calldata[]; error: (string | string[])[] }) => void;
}

export function CallDataInputForm({ calldata, onChange }: CallDataInputFormProps) {
  const validateInput = useCallback((value: string, type: string): string => {
    if (!value) return '';

    try {
      // Extract base type and size for number types
      const numMatch = type.match(/^(u?int)(\d+)?$/);
      const bytesMatch = type.match(/^bytes(\d+)?$/);

      switch (true) {
        case type === 'address':
          if (!isAddress(value)) {
            return 'Invalid address format';
          }
          break;

        case type === 'bool':
          if (value.toLowerCase() !== 'true' && value.toLowerCase() !== 'false') {
            return 'Must be true or false';
          }
          break;

        case type === 'string':
          // String is always valid
          break;

        case type === 'bytes':
          if (!isBytes(value) && !isHex(value)) {
            return 'Invalid bytes format';
          }
          break;

        case !!numMatch: {
          const [, numType, bits = '256'] = numMatch;
          const size = parseInt(bits);
          const num = BigInt(value);

          if (numType === 'uint') {
            if (num < 0n || num > 2n ** BigInt(size) - 1n) {
              return `Number out of uint${size} range`;
            }
          } else {
            // int
            const max = 2n ** BigInt(size - 1) - 1n;
            const min = -(2n ** BigInt(size - 1));
            if (num < min || num > max) {
              return `Number out of int${size} range`;
            }
          }
          break;
        }

        case !!bytesMatch: {
          const [, size] = bytesMatch;
          if (size) {
            // Fixed size bytes
            if (!isHex(value) || value.length !== parseInt(size) * 2 + 2) {
              return `Invalid bytes${size} format`;
            }
          }
          break;
        }

        default:
          return `Unsupported type: ${type}`;
      }
      return '';
    } catch {
      return `Invalid ${type} format`;
    }
  }, []);

  const handleInputChange = useCallback(
    (index: number, value: string) => {
      const newCalldata = { ...calldata };
      newCalldata.value[index].value = value;
      newCalldata.error[index] = '';
      onChange?.(newCalldata);
    },
    [calldata, onChange]
  );

  const handleInputBlur = useCallback(
    (index: number) => {
      const error = validateInput(
        calldata.value[index].value as string,
        calldata.value[index].type
      );
      calldata.error[index] = error;
      const newCalldata = { ...calldata };
      newCalldata.error[index] = error;
      onChange?.(newCalldata);
    },
    [calldata, validateInput, onChange]
  );

  const isArrayType = useCallback((type: string) => {
    return type.endsWith('[]');
  }, []);

  const getBaseType = useCallback((type: string) => {
    return type.replace('[]', '');
  }, []);

  const handleArrayInputChange = useCallback(
    (index: number, arrayIndex: number, value: string) => {
      const newCalldata = { ...calldata };
      if (!Array.isArray(newCalldata.value[index].value)) {
        newCalldata.value[index].value = [] as string[];
      }
      (newCalldata.value[index].value as string[])[arrayIndex] = value;

      if (!Array.isArray(newCalldata.error[index])) {
        newCalldata.error[index] = [];
      }
      (newCalldata.error[index] as string[])[arrayIndex] = '';

      onChange?.(newCalldata);
    },
    [calldata, onChange]
  );

  const handleArrayInputBlur = useCallback(
    (index: number, arrayIndex: number) => {
      const newCalldata = { ...calldata };
      const values = newCalldata.value[index].value as string[];
      const baseType = getBaseType(newCalldata.value[index].type);

      const error = validateInput(values[arrayIndex], baseType);

      if (!Array.isArray(newCalldata.error[index])) {
        newCalldata.error[index] = [];
      }
      (newCalldata.error[index] as string[])[arrayIndex] = error;

      onChange?.(newCalldata);
    },
    [calldata, validateInput, getBaseType, onChange]
  );

  const addArrayItem = useCallback(
    (index: number) => {
      const newCalldata = { ...calldata };
      if (!Array.isArray(newCalldata.value[index].value)) {
        newCalldata.value[index].value = [];
      }
      (newCalldata.value[index].value as string[]).push('');

      if (!Array.isArray(newCalldata.error[index])) {
        newCalldata.error[index] = [];
      }
      (newCalldata.error[index] as string[]).push('');

      onChange?.(newCalldata);
    },
    [calldata, onChange]
  );

  const removeArrayItem = useCallback(
    (index: number, arrayIndex: number) => {
      const newCalldata = { ...calldata };
      (newCalldata.value[index].value as string[]).splice(arrayIndex, 1);
      (newCalldata.error[index] as string[]).splice(arrayIndex, 1);
      onChange?.(newCalldata);
    },
    [calldata, onChange]
  );

  console.log('calldata', calldata);

  return (
    <div className="flex flex-col gap-[10px]">
      {calldata?.value?.map((input, index) => (
        <div key={input.name} className="flex flex-col gap-[5px]">
          <div className="flex flex-row gap-[10px]">
            <span className="inline-flex h-[37px] w-[200px] items-center justify-center truncate rounded-[4px] border border-border bg-[#2E2E2E] px-[10px] text-[14px] text-foreground">
              {input.name}
            </span>
            <div className="flex flex-1 flex-col gap-[10px]">
              {isArrayType(input.type) ? (
                <div className="flex flex-col gap-[10px]">
                  {Array.isArray(input.value) &&
                    input.value.map((arrayValue, arrayIndex) => (
                      <div key={arrayIndex} className="flex flex-col gap-[10px]">
                        <div className="flex flex-row items-center justify-between gap-[20px]">
                          <Input
                            placeholder={`${getBaseType(input.type)}[${arrayIndex}]`}
                            className={`h-[37px] border-border bg-card focus-visible:shadow-none focus-visible:ring-0 ${
                              Array.isArray(calldata?.error[index]) &&
                              calldata?.error[index][arrayIndex]
                                ? 'border-danger'
                                : ''
                            }`}
                            value={arrayValue}
                            onChange={(e) =>
                              handleArrayInputChange(index, arrayIndex, e.target.value)
                            }
                            onBlur={() => handleArrayInputBlur(index, arrayIndex)}
                          />
                          <Trash2
                            className="h-[18px] w-[18px] cursor-pointer transition-opacity hover:opacity-80"
                            onClick={() => removeArrayItem(index, arrayIndex)}
                          />
                        </div>
                        {Array.isArray(calldata?.error[index]) &&
                          calldata?.error[index][arrayIndex] && (
                            <span className="text-[14px] text-danger">
                              {calldata?.error[index][arrayIndex]}
                            </span>
                          )}
                      </div>
                    ))}

                  <button
                    className="flex h-[37px] w-[100px] items-center justify-center rounded-[4px] border border-border text-[14px]"
                    onClick={() => addArrayItem(index)}
                  >
                    <Plus className="h-[18px] w-[18px]" />
                    Add Item
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-[10px]">
                  <Input
                    placeholder={`${input.type}`}
                    className={`h-[37px] border-border bg-card focus-visible:shadow-none focus-visible:ring-0 ${
                      calldata?.error[index] ? 'border-danger' : ''
                    }`}
                    value={input.value || ''}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onBlur={() => handleInputBlur(index)}
                  />
                  {!Array.isArray(calldata?.error[index]) && calldata?.error[index] && (
                    <span className="text-[14px] text-danger">{calldata?.error[index]}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
