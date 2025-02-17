import { Input } from '@/components/ui/input';
import { isAddress, isBytes, isHex } from 'viem';
import { useCallback, useState } from 'react';
import type { AbiItem } from 'viem';

interface CallDataInputFormProps {
  functionAbi?: AbiItem;
}

export function CallDataInputForm({ functionAbi }: CallDataInputFormProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    (name: string, type: string, value: string) => {
      setValues((prev) => ({ ...prev, [name]: value }));
      const error = validateInput(value, type);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [validateInput]
  );

  if (!functionAbi || !('inputs' in functionAbi)) {
    return null;
  }

  return (
    <div className="flex flex-col gap-[10px]">
      {functionAbi.inputs
        ?.filter((input) => !!input.name)
        ?.map((input) => (
          <div key={input.name} className="flex flex-col gap-[5px]">
            <div className="flex flex-row gap-[10px]">
              <span className="inline-flex h-[37px] w-[200px] items-center justify-center truncate rounded-[4px] border border-border bg-[#2E2E2E] px-[10px] text-[14px] text-foreground">
                {input.name}
              </span>
              <div className="flex flex-1 flex-col gap-[5px]">
                <Input
                  placeholder={`Input ${input.type}`}
                  className={`h-[37px] border-border bg-card focus-visible:shadow-none focus-visible:ring-0 ${
                    errors[input.name!] ? 'border-danger' : ''
                  }`}
                  value={values[input.name!] || ''}
                  onChange={(e) => handleInputChange(input.name!, input.type, e.target.value)}
                />
                {errors[input.name!] && (
                  <span className="text-[14px] text-danger">{errors[input.name!]}</span>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
