import { ethereumChain } from './chains/ethereum';
import { binanceChain } from './chains/binance';
import { polygonChain } from './chains/polygon';
import { Chain } from 'viem';

import { AppChain, NetworkType } from '@d4lb4eb/presale-ui-logic-sol/wagmi';
import { SupportedChainKey, SupportedTokenKey } from './interfaces';
import { baseChain } from './chains/base';

export const WALLET_CONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '';

export const WAGMI_METADATA = {
  name: process.env.NEXT_PUBLIC_WAGMI_METADATA_NAME || '',
  description: process.env.NEXT_PUBLIC_WAGMI_METADATA_DESCRIPTION || '',
  url: process.env.NEXT_PUBLIC_WAGMI_METADATA_URL || '',
  icons: process.env.NEXT_PUBLIC_WAGMI_METADATA_ICONS
    ? JSON.parse(process.env.NEXT_PUBLIC_WAGMI_METADATA_ICONS)
    : [],
};

export const MAX_ALLOWANCE = BigInt(
  '115792089237316195423570985008687907853269984665640564039457584007913129639935',
);

export const CHAINS: AppChain<SupportedChainKey, SupportedTokenKey>[] = [
  ethereumChain,
  binanceChain,
  polygonChain,
  baseChain,
] as const;

export const NETWORK_TYPE: NetworkType =
  (process.env.NEXT_PUBLIC_NETWORK_TYPE as NetworkType) || 'testnet';

export const NETWORKS: [Chain, ...Chain[]] = [
  CHAINS[0][NETWORK_TYPE],
  CHAINS[1][NETWORK_TYPE],
  CHAINS[2][NETWORK_TYPE],
  CHAINS[3][NETWORK_TYPE],
];
