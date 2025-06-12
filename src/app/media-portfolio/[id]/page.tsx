
import { mediaProjects } from '@/lib/data';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Tag, FileText } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const project = mediaProjects.find((p) => p.id === params.id);
  if (!project) {
    return {
      title: 'Project Not Found | Sampro Media',
      description: 'The requested project could not be found.',
    };
  }
  return {
    title: `${project.title} | Media Project | Sampro Media`,
    description: project.description,
  };
}

export async function generateStaticParams() {
  return mediaProjects.map((project) => ({
    id: project.id,
  }));
}

export default function MediaProjectDetailPage({ params }: { params: { id: string } }) {
  const project = mediaProjects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/media-portfolio">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Media Portfolio
          </Link>
        </Button>
      </div>

      <article className="bg-card p-6 md:p-10 rounded-lg shadow-xl space-y-6">
        <header className="space-y-2">
            <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-primary">{project.title}</h1>
            <div className="flex items-center space-x-2">
                <Tag className="h-5 w-5 text-primary/80" />
                <Badge variant="secondary" className="text-md px-3 py-1">{project.category}</Badge>
            </div>
        </header>

        {project.imageUrl && (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg my-6">
            <Image
              src={project.imageUrl}
              alt={`Image for ${project.title}`}
              fill
              className="object-cover"
              data-ai-hint={project.dataAiHint || "media project detail"}
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
        
      </article>
    </div>
  );
}
