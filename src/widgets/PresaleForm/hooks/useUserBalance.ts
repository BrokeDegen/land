import { useState, useEffect } from 'react';
import { useBalance } from 'wagmi';
import { useTokenAddress } from '@/entities/presale';
import { PresaleABI } from '@/entities/presale';
import { Address } from 'viem';
import { IPaymentOption } from '../lib/paymentOptions';

export const useUserBalance = (
  paymentOption: IPaymentOption,
  address?: Address,
) => {
  const tokenAddress = useTokenAddress(paymentOption.id, PresaleABI);
  const [userBalance, setUserBalance] = useState<number | null>(null);
  const { data: evmUserBalance, refetch: refetchBalance } = useBalance({
    address,
    token: tokenAddress,
    query: { enabled: !!address },
  });

  useEffect(() => {
    if (evmUserBalance?.formatted) {
      setUserBalance(Number(evmUserBalance.formatted));
    }
  }, [evmUserBalance]);

  return { userBalance, refetchBalance, tokenAddress };
};
