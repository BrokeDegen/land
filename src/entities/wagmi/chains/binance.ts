import { bsc, bscTestnet } from 'wagmi/chains';

import binanceImg from '@/assets/binanceIcon.svg?url';
import tetherIcon from '@/assets/usdt.svg?url';
import usdcIcon from '@/assets/usdc.svg?url';
import { AppChain } from '@d4lb4eb/presale-ui-logic-sol/wagmi';
import { SupportedChainKey, SupportedTokenKey } from '../interfaces';

export const binanceChain: AppChain<SupportedChainKey, SupportedTokenKey> = {
  key: 'bsc',
  name: 'BNB Smart Chain' as string,
  nativeToken: 'bnb',
  mainnet: bsc,
  testnet: bscTestnet,
  img: binanceImg,
  presaleContract: {
    testnet: process.env.NEXT_PUBLIC_BNB_TESTNET as `0x${string}`,
    mainnet: process.env.NEXT_PUBLIC_BNB_MAINNET as `0x${string}`,
  },
  tokens: [
    {
      title: 'BNB',
      type: 'native',
      icon: binanceImg,
      precision: 6,
      decimals: 18,
    },
    {
      title: 'USDT',
      type: 'custom',
      icon: tetherIcon,
      precision: 1,
      decimals: 18,
    },
    {
      title: 'USDC',
      type: 'custom',
      icon: usdcIcon,
      precision: 1,
      decimals: 18,
    },
  ],
  explorer: {
    testnet: 'https://testnet.bscscan.com/',
    mainnet: 'https://bscscan.com/',
  },
};
