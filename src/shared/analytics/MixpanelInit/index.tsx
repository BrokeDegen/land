'use client';

import { useEffect } from 'react';
import { analytics } from '../analytics';

export const MixpanelInit = (props: { locale: string }) => {
  useEffect(() => {
    analytics.trackPageLoad(props.locale);
  }, []);

  return null;
};
