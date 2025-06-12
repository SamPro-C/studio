
import { softwareProjects, type SoftwareProject } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PageHeader from '@/components/shared/PageHeader';
import { CodeXml, ExternalLink, Github, ArrowRight } from 'lucide-react';
import Link from 'next/link';

function SoftwareProjectCard({ project }: { project: SoftwareProject }) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-48 md:h-56">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          data-ai-hint={project.dataAiHint || "software project"}
        />
      </div>
      <CardHeader>
        <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <p className="text-sm text-foreground/80 line-clamp-3">{project.description}</p>
        <div>
          <h4 className="text-sm font-semibold mb-1">Technologies:</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => ( // Show a few key techs
              <Badge key={tech} variant="secondary">{tech}</Badge>
            ))}
            {project.technologies.length > 3 && <Badge variant="outline">...</Badge>}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-3 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
        <div className="flex flex-wrap gap-2">
          {project.repoLink && (
            <Button variant="outline" size="sm" asChild>
              <Link href={project.repoLink} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> Repo
              </Link>
            </Button>
          )}
          {project.liveLink && (
            <Button variant="default" size="sm" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Live
              </Link>
            </Button>
          )}
        </div>
        <Button variant="link" size="sm" asChild className="text-primary self-end sm:self-center">
          <Link href={`/software-portfolio/${project.id}`}>
            View Details <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function SoftwarePortfolioPage() {
  return (
    <div>
      <PageHeader
        title="Software Portfolio"
        subtitle="Discover our innovative software solutions, from dynamic web applications to robust mobile apps."
        icon={CodeXml}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {softwareProjects.map((project) => (
          <SoftwareProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
