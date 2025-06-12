
'use client';
import Link from 'next/link';
import { Menu, X, Aperture, Code, Briefcase, BookOpen, Lightbulb, Mail, Tv, Info, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Aperture },
  { href: '/media-portfolio', label: 'Media', icon: Tv },
  { href: '/software-portfolio', label: 'Software', icon: Code },
  { href: '/services', label: 'Services', icon: Briefcase },
  { href: '/case-studies', label: 'Case Studies', icon: BookOpen },
  { href: '/about', label: 'About Us', icon: Info },
  { href: '/ai-description-generator', label: 'AI Desc', icon: Lightbulb },
  { href: '/ai-social-media-snippet-generator', label: 'AI Snippets', icon: MessageSquare },
  { href: '/contact', label: 'Contact', icon: Mail },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const NavLink = ({ href, label, icon: Icon }: typeof navItems[0] & { icon: React.ElementType }) => (
    <Link href={href} passHref>
      <Button
        variant="ghost"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === href ? "text-primary font-semibold" : "text-foreground/80",
          "flex items-center gap-2 justify-start sm:justify-center"
        )}
        onClick={() => setMobileMenuOpen(false)}
      >
        <Icon className="h-4 w-4" />
        {label}
      </Button>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" passHref>
          <div className="flex items-center space-x-2 cursor-pointer">
            <Aperture className="h-7 w-7 text-primary" />
            <span className="font-headline text-xl font-bold text-primary">Sampro Media</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center mb-4">
                 <Link href="/" passHref>
                    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
                        <Aperture className="h-7 w-7 text-primary" />
                        <span className="font-headline text-xl font-bold text-primary">Sampro Media</span>
                    </div>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                {navItems.map((item) => (
                  <NavLink key={item.href} {...item} />
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
