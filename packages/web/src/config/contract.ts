import erc20Abi from '@/assets/abi/erc20.json';
import { Abi } from 'viem';

export const abiList = [
  {
    name: 'erc20',
    abi: erc20Abi as Abi,
    label: 'ERC-20'
  }
];
