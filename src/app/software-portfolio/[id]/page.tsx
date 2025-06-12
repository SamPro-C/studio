
import { softwareProjects } from '@/lib/data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Tag, FileText, Code2, CheckCircle, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const project = softwareProjects.find((p) => p.id === params.id);
  if (!project) {
    return {
      title: 'Project Not Found | Sampro Media',
      description: 'The requested software project could not be found.',
    };
  }
  return {
    title: `${project.title} | Software Project | Sampro Media`,
    description: project.description,
  };
}

export async function generateStaticParams() {
  return softwareProjects.map((project) => ({
    id: project.id,
  }));
}

export default function SoftwareProjectDetailPage({ params }: { params: { id:string } }) {
  const project = softwareProjects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/software-portfolio">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Software Portfolio
          </Link>
        </Button>
      </div>

      <article className="bg-card p-6 md:p-10 rounded-lg shadow-xl space-y-6">
        <header className="space-y-2">
            <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-primary">{project.title}</h1>
        </header>

        {project.imageUrl && (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg my-6">
            <Image
              src={project.imageUrl}
              alt={`Image for ${project.title}`}
              fill
              className="object-cover"
              data-ai-hint={project.dataAiHint || "software project detail"}
              priority
            />
          </div>
        )}
        
        <section>
          <h2 className="font-headline text-2xl font-semibold text-foreground mb-3 flex items-center">
            <FileText className="mr-2 h-6 w-6 text-primary" />
            About This Project
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed">
            {project.description}
          </p>
        </section>

        <section>
          <h2 className="font-headline text-2xl font-semibold text-foreground mb-3 flex items-center">
            <Code2 className="mr-2 h-6 w-6 text-primary" />
            Technologies Used
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-sm px-3 py-1">{tech}</Badge>
            ))}
          </div>
        </section>
        
        <section>
          <h2 className="font-headline text-2xl font-semibold text-foreground mb-3 flex items-center">
            <CheckCircle className="mr-2 h-6 w-6 text-primary" />
            Outcome
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed">
            {project.outcome}
          </p>
        </section>

        {(project.liveLink || project.repoLink) && (
          <section className="pt-4 border-t">
            <h2 className="font-headline text-xl font-semibold text-foreground mb-4">Project Links</h2>
            <div className="flex flex-wrap gap-4">
              {project.liveLink && (
                <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </Link>
                </Button>
              )}
              {project.repoLink && (
                <Button variant="outline" asChild>
                  <Link href={project.repoLink} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> View Code
                  </Link>
                </Button>
              )}
            </div>
          </section>
        )}
        
      </article>
    </div>
  );
}
