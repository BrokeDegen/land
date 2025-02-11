import * as Fathom from 'fathom-client';
import { AnalyticsClient } from '../interfaces';

function trackFathomEvent(event: string, data: any) {
  if (window?.fathom?.trackEvent) {
    Fathom.trackEvent(event, data);
  }
}

export const fathomClient: AnalyticsClient = {
  track: trackFathomEvent,
};
