
import type { LucideIcon } from 'lucide-react';
import { Palette, LayoutGrid, CodeXml, Camera, LineChart, Users, Target, Lightbulb, Search, Cpu, Bot, FileText, Briefcase, MessageSquare, Aperture, Tv, Info, Mail, BookOpen, Film, PieChart, Edit, Brain } from 'lucide-react';

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

interface ServiceDetail {
  heading: string;
  explanation: string;
}

export interface Service {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  details: ServiceDetail[];
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
      {
        heading: "Logo Design & Brand Identity Systems",
        explanation: "We craft unique logos and comprehensive brand identity systems that capture your essence. This ensures a memorable, consistent presence across all touchpoints, from digital platforms to print materials, effectively representing your business in Kenya and globally."
      },
      {
        heading: "Marketing & Advertising Collateral",
        explanation: "Our team designs compelling marketing and advertising collateral. This includes brochures, flyers, social media ads, and digital banners, all tailored to effectively communicate your message and drive engagement for your software and media services."
      },
      {
        heading: "Social Media & Web Graphics",
        explanation: "Boost your online presence with professionally designed social media graphics and web banners. Optimized for various platforms, these ensure your brand looks cohesive and captivating online, crucial for reaching audiences in Kenya and internationally."
      },
      {
        heading: "Packaging & Print Design",
        explanation: "From concept to production, we create eye-catching packaging designs and precise print layouts for magazines, books, and reports. This ensures your physical products and publications stand out, whether for the Kenyan market or global distribution."
      },
      {
        heading: "Infographics & Presentation Design",
        explanation: "Transform complex information into visually engaging infographics and professional presentation designs. These clarify your message, captivate your audience, and support your communication goals for software and media services projects."
      }
    ],
    longDescription: "Our graphic design services focus on creating visually compelling assets that communicate your brand's message effectively. We work with businesses in Kenya and internationally to develop everything from logos that make a lasting first impression to comprehensive branding packages that ensure consistency across all platforms. Whether you need engaging social media graphics, professional marketing materials, or eye-catching packaging, our team combines creativity with strategic thinking to deliver designs that resonate with your target audience and achieve your business objectives. We believe good design is good business, and we're passionate about helping you look your best for both software and media services.",
  },
  {
    id: 'web-design-development',
    title: 'Web Design & Development',
    icon: LayoutGrid,
    description: 'Building responsive, user-friendly websites and e-commerce solutions that perform for businesses in Kenya and globally.',
    details: [
      {
        heading: "Custom UI/UX Design",
        explanation: "We create bespoke user interfaces (UI) and user experiences (UX) that are not only visually appealing but also intuitive and tailored to your specific audience in Kenya and beyond. This ensures seamless navigation and interaction for your software or media platform."
      },
      {
        heading: "E-commerce Solutions",
        explanation: "Launch or enhance your online retail presence with our custom e-commerce solutions. These feature secure payment gateways, robust inventory management, and a user-friendly shopping experience designed to convert visitors into customers, suitable for both Kenyan and international markets."
      },
      {
        heading: "CMS Development & Integration",
        explanation: "Empower your team to manage website content effortlessly with our custom CMS integrations (e.g., WordPress, Strapi). This provides flexibility and control over your digital narrative, essential for dynamic software and media services."
      },
      {
        heading: "Responsive & Mobile-First Design",
        explanation: "We build websites that look and perform flawlessly on all devices—desktops, tablets, and smartphones. By prioritizing a mobile-first approach, we ensure maximum reach and accessibility for your services worldwide."
      },
      {
        heading: "Website Maintenance & Support",
        explanation: "Keep your website secure, up-to-date, and performing optimally with our ongoing maintenance and support services. This includes updates, backups, and troubleshooting, vital for businesses in Kenya and globally."
      }
    ],
    longDescription: "Sampro Media specializes in crafting high-performance websites that are not only visually stunning but also incredibly functional and user-friendly. Serving clients in Kenya and across the globe, we build everything from informative brochure sites to complex e-commerce platforms. Our process emphasizes responsive, mobile-first design to ensure a seamless experience on all devices. We integrate robust Content Management Systems (CMS) for easy content updates and provide ongoing maintenance and support to keep your digital presence strong and secure. Let us build the online foundation your business needs to thrive in the digital age, offering top-tier software and media services.",
  },
  {
    id: 'software-app-development',
    title: 'Software & App Development',
    icon: CodeXml,
    description: 'Custom software, mobile apps, and backend solutions to power your business, developed by our expert team in Kenya for local and international needs.',
    details: [
      {
        heading: "Custom Software Solutions",
        explanation: "Our team develops tailored software solutions designed to meet your unique business requirements. We aim to streamline operations and enhance productivity, from internal tools to complex enterprise applications for clients in Kenya and internationally."
      },
      {
        heading: "Mobile App Development (iOS & Android)",
        explanation: "Reach your audience on the go with high-performance native (iOS/Android) or cost-effective cross-platform mobile applications. These are crafted for exceptional user experience and functionality, catering to both local Kenyan users and a global audience."
      },
      {
        heading: "API Development & Integration",
        explanation: "We build robust and secure APIs (Application Programming Interfaces) and integrate third-party services. This ensures seamless data exchange and interoperability between your various software systems, crucial for modern media and tech services."
      },
      {
        heading: "Cloud Solutions & DevOps",
        explanation: "Leverage the power of the cloud with our expert architecture and deployment services on platforms like AWS, Google Cloud, or Azure. We ensure scalability, reliability, and security for your applications, serving businesses from Kenya to the world."
      },
      {
        heading: "Ongoing Support & Maintenance",
        explanation: "Benefit from our comprehensive technical support and maintenance services to ensure your software and applications run smoothly, remain secure, and evolve with your business needs. This is a key part of our software services commitment."
      }
    ],
    longDescription: "Transform your business operations with custom software and mobile applications developed by Sampro Media. Our Kenya-based team serves both local and international clients, delivering tailored solutions that solve unique challenges and drive efficiency. We develop native and cross-platform mobile apps for iOS and Android, robust backend systems, and secure APIs for seamless integration. From initial concept and cloud architecture to deployment and ongoing technical support, we are your trusted partner in building the technology that powers your success in software services and beyond.",
  },
  {
    id: 'media-production',
    title: 'Media Production',
    icon: Camera,
    description: 'Professional video and photography services in Kenya to capture your vision and tell your story effectively to a global audience.',
    details: [
      {
        heading: "Corporate Videos & Commercials",
        explanation: "We produce professional corporate videos and compelling commercials that effectively communicate your brand message. These showcase your products or services and engage your target audience, whether in Kenya or for international software and media campaigns."
      },
      {
        heading: "Event Coverage (Video & Photo)",
        explanation: "Capture the essence and key moments of your corporate events, conferences, or workshops with our expert video and photography coverage. We deliver high-quality assets for promotion and archival, suitable for Kenyan and global audiences."
      },
      {
        heading: "Product Photography & Videography",
        explanation: "Showcase your products in the best light with high-quality photography and videography. This service is perfect for e-commerce, marketing materials, and advertising campaigns for businesses offering software and media services."
      },
      {
        heading: "Documentary & Short Film Production",
        explanation: "Our team can bring your stories to life through engaging documentary filmmaking and creative short film production. This includes concept development, scripting, to final edit, catering to storytellers in Kenya and worldwide."
      },
      {
        heading: "Animation & Motion Graphics",
        explanation: "Add a dynamic edge to your content with custom 2D/3D animations and motion graphics. These are ideal for explainer videos, product demos, social media content, and brand storytelling, enhancing your media services."
      }
    ],
    longDescription: "Capture your audience's attention with high-quality video and photography from Sampro Media. Based in Kenya, we provide comprehensive media production services to clients worldwide. Our offerings include compelling corporate videos, engaging commercials, professional event coverage, stunning product photography, and impactful documentaries. We also specialize in animation and motion graphics to bring your ideas to life in dynamic new ways. Our team handles every aspect of production, from concept development and scripting to filming, editing, and post-production, ensuring your story is told with clarity and creativity. This is a core component of our media services.",
  },
  {
    id: 'digital-marketing-seo',
    title: 'Digital Marketing & SEO',
    icon: Search,
    description: 'Strategic digital marketing and SEO services to boost your online visibility and reach in Kenya and global markets for software and media businesses.',
    details: [
      {
        heading: "Search Engine Optimization (SEO)",
        explanation: "Improve your website's visibility in search engine results with our comprehensive SEO strategies. This includes keyword research, on-page optimization, technical SEO, and link building to drive organic traffic for your software and media services in Kenya and globally."
      },
      {
        heading: "Pay-Per-Click (PPC) Advertising",
        explanation: "Achieve immediate visibility and targeted traffic with our expertly managed PPC campaigns on platforms like Google Ads and social media. We optimize for conversions and ROI, ensuring your marketing spend is effective worldwide."
      },
      {
        heading: "Social Media Marketing (SMM)",
        explanation: "Engage your audience and build brand loyalty through strategic social media marketing. This includes content creation, community management, and targeted advertising campaigns across relevant platforms, crucial for modern media and software services."
      },
      {
        heading: "Content Marketing Strategy",
        explanation: "Attract and retain your target audience by creating and distributing valuable, relevant, and consistent content. This establishes your brand as a thought leader and drives profitable customer action, particularly for businesses in Kenya looking for global reach."
      },
      {
        heading: "Email Marketing Campaigns",
        explanation: "Nurture leads and build customer relationships with effective email marketing campaigns. From automated sequences and newsletters to promotional emails, all are designed for maximum engagement and conversion for your diverse services."
      }
    ],
    longDescription: "Elevate your brand's online presence with Sampro Media's comprehensive digital marketing and SEO services. We help businesses in Kenya and around the world connect with their target audience and achieve measurable results. Our strategies include meticulous Search Engine Optimization (SEO) to improve organic rankings for 'software services' and 'media services', targeted Pay-Per-Click (PPC) campaigns for immediate visibility, engaging Social Media Marketing (SMM), strategic Content Marketing to build authority, and effective Email Marketing campaigns to nurture leads. Let us craft a digital marketing plan that drives growth and maximizes your return on investment for your global and Kenyan operations.",
  },
  {
    id: 'ui-ux-design-consultancy',
    title: 'UI/UX Design Consultancy',
    icon: Users,
    description: 'Expert UI/UX consultancy focused on creating intuitive and engaging digital experiences for users of software and media services in Kenya and internationally.',
    details: [
      {
        heading: "User Research & Persona Development",
        explanation: "We conduct thorough user research and develop detailed personas to understand your target audience's needs, behaviors, and motivations. This forms the foundation for user-centered design decisions for your software and media services, whether in Kenya or for global users."
      },
      {
        heading: "Wireframing & Interactive Prototyping",
        explanation: "Visualize and iterate on your product's structure and flow with our detailed wireframing and interactive prototyping services. This allows for early feedback and design refinement, crucial for successful software and media projects."
      },
      {
        heading: "Usability Testing & Analysis",
        explanation: "Ensure your digital products are intuitive and effective through rigorous usability testing with real users. This is followed by actionable analysis and recommendations for improvement, enhancing the quality of services offered worldwide."
      },
      {
        heading: "Interaction Design & Visual Polish",
        explanation: "We craft engaging interaction designs and apply a meticulous visual polish to create digital experiences. These are not only functional but also delightful and aesthetically pleasing, setting your Kenyan or global brand apart."
      },
      {
        heading: "Accessibility (A11y) Design",
        explanation: "Design and develop inclusive digital products that meet accessibility standards (e.g., WCAG). This ensures your software and media services are usable by people of all abilities, an important consideration for all markets."
      }
    ],
    longDescription: "Deliver exceptional user experiences with Sampro Media's expert UI/UX design consultancy. We partner with businesses in Kenya and globally to design digital products that are not only aesthetically pleasing but also intuitive, accessible, and enjoyable to use. Our process includes in-depth user research, persona development, detailed wireframing and interactive prototyping, rigorous usability testing, and meticulous attention to interaction design and visual polish. We ensure your digital solutions meet the highest standards of usability and accessibility, leading to increased user satisfaction and engagement for your software and media services.",
  },
  {
    id: 'ai-solutions-integration',
    title: 'AI Solutions & Integration',
    icon: Cpu,
    description: 'Leveraging artificial intelligence to build innovative software and media solutions, integrating AI capabilities into your existing systems for clients in Kenya and worldwide.',
    details: [
      {
        heading: "Custom AI Model Development",
        explanation: "We design and build bespoke AI models tailored to your specific business challenges and data. Leveraging machine learning and deep learning techniques, we unlock unique insights and capabilities for your software and media services in Kenya and globally."
      },
      {
        heading: "Machine Learning Applications",
        explanation: "Develop practical machine learning applications that automate processes, predict outcomes, or personalize user experiences. This transforms data into actionable intelligence for your business, applicable worldwide."
      },
      {
        heading: "Natural Language Processing (NLP)",
        explanation: "Implement NLP solutions to understand and process human language. This enables features like sentiment analysis, text summarization, chatbots, and voice-controlled interfaces for advanced software and media services."
      },
      {
        heading: "AI-Powered Automation & Chatbots",
        explanation: "Streamline operations and enhance customer service with AI-powered automation solutions and intelligent chatbots. These can handle inquiries, perform tasks, and provide 24/7 support for businesses in Kenya and international markets."
      },
      {
        heading: "AI Strategy & Consultation",
        explanation: "Partner with us for strategic AI consultation to identify opportunities, define roadmaps, and integrate artificial intelligence effectively into your business processes and product offerings, helping you lead in innovative services."
      }
    ],
    longDescription: "Unlock the power of Artificial Intelligence with Sampro Media. We provide cutting-edge AI solutions and integration services for businesses in Kenya and internationally, helping you automate processes, gain deeper insights, and create innovative products. Our expertise covers custom AI model development, machine learning applications, Natural Language Processing (NLP) tools, AI-powered automation, intelligent chatbots, and strategic AI consultation. Whether you're looking to enhance existing systems or build entirely new AI-driven platforms for your software or media services, we have the skills to turn your AI vision into reality.",
  },
  {
    id: 'ms-office-solutions',
    title: 'Microsoft Office Suite Solutions',
    icon: Briefcase,
    description: "Expert training, support, and automation solutions for Microsoft Office applications (Word, Excel, PowerPoint, Outlook) to boost productivity in Kenya and globally.",
    longDescription: "Unlock the full potential of the Microsoft Office Suite with Sampro Media. We provide comprehensive training, expert support, and custom automation solutions for applications like Word, Excel, PowerPoint, and Outlook. Whether you're in Kenya or operating internationally, our services are designed to enhance your team's productivity, streamline document workflows, master data analysis in Excel, and create impactful presentations. We help you leverage these essential tools to their fullest.",
    details: [
      {
        heading: "Advanced Excel Training & Automation",
        explanation: "Master complex Excel functions, data analysis, Power Query, and VBA/Office Scripts automation to transform your data management and reporting capabilities for your Kenyan or global operations."
      },
      {
        heading: "Professional Word Document Solutions",
        explanation: "From custom template design and advanced formatting to mail merge and document automation, we help you create professional, efficient Word documents that meet your business needs."
      },
      {
        heading: "Impactful PowerPoint Presentation Design",
        explanation: "Elevate your presentations with expert design, compelling visuals, custom templates, and advanced animation techniques to effectively communicate your message to any audience."
      },
      {
        heading: "Efficient Outlook & Collaboration Setup",
        explanation: "Optimize your email management, calendar organization, and team collaboration using Microsoft Outlook and associated Microsoft 365 services for seamless communication."
      },
      {
        heading: "Microsoft 365 Integration & Support",
        explanation: "We provide guidance and support for integrating various Microsoft 365 services, ensuring your team can collaborate effectively and leverage the full suite of productivity tools."
      }
    ]
  },
  {
    id: 'power-bi-services',
    title: 'Power BI & Data Visualization',
    icon: PieChart,
    description: "Transform your raw data into actionable insights with our Power BI development, dashboard creation, and data visualization services for businesses in Kenya and worldwide.",
    longDescription: "Leverage the power of data with Sampro Media's Power BI and Data Visualization services. We help businesses in Kenya and across the globe turn complex datasets into clear, interactive, and actionable insights. Our experts design custom dashboards, develop robust data models, and provide training to empower your team to make data-driven decisions. From integrating various data sources to creating compelling visual reports, we enable you to understand your business performance better.",
    details: [
      {
        heading: "Custom Power BI Dashboard Development",
        explanation: "We design and develop interactive Power BI dashboards tailored to your specific KPIs and business requirements, providing real-time insights for your Kenyan or international operations."
      },
      {
        heading: "Data Modeling & Integration",
        explanation: "Our team builds robust data models in Power BI, integrating data from various sources (databases, Excel, cloud services) to create a unified view for comprehensive analysis."
      },
      {
        heading: "Power BI Training & Empowerment",
        explanation: "Empower your team with tailored Power BI training sessions, from beginner to advanced levels, enabling them to create reports, analyze data, and derive insights independently."
      },
      {
        heading: "Advanced DAX & Performance Optimization",
        explanation: "Unlock deeper insights with custom Data Analysis Expressions (DAX) measures and calculations. We also optimize your Power BI reports for speed and efficiency."
      },
      {
        heading: "Embedded Analytics Solutions",
        explanation: "Integrate Power BI reports and dashboards directly into your custom applications, portals, or websites, providing seamless analytical experiences for your users or clients globally."
      }
    ]
  },
  {
    id: 'content-creation-copywriting',
    title: 'Content Creation & Copywriting',
    icon: Edit,
    description: "Compelling content and persuasive copywriting to engage your audience and drive action, for Kenyan and global markets.",
    longDescription: "Elevate your brand's voice with Sampro Media's expert content creation and copywriting services. We craft compelling narratives, engaging website copy, persuasive marketing materials, and informative blog posts that resonate with your target audience in Kenya and internationally. Our goal is to help you communicate effectively, build authority, and drive conversions through the power of well-written content.",
    details: [
      {
        heading: "Website Content & SEO Copywriting",
        explanation: "We create optimized website content that not only clearly communicates your value proposition but also ranks well in search engines, attracting organic traffic for your software and media services."
      },
      {
        heading: "Blog Writing & Article Creation",
        explanation: "Establish thought leadership and engage your audience with high-quality, well-researched blog posts and articles tailored to your industry and target audience in Kenya and worldwide."
      },
      {
        heading: "Marketing & Sales Copy",
        explanation: "Persuade and convert with compelling copy for your advertisements, brochures, email campaigns, landing pages, and sales presentations, designed to drive action."
      },
      {
        heading: "Social Media Content",
        explanation: "Craft engaging and shareable content for your social media platforms, tailored to each channel's unique audience and designed to build your brand's online community."
      },
      {
        heading: "Editing & Proofreading",
        explanation: "Ensure your existing content is polished, professional, and error-free with our meticulous editing and proofreading services, maintaining a high standard for all your communications."
      }
    ]
  },
  {
    id: 'it-digital-transformation-consultancy',
    title: 'IT & Digital Transformation Consultancy',
    icon: Brain,
    description: "Strategic IT and digital transformation guidance to help your Kenyan or global business leverage technology for growth and efficiency.",
    longDescription: "Navigate the complexities of the digital landscape with Sampro Media's IT and Digital Transformation Consultancy. We partner with businesses in Kenya and internationally to develop strategic roadmaps, optimize IT infrastructure, and implement technologies that drive innovation, efficiency, and growth. Our expert consultants help you align your technology with your business goals for a successful digital future.",
    details: [
      {
        heading: "Digital Strategy Development",
        explanation: "We help you define a clear and actionable digital strategy aligned with your business objectives, identifying key technologies and initiatives to drive transformation and competitive advantage in Kenya and globally."
      },
      {
        heading: "IT Infrastructure Assessment & Optimization",
        explanation: "Our experts assess your current IT infrastructure, identifying areas for improvement in terms of efficiency, scalability, security, and cost-effectiveness, providing tailored recommendations."
      },
      {
        heading: "Cloud Strategy & Migration Planning",
        explanation: "Develop a comprehensive cloud strategy, from selecting the right platforms (AWS, Azure, Google Cloud) to planning and executing seamless migrations for your software and data."
      },
      {
        heading: "Process Automation & Workflow Design",
        explanation: "Identify opportunities to automate manual processes and redesign workflows using technology, significantly improving operational efficiency and reducing human error for your business."
      },
      {
        heading: "Change Management & Technology Adoption",
        explanation: "We provide guidance and support to manage the human side of technological change, ensuring smooth adoption of new systems and processes within your organization."
      }
    ]
  }
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
    
