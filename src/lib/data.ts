
import type { LucideIcon } from 'lucide-react';
import { Palette, LayoutGrid, CodeXml, Camera, LineChart, Users, Target, Lightbulb, Search } from 'lucide-react';

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

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  quote: string;
  avatarUrl?: string;
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
    id: 'graphic_design',
    title: 'Graphic Design',
    icon: Palette,
    description: "Creative and impactful graphic design services to elevate your brand's visual identity.",
    details: [
      'Logo Design',
      'Brand Identity Design',
      'Business Cards',
      'Flyers and Brochures',
      'Social Media Graphics',
      'Website Graphics',
      'Packaging Design',
      'Infographics',
      'Posters and Banners',
      'Magazine and Book Layouts',
      'Stationery Design',
      'Presentation Design',
    ],
  },
  {
    id: 'web_design',
    title: 'Web Design',
    icon: LayoutGrid,
    description: 'Building responsive, user-friendly websites and e-commerce solutions that perform.',
    details: [
      'Custom Website Design',
      'E-commerce Development',
      'Website Management and Updates',
      'SEO Optimization',
      'Web Hosting and Domain Registration',
      'UI/UX Design',
      'Responsive Design for All Devices',
    ],
  },
  {
    id: 'programming',
    title: 'Programming',
    icon: CodeXml,
    description: 'Custom software, mobile apps, and backend solutions to power your business.',
    details: [
      'Custom Software Development',
      'Mobile App Development',
      'API Development and Integration',
      'Database Design and Management',
      'Website Backend Development',
      'Automation Scripts',
      'Maintenance and Debugging',
    ],
  },
  {
    id: 'video_photography',
    title: 'Video & Photography',
    icon: Camera,
    description: 'Professional video and photography services to capture your vision and tell your story.',
    details: [
      'Event Coverage (Weddings, Corporate, Parties)',
      'Product Photography',
      'Portrait and Headshot Photography',
      'Real Estate Photography and Videography',
      'Promotional and Marketing Videos',
      'Drone Photography and Videography',
      'Video Editing and Post-Production',
    ],
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
    solution: 'Designed and implemented a custom ERP system that integrated all core business functions, from inventory management to finance reporting.',
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

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Alice Wonderland',
    company: 'Tech Solutions Inc.',
    quote: "Sampro Media transformed our online presence! Their creativity and technical expertise are unmatched. We've seen a significant boost in engagement since partnering with them.",
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'professional portrait',
  },
  {
    id: 't2',
    name: 'Bob The Builder',
    company: 'Creative Constructions Co.',
    quote: "The custom software Sampro Media developed for us has streamlined our operations incredibly. It's intuitive, powerful, and has saved us countless hours.",
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'happy client',
  },
  {
    id: 't3',
    name: 'Carol Danvers',
    company: 'Starlight Innovations',
    quote: "Their video production quality is top-notch. Sampro Media captured our brand's essence perfectly and delivered a final product that exceeded all expectations.",
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'business person',
  },
];
