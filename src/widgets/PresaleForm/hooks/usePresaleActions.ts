import { useState, useEffect } from 'react';
import { Address, parseUnits } from 'viem';
import { useBuy } from '@/entities/presale';
import { useWriteContract, useReadContract } from 'wagmi';
import { useWaitForTransactionReceipt } from 'wagmi';
import { PresaleABI } from '@/entities/presale';
import { erc20Abi } from 'viem';
import invariant from 'tiny-invariant';
import { analytics } from '@/shared/analytics';
import { pushSuccessHash } from '@/shared/utils/pushSuccessHash';
import { waitForTransactionReceipt } from 'wagmi/actions';
import {
  getChainName,
  saveTransactionInfo,
} from '@d4lb4eb/presale-ui-logic-sol/presale';
import { MAX_ALLOWANCE, NETWORK_TYPE, wagmiConfig } from '@/entities/wagmi';
import { USDT_ABI } from '@/widgets/PresaleForm/lib/usdtABI';

interface UsePresaleActionsProps {
  paymentOption: any;
  presaleCalculator: any;
  profile: any;
  selectedChain: any;
  address?: Address;
  contractAddress?: Address;
  tokenAddress?: Address;
  refetchBalance: () => void;
  onramp: { openWidgetModal: () => void };
}

export const usePresaleActions = ({
  paymentOption,
  presaleCalculator,
  profile,
  selectedChain,
  address,
  contractAddress,
  tokenAddress,
  refetchBalance,
  onramp,
}: UsePresaleActionsProps) => {
  // Buy logic
  const { buy, isLoading: isBuying } = useBuy(
    {
      token: paymentOption.id,
      referrerAddress: profile.refOwner || undefined,
      abi: PresaleABI,
    },
    {
      onSuccess: async (hash: `0x${string}`) => {
        analytics.trackBuyFormSuccess({
          network: selectedChain.name,
          token: paymentOption.id,
          currency: paymentOption.title,
          usd_amount: presaleCalculator.payAmountUSD,
        });
        pushSuccessHash(hash);

        // Save transaction info (backend call)
        saveTransactionInfo(
          {
            tx_hash: hash,
            wallet_address: address as string,
            currency:
              paymentOption.id === 'POL (ex-MATIC)'
                ? 'MATIC'
                : paymentOption.id,
            chain: getChainName(selectedChain),
            language: {
              current: navigator.language,
              all: navigator.languages.slice(),
            },
            first_login: new Date().toString(),
            amount: presaleCalculator.payAmount,
          },
          {}, // API_SOURCE_INFO can be passed here
        ).then(({ data }) => {
          analytics.trackSuccessOrder({
            address: address || '',
            value: presaleCalculator.payAmountUSD,
            transaction_id: data.transaction_id,
            network: selectedChain.name,
            currency: paymentOption.title,
          });
        });

        // Refetch balance & allowance when tx is confirmed
        waitForTransactionReceipt(wagmiConfig, { hash }).then(() => {
          refetchBalance();
          refetchAllowance();
        });
      },
    },
  );

  // Approval handling
  const tokenABI = selectedChain.key === 'ethereum' ? USDT_ABI : erc20Abi;
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: tokenAddress,
    abi: tokenABI,
    functionName: 'allowance',
    args: [address!, contractAddress!],
    query: { enabled: !!tokenAddress && !!address && !!contractAddress },
  });

  const { data: allowanceApproveResult, writeContractAsync: approveAsync } =
    useWriteContract();
  const { isLoading: isApproving, status: approveStatus } =
    useWaitForTransactionReceipt({
      hash: allowanceApproveResult ? allowanceApproveResult : undefined,
    });

  useEffect(() => {
    if (approveStatus === 'success') {
      refetchAllowance();
      refetchBalance();
    }
  }, [approveStatus, refetchAllowance, refetchBalance]);

  const handleApprove = async () => {
    invariant(tokenAddress, '[handleApprove]: tokenAddress is not defined');
    invariant(approveAsync, '[handleApprove]: approveAsync is not defined');

    analytics.trackApproveFormClick({
      network: selectedChain.name,
      token: paymentOption.title,
      currency: paymentOption.title,
    });

    try {
      // Some tokens (like USDT on Ethereum) require resetting allowance to zero first
      if (
        selectedChain.key === 'ethereum' &&
        paymentOption.id === 'USDT' &&
        allowance !== BigInt(0)
      ) {
        await approveAsync({
          address: tokenAddress,
          abi: tokenABI,
          functionName: 'approve',
          args: [contractAddress!, BigInt(0)],
        });
      }
      // Approve maximum allowance
      await approveAsync({
        address: tokenAddress,
        abi: tokenABI,
        functionName: 'approve',
        args: [contractAddress!, MAX_ALLOWANCE],
      });
      analytics.trackApproveFormSuccess({
        network: selectedChain.name,
        token: paymentOption.title,
        currency: paymentOption.title,
      });
    } catch (error) {
      analytics.trackApproveFormRejected({
        network: selectedChain.name,
        token: paymentOption.title,
        currency: paymentOption.title,
      });
    }
  };

  const handleBuyConfirmed = async () => {
    if (paymentOption.id === 'Card' || paymentOption.id === 'USDT-TRC20') {
      onramp.openWidgetModal();
    } else {
      try {
        await buy(
          parseUnits(presaleCalculator.payAmount, paymentOption.decimals),
        );
      } catch (error) {
        analytics.trackBuyFormDeclineTransaction({
          network: selectedChain.name,
          currency: paymentOption.title,
          amount: presaleCalculator.payAmountUSD.toString(),
        });
        console.debug('[handleBuyConfirmed]: error', (error as Error).message);
      }
    }
  };

  const handleBuy = async (
    openConnectModal: (() => void) | undefined,
    chainId: number,
  ) => {
    if (!address) {
      openConnectModal?.();
      return;
    }
    if (
      Number(chainId) !== selectedChain[NETWORK_TYPE].id &&
      !(paymentOption.id === 'Card' || paymentOption.id === 'USDT-TRC20')
    ) {
      return;
    }
    analytics.trackBuyFormClick({
      network:
        paymentOption.id === 'Card' || paymentOption.id === 'USDT-TRC20'
          ? paymentOption.id
          : selectedChain.name,
      token: paymentOption.title,
      currency: paymentOption.title,
      usd_amount: presaleCalculator.payAmountUSD,
    });
    if (!profile.profile?.terms_accepted) {
      // open terms modal in the parent component
      return;
    }
    await handleBuyConfirmed();
  };

  return { handleBuy, handleApprove, isBuying, isApproving, allowance };
};
