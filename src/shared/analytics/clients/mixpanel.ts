import mixpanel from 'mixpanel-browser';
import { AnalyticsClient } from '../interfaces';
import { CookieHelper } from '@/shared/utils/cookieHelper';

const MIXPANEL_ID = process.env.NEXT_PUBLIC_MIXPANEL_ID ?? '';

// create an instance of the mixpanel client
mixpanel.init(MIXPANEL_ID);

const trackMixpanelEvent = (
  eventName: string,
  properties: Record<string, unknown>,
) => {
  mixpanel.track(eventName, properties, { send_immediately: true });
};

export const mixpanelClient: AnalyticsClient = {
  track: trackMixpanelEvent,
};

export const mixpanelSetPeople = (properties: Record<string, unknown>) => {
  mixpanel.people.set(properties);
};

export const mixpanelIdentify = (address: string) => {
  const analyticsAllowed = CookieHelper.getCookie('cookie-consent') !== 'false';
  if (analyticsAllowed) mixpanel.identify(address.toLowerCase());
};

export const mixpanelReset = () => mixpanel.reset();
