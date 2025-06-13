
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
  longDescription: string;
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
    id: 'graphic-design',
    title: 'Graphic Design',
    icon: Palette,
    description: "Creative and impactful graphic design services to elevate your brand's visual identity, for clients in Kenya and worldwide.",
    details: [
      "We craft unique logos and comprehensive brand identity systems that capture your essence and ensure a memorable, consistent presence across all touchpoints, from digital platforms to print materials.",
      "Our team designs compelling marketing and advertising collateral, including brochures, flyers, social media ads, and digital banners, all tailored to effectively communicate your message and drive engagement.",
      "Boost your online presence with professionally designed social media graphics and web banners optimized for various platforms, ensuring your brand looks cohesive and captivating online.",
      "From concept to production, we create eye-catching packaging designs and precise print layouts for magazines, books, and reports, ensuring your physical products and publications stand out.",
      "Transform complex information into visually engaging infographics and professional presentation designs that clarify your message, captivate your audience, and support your communication goals.",
    ],
    longDescription: "Our graphic design services focus on creating visually compelling assets that communicate your brand's message effectively. We work with businesses in Kenya and internationally to develop everything from logos that make a lasting first impression to comprehensive branding packages that ensure consistency across all platforms. Whether you need engaging social media graphics, professional marketing materials, or eye-catching packaging, our team combines creativity with strategic thinking to deliver designs that resonate with your target audience and achieve your business objectives. We believe good design is good business, and we're passionate about helping you look your best.",
  },
  {
    id: 'web-design-development',
    title: 'Web Design & Development',
    icon: LayoutGrid,
    description: 'Building responsive, user-friendly websites and e-commerce solutions that perform for businesses in Kenya and globally.',
    details: [
      "We create bespoke user interfaces (UI) and user experiences (UX) that are not only visually appealing but also intuitive and tailored to your specific audience, ensuring seamless navigation and interaction.",
      "Launch or enhance your online retail presence with our custom e-commerce solutions, featuring secure payment gateways, robust inventory management, and a user-friendly shopping experience designed to convert visitors into customers.",
      "Empower your team to manage website content effortlessly with our custom CMS integrations (e.g., WordPress, Strapi), providing flexibility and control over your digital narrative.",
      "We build websites that look and perform flawlessly on all devices—desktops, tablets, and smartphones—by prioritizing a mobile-first approach to ensure maximum reach and accessibility.",
      "Keep your website secure, up-to-date, and performing optimally with our ongoing maintenance and support services, including updates, backups, and troubleshooting.",
    ],
    longDescription: "Sampro Media specializes in crafting high-performance websites that are not only visually stunning but also incredibly functional and user-friendly. Serving clients in Kenya and across the globe, we build everything from informative brochure sites to complex e-commerce platforms. Our process emphasizes responsive, mobile-first design to ensure a seamless experience on all devices. We integrate robust Content Management Systems (CMS) for easy content updates and provide ongoing maintenance and support to keep your digital presence strong and secure. Let us build the online foundation your business needs to thrive in the digital age.",
  },
  {
    id: 'software-app-development',
    title: 'Software & App Development',
    icon: CodeXml,
    description: 'Custom software, mobile apps, and backend solutions to power your business, developed by our expert team in Kenya for local and international needs.',
    details: [
      "Our team develops tailored software solutions designed to meet your unique business requirements, streamline operations, and enhance productivity, from internal tools to complex enterprise applications.",
      "Reach your audience on the go with high-performance native (iOS/Android) or cost-effective cross-platform mobile applications, crafted for exceptional user experience and functionality.",
      "We build robust and secure APIs (Application Programming Interfaces) and integrate third-party services to ensure seamless data exchange and interoperability between your various software systems.",
      "Leverage the power of the cloud with our expert architecture and deployment services on platforms like AWS, Google Cloud, or Azure, ensuring scalability, reliability, and security for your applications.",
      "Benefit from our comprehensive technical support and maintenance services to ensure your software and applications run smoothly, remain secure, and evolve with your business needs.",
    ],
    longDescription: "Transform your business operations with custom software and mobile applications developed by Sampro Media. Our Kenya-based team serves both local and international clients, delivering tailored solutions that solve unique challenges and drive efficiency. We develop native and cross-platform mobile apps for iOS and Android, robust backend systems, and secure APIs for seamless integration. From initial concept and cloud architecture to deployment and ongoing technical support, we are your trusted partner in building the technology that powers your success.",
  },
  {
    id: 'media-production',
    title: 'Media Production',
    icon: Camera,
    description: 'Professional video and photography services in Kenya to capture your vision and tell your story effectively to a global audience.',
    details: [
      "We produce professional corporate videos and compelling commercials that effectively communicate your brand message, showcase your products or services, and engage your target audience.",
      "Capture the essence and key moments of your corporate events, conferences, or workshops with our expert video and photography coverage, delivering high-quality assets for promotion and archival.",
      "Showcase your products in the best light with high-quality photography and videography, perfect for e-commerce, marketing materials, and advertising campaigns.",
      "Our team can bring your stories to life through engaging documentary filmmaking and creative short film production, from concept development and scripting to final edit.",
      "Add a dynamic edge to your content with custom 2D/3D animations and motion graphics, ideal for explainer videos, product demos, social media content, and brand storytelling.",
    ],
    longDescription: "Capture your audience's attention with high-quality video and photography from Sampro Media. Based in Kenya, we provide comprehensive media production services to clients worldwide. Our offerings include compelling corporate videos, engaging commercials, professional event coverage, stunning product photography, and impactful documentaries. We also specialize in animation and motion graphics to bring your ideas to life in dynamic new ways. Our team handles every aspect of production, from concept development and scripting to filming, editing, and post-production, ensuring your story is told with clarity and creativity.",
  },
  {
    id: 'digital-marketing-seo',
    title: 'Digital Marketing & SEO',
    icon: Search,
    description: 'Strategic digital marketing and SEO services to boost your online visibility and reach in Kenya and global markets.',
    details: [
      "Improve your website's visibility in search engine results with our comprehensive SEO strategies, including keyword research, on-page optimization, technical SEO, and link building to drive organic traffic.",
      "Achieve immediate visibility and targeted traffic with our expertly managed PPC campaigns on platforms like Google Ads and social media, optimizing for conversions and ROI.",
      "Engage your audience and build brand loyalty through strategic social media marketing, including content creation, community management, and targeted advertising campaigns across relevant platforms.",
      "Attract and retain your target audience by creating and distributing valuable, relevant, and consistent content that establishes your brand as a thought leader and drives profitable customer action.",
      "Nurture leads and build customer relationships with effective email marketing campaigns, from automated sequences and newsletters to promotional emails, all designed for maximum engagement and conversion.",
    ],
    longDescription: "Elevate your brand's online presence with Sampro Media's comprehensive digital marketing and SEO services. We help businesses in Kenya and around the world connect with their target audience and achieve measurable results. Our strategies include meticulous Search Engine Optimization (SEO) to improve organic rankings, targeted Pay-Per-Click (PPC) campaigns for immediate visibility, engaging Social Media Marketing (SMM), strategic Content Marketing to build authority, and effective Email Marketing campaigns to nurture leads. Let us craft a digital marketing plan that drives growth and maximizes your return on investment.",
  },
  {
    id: 'ui-ux-design-consultancy',
    title: 'UI/UX Design Consultancy',
    icon: Users,
    description: 'Expert UI/UX consultancy focused on creating intuitive and engaging digital experiences for users in Kenya and internationally.',
    details: [
      "We conduct thorough user research and develop detailed personas to understand your target audience's needs, behaviors, and motivations, forming the foundation for user-centered design decisions.",
      "Visualize and iterate on your product's structure and flow with our detailed wireframing and interactive prototyping services, allowing for early feedback and design refinement.",
      "Ensure your digital products are intuitive and effective through rigorous usability testing with real users, followed by actionable analysis and recommendations for improvement.",
      "We craft engaging interaction designs and apply a meticulous visual polish to create digital experiences that are not only functional but also delightful and aesthetically pleasing.",
      "Design and develop inclusive digital products that meet accessibility standards (e.g., WCAG), ensuring your services are usable by people of all abilities.",
    ],
    longDescription: "Deliver exceptional user experiences with Sampro Media's expert UI/UX design consultancy. We partner with businesses in Kenya and globally to design digital products that are not only aesthetically pleasing but also intuitive, accessible, and enjoyable to use. Our process includes in-depth user research, persona development, detailed wireframing and interactive prototyping, rigorous usability testing, and meticulous attention to interaction design and visual polish. We ensure your digital solutions meet the highest standards of usability and accessibility, leading to increased user satisfaction and engagement.",
  },
  {
    id: 'ai-solutions-integration',
    title: 'AI Solutions & Integration',
    icon: Cpu,
    description: 'Leveraging artificial intelligence to build innovative solutions and integrate AI capabilities into your existing systems for clients in Kenya and worldwide.',
    details: [
      "We design and build bespoke AI models tailored to your specific business challenges and data, leveraging machine learning and deep learning techniques to unlock unique insights and capabilities.",
      "Develop practical machine learning applications that automate processes, predict outcomes, or personalize user experiences, transforming data into actionable intelligence for your business.",
      "Implement NLP solutions to understand and process human language, enabling features like sentiment analysis, text summarization, chatbots, and voice-controlled interfaces.",
      "Streamline operations and enhance customer service with AI-powered automation solutions and intelligent chatbots that can handle inquiries, perform tasks, and provide 24/7 support.",
      "Partner with us for strategic AI consultation to identify opportunities, define roadmaps, and integrate artificial intelligence effectively into your business processes and product offerings.",
    ],
    longDescription: "Unlock the power of Artificial Intelligence with Sampro Media. We provide cutting-edge AI solutions and integration services for businesses in Kenya and internationally, helping you automate processes, gain deeper insights, and create innovative products. Our expertise covers custom AI model development, machine learning applications, Natural Language Processing (NLP) tools, AI-powered automation, intelligent chatbots, and strategic AI consultation. Whether you're looking to enhance existing systems or build entirely new AI-driven platforms, we have the skills to turn your AI vision into reality.",
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
