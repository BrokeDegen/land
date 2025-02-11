import { analytics } from '@/shared/analytics';
import ModalWrapper from '@/shared/ui/ModalWrapper';
import { StaticLoader } from '@/shared/ui/StaticLoader';
import useWindowDimensions from '@/shared/utils/useWindowsDimensions';
import { ApiResponse } from '@d4lb4eb/presale-ui-logic-sol/calculator';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { SuccessModal } from '../SuccessModal';

interface MunzenWidgetModalProps {
  url?: string;
  open: boolean;
  onCancel: () => void;
  currency: string;
  onOperationCompleted: (event: MunzenEvent) => void;
  refetch: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      ApiResponse<{
        uuid: string;
        link: string;
      }>,
      Error
    >
  >;
}

export interface MunzenEvent {
  type: string;
  payload: any;
}

export const MunzenWidgetModal = ({
  url,
  open,
  onCancel,
  onOperationCompleted,
  refetch,
  currency,
}: MunzenWidgetModalProps) => {
  const [loaded, setLoaded] = useState(false);
  const [height, setHeight] = useState(currency === 'USDT-MATIC' ? 609 : 780);
  const [completed, setCompleted] = useState(false);
  const windowSizes = useWindowDimensions();
  const t = useTranslations();

  useEffect(() => {
    setHeight(currency === 'USDT-MATIC' ? 609 : 780);
  }, [currency]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  useEffect(() => {
    const handleMessage = (event: any) => {
      // Only handle messages from the widget
      if (event.data?.source === 'quv-router') {
        const eventName = event.data.eventName;
        analytics.trackCardPaymentFlow({
          step: eventName,
        });
        if (eventName === 'loaded') {
          setLoaded(true);
        }
        if (eventName === 'close') {
          onCancel();
        }
        if (eventName === 'click') {
          refetch();
        }
        if (eventName === 'payment-complete') {
          onCancel();
          setCompleted(true);
        }
      }

      if (event.data?.source === 'nearpay_widget') {
        const munzenEvent: MunzenEvent = event.data.data;

        analytics.trackCardPaymentFlow({
          step: munzenEvent.type,
        });

        if (munzenEvent.type === 'onmerchantorderidexists') refetch();

        if (
          munzenEvent.payload &&
          munzenEvent.payload.size &&
          munzenEvent.payload.size.height
        ) {
          setHeight(munzenEvent.payload.size.height);
        }

        if (munzenEvent.type === 'onoperationsuccess') {
          onOperationCompleted(munzenEvent);
        } else if (munzenEvent.type === 'resize') {
        }
      }
    };
    if (!window) return;

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <>
      <ModalWrapper
        isOpen={open}
        onClose={onCancel}
        style={{
          maxWidth: 500,
          width: 464,
          background: '#f7f7f7',
          padding: '10px 5px',
        }}
      >
        <div
          style={{
            maxHeight: 'calc(100vh - 100px)',
            overflow: 'auto',
            height: height,
          }}
        >
          <div className='absolute left-[50%] top-[50%]'>
            {loaded ? null : <StaticLoader />}
          </div>
          {url ? (
            <iframe
              src={url}
              title='Munzen Widget'
              width='100%'
              height={height}
              frameBorder='0'
              scrolling='no'
              allow='camera; microphone'
              className='rounded-[24px]'
            ></iframe>
          ) : null}
        </div>
      </ModalWrapper>
      {/* <SuccessModal
        txHash='0x00'
        isVisible={completed}
        setIsVisible={() => setCompleted(false)}
        isOnramp={true}
      /> */}
    </>
  );
};
