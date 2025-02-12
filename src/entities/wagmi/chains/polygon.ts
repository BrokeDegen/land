import { polygon, polygonAmoy } from 'wagmi/chains';

import polygonImg from '@/assets/polygon.svg?url';
import tetherIcon from '@/assets/usdt.svg?url';
import { AppChain } from '@d4lb4eb/presale-ui-logic-sol/wagmi';
import { SupportedChainKey, SupportedTokenKey } from '../interfaces';
import usdcIcon from '@/assets/usdc.svg?url';

export const polygonChain: AppChain<SupportedChainKey, SupportedTokenKey> = {
  key: 'polygon',
  name: 'Polygon' as string,
  nativeToken: 'matic',
  mainnet: polygon,
  testnet: polygonAmoy,
  img: polygonImg,
  presaleContract: {
    testnet: process.env.NEXT_PUBLIC_POLYGON_TESTNET as `0x${string}`,
    mainnet: process.env.NEXT_PUBLIC_POLYGON_MAINNET as `0x${string}`,
  },
  tokens: [
    {
      title: 'POL (ex-MATIC)',
      type: 'native',
      icon: polygonImg,
      precision: 4,
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
    testnet: 'https://mumbai.polygonscan.com/',
    mainnet: 'https://polygonscan.com/',
  },
};
