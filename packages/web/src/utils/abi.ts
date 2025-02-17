import { createPublicClient, type Abi, type Address } from 'viem';

// Add these types
type AbiParameter = {
  name: string;
  type: string;
  indexed?: boolean;
  components?: AbiParameter[];
  internalType?: string;
};

type AbiFunctionItem = {
  type: 'function';
  name: string;
  inputs: AbiParameter[];
  outputs: AbiParameter[];
  stateMutability: 'pure' | 'view' | 'nonpayable' | 'payable';
};

type AbiEventItem = {
  type: 'event';
  name: string;
  inputs: AbiParameter[];
  anonymous?: boolean;
};

export type AbiItem = AbiFunctionItem | AbiEventItem;

// Add this validation function
export const isValidAbi = (json: unknown): json is Abi => {
  if (!Array.isArray(json)) {
    return false;
  }

  return json.every((item) => {
    // Check basic structure
    if (!item || typeof item !== 'object' || !('type' in item) || !('name' in item)) {
      return false;
    }

    // Validate function items
    if (item.type === 'function') {
      return (
        typeof item.name === 'string' &&
        Array.isArray(item.inputs) &&
        Array.isArray(item.outputs) &&
        typeof item.stateMutability === 'string' &&
        ['pure', 'view', 'nonpayable', 'payable'].includes(item.stateMutability) &&
        item.inputs.every(
          (input: unknown) =>
            typeof input === 'object' && input !== null && 'name' in input && 'type' in input
        ) &&
        item.outputs.every(
          (output: unknown) => typeof output === 'object' && output !== null && 'type' in output
        )
      );
    }

    // Validate event items
    if (item.type === 'event') {
      return (
        typeof item.name === 'string' &&
        Array.isArray(item.inputs) &&
        item.inputs.every(
          (input: unknown) =>
            typeof input === 'object' &&
            input !== null &&
            'name' in input &&
            'type' in input &&
            ('indexed' in input ? typeof input.indexed === 'boolean' : true)
        )
      );
    }

    return false;
  });
};

// export async function getContractAbi({ address, rpcUrl }: { address: Address; rpcUrl: string }) {
//   try {
//     const publicClient = createPublicClient({
//       chain: mainnet, // 或者你想要连接的其他网络 (如 goerli, sepolia 等)
//       transport: http() // 使用 HTTP RPC 传输
//     });
//     // 步骤 3.1: 判断是否为合约地址
//     const bytecode = await publicClient.getBytecode({
//       address: address
//     });

//     if (!bytecode || bytecode === '0x') {
//       return { isContract: false, abi: null, message: 'Not a contract address' };
//     }

//     const apiKey = 'YOUR_ETHERSCAN_API_KEY';
//     const etherscanApiUrl = `${rpcUrl}/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`;

//     const response = await fetch(etherscanApiUrl);
//     const data = await response.json();

//     if (data.status === '1' && data.message === 'OK') {
//       const abiJson = JSON.parse(data.result);
//       return {
//         isContract: true,
//         abi: abiJson,
//         message: 'ABI retrieved successfully from Etherscan'
//       };
//     } else {
//       return {
//         isContract: true,
//         abi: null,
//         message: `Failed to retrieve ABI from Etherscan: ${data.message}`
//       };
//     }
//   } catch (error: unknown) {
//     console.error('Error in getContractAbi:', error);
//     return {
//       isContract: false,
//       abi: null,
//       message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
//     };
//   }
// }
