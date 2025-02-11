import { AnalyticsClient } from '../interfaces';

const trackGaEvent = (eventName: string, data: Record<string, unknown>) => {
  if (window.gtag) {
    window.gtag('event', eventName, data);
  }
};

export const gaClient: AnalyticsClient = {
  track: trackGaEvent,
};
