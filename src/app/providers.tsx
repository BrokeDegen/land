'use client';

import { isDev, MIXPANEL_TOKEN } from '@/shared/constants/global';
import { init } from '@/shared/lib/mixpanel';
import { PropsWithChildren, useLayoutEffect } from 'react';

export const Providers = ({ children }: PropsWithChildren) => {
  useLayoutEffect(() => {
    if (MIXPANEL_TOKEN) {
      init(MIXPANEL_TOKEN, {
        debug: isDev,
        ignore_dnt: true,
      });
    }
  }, []);

  return <>{children}</>;
};
