
import { services, type Service } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '@/components/shared/PageHeader';
import { CheckCircle, Briefcase, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Card className="shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl transform overflow-hidden flex flex-col h-full hover:border-primary border-transparent border-2">
      <CardHeader className="items-center text-center p-6 border-b border-border">
        <Icon className="h-20 w-20 text-primary mb-4" />
        <CardTitle className="font-headline text-2xl font-bold text-primary">{service.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 flex-grow">
        <CardDescription className="text-md mt-1 text-foreground/80 mb-4 text-center">{service.description}</CardDescription>
        <ul className="space-y-2">
          {service.details.slice(0, 3).map((item, index) => ( // Show first 3 key offering headings
            <li key={index} className="flex items-start text-sm">
              <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
              <span className="font-medium">{item.heading}</span>
            </li>
          ))}
          {service.details.length > 3 && (
             <li className="flex items-start text-sm">
                <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                <span>And more...</span>
            </li>
          )}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto p-4 justify-center">
        <Button asChild variant="outline" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href={`/services/${service.id}`}>
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function ServicesPage() {
  return (
    <div>
      <PageHeader
        title="Comprehensive Media & Software Services in Kenya & Globally"
        subtitle="Sampro Media offers a full suite of expert software development and creative media services, tailored for businesses in Kenya and international markets. Dive deeper into each service to see how we can help you achieve your goals."
        icon={Briefcase}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
