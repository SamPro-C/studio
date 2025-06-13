
import { caseStudies, type CaseStudy } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import PageHeader from '@/components/shared/PageHeader';
import { BookOpen, TrendingUp, Lightbulb, CheckSquare } from 'lucide-react';

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {study.imageUrl && (
        <div className="relative w-full h-48">
          <Image
            src={study.imageUrl}
            alt={study.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            data-ai-hint={study.dataAiHint || "case study"}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="font-headline text-xl">{study.title}</CardTitle>
        <CardDescription>Client: {study.client}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 flex-grow">
        <div>
          <h4 className="font-semibold text-sm flex items-center mb-1"><Lightbulb className="h-4 w-4 mr-2 text-primary" />Problem:</h4>
          <p className="text-sm text-foreground/80">{study.problem}</p>
        </div>
        <div>
          <h4 className="font-semibold text-sm flex items-center mb-1"><CheckSquare className="h-4 w-4 mr-2 text-primary" />Solution:</h4>
          <p className="text-sm text-foreground/80">{study.solution}</p>
        </div>
        <div>
          <h4 className="font-semibold text-sm flex items-center mb-1"><TrendingUp className="h-4 w-4 mr-2 text-primary" />Results:</h4>
          <p className="text-sm text-foreground/80">{study.results}</p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}

export default function CaseStudiesPage() {
  return (
    <div>
      <PageHeader
        title="Case Studies"
        subtitle="See how we've helped businesses like yours achieve remarkable results through our tailored media and software solutions."
        icon={BookOpen}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.id} study={study} />
        ))}
      </div>
    </div>
  );
}
