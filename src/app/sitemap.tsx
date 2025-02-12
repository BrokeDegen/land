import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://google.com',
      lastModified: new Date(),
      alternates: {
        languages: {
          de: 'https://google.com/de',
          en: 'https://google.com/en',
          es: 'https://google.com/es',
          fr: 'https://google.com/fr',
          hu: 'https://google.com/hu',
          pl: 'https://google.com/pl',
          pt: 'https://google.com/pt',
          ru: 'https://google.com/ru',
          tr: 'https://google.com/tr',
          kr: 'https://google.com/kr',
          it: 'https://google.com/it',
        },
      },
    },
  ];
}
