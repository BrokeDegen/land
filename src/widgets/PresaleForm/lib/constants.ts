import { SupportedTokenKey } from '../../../entities/wagmi';

export function replaceComma(value: string): string {
  return value.replace(',', '.');
}

export function isValidAmountInput(value: string): boolean {
  if (!/^[0-9]*\.?[0-9]*$/.test(value)) {
    return false;
  }
  return true;
}

export function formatCurrency(
  amount: number | string,
  currency: string,
): string {
  return `${currency === 'Card' ? '$' : ''}${amount} ${
    currency !== 'Card' ? currency : ''
  }`;
}

/*
Для каждой валюты лимиты свои, эквивалент $1. 
Для eth - 0.0003, для matic - 1, для bnb - 0.003
Для usdt (всех) - 1
Для онрампа - $10
*/
const MIN_AMOUNTS: Record<
  SupportedTokenKey | 'USD' | 'Bank Card' | 'Solana',
  number
> = {
  ETH: 0.0003,
  'POL (ex-MATIC)': process.env.NODE_ENV === 'development' ? 0 : 1,
  BNB: 0.003,
  USDT: process.env.NODE_ENV === 'development' ? 0 : 1,
  USDC: 1,
  USDB: process.env.NODE_ENV === 'development' ? 0 : 1,
  USD: 11,
  Card: 11,
  'Bank Card': 11,
  BTC: 0.0005,
  Solana: 0.01,
  SOL: 0.01,
  'USDT-TRC20': 10,
};

export function getMinAmount(token: SupportedTokenKey) {
  return MIN_AMOUNTS[token] || 0;
}
