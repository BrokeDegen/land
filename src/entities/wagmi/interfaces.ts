export type SupportedChainKey =
  | 'ethereum'
  | 'bsc'
  | 'polygon'
  | 'card'
  | 'tron'
  | 'base'
  | 'sol';

export type CustomCoinType = 'USDT' | 'USDC' | 'USDB';
export type NativeCoinType = 'ETH' | 'POL (ex-MATIC)' | 'BNB';
export type CryptoProcessingType = 'BTC' | 'SOL' | 'USDT-TRC20' | 'USD';

export type SupportedTokenKey =
  | CustomCoinType
  | NativeCoinType
  | CryptoProcessingType
  | 'Card'
  | 'USD';

export enum SupportedTokenKeyDescription {
  USDT = 'Tether USD',
  USDC = 'USD Coin',
  USDB = 'USDB',
  ETH = 'Ethereum',
  MATIC = 'Polygon',
  BNB = 'BNB',
  Card = 'USD',
  BTC = 'Bitcoin',
  SOL = 'Solana',
  USD = 'Bank Card',
  'USDT-TRC20' = 'Tron',
}
