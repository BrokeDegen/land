import {
  OnrampOrder,
  PaymentDetails,
  useWidgetLink,
  useWidgetOrder,
} from '@d4lb4eb/presale-ui-logic-sol/presale';
import { useEffect, useState } from 'react';
import { MunzenEvent, MunzenWidgetModal } from './MunzenWidget';
import { API_SOURCE_INFO } from '@d4lb4eb/presale-ui-logic-sol/entities';
import { Address } from 'viem';

interface OnrampBuyProps {
  onSuccess: (order: OnrampOrder) => void;
  paymentDetails: {
    amount: string;
    currency: string;
    recipient: Address | null;
    chain?: string;
    first_login?: string;
    refcode?: string;
    utm?: string;
    language?: {
      current: string;
      all: string[];
    };
  };
  isEnabled: boolean;
}

const USER_LANGUAGE = {
  current: navigator.language,
  all: navigator.languages.slice(),
};

const USER_FIRST_LOGIN = new Date().toString();

export function useOnrampBuy({ paymentDetails, onSuccess }: OnrampBuyProps) {
  const [munzenEvent, setMunzenEvent] = useState<MunzenEvent | null>(null);
  const [isWidgetModalOpen, setIsWidgetModalOpen] = useState(false);
  const [shouldPollOrder, setShouldPollOrder] = useState(false);

  const { data: onrampOrder } = useWidgetOrder(
    munzenEvent?.payload.orderId || '',
    shouldPollOrder,
  );

  const { data: widgetLinkResponse, refetch } = useWidgetLink(
    {
      amount: paymentDetails.amount,
      // currency: networkToCurrencyMap[selectedChain.key],
      currency: paymentDetails.currency as 'USDT-TRC20', // for testnet USDT-BEP20, for mainnet USDT-MATIC
      recipient: paymentDetails.recipient,
      chain: paymentDetails.chain,
      language: USER_LANGUAGE,
      first_login: USER_FIRST_LOGIN,
    },
    API_SOURCE_INFO,
    { isEnabled: false },
  );

  const openWidgetModal = () => {
    refetch().then(() => {
      setIsWidgetModalOpen(true);
    });
  };
  const handleWidgetModalCancel = () => {
    setIsWidgetModalOpen(false);
  };

  const handleWidgetModalSuccess = (event: MunzenEvent) => {
    setShouldPollOrder(true);
    setMunzenEvent(event);
  };

  useEffect(() => {
    if (onrampOrder?.data.status === 'complete') {
      setShouldPollOrder(false);
      setIsWidgetModalOpen(false);
      onSuccess(onrampOrder.data);
      setMunzenEvent(null);
    }
  }, [onrampOrder?.data.status]);

  const widgetLink = widgetLinkResponse?.data?.link;

  const modal = (
    <MunzenWidgetModal
      url={widgetLink}
      open={isWidgetModalOpen}
      onCancel={handleWidgetModalCancel}
      onOperationCompleted={handleWidgetModalSuccess}
      refetch={refetch}
      currency={paymentDetails.currency}
    />
  );

  const isReady = !!widgetLink;
  return {
    modal,
    openWidgetModal,
    isReady,
  };
}
