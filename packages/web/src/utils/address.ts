import type { Address } from 'viem';

/**
 * Convert an address to a short address
 * @param address - The address to convert
 * @returns The short address
 */
export function formatShortAddress(address?: Address) {
  if (!address) return '';
  return address?.length > 16 ? `${address?.slice(0, 7)}...${address?.slice(-6)}` : address;
}
