
import { services, type Service } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '@/components/shared/PageHeader';
import { CheckCircle, Briefcase } from 'lucide-react';

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="items-center text-center">
        <Icon className="h-12 w-12 text-primary mb-3" />
        <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
        <CardDescription className="text-md">{service.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {service.details.map((detail, index) => (
            <li key={index} className="flex items-start text-sm">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
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
        title="Comprehensive Media & Software Services"
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
