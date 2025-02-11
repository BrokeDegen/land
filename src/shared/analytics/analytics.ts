import { createAnalytics } from '@d4lb4eb/presale-ui-logic-sol/analytics';
import { fathomClient } from './clients/fathom';
import { gaClient } from './clients/ga';
import { mixpanelClient } from './clients/mixpanel';
import { CookieHelper } from '../utils/cookieHelper';

const DEBUG_ANALYTICS = process.env.NODE_ENV === 'development';

export const landAnalytics = _createAnalytics((eventName, properties) => {
  fathomClient.track(eventName, properties);
  gaClient.track(eventName, properties);
  // mixpanelClient.track(eventName, properties);
}, DEBUG_ANALYTICS);

const coreAnalytics = createAnalytics((eventName, properties) => {
  fathomClient.track(eventName, properties);
  gaClient.track(eventName, properties);
  // mixpanelClient.track(eventName, properties);
}, DEBUG_ANALYTICS);

export const analytics = { ...coreAnalytics, ...landAnalytics };

export function _createAnalytics(
  trackEvent: (eventName: string, properties: Record<string, unknown>) => void,
  isDebug: boolean,
) {
  const _trackEvent = (event: string, data: Record<string, unknown>) => {
    if (isDebug) {
      console.debug('[ANALYTICS]: track', event, data);
    }
    trackEvent(event, data);
  };

  function trackCookieAccepted() {
    _trackEvent('cookie_accepted', {});
  }
  function trackCookieDeclined() {
    _trackEvent('cookie_declined', {});
  }

  function trackHeaderLinkClick(link: string) {
    _trackEvent('header_link_click', { link });
  }

  function trackLanguageChange(language: string) {
    _trackEvent('language_change', { language });
  }

  function trackSocialMediaClick(
    place: 'join_us' | 'header' | 'footer' | 'hero',
    media: string,
  ) {
    _trackEvent('social_media_button_click', { place, media });
  }

  function trackAppLinkClick() {
    _trackEvent('launch_app_button_click', {});
  }

  function trackFooterLinkClick() {
    _trackEvent('footer_link_click', {});
  }

  function trackAboutBtnClick(place: 'yield' | 'learn') {
    _trackEvent('about_button_click', { place });
  }

  function trackApplyNowClick() {
    _trackEvent('apply_now_button_click', {});
  }

  function trackPageLoad(language: string) {
    mixpanelClient.track('page_load', {
      language,
    });
  }

  function trackMergeProfileInit(address: string) {
    trackEvent('profile_merge_init', { mainAddress: address });
  }

  function trackMergeProfileSecondWalletConnect(
    mainAddress: string,
    newWallet: string,
  ) {
    trackEvent('profile_merge_second_wallet_connect', {
      mainAddress,
      newWallet,
    });
  }

  function trackMergeProfileEvmSignature(address: string, signature: string) {
    trackEvent('profile_merge_evm_signature', { address, signature });
  }

  function trackMergeProfileSolSignature(address: string, signature: string) {
    trackEvent('profile_merge_sol_signature', { address, signature });
  }

  function trackMergeProfileSuccess(evmAddress: string, solAddress: string) {
    trackEvent('profile_merge_success', { evmAddress, solAddress });
  }

  function trackMergeProfileError(evmAddress?: string, solAddress?: string) {
    trackEvent('profile_merge_error', { evmAddress, solAddress });
  }

  function trackHeaderBlockchainChoose(blockchain: string) {
    trackEvent('connect_blockchain_choose', { blockchain });
  }
  return {
    trackCookieAccepted,
    trackCookieDeclined,
    trackPageLoad,
    trackHeaderLinkClick,
    trackLanguageChange,
    trackSocialMediaClick,
    trackAppLinkClick,
    trackFooterLinkClick,
    trackAboutBtnClick,
    trackApplyNowClick,
    trackMergeProfileInit,
    trackMergeProfileSecondWalletConnect,
    trackMergeProfileEvmSignature,
    trackMergeProfileSolSignature,
    trackMergeProfileSuccess,
    trackMergeProfileError,
    trackHeaderBlockchainChoose,
  };
}
