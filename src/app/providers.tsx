'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { BASE_URL } from '@d4lb4eb/presale-ui-logic-sol/presale';
import RainbowProvider, { wagmiConfig } from '@/entities/wagmi/lib';
import { WagmiProvider } from 'wagmi';

function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  BASE_URL.value = process.env.NEXT_PUBLIC_API_URL || '';

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowProvider>{children}</RainbowProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Providers;
