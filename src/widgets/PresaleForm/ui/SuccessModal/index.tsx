import { useContext, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useCurrentNetwork } from '../../../../entities/wagmi';
import { analytics } from '@/shared/analytics';
import { Drawer } from 'vaul';
import { Button } from '@/shared/ui/Button';
import { CurrentBlockchainContext } from '@/entities/currentBlockchain/providers';
import styles from './styles.module.css';
import { screener, screenerRegular } from '@/shared/fonts/fonts';
import successImg from './assets/success.png';
import Image from 'next/image';

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
  const { currentBlockchain } = useContext(CurrentBlockchainContext);

  const solCluster =
    process.env.NEXT_PUBLIC_NETWORK_TYPE === 'testnet' ? '?cluster=devnet' : '';

  const link =
    currentBlockchain === 'sol'
      ? `https://solscan.io/tx/${txHash}${solCluster}`
      : `${selectedChain?.explorer[networkType]}tx/${txHash}`;

  useEffect(() => {
    if (!isVisible || !txHash) return;
    analytics.trackSuccessPopup({
      network: selectedChain.name,
      currency,
      usd_amount: usdAmount,
    });
  }, [isVisible]);

  return (
    <Drawer.Root
      open={isVisible}
      modal={false}
      direction='top'
      onClose={() => setIsVisible(false)}
    >
      <Drawer.Overlay
        className='fixed inset-0 z-40'
        onClick={() => setIsVisible(false)}
      />
      <Drawer.Content className='absolute left-[36px] right-[36px] top-[36px] z-50 outline-none'>
        <div className={styles.bg} onClick={() => setIsVisible(false)}>
          <div className='relative z-50 flex h-full flex-col items-center justify-between'>
            <Image
              src={successImg}
              alt='successImg'
              className='m-auto h-auto w-[61px]'
            />
            <p
              className={`${screener.className} mt-[30px] text-center text-[24px] font-bold leading-[34px] text-white`}
            >
              {t('successPay')}
            </p>
            {!isOnramp && (
              <a
                className={`${screenerRegular.className} mt-[10px] text-white`}
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
        </div>
      </Drawer.Content>
    </Drawer.Root>
  );
};
