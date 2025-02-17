import { base, baseSepolia } from 'wagmi/chains';
import baseIcon from '@/assets/base.svg?url';
import ethIcon from '@/assets/ethereum.svg?url';
import tetherIcon from '@/assets/usdt.svg?url';
import { AppChain } from '@d4lb4eb/presale-ui-logic-sol/wagmi';
import { SupportedChainKey, SupportedTokenKey } from '../interfaces';
import usdcIcon from '@/assets/usdc.svg?url';

export const baseChain: AppChain<SupportedChainKey, SupportedTokenKey> = {
  key: 'base',
  name: 'Base' as string,
  nativeToken: 'eth',
  mainnet: {
    ...base,
  },
  testnet: {
    ...baseSepolia,
  },
  img: baseIcon,
  presaleContract: {
    testnet: process.env.NEXT_PUBLIC_BASE_TESTNET as `0x${string}`,
    mainnet: process.env.NEXT_PUBLIC_BASE_MAINNET as `0x${string}`,
  },
  tokens: [
    {
      title: 'ETH',
      type: 'native',
      icon: ethIcon,
      precision: 5,
      decimals: 18,
    },
    {
      title: 'USDT',
      type: 'custom',
      icon: tetherIcon,
      precision: 1,
      decimals: 6,
    },
    {
      title: 'USDC',
      type: 'custom',
      icon: usdcIcon,
      precision: 1,
      decimals: 6,
    },
  ],
  explorer: {
    testnet: 'https://sepolia-explorer.base.org/',
    mainnet: 'https://base.blockscout.com/',
  },
};
