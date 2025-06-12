import PageHeader from '@/components/shared/PageHeader';
import AIDescriptionGeneratorForm from './AIDescriptionGeneratorForm';
import { Lightbulb, Bot } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { aiToolTips } from '@/lib/data';

export default function AIDescriptionGeneratorPage() {
  return (
    <div>
      <PageHeader
        title="AI Project Description Generator"
        subtitle="Leverage AI to craft compelling, SEO-friendly descriptions for your projects. Fill in the details below to get started."
        icon={Bot}
      />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Generate Your Description</CardTitle>
              <CardDescription>Provide details about your project, and our AI will generate a marketing-focused description.</CardDescription>
            </CardHeader>
            <CardContent>
              <AIDescriptionGeneratorForm />
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
