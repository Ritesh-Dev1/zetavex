import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/admin/',
          '/api/auth/',
        ],
      },
      // Explicit allowance for AI Search & LLM scrapers (ChatGPT, Claude, Google AI, Perplexity)
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'Google-Extended',
          'ClaudeBot',
          'anthropic-ai',
          'PerplexityBot',
          'Applebot-Extended',
          'cohere-ai',
        ],
        allow: [
          '/',
          '/llms.txt',
          '/llms-full.txt',
          '/services/',
          '/projects/',
          '/team/',
          '/privacy-policy',
          '/terms-and-conditions',
        ],
        disallow: [
          '/admin/',
          '/api/',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
