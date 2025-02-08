import { blo } from 'blo';
import { useState, useEffect } from 'react';
import type { Address } from 'viem';

interface AddressAvatarProps {
  address: Address;
  size?: number;
  className?: string;
}

export const AddressAvatar = ({ address, size = 40, className }: AddressAvatarProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string>('');

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const indexedAvatar = await fetchAvatarFromIndex(address);
        if (indexedAvatar) {
          setAvatarUrl(indexedAvatar);
        } else {
          const bloAvatar = blo(address as `0x${string}`);
          setAvatarUrl(bloAvatar);
        }
      } catch (error) {
        console.error('Error fetching avatar:', error);
        const bloAvatar = blo(address as `0x${string}`);
        setAvatarUrl(bloAvatar);
      }
    };

    fetchAvatar();
  }, [address]);

  return (
    <img
      src={avatarUrl}
      alt={`Avatar for ${address}`}
      width={size}
      height={size}
      className={className}
    />
  );
};

// fake
const fetchAvatarFromIndex = async (address: Address): Promise<string | null> => {
  console.log('fetchAvatarFromIndex', address);
  return null;
};
