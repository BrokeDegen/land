import { Abi, Address } from 'viem';

import {
  usePresaleContractAddress as _usePresaleContractAddress,
  useBuy as _useBuy,
  useTokenAddress as _useTokenAddress,
} from '@d4lb4eb/presale-ui-logic-sol/presale';
import {
  getDepositFunctionName,
  getTokenViewFunctionName,
  isCustomToken,
} from './token-helpers';
import { CHAINS, NETWORK_TYPE, SupportedTokenKey } from '../wagmi';

export const usePresaleContractAddress = (): Address =>
  _usePresaleContractAddress({
    chains: [...CHAINS],
    networkType: NETWORK_TYPE,
  });

export const useBuy = (
  {
    token,
    referrerAddress,
    abi,
  }: {
    token: SupportedTokenKey;
    referrerAddress?: Address | null;
    abi: Abi;
  },
  {
    onSuccess,
  }: {
    onSuccess?: (
      hash: `0x${string}`,
      variables: unknown,
      context: unknown,
    ) => void;
  } = {},
) => {
  const depositFunctionName = getDepositFunctionName(token);

  return _useBuy(
    {
      isCustomToken: isCustomToken(token),
      referrerAddress,
      abi,
      depositFunctionName: depositFunctionName,
      chains: [...CHAINS],
      networkType: NETWORK_TYPE,
    },
    {
      onSuccess,
    },
  );
};

export const useTokenAddress = (
  token: SupportedTokenKey,
  abi: Abi,
): Address | undefined => {
  const isCustom = isCustomToken(token);
  const functionName = isCustom ? getTokenViewFunctionName(token) : undefined;

  return _useTokenAddress({
    functionName,
    abi,
    chains: [...CHAINS],
    networkType: NETWORK_TYPE,
  });
};
