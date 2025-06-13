
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Bot, Lightbulb, MessageSquare, ArrowRight } from 'lucide-react';

const aiToolsList = [
  {
    id: 'description-generator',
    title: 'AI Project Description Generator',
    description: 'Craft compelling, SEO-friendly descriptions for your projects using AI.',
    link: '/ai-description-generator',
    icon: Lightbulb,
  },
  {
    id: 'social-snippet-generator',
    title: 'AI Social Media Snippet Generator',
    description: 'Generate catchy social media posts for various platforms in seconds.',
    link: '/ai-social-media-snippet-generator',
    icon: MessageSquare,
  },
  // Future AI tools can be added here
];

export default function AIToolsPage() {
  return (
    <div>
      <PageHeader
        title="AI Powered Tools"
        subtitle="Leverage artificial intelligence to boost your productivity and creativity. Explore our suite of AI tools designed to help you with various tasks."
        icon={Bot}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {aiToolsList.map((tool) => {
          const ToolIcon = tool.icon;
          return (
            <Card key={tool.id} className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                <ToolIcon className="h-16 w-16 text-primary mb-3" />
                <CardTitle className="font-headline text-xl">{tool.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-center text-foreground/80">
                  {tool.description}
                </p>
              </CardContent>
              <CardFooter className="justify-center">
                <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href={tool.link}>
                    Use Tool <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
