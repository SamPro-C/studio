'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

const WhatsAppIconSvg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.75 13.96C17.01 14.22 17.2 14.54 17.2 14.92C17.19 15.31 17.01 15.63 16.74 15.89C16.47 16.16 16.14 16.33 15.76 16.34C15.3 16.36 14.84 16.21 14.37 16C13.55 15.62 12.43 14.98 11.3 13.87C10.12 12.72 9.37 11.43 9.03 10.66C8.75 10.08 8.62 9.61 8.62 9.19C8.62 8.83 8.72 8.51 8.93 8.25C9.14 8 9.4 7.86 9.71 7.86C9.99 7.86 10.22 7.94 10.41 8.11C10.6 8.28 10.74 8.52 10.81 8.81C10.91 9.17 11.03 9.55 11.03 9.61C11.05 9.87 10.97 10.1 10.81 10.29L10.33 10.84C10.25 10.92 10.21 11 10.21 11.11C10.21 11.19 10.23 11.28 10.28 11.37C10.33 11.45 10.39 11.55 10.46 11.65C10.73 12.07 11.08 12.48 11.51 12.85C11.92 13.23 12.35 13.52 12.79 13.74C12.89 13.79 12.99 13.84 13.07 13.88C13.18 13.92 13.27 13.92 13.35 13.84L13.88 13.32C14.06 13.12 14.3 13.03 14.57 13.03C14.63 13.03 15.04 13.15 15.45 13.3C15.75 13.41 16.02 13.55 16.22 13.74C16.43 13.93 16.56 14.06 16.75 13.96ZM12.01 2.02C6.51 2.02 2.02 6.51 2.02 12.01C2.02 17.51 6.51 22 12.01 22C17.51 22 22 17.51 22 12.01C21.99 6.51 17.51 2.02 12.01 2.02Z"
    />
  </svg>
);

export default function FloatingWhatsAppButton() {
  const pathname = usePathname();
  const whatsappLink = "https://wa.me/254111844321";

  if (pathname === '/contact') {
    return null; 
  }

  return (
    <Button
      asChild
      className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-5 rounded-full shadow-lg flex items-center gap-2 transition-colors duration-200"
      aria-label="Chat on WhatsApp"
    >
      <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
        <WhatsAppIconSvg className="h-6 w-6" />
        <span>How can I be of help?</span>
      </Link>
    </Button>
  );
}
