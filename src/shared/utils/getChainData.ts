import { ChainName } from '@d4lb4eb/presale-ui-logic-sol/presale';
import { NetworkType } from '@d4lb4eb/presale-ui-logic-sol/wagmi';

import ethIcon from '@/assets/ethereum.svg?url';
import polygonImg from '@/assets/polygon.svg?url';
import binanceImg from '@/assets/binanceIcon.svg?url';
import tetherIcon from '@/assets/usdt.svg?url';
import usdbIcon from '@/assets/usdb.svg?url';
import usdcIcon from '@/assets/usdc.svg?url';
import solIcon from '@/assets/sol.svg?url';
import tronIcon from '@/assets/tron.svg?url';
import { CHAINS } from '@/entities/wagmi';

type AssetIcons = {
  [key: string]: string;
};

export const getChainIcon = (chainName: ChainName | 'solana') => {
  if (chainName === 'solana') {
    return solIcon;
  }
  return CHAINS.find((item) => item.key === chainName)?.img || '';
};

export const assetIcons: AssetIcons = {
  USDT: tetherIcon,
  USDC: usdcIcon,
  MATIC: polygonImg,
  BNB: binanceImg,
  ETH: ethIcon,
  USDB: usdbIcon,
  SOL: solIcon,
  'USDT-TRC20': tronIcon,
};

export const chainNamesMap = {
  polygon: 'Polygon',
  bsc: 'BSC',
  ethereum: 'Ethereum',
  blast: 'Blast',
  sol: 'SOL',
  base: 'Base',
};

export const getChainExplorerLink = (
  chainName: ChainName | 'solana',
  networkType: NetworkType,
  txHash: string,
) => {
  const solCluster =
    process.env.NEXT_PUBLIC_NETWORK_TYPE === 'testnet' ? '?cluster=devnet' : '';

  const link =
    chainName === 'solana'
      ? `https://solscan.io/tx/${txHash}${solCluster}`
      : `${
          CHAINS.find((item) => item.key === chainName)?.explorer[
            networkType
          ] || ''
        }tx/${txHash}`;

  return link;
};

export const getUIChainName = (chain: ChainName) => {
  return chainNamesMap[chain] || '';
};
