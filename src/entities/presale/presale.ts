import {
  TOTAL_TOKEN_SUPPLY,
  TOTAL_USD_SUPPLY,
} from '@/widgets/PresaleForm/lib/presale';
import { usePresaleProgress as _usePresaleProgress } from '@d4lb4eb/presale-ui-logic-sol/entities';

export const usePresaleProgress = () => {
  return _usePresaleProgress({
    totalSupply: TOTAL_TOKEN_SUPPLY,
    totalSupplyUSD: TOTAL_USD_SUPPLY,
  });
};
