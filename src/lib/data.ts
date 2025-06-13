
import type { LucideIcon } from 'lucide-react';
import { Palette, LayoutGrid, CodeXml, Camera, LineChart, Users, Target, Lightbulb, Search, Cpu, Bot, FileText, Briefcase, MessageSquare, Aperture, Tv, Info, Mail, BookOpen, Film } from 'lucide-react';

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
  icon: LucideIcon;
  description: string;
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
    description: 'A compelling video showcasing the new brand identity for a major corporation, produced by our Kenyan media team.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'corporate video Kenya',
    category: 'Video Production',
  },
  {
    id: '2',
    title: 'Animated Explainer Series',
    description: 'A series of short animated videos explaining complex financial products, designed for global audiences.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'animation series global',
    category: 'Animation',
  },
  {
    id: '3',
    title: 'Social Media Campaign Content',
    description: 'Engaging visual content created for a viral social media marketing campaign, targeting users in Kenya and internationally.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'social media Kenya',
    category: 'Social Media',
  },
  {
    id: '4',
    title: 'Documentary Film Editing',
    description: 'Post-production and editing for an award-winning documentary film with international distribution.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'film editing international',
    category: 'Post-Production',
  },
];

export const softwareProjects: SoftwareProject[] = [
  {
    id: 's1',
    title: 'E-commerce Platform for Kenyan Market',
    description: 'A scalable e-commerce platform with custom features and third-party integrations, tailored for businesses in Kenya.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    outcome: 'Increased sales by 40% and improved user engagement for our Kenyan client.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'ecommerce Kenya',
    repoLink: '#',
    liveLink: '#',
  },
  {
    id: 's2',
    title: 'Mobile Banking App (Global Reach)',
    description: 'A secure and user-friendly mobile banking application for iOS and Android, serving customers worldwide.',
    technologies: ['React Native', 'Firebase', 'Java', 'Swift'],
    outcome: 'Achieved 100,000+ downloads within the first 6 months across multiple countries.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'mobile app global',
    liveLink: '#',
  },
  {
    id: 's3',
    title: 'CRM System Customization for Kenyan Enterprise',
    description: 'Tailored a leading CRM system to meet specific business workflow requirements for a large Kenyan company.',
    technologies: ['Salesforce Apex', 'Lightning Web Components', 'API Integration'],
    outcome: 'Improved sales team productivity by 25%.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'crm system Kenya',
  },
  {
    id: 's4',
    title: 'Data Analytics Dashboard (International Client)',
    description: 'An interactive dashboard for visualizing and analyzing business intelligence data for a multinational corporation.',
    technologies: ['Python (Flask)', 'D3.js', 'MongoDB'],
    outcome: 'Enabled data-driven decision-making across the organization globally.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'analytics dashboard international',
    repoLink: '#',
  },
];

export const services: Service[] = [
  {
    id: 'graphic_design',
    title: 'Graphic Design',
    icon: Palette,
    description: "Creative and impactful graphic design services to elevate your brand's visual identity, for clients in Kenya and worldwide.",
    details: [
      'Logo Design & Brand Identity',
      'Marketing & Advertising Materials',
      'Social Media Graphics & Web Banners',
      'Packaging Design & Print Layouts',
      'Infographics & Presentation Design',
    ],
  },
  {
    id: 'web_design',
    title: 'Web Design & Development',
    icon: LayoutGrid,
    description: 'Building responsive, user-friendly websites and e-commerce solutions that perform for businesses in Kenya and globally.',
    details: [
      'Custom UI/UX Web Design',
      'E-commerce & Online Stores',
      'Content Management Systems (CMS)',
      'Responsive & Mobile-First Development',
      'Website Maintenance & Support',
    ],
  },
  {
    id: 'programming',
    title: 'Software & App Development',
    icon: CodeXml,
    description: 'Custom software, mobile apps, and backend solutions to power your business, developed by our expert team in Kenya for local and international needs.',
    details: [
      'Bespoke Software Solutions',
      'Native & Cross-Platform Mobile Apps',
      'API Development & Integrations',
      'Cloud Architecture & Deployment',
      'Ongoing Technical Support',
    ],
  },
  {
    id: 'video_photography',
    title: 'Media Production',
    icon: Camera,
    description: 'Professional video and photography services in Kenya to capture your vision and tell your story effectively to a global audience.',
    details: [
      'Corporate Videos & Commercials',
      'Event Coverage (Video & Photo)',
      'Product Photography & Videography',
      'Documentaries & Short Films',
      'Animation & Motion Graphics',
    ],
  },
  {
    id: 'digital_marketing',
    title: 'Digital Marketing & SEO',
    icon: Search,
    description: 'Strategic digital marketing and SEO services to boost your online visibility and reach in Kenya and global markets.',
    details: [
      'Search Engine Optimization (SEO)',
      'Pay-Per-Click (PPC) Advertising',
      'Social Media Marketing (SMM)',
      'Content Marketing Strategy',
      'Email Marketing Campaigns',
    ],
  },
  {
    id: 'ui_ux_consultancy',
    title: 'UI/UX Design Consultancy',
    icon: Users,
    description: 'Expert UI/UX consultancy focused on creating intuitive and engaging digital experiences for users in Kenya and internationally.',
    details: [
      'User Research & Persona Development',
      'Wireframing & Prototyping',
      'Usability Testing & Analysis',
      'Interaction Design & Visual Polish',
      'Accessibility (A11Y) Compliance',
    ],
  },
  {
    id: 'ai_solutions',
    title: 'AI Solutions & Integration',
    icon: Cpu,
    description: 'Leveraging artificial intelligence to build innovative solutions and integrate AI capabilities into your existing systems for clients in Kenya and worldwide.',
    details: [
      'Custom AI Model Development',
      'Machine Learning Applications',
      'Natural Language Processing (NLP) Tools',
      'AI-Powered Automation & Chatbots',
      'AI Strategy & Consultation',
    ],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: 'cs1',
    title: 'Boosting Engagement with Interactive Video for a Kenyan EdTech',
    client: 'Tech Innovators Kenya',
    problem: 'Low user engagement on their educational platform despite high-quality content targeting Kenyan students.',
    solution: 'Developed a series of interactive video modules with quizzes and branching narratives, integrated into their existing LMS, localized for the Kenyan curriculum.',
    results: 'Increased average user session time by 60% and course completion rates by 45%. Achieved a 90% positive feedback score from users on the new interactive content.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'interactive video Kenya',
    tags: ['Video Production', 'Engagement', 'EdTech', 'Kenya'],
  },
  {
    id: 'cs2',
    title: 'Streamlining Global Operations with a Custom ERP from Kenya',
    client: 'Global Logistics Co. (HQ: Kenya)',
    problem: 'Inefficient manual processes and disparate systems were hindering growth and causing operational bottlenecks for their international operations, managed from Kenya.',
    solution: 'Designed and implemented a custom ERP system that integrated all core business functions, from inventory management to finance reporting, deployable globally.',
    results: 'Reduced operational costs by 20%, improved data accuracy by 98%, and provided real-time visibility into business performance, enabling faster decision-making worldwide.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'erp system global',
    tags: ['Software Development', 'ERP', 'Logistics', 'Global'],
  },
  {
    id: 'cs3',
    title: 'Successful Product Launch via Animated Campaign for Global SaaS',
    client: 'StartupX International',
    problem: 'Needed to create buzz and explain a complex new SaaS product to a wide international audience before launch.',
    solution: 'Produced a series of engaging animated explainer videos and a targeted social media campaign to showcase the product\'s unique value proposition to global users.',
    results: 'Generated over 10,000 pre-launch sign-ups, secured features in major tech blogs, and exceeded initial sales targets by 30% in the first quarter.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'animated campaign saas',
    tags: ['Animation', 'Marketing', 'SaaS', 'International'],
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
    company: 'Tech Solutions Inc. (Kenya)',
    quote: "Sampro Media transformed our online presence in Kenya! Their creativity and technical expertise are unmatched. We've seen a significant boost in engagement since partnering with them for our software needs.",
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'professional portrait kenya',
  },
  {
    id: 't2',
    name: 'Bob The Builder',
    company: 'Creative Constructions Co. (Global)',
    quote: "The custom software Sampro Media developed for us has streamlined our global operations incredibly. It's intuitive, powerful, and has saved us countless hours. Highly recommend their development services.",
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'happy client global',
  },
  {
    id: 't3',
    name: 'Carol Danvers',
    company: 'Starlight Innovations (Kenya & International)',
    quote: "Their video production quality is top-notch. Sampro Media captured our brand's essence perfectly for both our Kenyan and international campaigns, delivering a final product that exceeded all expectations.",
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'business person international',
  },
];
