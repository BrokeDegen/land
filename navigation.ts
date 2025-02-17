import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = [
  'en',
  'pl',
  'fr',
  'jp',
  'de',
  'hu',
  'pt',
  'kr',
  'ru',
  'zh',
  'tr',
  'it',
  'ua',
  'kr',
];
export const localePrefix = 'as-needed';

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });
