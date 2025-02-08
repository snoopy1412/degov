import { blo } from 'blo';
import { useState, useEffect } from 'react';
import type { Address } from 'viem';

interface AddressAvatarProps {
  address: Address;
  size?: number;
  className?: string;
}

export const AddressAvatar = ({ address, size = 40, className }: AddressAvatarProps) => {
  const [indexedAvatarUrl, setIndexedAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchAvatar = async () => {
      try {
        const indexedAvatar = await fetchAvatarFromIndex(address);
        if (indexedAvatar && mounted) {
          setIndexedAvatarUrl(indexedAvatar);
        }
      } catch (error) {
        console.error('Error fetching avatar:', error);
      }
    };

    fetchAvatar();

    return () => {
      mounted = false;
    };
  }, [address]);

  const avatarUrl = indexedAvatarUrl || blo(address as `0x${string}`);

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
