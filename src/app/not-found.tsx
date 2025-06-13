
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/shared/PageHeader';
import { AlertTriangle, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <PageHeader
        title="404 - Page Not Found"
        subtitle="Oops! The page you're looking for doesn't seem to exist."
        icon={AlertTriangle}
      />
      <div className="space-y-6">
        <p className="text-lg text-foreground/80 max-w-md">
          It seems you've taken a wrong turn. Don't worry, it happens to the best of us!
          You can head back to our homepage or try exploring our services.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" /> Go to Homepage
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/services">
              Explore Services
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
