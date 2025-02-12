import React, { ChangeEvent } from 'react';
import { replaceComma, isValidAmountInput } from '../../lib/constants';
import { useTranslations } from 'next-intl';

interface ReceiveInputProps {
  tokenName: string;
  presaleCalculator: any;
  profile: any;
}

export const ReceiveInput: React.FC<ReceiveInputProps> = ({
  tokenName,
  presaleCalculator,
  profile,
}) => {
  const t = useTranslations('form');
  const handleReceiveAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newReceiveAmount = replaceComma(e.target.value);
    if (!isValidAmountInput(newReceiveAmount)) return;
    presaleCalculator.recalculateFromReceive(newReceiveAmount);
  };

  return (
    <div className='mt-4 flex flex-col text-sm'>
      <div className='mb-2 flex justify-between uppercase'>
        <p className='text-[#929292]'>{t('youReceive')}:</p>
        {profile.profile && (
          <div className='flex items-center gap-1'>
            <p className='text-white opacity-70'>{t('balance')}:</p>
            <p className='text-white'>
              {profile.profile.balance.toLocaleString('en-US')}
            </p>
          </div>
        )}
      </div>
      <input
        id='receive-amount'
        onChange={handleReceiveAmountChange}
        value={presaleCalculator.receiveAmount}
        type='number'
        placeholder={`0.0 ${tokenName}`}
        autoComplete='off'
        className='appearance-none bg-transparent text-base text-white outline-none placeholder:font-light'
      />
    </div>
  );
};
