import React, { useState, useMemo } from 'react';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useTranslations } from 'next-intl';
import { useProfile } from '@d4lb4eb/presale-ui-logic-sol/entities';
import { usePresaleCalculator } from '@/entities/calculator';
import {
  PresaleABI,
  usePresaleContractAddress,
  useTokenAddress,
} from '@/entities/presale';
import { PaymentInput } from './ui/PaymentInput';
import { ReceiveInput } from './ui/ReceiveInput';
import { ActionButtons } from './ui/ActionButtons';
import { NetworkSwitcher } from './ui/NetworkSwitcher';
import { SuccessModal } from './ui/SuccessModal';
import { TermsModal } from './ui/TermsModal';
import { useOnrampBuy } from './ui/Onramp';
import { TOKEN_NAME } from '@/shared/lib/constants';
import { parseUnits } from 'viem';
import { useCurrentNetwork } from '@/entities/wagmi';
import { PAYMENT_METHODS } from './lib/paymentOptions';
import { getMinAmount } from './lib/constants';
import { useUserBalance } from './hooks/useUserBalance';
import { usePresaleActions } from './hooks/usePresaleActions';
import StageCard from './ui/StageCard';

const PresaleForm: React.FC = () => {
  const t = useTranslations('form');
  const { address, isConnected, chainId } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { appChain: selectedChain, switchNetwork } = useCurrentNetwork();
  const profile = useProfile(address);

  // Payment Option & Calculator
  const INITIAL_PAYMENT_METHOD = selectedChain
    ? PAYMENT_METHODS.find((m) => m.id === selectedChain.key) ||
      PAYMENT_METHODS[0]
    : PAYMENT_METHODS[0];
  const [paymentOption, setPaymentOption] = useState(
    INITIAL_PAYMENT_METHOD.options[0],
  );
  const isOnramp =
    paymentOption.id === 'Card' || paymentOption.id === 'USDT-TRC20';

  const tokenAddress = useTokenAddress(paymentOption.id, PresaleABI);
  const contractAddress = usePresaleContractAddress();
  const presaleCalculator = usePresaleCalculator({ token: paymentOption });
  const minPayAmount = getMinAmount(paymentOption.title);

  // Balance
  const { userBalance, refetchBalance } = useUserBalance(
    paymentOption,
    address,
  );

  // Onramp configuration
  const onramp = useOnrampBuy({
    paymentDetails: {
      amount: presaleCalculator.payAmount,
      currency: paymentOption.id === 'Card' ? 'USDT-MATIC' : paymentOption.id,
      recipient: address || null,
    },
    onSuccess: (order) => {
      // … analytics & success handling here
    },
    isEnabled: isOnramp,
  });

  // Presale actions (buy/approve)
  const { handleBuy, handleApprove, isBuying, isApproving, allowance } =
    usePresaleActions({
      paymentOption,
      presaleCalculator,
      profile,
      selectedChain,
      address,
      contractAddress,
      tokenAddress,
      refetchBalance,
      onramp,
    });

  const isNeedApprove = useMemo(
    () =>
      tokenAddress &&
      isConnected &&
      (allowance || BigInt(0)) <
        parseUnits(presaleCalculator.payAmount, paymentOption.decimals) &&
      !!handleApprove,
    [
      tokenAddress,
      isConnected,
      allowance,
      presaleCalculator.payAmount,
      paymentOption.decimals,
      handleApprove,
    ],
  );

  return (
    <div className='flex h-full items-center'>
      <div
        className='relative my-auto flex w-full flex-col overflow-hidden p-9'
        id='form'
      >
        <SuccessModal
          txHash={undefined} // pass the transaction hash as needed
          isVisible={false} // your modal state here
          setIsVisible={() => {}}
          usdAmount={presaleCalculator.payAmountUSD}
          currency={paymentOption.title}
        />
        <TermsModal
          isVisible={false} // your modal state here
          setIsVisible={() => {}}
          onClose={() => {}}
          address={address!}
        />

        <StageCard />

        <div className='relative mt-6 flex flex-col'>
          <NetworkSwitcher
            switchNetwork={switchNetwork}
            address={address}
            currentNetwork={selectedChain.key}
            paymentOption={paymentOption}
            setPaymentOption={setPaymentOption}
            isBuying={isBuying}
            isApproving={isApproving}
          />

          <PaymentInput
            paymentOption={paymentOption}
            presaleCalculator={presaleCalculator}
            userBalance={userBalance}
            isOnramp={isOnramp}
          />

          <ReceiveInput
            tokenName={TOKEN_NAME}
            presaleCalculator={presaleCalculator}
            profile={profile}
          />

          <ActionButtons
            isNeedApprove={!!isNeedApprove}
            isBuying={isBuying}
            isApproving={isApproving}
            isConnected={isConnected}
            onApprove={handleApprove}
            onBuy={() => handleBuy(openConnectModal, Number(chainId))}
            presaleCalculator={presaleCalculator}
            paymentOption={paymentOption}
            userBalance={userBalance}
            minPayAmount={minPayAmount}
          />

          <a
            href='https://docs.io/how-to-buy'
            target='_blank'
            rel='noreferrer'
            className='m-auto mt-1 cursor-pointer border-b-2 border-[#929292] text-center text-xs text-[#929292] transition-all hover:text-white'
          >
            {t('howToBuy')}
          </a>
        </div>
        {onramp.modal}
      </div>
    </div>
  );
};

export default PresaleForm;
