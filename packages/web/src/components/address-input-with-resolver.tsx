import { Input } from '@/components/ui/input';
import { AddressWithAvatar } from '@/components/address-with-avatar';
import { isAddress } from 'viem';
import { cn } from '@/lib/utils';
import type { Address } from 'viem';

interface AddressInputWithResolverProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
}

export function AddressInputWithResolver({
  value,
  onChange,
  placeholder,
  className,
  id
}: AddressInputWithResolverProps) {
  const isInvalidAddress = !!value && !isAddress(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handleClear = () => {
    onChange?.('');
  };

  return (
    <div className="relative space-y-1">
      {value && !isInvalidAddress ? (
        <div className="relative flex h-[40px] items-center rounded-[4px] border border-border/20 bg-card">
          <AddressWithAvatar address={value as Address} avatarSize={24} className="text-sm" />
          <button onClick={handleClear} className="absolute right-3 hover:opacity-70">
            <img src="/assets/image/proposal/close.svg" alt="clear" className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <Input
          id={id}
          value={value}
          onChange={handleChange}
          className={cn(
            'border-border/20 bg-card focus-visible:shadow-none focus-visible:ring-0',
            isInvalidAddress && 'border-red-500',
            className
          )}
          placeholder={placeholder}
        />
      )}
      {isInvalidAddress && <p className="text-[14px] text-red-500">Must be a valid eth address</p>}
    </div>
  );
}
