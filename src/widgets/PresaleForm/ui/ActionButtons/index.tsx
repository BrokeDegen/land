import React from 'react';
import { Button } from '@/shared/ui/Button';
import { BonusPoints } from '../BonusPoints';
import { useTranslations } from 'next-intl';
import { IPaymentOption } from '../../lib/paymentOptions';

interface ActionButtonsProps {
  isNeedApprove: boolean;
  isBuying: boolean;
  isApproving: boolean;
  isConnected: boolean;
  onApprove: () => void;
  onBuy: () => void;
  presaleCalculator: {
    recalculateFromPay: (newAmount: string) => void;
    recalculateFromReceive: (newAmount: string) => void;
    payAmount: string;
    tokenPrice: number;
    payAmountUSD: number;
    receiveAmount: string;
  };
  paymentOption: IPaymentOption;
  userBalance: number | null;
  minPayAmount: number;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  isNeedApprove,
  isBuying,
  isApproving,
  isConnected,
  onApprove,
  onBuy,
  presaleCalculator,
  paymentOption,
  userBalance,
  minPayAmount,
}) => {
  const t = useTranslations('form');

  const isZeroAmount =
    !presaleCalculator.payAmount || Number(presaleCalculator.payAmount) === 0;
  const isAmountLessThanBalance =
    userBalance !== null &&
    Number(userBalance) < Number(presaleCalculator.payAmount);
  const isAmountLessThanMinimum =
    presaleCalculator.payAmount &&
    Number(presaleCalculator.payAmount) < Number(minPayAmount);

  return (
    <div className='mt-8 flex items-start justify-between gap-5 sm:flex-col sm:items-start sm:gap-8'>
      <div className='flex flex-col items-start justify-between gap-2 uppercase text-[#929292] sm:flex-row'>
        {isAmountLessThanMinimum ? (
          <>
            <p>{t('minPay')}</p>
            <div className='flex items-center gap-2'>
              <img
                src={paymentOption.icon}
                alt={paymentOption.title}
                className='h-6 w-6'
              />
              <span className='text-white'>{minPayAmount}</span>
              <span>
                {paymentOption.title === 'Card' ? 'USD' : paymentOption.title}
              </span>
            </div>
          </>
        ) : isAmountLessThanBalance ? (
          <p>{t('noFunds')}</p>
        ) : (
          <>
            <p>{t('pointRewards')}</p>
            <BonusPoints usdTotal={presaleCalculator.payAmountUSD} />
          </>
        )}
      </div>
      <div className='flex flex-col sm:w-full'>
        {isNeedApprove ? (
          <Button
            onClick={onApprove}
            className='flex h-11 min-w-[210px] cursor-pointer items-center justify-center gap-1.5 px-6 text-lg sm:w-full'
          >
            {isApproving
              ? t('approving')
              : `${t('approve')} ${paymentOption.title}`}
          </Button>
        ) : (
          <Button
            onClick={onBuy}
            className='flex h-11 min-w-[210px] cursor-pointer items-center justify-center gap-1.5 px-6 text-lg sm:w-full'
          >
            {isBuying ? t('buying') : isConnected ? t('buy') : t('connect')}
          </Button>
        )}
      </div>
    </div>
  );
};
