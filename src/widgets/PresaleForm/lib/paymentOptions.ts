import cardIcon from '@/assets/card.svg?url';
import solIcon from '@/assets/sol.svg?url';
import tronIcon from '@/assets/tron.svg?url';
import { CHAINS, SupportedChainKey, SupportedTokenKey } from '@/entities/wagmi';

export type PaymentOptionId = SupportedTokenKey;

export interface IPaymentOption {
  id: PaymentOptionId;
  icon: string;
  title: SupportedTokenKey;
  decimals: number;
  precision: number;
  type: 'custom' | 'native';
}

type PaymentMethodId<Networks extends string = string> = Networks | 'onramp';

export interface IPaymentMethod<Networks extends string = string> {
  id: PaymentMethodId<Networks>;
  img: string;
  name: string;
  options: IPaymentOption[];
}

export const ONRAMP_METHOD: IPaymentMethod<SupportedChainKey> = {
  id: 'card',
  img: cardIcon,
  name: 'Bank Card',
  options: [
    {
      id: 'Card',
      icon: cardIcon,
      title: 'Bank Card' as 'Card',
      decimals: 2,
      precision: 2,
      type: 'custom',
    },
  ],
};

export const TRON_METHOD: IPaymentMethod<SupportedChainKey> = {
  id: 'tron',
  img: tronIcon,
  name: 'USDT-TRC20',
  options: [
    {
      id: 'USDT-TRC20',
      icon: tronIcon,
      title: 'USDT-TRC20',
      decimals: 2,
      precision: 2,
      type: 'custom',
    },
  ],
};

export const SOLANA_METHOD: IPaymentMethod<SupportedChainKey> = {
  id: 'sol',
  img: solIcon,
  name: 'Solana',
  options: [
    {
      id: 'SOL',
      icon: solIcon,
      title: 'Solana' as 'SOL',
      decimals: 18,
      precision: 4,
      type: 'native',
    },
  ],
};

function renameMethod(name: string) {
  if (name === 'BNB Smart Chain') {
    return 'BSC';
  }

  return name;
}

export const PAYMENT_METHODS: IPaymentMethod<SupportedChainKey>[] = [
  SOLANA_METHOD,
  ...CHAINS.map((chain) => {
    return {
      id: chain.key,
      img: chain.img,
      name: renameMethod(chain.name),
      options: chain.tokens.map((token) => {
        return {
          id: token.title,
          icon: token.icon,
          title: token.title,
          decimals: token.decimals,
          precision: token.precision,
          type: token.type,
        };
      }),
    };
  }),
  ONRAMP_METHOD,
  TRON_METHOD,
];
