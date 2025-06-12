
import PageHeader from '@/components/shared/PageHeader';
import AISocialMediaSnippetGeneratorForm from './AISocialMediaSnippetGeneratorForm';
import { Lightbulb, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { aiToolTips } from '@/lib/data';

export default function AISocialMediaSnippetGeneratorPage() {
  return (
    <div>
      <PageHeader
        title="AI Social Media Snippet Generator"
        subtitle="Craft engaging social media posts in seconds with AI. Provide a topic and select a platform to get started."
        icon={MessageSquare}
      />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Generate Your Snippets</CardTitle>
              <CardDescription>Enter your topic/product and choose a platform, and our AI will generate catchy social media snippets.</CardDescription>
            </CardHeader>
            <CardContent>
              <AISocialMediaSnippetGeneratorForm />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card className="shadow-lg bg-secondary">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center">
                <Lightbulb className="h-6 w-6 mr-2 text-primary" />
                Tips for Best Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {aiToolTips.map((tip, index) => {
                  const TipIcon = tip.icon;
                  return (
                    <li key={index} className="flex items-start text-sm">
                      <TipIcon className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                      <span>{tip.text}</span>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
