import { computed, signal } from '@preact/signals-react';
import {
  BASE_URL,
  getNativeTokenPrice,
} from '@d4lb4eb/presale-ui-logic-sol/presale';
import { TokenPriceResponse } from '@d4lb4eb/presale-ui-logic-sol/presale';

// Cache inital rates to have them as a fallback
const ethPrice = signal<TokenPriceResponse>({
  decimals: 18,
  latestAnswer: 0,
});
const bnbPrice = signal<TokenPriceResponse>({
  decimals: 18,
  latestAnswer: 0,
});
const maticPrice = signal<TokenPriceResponse>({
  decimals: 18,
  latestAnswer: 0,
});

const btcPrice = signal<TokenPriceResponse>({
  decimals: 18,
  latestAnswer: 0,
});

const solPrice = signal<TokenPriceResponse>({
  decimals: 18,
  latestAnswer: 0,
});

export const tokenPrices = computed(() => {
  return {
    eth: ethPrice.value,
    bnb: bnbPrice.value,
    matic: maticPrice.value,
    btc: btcPrice.value,
    sol: solPrice.value,
  };
});

function fetchAllRates() {
  BASE_URL.value = process.env.NEXT_PUBLIC_API_URL || '';

  Promise.all([
    getNativeTokenPrice('eth').then((res) => (ethPrice.value = res.data)),
    getNativeTokenPrice('bnb').then((res) => (bnbPrice.value = res.data)),
    getNativeTokenPrice('sol').then((res) => (bnbPrice.value = res.data)),
    getNativeTokenPrice('matic').then((res) => (bnbPrice.value = res.data)),
  ]);
}

// fetch once
fetchAllRates();
