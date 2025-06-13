
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Lightbulb, Users, Film, Cpu, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';

export default function AboutUsPage() {
  const whatWeDoItems = [
    {
      icon: Film,
      title: 'Storytelling That Sticks',
      description: "We don't just create content; we forge connections. Videos that captivate, graphics that pop, and words that resonate – we make sure your brand's voice is unforgettable, reaching audiences in Kenya and worldwide.",
    },
    {
      icon: Cpu,
      title: 'Tech That Transforms',
      description: 'From sleek, high-performing websites and e-commerce platforms to custom software solutions that streamline your world, we build the digital backbone your business deserves, leveraging our expertise in Kenya for global impact.',
    },
    {
      icon: TrendingUp,
      title: "Growth That's Guaranteed",
      description: "We cut through the noise, putting your brand directly in front of the right audience. Our digital marketing strategies aren't just effective; they're designed for measurable, scalable growth for businesses in Kenya and beyond.",
    },
  ];

  return (
    <div className="space-y-16">
      <PageHeader
        title="About Sampro Media"
        subtitle="Your Vision. Our Digital Power in Kenya and Globally."
        icon={Lightbulb}
      />

      <section className="text-center">
        <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
          Forget the digital maze. At Sampro Media, a leading digital agency in Kenya, we're not just navigating the future; we're building it, right alongside you. We're a powerhouse of creativity and tech innovation, fiercely passionate about transforming businesses like yours into digital success stories, both in Kenya and globally.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-headline text-3xl font-bold mb-4 text-primary flex items-center">
            <Users className="h-8 w-8 mr-3 text-primary/80" />
            Who We Are
          </h2>
          <p className="text-lg text-foreground/80">
            We're the vibrant minds and skilled hands behind your next big breakthrough. Our team, based in Kenya, is a unique fusion of artistic visionaries and technical wizards, all united by a singular mission: to catapult your brand forward, locally and internationally. We don't just offer services; we craft complete digital ecosystems, where every narrative is compelling and every piece of technology is robust.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl">
          <Image
            src="https://placehold.co/600x400.png"
            alt="Sampro Media Team Collaboration in Kenya"
            width={600}
            height={400}
            className="object-cover w-full h-auto"
            data-ai-hint="team collaboration Kenya"
          />
        </div>
      </section>

      <section className="text-center">
        <h2 className="font-headline text-3xl font-bold mb-4 text-primary flex items-center justify-center">
          <Sparkles className="h-8 w-8 mr-3 text-primary/80" />
          Our Secret Sauce
        </h2>
        <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
          What makes us different? It's our relentless focus on your success. We dive deep into your challenges, uncover your hidden potential, and then—together—we unleash it. We don't just build; we strategize, innovate, and execute with precision. From igniting compelling narratives that grab attention to engineering custom software that drives efficiency for Kenyan and global markets, we're obsessed with delivering tangible, game-changing results.
        </p>
      </section>

      <section>
        <h2 className="font-headline text-3xl font-bold text-center mb-6 text-primary">What We Do</h2>
        <p className="text-lg text-foreground/80 max-w-3xl mx-auto text-center mb-10">
          Think of us as your comprehensive digital arsenal in Kenya. We've got the tools and the talent to conquer any digital frontier:
        </p>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {whatWeDoItems.map((item, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="items-center text-center">
                <item.icon className="h-12 w-12 text-primary mb-3" />
                <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-center text-foreground/80">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center py-12 bg-card rounded-lg shadow-2xl my-16">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6 text-primary">
            Ready to Stop Dreaming and Start Dominating Your Digital Space?
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto mb-10">
            Let's connect. Your remarkable digital journey, powered by Kenyan innovation for global reach, starts now.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6">
            <Link href="/contact">
              Connect With Us <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
