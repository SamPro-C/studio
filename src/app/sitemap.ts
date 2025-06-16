
import type { MetadataRoute } from 'next';
import { services, mediaProjects, softwareProjects } from '@/lib/data';

// IMPORTANT: Replace with your actual domain
const BASE_URL = 'https://www.sampro.media';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();

  // Static pages
  const staticPages = [
    '/',
    '/about',
    '/services',
    '/media-portfolio',
    '/software-portfolio',
    '/case-studies',
    '/ai-tools',
    '/ai-description-generator',
    '/ai-social-media-snippet-generator',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '/' ? 'daily' : 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }));

  // Dynamic service pages
  const servicePages = services.map((service) => ({
    url: `${BASE_URL}/services/${service.id}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Dynamic media project pages
  const mediaProjectPages = mediaProjects.map((project) => ({
    url: `${BASE_URL}/media-portfolio/${project.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  // Dynamic software project pages
  const softwareProjectPages = softwareProjects.map((project) => ({
    url: `${BASE_URL}/software-portfolio/${project.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...mediaProjectPages,
    ...softwareProjectPages,
  ];
}
