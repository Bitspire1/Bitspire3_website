import { MetadataRoute } from 'next';
import client from '@tina/__generated__/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bitspire.pl';
  
  // Fetch all portfolio posts
  let portfolioPosts: MetadataRoute.Sitemap = [];
  try {
    const portfolioConnection = await client.queries.portfolioConnection();
    
    portfolioPosts = (portfolioConnection.data.portfolioConnection.edges || [])
      .map(edge => edge?.node)
      .filter(node => node !== null && node !== undefined)
      .flatMap(node => {
        if (!node) return [];
        
        const slug = node._sys.filename;
        const locale = node._sys.relativePath.split('/')[0];
        const date = node.date ? new Date(node.date) : new Date();
        
        return {
          url: `${baseUrl}/${locale}/portfolio/${slug}`,
          lastModified: date,
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        };
      });
  } catch (error) {
    console.error('Error fetching portfolio posts for sitemap:', error);
  }
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...portfolioPosts,
    {
      url: `${baseUrl}/polityka-prywatnosci`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/en/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/polityka-cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/en/cookies-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/regulamin`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/en/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
