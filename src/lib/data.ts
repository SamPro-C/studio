import type { LucideIcon } from 'lucide-react';
import { Film, Clapperboard, CodeXml, Smartphone, Briefcase, LineChart, Users, Target, Lightbulb, Search } from 'lucide-react';

export interface MediaProject {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  dataAiHint?: string;
}

export interface SoftwareProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  outcome: string;
  imageUrl: string;
  repoLink?: string;
  liveLink?: string;
  dataAiHint?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  details: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  problem: string;
  solution: string;
  results: string;
  imageUrl?: string;
  tags: string[];
  dataAiHint?: string;
}

export const mediaProjects: MediaProject[] = [
  {
    id: '1',
    title: 'Corporate Branding Video',
    description: 'A compelling video showcasing the new brand identity for a major corporation.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'corporate video',
    category: 'Video Production',
  },
  {
    id: '2',
    title: 'Animated Explainer Series',
    description: 'A series of short animated videos explaining complex financial products.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'animation series',
    category: 'Animation',
  },
  {
    id: '3',
    title: 'Social Media Campaign Content',
    description: 'Engaging visual content created for a viral social media marketing campaign.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'social media',
    category: 'Social Media',
  },
  {
    id: '4',
    title: 'Documentary Film Editing',
    description: 'Post-production and editing for an award-winning documentary film.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'film editing',
    category: 'Post-Production',
  },
];

export const softwareProjects: SoftwareProject[] = [
  {
    id: 's1',
    title: 'E-commerce Platform',
    description: 'A scalable e-commerce platform with custom features and third-party integrations.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    outcome: 'Increased sales by 40% and improved user engagement.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'ecommerce platform',
    repoLink: '#',
    liveLink: '#',
  },
  {
    id: 's2',
    title: 'Mobile Banking App',
    description: 'A secure and user-friendly mobile banking application for iOS and Android.',
    technologies: ['React Native', 'Firebase', 'Java', 'Swift'],
    outcome: 'Achieved 100,000+ downloads within the first 6 months.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'mobile app',
    liveLink: '#',
  },
  {
    id: 's3',
    title: 'CRM System Customization',
    description: 'Tailored a leading CRM system to meet specific business workflow requirements.',
    technologies: ['Salesforce Apex', 'Lightning Web Components', 'API Integration'],
    outcome: 'Improved sales team productivity by 25%.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'crm system',
  },
  {
    id: 's4',
    title: 'Data Analytics Dashboard',
    description: 'An interactive dashboard for visualizing and analyzing business intelligence data.',
    technologies: ['Python (Flask)', 'D3.js', 'MongoDB'],
    outcome: 'Enabled data-driven decision-making across the organization.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'analytics dashboard',
    repoLink: '#',
  },
];

export const services: Service[] = [
  {
    id: 'media1',
    title: 'Video Production',
    icon: Film,
    description: 'Comprehensive video production services from concept to final cut.',
    details: ['Corporate Videos', 'Commercials', 'Documentaries', 'Event Coverage', 'Drone Videography'],
  },
  {
    id: 'media2',
    title: 'Animation & Motion Graphics',
    icon: Clapperboard,
    description: 'Creative 2D/3D animation and motion graphics to bring your ideas to life.',
    details: ['Explainer Videos', 'Product Animations', 'Logo Animations', 'Visual Effects'],
  },
  {
    id: 'software1',
    title: 'Web Development',
    icon: CodeXml,
    description: 'Custom web application development tailored to your business needs.',
    details: ['Frontend Development (React, Vue, Angular)', 'Backend Development (Node.js, Python, Java)', 'Full-Stack Solutions', 'E-commerce Platforms', 'CMS Development'],
  },
  {
    id: 'software2',
    title: 'Mobile App Development',
    icon: Smartphone,
    description: 'Native and cross-platform mobile app development for iOS and Android.',
    details: ['iOS App Development (Swift, Objective-C)', 'Android App Development (Kotlin, Java)', 'React Native', 'Flutter'],
  },
  {
    id: 'programming1',
    title: 'Custom Software Solutions',
    icon: Briefcase,
    description: 'Bespoke software solutions to optimize your operations and drive growth.',
    details: ['Enterprise Software', 'SaaS Product Development', 'API Design & Integration', 'Database Design & Management'],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: 'cs1',
    title: 'Boosting Engagement with Interactive Video',
    client: 'Tech Innovators Inc.',
    problem: 'Low user engagement on their educational platform despite high-quality content.',
    solution: 'Developed a series of interactive video modules with quizzes and branching narratives, integrated into their existing LMS.',
    results: 'Increased average user session time by 60% and course completion rates by 45%. Achieved a 90% positive feedback score from users on the new interactive content.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'interactive video',
    tags: ['Video Production', 'Engagement', 'EdTech'],
  },
  {
    id: 'cs2',
    title: 'Streamlining Operations with a Custom ERP',
    client: 'Global Logistics Co.',
    problem: 'Inefficient manual processes and disparate systems were hindering growth and causing operational bottlenecks.',
    solution: 'Designed and implemented a custom ERP system that integrated all core business functions, from inventory management to NnNancereporting.',
    results: 'Reduced operational costs by 20%, improved data accuracy by 98%, and provided real-time visibility into business performance, enabling faster decision-making.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'erp system',
    tags: ['Software Development', 'ERP', 'Logistics'],
  },
  {
    id: 'cs3',
    title: 'Successful Product Launch via Animated Campaign',
    client: 'StartupX',
    problem: 'Needed to create buzz and explain a complex new SaaS product to a wide audience before launch.',
    solution: 'Produced a series of engaging animated explainer videos and a targeted social media campaign to showcase the product\'s unique value proposition.',
    results: 'Generated over 10,000 pre-launch sign-ups, secured features in major tech blogs, and exceeded initial sales targets by 30% in the first quarter.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'animated campaign',
    tags: ['Animation', 'Marketing', 'SaaS'],
  },
];

export const aiToolTips = [
  { icon: Target, text: "Clearly define your project's purpose and unique selling points." },
  { icon: Users, text: "Understand your target audience and tailor the language accordingly." },
  { icon: Search, text: "Incorporate relevant keywords naturally for better SEO." },
  { icon: Lightbulb, text: "Highlight key features and benefits concisely." },
  { icon: LineChart, text: "Focus on the impact and value your project delivers." },
];
