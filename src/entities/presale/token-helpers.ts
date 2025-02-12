import { CustomCoinType } from '../wagmi';
import { SupportedTokenKey } from '../wagmi';

export const isCustomToken = (
  coin?: SupportedTokenKey,
): coin is CustomCoinType => ['USDT', 'USDC', 'USDB'].includes(coin || '');

export function getDepositFunctionName(token: SupportedTokenKey) {
  switch (token) {
    case 'USDT':
      return 'depositUSDT';
    case 'USDC':
      return 'depositUSDC';
    case 'USDB':
      return 'depositUSDB';
  }

  // Native coins
  return 'depositCoin';
}

export function getTokenViewFunctionName(
  token: SupportedTokenKey,
): 'usdtToken' | 'usdcToken' | 'usdbToken' | undefined {
  switch (token) {
    case 'USDT':
      return 'usdtToken';
    case 'USDC':
      return 'usdcToken';
    case 'USDB':
      return 'usdbToken';
  }

  return undefined;
}
