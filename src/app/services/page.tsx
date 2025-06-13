
import { services, type Service } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '@/components/shared/PageHeader';
import { CheckCircle, Briefcase } from 'lucide-react';

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Card className="shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl transform overflow-hidden flex flex-col h-full hover:border-primary border-transparent border">
      <CardHeader className="items-center text-center p-6 border-b">
        <Icon className="h-20 w-20 text-primary mb-4" />
        <CardTitle className="font-headline text-2xl font-bold text-primary">{service.title}</CardTitle>
        <CardDescription className="text-md mt-1 text-foreground/80">{service.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 flex-grow">
        <ul className="space-y-2">
          {service.details.map((detail, index) => (
            <li key={index} className="flex items-start text-sm">
              <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default function ServicesPage() {
  return (
    <div>
      <PageHeader
        title="Comprehensive Media & Software Services in Kenya & Globally"
        subtitle="Sampro Media offers a full suite of expert software development and creative media services, tailored for businesses in Kenya and international markets."
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
