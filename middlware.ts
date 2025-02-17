import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|pl|fr|jp|de|hu|pt|kr|ru|zh|tr|it|kr|ua|/:path*'],
};
