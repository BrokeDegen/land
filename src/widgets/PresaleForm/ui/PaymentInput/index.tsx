import React, { ChangeEvent } from 'react';
import Image from 'next/image';
import { formatCurrencyInput } from '@/shared/utils/currency';
import {
  isValidAmountInput,
  replaceComma,
} from '@/widgets/PresaleForm/lib/constants';
import { useTranslations } from 'next-intl';

interface PaymentInputProps {
  paymentOption: any;
  presaleCalculator: {
    recalculateFromPay: (newAmount: string) => void;
    recalculateFromReceive: (newAmount: string) => void;
    payAmount: string;
    tokenPrice: number;
    payAmountUSD: number;
    receiveAmount: string;
  };
  userBalance: number | null;
  isOnramp: boolean;
}

export const PaymentInput: React.FC<PaymentInputProps> = ({
  paymentOption,
  presaleCalculator,
  userBalance,
  isOnramp,
}) => {
  const t = useTranslations('form');

  const handlePayAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPayAmount = replaceComma(formatCurrencyInput(e.target.value));
    if (!isValidAmountInput(newPayAmount)) return;
    presaleCalculator.recalculateFromPay(newPayAmount);
  };

  return (
    <div className='mt-4 flex flex-col text-sm'>
      <div className='mb-2 flex justify-between uppercase'>
        <p className='text-[#929292]'>{t('youPay')}:</p>
        {userBalance !== null && (
          <div className='flex items-center gap-1'>
            <p className='text-white opacity-70'>{t('balance')}:</p>
            <p className='text-white'>
              {userBalance.toLocaleString('en-US', {
                maximumFractionDigits: 6,
              })}
            </p>
          </div>
        )}
      </div>
      <div className='flex h-10 items-center gap-3'>
        <Image
          src={paymentOption.icon}
          alt={paymentOption.title}
          className='h-6 w-6'
        />
        <div className='flex w-full items-center justify-between'>
          <div className='flex flex-col gap-1'>
            <input
              id='pay-amount'
              value={presaleCalculator.payAmount}
              onChange={handlePayAmountChange}
              placeholder={`0.00 ${paymentOption.title}`}
              autoComplete='off'
              maxLength={7}
              type='number'
              className='mt-1 appearance-none bg-transparent text-base leading-3 text-white outline-none placeholder:font-light'
            />
            {paymentOption.type !== 'custom' && (
              <p className='text-xs leading-3 text-white'>
                {presaleCalculator.payAmountUSD.toFixed(2)} USDT
              </p>
            )}
          </div>
          {userBalance !== null && !isOnramp && (
            <div
              className='cursor-pointer text-sm text-white opacity-70'
              onClick={() => {
                const maxAmount = (
                  Math.floor(
                    Number(userBalance) *
                      100000 *
                      (paymentOption.type !== 'custom' ? 0.98 : 1),
                  ) / 100000
                ).toString();
                presaleCalculator.recalculateFromPay(maxAmount);
              }}
            >
              MAX
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
