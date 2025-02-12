import { tokenPrices } from './model';
import { usePresaleStage } from '@d4lb4eb/presale-ui-logic-sol/entities';
import { usePresaleCalculator as usePackagePresaleCalculator } from '@d4lb4eb/presale-ui-logic-sol/calculator';
import {
  UsePresaleCalculatorProps,
  getPriceByStage as _getPriceByStage,
  getNextStagePrice as _getNextStagePrice,
} from '@d4lb4eb/presale-ui-logic-sol/calculator';
import { useCurrentNetwork } from '../wagmi';

export const CALCULATOR_DATA = {
  basePrice: 0.05,
  pricePerStage: {
    1: 0.01,
    2: 0.02,
    3: 0.03,
    4: 0.04,
    5: 0.05,
  },
  accomulatedStagesUsd: {
    1: 1000,
    2: 2000,
    3: 4000,
    4: 6000,
    5: 10000,
  },
};

export function usePresaleCalculator({ token }: UsePresaleCalculatorProps) {
  const { appChain: selectedChain } = useCurrentNetwork();
  const { stage } = usePresaleStage({ ...CALCULATOR_DATA });

  const {
    recalculateFromPay,
    recalculateFromReceive,
    payAmount,
    payAmountUSD,
    receiveAmount,
    tokenPrice,
  } = usePackagePresaleCalculator({
    token,
    stage,
    selectedChain,
    pricePerStage: CALCULATOR_DATA.pricePerStage,
    tokenPrices,
  });

  return {
    recalculateFromPay,
    recalculateFromReceive,
    payAmount,
    tokenPrice,
    payAmountUSD,
    receiveAmount,
  };
}
