import { mediaProjects, type MediaProject } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/shared/PageHeader';
import { Tv, Film } from 'lucide-react';

function MediaProjectCard({ project }: { project: MediaProject }) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-48 md:h-56">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          data-ai-hint={project.dataAiHint || "media project"}
        />
      </div>
      <CardHeader>
        <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
        <CardDescription className="text-sm text-primary">{project.category}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-foreground/80">{project.description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function MediaPortfolioPage() {
  return (
    <div>
      <PageHeader
        title="Media Portfolio"
        subtitle="Explore our diverse range of captivating media projects, from stunning video productions to engaging animations."
        icon={Film}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mediaProjects.map((project) => (
          <MediaProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
