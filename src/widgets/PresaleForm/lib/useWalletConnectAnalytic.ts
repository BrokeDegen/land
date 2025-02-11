import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { safeStorage } from '@/shared/utils/safe-storage';
import { analytics } from '@/shared/analytics';
import {
  mixpanelIdentify,
  mixpanelSetPeople,
} from '@/shared/analytics/clients/mixpanel';
import { signal } from '@preact/signals-react';
import { useReferralModel } from '@/entities/referrals';
// import { useAppKitEvents } from '@reown/appkit/react';

export const getWalletNameFromStorage = () => {
  return JSON.parse(safeStorage.getItem('wagmi.store') || '{}')?.state
    ?.connections?.value?.[0]?.[1]?.connector?.name;
};
export const walletName = signal<string>('');

const useWalletConnectAnalytic = () => {
  const { isConnected, address } = useAccount();
  const { createProfileResponse } = useReferralModel();
  // const events = useAppKitEvents();

  //if new user, track wallet name and network
  const asyncTrack = async () => {
    await setTimeout(() => {
      // mixpanelIdentify(address as string);
      // mixpanelSetPeople({
      //   walletName: walletName.value || getWalletNameFromStorage() || 'unknown',
      // });
      if (createProfileResponse.value?.is_new) {
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
    }, 1000); //HACK ALERT: wait for the profile to be created
  };

  useEffect(() => {
    if (isConnected) {
      asyncTrack();
    }
  }, [isConnected]);

  // useEffect(() => {
  //   if (events.data.event === 'CONNECT_ERROR') {
  //     analytics.trackWalletConnectAborted({
  //       place: safeStorage.getItem('walletConnect') || 'form',
  //       wallet: getWalletNameFromStorage() || 'unknown',
  //     });
  //     safeStorage.removeItem('walletConnect');
  //     walletName.value = '';
  //   }

  //   if (events.data.event === 'SELECT_WALLET') {
  //     walletName.value = events.data.properties.name;
  //     analytics.trackWalletConnectWalletChoose({
  //       wallet: events.data.properties.name,
  //       place: safeStorage.getItem('walletConnect') || 'form',
  //     });
  //   }

  //   if (events.data.event === 'CLICK_WALLET_HELP') {
  //     analytics.trackWalletConnectClickInfo({
  //       place: safeStorage.getItem('walletConnect') || 'form',
  //     });
  //   }

  //   if (events.data.event === 'CLICK_ALL_WALLETS') {
  //     analytics.trackWalletConnectExpandAllWallets({
  //       place: safeStorage.getItem('walletConnect') || 'form',
  //     });
  //   }

  //   if (events.data.event === 'CLICK_GET_WALLET') {
  //     analytics.trackWalletConnectInfoGetWallet({
  //       place: safeStorage.getItem('walletConnect') || 'form',
  //     });
  //   }

  //   if (events.data.event === 'MODAL_OPEN') {
  //     analytics.trackWalletConnectFormOpen({
  //       place: safeStorage.getItem('walletConnect') || 'form',
  //     });
  //   }
  // }, [events]);
};

export default useWalletConnectAnalytic;

export const setWallectConnectPlace = (place: 'header' | 'form') => {
  safeStorage.setItem('walletConnect', place);
};
