import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Crypto Token',
    short_name: '',
    description: '',
    start_url: '/',
    display: 'standalone',
    background_color: '#090A13',
    theme_color: '#090A13',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
