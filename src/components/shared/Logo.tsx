import Link from 'next/link';
import type { SVGProps } from 'react';

// Simple geometric icon (example: a stylized R or building icon)
const RentizziIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="h-8 w-8 mr-2 text-primary" // Use primary color from theme
    {...props}
  >
    {/* Generic icon, can be kept or updated if a specific Rentizzi logo is designed */}
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
  </svg>
);


export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center text-2xl font-bold font-headline text-primary hover:opacity-90 transition-opacity ${className}`}>
      <RentizziIcon />
      Rentizzi
    </Link>
  );
}
