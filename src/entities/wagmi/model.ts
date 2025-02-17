import { CHAINS, NETWORK_TYPE } from './constants';
import { useCurrentNetwork as _useCurrentNetwork } from '@d4lb4eb/presale-ui-logic-sol/wagmi';
import { SupportedChainKey } from './interfaces';

export const useCurrentNetwork = () =>
  _useCurrentNetwork<SupportedChainKey>({
    chains: [...CHAINS],
    networkType: NETWORK_TYPE,
  });
