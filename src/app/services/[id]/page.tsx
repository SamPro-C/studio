
import { services, type Service } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const service = services.find((s) => s.id === params.id);
  if (!service) {
    return {
      title: 'Service Not Found | Sampro Media',
      description: 'The requested service could not be found.',
    };
  }
  return {
    title: `${service.title} | Services | Sampro Media`,
    description: service.description, 
  };
}

export async function generateStaticParams() {
  return services.map((service) => ({
    id: service.id,
  }));
}

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = services.find((s) => s.id === params.id);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/services">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Services
          </Link>
        </Button>
      </div>

      <Card className="shadow-xl overflow-hidden">
        <CardHeader className="bg-muted/30 p-6 md:p-10 text-center border-b">
          <Icon className="h-24 w-24 text-primary mx-auto mb-4" />
          <CardTitle className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-primary">{service.title}</CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 md:p-10 space-y-6">
          <section>
            <h2 className="font-headline text-2xl font-semibold text-foreground mb-3">
              Service Overview
            </h2>
            <p className="text-foreground/80 text-lg leading-relaxed">
              {service.longDescription}
            </p>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-semibold text-foreground mb-4">
              Key Offerings
            </h2>
            <ul className="space-y-6"> {/* Increased spacing between items */}
              {service.details.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-7 w-7 text-primary mr-4 shrink-0 mt-1" /> {/* Slightly larger icon, more margin */}
                  <div>
                    <h3 className="font-semibold text-xl text-foreground mb-1">{item.heading}</h3> {/* Heading style */}
                    <p className="text-foreground/80 text-md leading-relaxed">{item.explanation}</p> {/* Explanation style */}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
