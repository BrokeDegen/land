// import { useContext, useEffect, useState } from 'react';
// import {
//   useAccount,
//   useBalance,
//   useReadContract,
//   useWriteContract,
//   useWaitForTransactionReceipt,
// } from 'wagmi';
// import { Address, erc20Abi, parseUnits } from 'viem';
// import {
//   OnrampOrder,
//   getChainName,
//   saveTransactionInfo,
//   useProfile,
// } from '@d4lb4eb/presale-ui-logic-sol/presale';
// import {
//   API_SOURCE_INFO,
//   syncAddress,
// } from '@d4lb4eb/presale-ui-logic-sol/entities';
// import { useSignals } from '@preact/signals-react/runtime';
// import { waitForTransactionReceipt } from 'wagmi/actions';
// import {
//   getMinAmount,
//   isValidAmountInput,
//   replaceComma,
// } from '../../lib/constants';
// import {
//   MAX_ALLOWANCE,
//   NETWORK_TYPE,
//   useCurrentNetwork,
//   wagmiConfig,
// } from '../../../../entities/wagmi';
// import { analytics } from '@/shared/analytics';
// import { USDT_ABI } from '../../lib/usdtABI';
// import { NetworkSwitcher } from '../NetworkSwitcher';
// import { SuccessModal } from '../SuccessModal';
// import { TermsModal } from '../TermsModal';
// import { useTranslations } from 'next-intl';
// import invariant from 'tiny-invariant';
// import { formatCurrencyInput } from '@/shared/utils/currency';
// import { useOnrampBuy } from '../Onramp';
// import {
//   IPaymentOption,
//   PAYMENT_METHODS,
//   SOLANA_METHOD,
// } from '../NetworkSwitcher/lib';
// import {
//   PresaleABI,
//   useBuy,
//   usePresaleContractAddress,
//   useTokenAddress,
// } from '@/entities/presale';
// import { usePresaleCalculator } from '@/entities/calculator';
// import Image from 'next/image';
// import { TokenIcon } from '@/shared/icons/TokenIcon';
// import { TOKEN_NAME } from '@/shared/lib/constants';
// import { StaticLoader } from '@/shared/ui/StaticLoader';
// import { useWalletModal } from '@solana/wallet-adapter-react-ui';
// import useWalletConnectAnalytic from '../../lib/useWalletConnectAnalytic';

// import { Button } from '@/shared/ui/Button';
// import { BonusPoints } from '../BonusPoints';
// import PresaleStageCard from '../PresaleStageCard';
// import { useConnectModal } from '@rainbow-me/rainbowkit';
// import { PointerIcon } from '@/shared/icons/PointerIcon';

// function pushSuccessHash(hash: string) {
//   const params = new URLSearchParams(window.location.search);

//   // Force put success at the first place
//   // Because it is needed by FB retargeting team
//   params.delete('success');
//   const stringParams = params.toString();
//   window.history.pushState(
//     {},
//     '',
//     `${window.location.pathname}?success=${hash}${
//       stringParams ? '&' + params : ''
//     }`,
//   );
// }

// export const Form: React.FC = () => {
//   useSignals();
//   useWalletConnectAnalytic();

//   const t = useTranslations('form');

//   const { appChain: selectedChain, switchNetwork } = useCurrentNetwork();
//   const { address, isConnected } = useAccount();
//   const [userBalance, setUserBalance] = useState<number | null>(null);
//   const [prevBalance, setPrevBalance] = useState<number | undefined>(undefined);
//   const [trxHash, setTrxHash] = useState<string>();
//   const profile = useProfile({ address: address as Address });

//   // select first token in the chain
//   const INITIAL_PAYMENT_METHOD = selectedChain
//     ? PAYMENT_METHODS.find((m) => m.id === selectedChain.key) ||
//       PAYMENT_METHODS[0]
//     : PAYMENT_METHODS[0];

//   const [paymentOption, setPaymentOption] = useState<IPaymentOption>(
//     INITIAL_PAYMENT_METHOD.options[0],
//   );

//   const isOnramp =
//     paymentOption.id === 'Card' || paymentOption.id === 'USDT-TRC20';

//   const tokenAddress = useTokenAddress(paymentOption.id, PresaleABI);
//   const { chainId } = useAccount();

//   const contractAddress = usePresaleContractAddress();
//   const { openConnectModal } = useConnectModal();

//   const { data: evmUserBalance, refetch: refetchBalance } = useBalance({
//     address: address,
//     token: tokenAddress,
//     query: {
//       enabled: !!address && !isOnramp,
//     },
//   });

//   useEffect(() => {
//     setUserBalance(Number(evmUserBalance?.formatted));
//   }, [evmUserBalance]);

//   const minPayAmount = getMinAmount(paymentOption.title);
//   const calculator = usePresaleCalculator({
//     token: paymentOption,
//   });
//   const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);
//   const [isTermsModalVisible, setTermsModalVisible] = useState(false);
//   const [isApproveModalVisible, setApproveModalVisible] = useState(false);
//   const [isMergeModalVisible, setIsMergeModalVisible] = useState(false);
//   const { setVisible: setSolModalVisible } = useWalletModal();

//   const {
//     data: buyResult,
//     buy,
//     isLoading: isBuying,
//     isSuccess: isBuySuccess,
//   } = useBuy(
//     {
//       token: paymentOption.id,
//       referrerAddress: (profile.refOwner.value as Address) || undefined,
//       abi: PresaleABI,
//     },
//     {
//       onSuccess: async (hash, variables) => {
//         analytics.trackBuyFormSuccess({
//           network: selectedChain.name,
//           token: paymentOption.id,
//           currency: paymentOption.title,
//           usd_amount: calculator.payAmountUSD,
//         });

//         setSuccessModalVisible(true);
//         pushSuccessHash(hash);
//         saveTransactionInfo(
//           {
//             tx_hash: hash,
//             wallet_address: address as string,
//             currency:
//               paymentOption.id === 'POL (ex-MATIC)'
//                 ? 'MATIC'
//                 : paymentOption.id,
//             chain: getChainName(selectedChain),
//             language: {
//               current: navigator.language,
//               all: navigator.languages.slice(),
//             },
//             first_login: `${new Date()}`,
//             amount: calculator.payAmount,
//           },
//           API_SOURCE_INFO,
//         ).then(({ data }) => {
//           setTrxHash(hash);
//           analytics.trackSuccessOrder({
//             address: address || '',
//             value: calculator.payAmountUSD,
//             transaction_id: data.transaction_id,
//             network: selectedChain.name,
//             currency: paymentOption.title,
//           });
//         });

//         // refetch balance after transaction is confirmed
//         waitForTransactionReceipt(wagmiConfig, {
//           hash,
//         }).then(() => {
//           refetchBalance();
//           refetchAllowance();
//           setPrevBalance(profile.refBalance.value?.balance);
//         });
//       },
//     },
//   );

//   const onramp = useOnrampBuy({
//     paymentDetails: {
//       amount: calculator.payAmount,
//       currency:
//         paymentOption.id === 'Card'
//           ? 'USDT-MATIC'
//           : (paymentOption.id as 'BTC'), // for testnet USDT-BEP20, for mainnet USDT-MATIC
//       recipient: address || null,
//     },
//     onSuccess: (order: OnrampOrder) => {
//       analytics.trackCardPaymentFinished({
//         status: order.status,
//         usdAmount: order.toAmount,
//         message: 'success',
//       });
//       setSuccessModalVisible(true);
//       pushSuccessHash(order.blockchainNetworkTxId);
//     },
//     isEnabled: isOnramp,
//   });

//   const onPayAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newPayAmount = replaceComma(formatCurrencyInput(e.target.value));

//     if (!isValidAmountInput(newPayAmount)) {
//       return;
//     }

//     calculator.recalculateFromPay(newPayAmount);
//   };

//   const onReceivedTokensChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newReceiveAmount = replaceComma(e.target.value);

//     if (!isValidAmountInput(newReceiveAmount)) {
//       return;
//     }

//     calculator.recalculateFromReceive(newReceiveAmount);
//   };

//   const handleBuy = async () => {
//     if (isConnected) {
//       if (
//         Number(chainId) !== selectedChain[NETWORK_TYPE].id &&
//         !isOnramp &&
//       ) {
//         switchNetwork(selectedChain.key);
//         return;
//       }

//       analytics.trackBuyFormClick({
//         network: isOnramp ? paymentOption.id : selectedChain.name,
//         token: paymentOption.title,
//         currency: paymentOption.title,
//         usd_amount: calculator.payAmountUSD,
//       });

//       if (!profile.refBalance.value?.terms_accepted) {
//         setTermsModalVisible(true);
//         return;
//       } else {
//         handleBuyConfimed();
//       }
//     } else {
//         openConnectModal?.();

//     }
//   };

//   const handleBuyConfimed = async () => {
//     if (isOnramp) {
//       onramp.openWidgetModal();
//     } else {
//       try {
//         await buy(parseUnits(calculator.payAmount, paymentOption.decimals));
//       } catch (error) {
//         analytics.trackBuyFormDeclineTransaction({
//           network: selectedChain.name,
//           currency: paymentOption.title,
//           amount: calculator.payAmountUSD.toString(),
//         });
//         console.debug(
//           '[handleBuy]: error',
//           (error as unknown as Error).message,
//         );
//       }
//     }
//   };

//   // Widget Setup

//   // Allowance
//   const tokenABI = (
//     selectedChain.key === 'ethereum' ? USDT_ABI : erc20Abi
//   ) as typeof erc20Abi;

//   const { data: allowance, refetch: refetchAllowance } = useReadContract({
//     address: tokenAddress,
//     abi: tokenABI,
//     functionName: 'allowance',
//     args: [address!, contractAddress],
//     query: {
//       enabled: !!tokenAddress && !!address && !!contractAddress,
//     },
//   });

//   const handleApprove = async () => {
//     setApproveModalVisible(true);
//     invariant(
//       tokenAddress,
//       '[ApproveButton:onClick]: `tokenAddress` is not defined',
//     );
//     invariant(
//       approveAsync,
//       '[ApproveButton:onClick]: `approveAsync` is not defined',
//     );

//     analytics.trackApproveFormClick({
//       network: selectedChain.name,
//       token: paymentOption.title,
//       currency: paymentOption.title,
//     });

//     try {
//       if (
//         selectedChain.key === 'ethereum' &&
//         paymentOption.id === 'USDT' &&
//         allowance !== BigInt(0)
//       ) {
//         await approveAsync({
//           address: tokenAddress,
//           abi: tokenABI,
//           functionName: 'approve',
//           args: [contractAddress, BigInt(0)],
//         });
//       }
//       await approveAsync({
//         address: tokenAddress!!,
//         abi: tokenABI,
//         functionName: 'approve',
//         args: [contractAddress, MAX_ALLOWANCE],
//       });
//       analytics.trackApproveFormSuccess({
//         network: selectedChain.name,
//         token: paymentOption.title,
//         currency: paymentOption.title,
//       });
//     } catch (error) {
//       analytics.trackApproveFormRejected({
//         network: selectedChain.name,
//         token: paymentOption.title,
//         currency: paymentOption.title,
//       });
//     } finally {
//       setApproveModalVisible(false);
//     }
//   };

//   const { data: allowanceApproveResult, writeContractAsync: approveAsync } =
//     useWriteContract();

//   const { isLoading: isApproving, status: approveStatus } =
//     useWaitForTransactionReceipt({
//       hash: allowanceApproveResult ? allowanceApproveResult : undefined,
//     });

//   useEffect(() => {
//     if (approveStatus === 'success') {
//       refetchAllowance();
//       refetchBalance();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [approveStatus]);

//   const isNeedApprove =
//     tokenAddress &&
//     isConnected &&
//     (allowance || BigInt(0)) <
//       parseUnits(calculator.payAmount, paymentOption.decimals) &&
//     approveAsync;

//   const isZeroAmount = Boolean(
//     !calculator.payAmount || +calculator.payAmount === 0,
//   );

//   const isAmountLessThanBalance = Boolean(
//     !isOnramp &&
//       userBalance &&
//       Number(userBalance) < Number(calculator.payAmount),
//   );

//   const isAmountLessThanMinimum = Boolean(
//     calculator.payAmount && Number(calculator.payAmount) < Number(minPayAmount),
//   );

//   let isTokenBuyDisabled =
//     isZeroAmount || isAmountLessThanBalance || isAmountLessThanMinimum;

//   if (!isConnected) isTokenBuyDisabled = false;

//   return (
//     <div className='flex h-full items-center'>
//       <div
//         className='relative my-auto flex w-full flex-col overflow-hidden p-[36px]'
//         id='form'
//       >
//         <SuccessModal
//           txHash={trxHash}
//           isVisible={isSuccessModalVisible}
//           setIsVisible={() => setSuccessModalVisible(false)}
//           usdAmount={calculator.payAmountUSD}
//           currency={paymentOption.title}
//         />

//         <TermsModal
//           isVisible={isTermsModalVisible}
//           setIsVisible={() => setTermsModalVisible(false)}
//           onClose={handleBuyConfimed}
//           address={address as Address}
//         />

//         <MergeModal
//           isVisible={isMergeModalVisible}
//           setIsVisible={() => setIsMergeModalVisible(false)}
//         />

//         {(isBuying || isApproving) && (
//           <div className='absolute bottom-0 left-0 right-0 top-0 z-40 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-[4px]'>
//             <StaticLoader />
//           </div>
//         )}

//         <PresaleStageCard />
//         <div className='relative mt-[25px] flex flex-col'>
//           <NetworkSwitcher
//             switchNetwork={(chain) => {
//               return switchNetwork(chain);
//             }}
//             evmAddress={address}
//             currentNetwork={selectedChain.key}
//             paymentOption={paymentOption}
//             setPaymentOption={setPaymentOption}
//             isBuying={isBuying}
//             isApproving={isApproving}
//             profileMerged={
//               (profile.refBalance.value?.addresses.length &&
//                 profile.refBalance.value?.addresses.length > 1) ||
//               false
//             }
//           />
//           <div className='mt-[18px] flex flex-col text-[14px]'>
//             <div className='mb-[9px] flex justify-between uppercase'>
//               <p className='text-[#929292]'>{t('youPay')}:</p>
//               <div className='flex items-center gap-[3px]'>
//                 {address ? (
//                   <>
//                     {userBalance !== null && !isNaN(userBalance) ? (
//                       <>
//                         <p className='text-white opacity-70'>{t('balance')}:</p>
//                         <p className='text-white'>
//                           {userBalance.toLocaleString('en-US', {
//                             maximumFractionDigits: 6,
//                           })}
//                         </p>
//                       </>
//                     ) : (
//                       <span className='h-[13px] w-[40px] animate-pulse rounded-[2px] bg-[#ffffff99]' />
//                     )}
//                   </>
//                 ) : null}
//               </div>
//             </div>
//             <div
//               className={`flex h-[41px] items-center gap-[12px] border-[2px] border-b-[rgba(17,17,17,0.3)] border-l-[rgba(255,255,255,0.3)] border-r-[rgba(17,17,17,0.3)] border-t-[rgba(255,255,255,0.3)] bg-[#2D2B37] px-[12px] py-[8px] ${
//                 (isAmountLessThanBalance || isAmountLessThanMinimum) &&
//                 'border-l-[#FF555D] border-t-[#FF555D] bg-[#690E1380]'
//               }`}
//             >
//               <Image
//                 src={paymentOption.icon}
//                 alt={paymentOption.title}
//                 className='h-[24px] w-[24px]'
//               />
//               <div className='flex w-full items-center justify-between'>
//                 <div className='flex flex-col gap-[4px]'>
//                   <input
//                     value={calculator.payAmount}
//                     onChange={onPayAmountChange}
//                     id='pay-amount'
//                     placeholder={`0.00 ${paymentOption.title}`}
//                     autoComplete='off'
//                     maxLength={7}
//                     type='number'
//                     className={`mt-[1px] bg-[transparent] text-[16px] leading-[12.5px] text-white outline-none [appearance:textfield] placeholder:font-light [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
//                       (isAmountLessThanBalance || isAmountLessThanMinimum) &&
//                       '!text-[#FF555D]'
//                     } `}
//                   />
//                   {paymentOption.type !== 'custom' && (
//                     <p
//                       className={`text-[12px] leading-[12.5px] text-white ${
//                         (isAmountLessThanBalance || isAmountLessThanMinimum) &&
//                         '!text-[#FF555D]'
//                       }`}
//                     >
//                       {calculator.payAmountUSD.toFixed(2)} USDT
//                     </p>
//                   )}
//                 </div>
//                 {userBalance && !isOnramp ? (
//                   <div
//                     className='cursor-pointer text-[14px] text-white opacity-70'
//                     onClick={() =>
//                       calculator.recalculateFromPay(
//                         (
//                           Math.floor(
//                             Number(userBalance) *
//                               100000 *
//                               (paymentOption.type !== 'custom' ? 0.98 : 1),
//                           ) / 100000
//                         ).toString(),
//                       )
//                     }
//                   >
//                     MAX
//                   </div>
//                 ) : null}
//               </div>
//             </div>
//           </div>
//           <div className='mt-[18px] flex flex-col text-[14px]'>
//             <div className='mb-[9px] flex justify-between uppercase'>
//               <p className='text-[#929292]'>{t('youReceive')}:</p>
//               <div className='flex items-center gap-[3px]'>
//                 {address ? (
//                   <>
//                     <p className='text-white opacity-70'>{t('balance')}:</p>
//                     <p className='text-white'>
//                       {profile.refBalance.value?.balance.toLocaleString(
//                         'en-US',
//                       )}
//                     </p>
//                   </>
//                 ) : null}
//               </div>
//             </div>
//             <div className='flex h-[41px] items-center gap-[12px] border-[2px] border-b-[rgba(17,17,17,0.3)] border-l-[rgba(255,255,255,0.3)] border-r-[rgba(17,17,17,0.3)] border-t-[rgba(255,255,255,0.3)] bg-[#2D2B37] px-[12px] py-[8px]'>
//               <TokenIcon className='h-[24px] w-[24px]' />
//               <input
//                 id='receive-amount'
//                 onChange={onReceivedTokensChange}
//                 value={calculator.receiveAmount}
//                 type='number'
//                 placeholder={'0.0 BEAR'}
//                 autoComplete='off'
//                 className={`bg-[transparent] text-[16px] text-white outline-none [appearance:textfield] placeholder:font-light [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
//               />
//             </div>
//           </div>

//           <div className='mt-[32px] flex items-start justify-between gap-[20px] sm:flex-col sm:items-start sm:gap-[30px]'>
//             <div className='flex flex-col items-start justify-between gap-[9px] uppercase text-[#929292] sm:flex-row'>
//               {isAmountLessThanMinimum ? (
//                 <>
//                   <p className='flex-shrink-0'>{t('minPay')}</p>
//                   <div className='flex items-center gap-[0.6rem]'>
//                     <Image
//                       src={paymentOption.icon}
//                       alt={paymentOption.title}
//                       className='h-[24px] w-[24px]'
//                     />
//                     <span className='text-white'>{minPayAmount} </span>
//                     <span>
//                       {/* @ts-ignore */}
//                       {paymentOption.title === 'Bank Card'
//                         ? 'USD'
//                         : paymentOption.title}
//                     </span>
//                   </div>
//                 </>
//               ) : isAmountLessThanBalance ? (
//                 <p className='flex-shrink-0'> {t('noFunds')}</p>
//               ) : (
//                 <>
//                   <p className='flex-shrink-0'>{t('pointRewards')}</p>
//                   <BonusPoints usdTotal={calculator.payAmountUSD} />
//                 </>
//               )}
//             </div>

//             <div className='flex flex-col sm:w-full'>
//               {isNeedApprove ? (
//                 <Button
//                   disabled={isApproving || isApproveModalVisible}
//                   onClick={handleApprove}
//                   className='flex h-[46px] w-auto min-w-[210px] cursor-pointer items-center justify-center gap-[5px] whitespace-nowrap px-[25px] text-center !text-[18px] sm:w-full'
//                   mAuto={false}
//                 >
//                   <PointerIcon />
//                   {isApproving || isApproveModalVisible
//                     ? t('approving')
//                     : `${t('approve')} ${paymentOption.title}`}
//                   <PointerIcon className='rotate-180' />
//                 </Button>
//               ) : (
//                 <>
//                   <Button
//                     onClick={handleBuy}
//                     disabled={isBuying || isTokenBuyDisabled}
//                     className='flex h-[46px] w-auto min-w-[210px] cursor-pointer items-center justify-center gap-[5px] whitespace-nowrap px-[25px] text-center !text-[18px] sm:w-full'
//                     mAuto={false}
//                   >
//                     <PointerIcon />

//                     {isBuying
//                       ? t('buying')
//                       : isConnected
//                         ? t('buy')
//                         : t('connect')}
//                     <PointerIcon className='rotate-180' />
//                   </Button>
//                 </>
//               )}
//               <a
//                 href='https://docs.beerbear.io/how-to-buy'
//                 target='_blank'
//                 className='m-auto mt-[6px] cursor-pointer border-b-[2px] border-b-[#929292] text-center text-[13px] text-[#929292] transition-all hover:text-white'
//               >
//                 {t('howToBuy')}
//               </a>
//             </div>
//           </div>
//         </div>

//         {onramp.modal}
//       </div>
//     </div>
//   );
// };
