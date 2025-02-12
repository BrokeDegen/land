import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useCurrentNetwork } from '../../../../entities/wagmi';
import { analytics } from '@/shared/analytics';
import { Button } from '@/shared/ui/Button';
import Image from 'next/image';
import ModalWrapper from '@/shared/ui/ModalWrapper';

type SuccessModalProps = {
  txHash?: string;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  usdAmount?: number;
  currency?: string;
  isOnramp?: boolean;
};

export const SuccessModal = ({
  txHash,
  isVisible,
  setIsVisible,
  usdAmount,
  currency,
  isOnramp,
}: SuccessModalProps) => {
  const t = useTranslations('form');
  const { appChain: selectedChain, networkType } = useCurrentNetwork();

  const link = `${selectedChain?.explorer[networkType]}tx/${txHash}`;

  useEffect(() => {
    if (!isVisible || !txHash) return;
    analytics.trackSuccessPopup({
      network: selectedChain.name,
      currency,
      usd_amount: usdAmount,
    });
  }, [isVisible]);

  return (
    <ModalWrapper isOpen={isVisible} onClose={() => setIsVisible(false)}>
      <div className='relative z-50 flex h-full flex-col items-center justify-between'>
        <p>{t('successPay')}</p>
        {!isOnramp && (
          <a
            href={link}
            target='_blank'
            onClick={() => {
              analytics.trackSuccessPopupDetailsClick({
                network: selectedChain.name,
              });
            }}
          >
            {t('viewTrans')}
          </a>
        )}
        <div className='mt-auto'>
          <Button
            onClick={() => setIsVisible(false)}
            className='h-[46px] w-[290px] !text-[18px]'
          >
            {t('back')}
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};
