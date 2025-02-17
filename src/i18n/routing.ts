import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: [
    'en',
    'pl',
    'fr',
    'de',
    'hu',
    'pt',
    'ru',
    'tr',
    'es',
    'it',
    'ua',
    'kr',
  ],

  // Used when no locale matches
  defaultLocale: 'en',
});

export type LocaleName =
  | 'en'
  | 'pl'
  | 'fr'
  | 'de'
  | 'hu'
  | 'pt'
  | 'ru'
  | 'tr'
  | 'es'
  | 'it'
  | 'ua'
  | 'kr';
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
