import React from 'react';
import {
  cookieStorage,
  createConfig,
  createStorage,
  http,
  WagmiProvider,
} from 'wagmi';
import {
  mainnet,
  polygon,
  bsc,
  sepolia,
  bscTestnet,
  polygonMumbai,
  polygonAmoy,
  base,
  baseSepolia,
} from 'wagmi/chains';
import {
  connectorsForWallets,
  darkTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { NETWORKS, WAGMI_METADATA } from './constants';
import '@rainbow-me/rainbowkit/styles.css';
import {
  walletConnectWallet,
  injectedWallet,
  metaMaskWallet,
  coinbaseWallet,
  rainbowWallet,
  bitgetWallet,
  argentWallet,
  imTokenWallet,
  coin98Wallet,
  trustWallet,
  okxWallet,
  phantomWallet,
  rabbyWallet,
  uniswapWallet,
  zerionWallet,
} from '@rainbow-me/rainbowkit/wallets';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet,
        walletConnectWallet,
        injectedWallet,
        coinbaseWallet,
      ],
    },
    {
      groupName: 'Other',
      wallets: [
        trustWallet,
        rainbowWallet,
        bitgetWallet,
        okxWallet,
        argentWallet,
        coin98Wallet,
        phantomWallet,
        rabbyWallet,
        uniswapWallet,
        zerionWallet,
        imTokenWallet,
      ],
    },
  ],
  {
    appName: process.env.NEXT_PUBLIC_WAGMI_METADATA_NAME!,
    appDescription: process.env.NEXT_PUBLIC_WAGMI_METADATA_DESCRIPTION,
    appUrl: process.env.NEXT_PUBLIC_WAGMI_METADATA_URL,
    appIcon: '/favicon.ico',
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  },
);

export const wagmiConfig = createConfig({
  chains: NETWORKS,
  connectors,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  cacheTime: 10000,
  transports: {
    [bsc.id]: http(
      `https://lb.drpc.org/ogrpc?network=bsc&dkey=${process.env.NEXT_PUBLIC_DRPC_TOKEN}`,
    ),
    [polygon.id]: http(
      `https://lb.drpc.org/ogrpc?network=polygon&dkey=${process.env.NEXT_PUBLIC_DRPC_TOKEN}`,
    ),
    [mainnet.id]: http(
      `https://lb.drpc.org/ogrpc?network=ethereum&dkey=${process.env.NEXT_PUBLIC_DRPC_TOKEN}`,
    ),
    [base.id]: http(
      `https://lb.drpc.org/ogrpc?network=base&dkey=${process.env.NEXT_PUBLIC_DRPC_TOKEN}`,
    ),
    [sepolia.id]: http(),
    [bscTestnet.id]: http(),
    [polygonMumbai.id]: http(),
    [polygonAmoy.id]: http(),
    [baseSepolia.id]: http(),
  },
});

export default function Test({ children }: { children: React.ReactNode }) {
  return (
    <RainbowKitProvider theme={darkTheme()}>{children}</RainbowKitProvider>
  );
}
