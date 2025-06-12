
import Link from 'next/link';
import { Aperture } from 'lucide-react';

const footerNavLinks = {
  navigate: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
  ],
  portfolio: [
    { href: '/media-portfolio', label: 'Media Portfolio' },
    { href: '/software-portfolio',label: 'Software Portfolio' },
    { href: '/case-studies', label: 'Case Studies' },
  ],
  connect: [
    { href: '/contact', label: 'Contact Us' },
    { href: '/ai-description-generator', label: 'AI Description Tool' },
    { href: '/ai-social-media-snippet-generator', label: 'AI Snippet Tool' },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/40 bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start">
            <Link href="/" passHref>
              <div className="flex items-center space-x-2 cursor-pointer mb-2">
                <Aperture className="h-8 w-8 text-primary" />
                <span className="font-headline text-2xl font-bold text-primary">Sampro Media</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Crafting Digital Experiences.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Navigate</h3>
            <ul className="space-y-2">
              {footerNavLinks.navigate.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portfolio Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Explore</h3>
            <ul className="space-y-2">
              {footerNavLinks.portfolio.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Connect Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Connect</h3>
            <ul className="space-y-2">
              {footerNavLinks.connect.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
                 <li>
                <a href="mailto:mediasampro@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  mediasampro@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+254111844321" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  +254 111 844 321
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/40 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Sampro Media. All rights reserved.</p>
          <p className="mt-1">Professional Media and Software Solutions</p>
        </div>
      </div>
    </footer>
  );
}
