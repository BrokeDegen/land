import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { safeStorage } from '@/shared/utils/safeStorage';
import { analytics } from '@/shared/analytics';
import { signal } from '@preact/signals-react';
import { useProfile } from '@d4lb4eb/presale-ui-logic-sol/entities';

export const getWalletNameFromStorage = () => {
  return JSON.parse(safeStorage.getItem('wagmi.store') || '{}')?.state
    ?.connections?.value?.[0]?.[1]?.connector?.name;
};
export const walletName = signal<string>('');

const useWalletConnectAnalytic = (
  porfileCreated: boolean,
  isWalletNew: boolean,
) => {
  const { isConnected, address } = useAccount();

  //if new user, track wallet name and network
  const asyncTrack = async () => {
    if (isWalletNew) {
      analytics.trackNewConnectSuccess({
        wallet: walletName.value || getWalletNameFromStorage() || 'unknown',
        place: safeStorage.getItem('walletConnect') || 'form',
        connectType: 'browser',
      });
    } else {
      analytics.trackAuthorizedSuccess({
        wallet: walletName.value || getWalletNameFromStorage() || 'unknown',
        place: safeStorage.getItem('walletConnect') || 'form',
        connectType: 'browser',
      });
    }
  };

  useEffect(() => {
    if (isConnected && porfileCreated) {
      asyncTrack();
    }
  }, [isConnected]);
};

export default useWalletConnectAnalytic;

export const setWallectConnectPlace = (place: 'header' | 'form') => {
  safeStorage.setItem('walletConnect', place);
};
