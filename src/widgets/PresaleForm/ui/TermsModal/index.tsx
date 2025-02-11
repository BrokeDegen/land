import { useTranslations } from 'next-intl';

import { useUserAcceptedTerms } from '@d4lb4eb/presale-ui-logic-sol/entities';
import { Address } from 'viem';
import ModalWrapper from '../../../../shared/ui/ModalWrapper';
import { analytics } from '@/shared/analytics';
import { Link } from '@/navigation';
import signImage from './assets/sign.png';
import Image from 'next/image';
import { screener } from '@/shared/fonts/fonts';
import { Button } from '@/shared/ui/Button';

type Props = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  onClose: () => void;
  address: Address;
};

export const TermsModal = ({
  isVisible,
  setIsVisible,
  onClose,
  address,
}: Props) => {
  const t = useTranslations('form');

  const mutation = useUserAcceptedTerms();

  const handleAccept = () => {
    analytics.trackTermsApproved(address);
    mutation.mutate(address);
    setIsVisible(false);
    onClose();
  };

  const handleClose = () => {
    analytics.trackTermsDeclined(address);
    setIsVisible(false);
  };

  return (
    <ModalWrapper isOpen={isVisible} onClose={handleClose} closable={false}>
      <div className='flex flex-col gap-[30px]'>
        <Image
          src={signImage}
          alt='signImage'
          className='m-auto h-auto w-[60px]'
        />

        <div
          className={`${screener.className} px-[20px] text-center text-[20px] leading-[26px] text-white`}
        >
          {t.rich('termsInfo', {
            terms: (termsText) => (
              <Link
                href='/terms'
                target='_blank'
                className='mx-[0.3rem] underline transition-all hover:opacity-85'
              >
                {termsText}
              </Link>
            ),
            privacy: (privacyText) => (
              <Link
                href='/privacy'
                target='_blank'
                className='mx-[0.3rem] underline transition-all hover:opacity-85'
              >
                {privacyText}
              </Link>
            ),
          })}
        </div>
        <div className='flex flex-col gap-[20px]'>
          <Button
            onClick={handleAccept}
            className='h-[43px] !w-[385px] !text-[18px]'
          >
            {t('accept')}
          </Button>
          <Button
            onClick={handleClose}
            className='h-[43px] !w-[385px] !text-[18px]'
            transparent
            bgColor='#1A565D'
          >
            {t('decline')}
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};
