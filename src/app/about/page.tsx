
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Eye, Zap, ShieldCheck, Handshake, Lightbulb } from 'lucide-react';
import Image from 'next/image';

export default function AboutUsPage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="About Sampro Media"
        subtitle="Your Partner in Digital Excellence"
        icon={Users}
      />

      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="font-headline text-3xl font-bold mb-4 text-primary">Who We Are</h2>
          <p className="text-lg text-foreground/80 mb-4">
            Sampro Media is a dynamic and innovative company specializing in a comprehensive suite of media and software solutions. We are passionate about helping businesses thrive in the digital landscape by crafting compelling narratives, building robust technology, and delivering measurable results.
          </p>
          <p className="text-lg text-foreground/80">
            Our team of creative professionals and technical experts works collaboratively to understand your unique challenges and goals, transforming your vision into reality.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <Image
            src="https://placehold.co/600x400.png"
            alt="Sampro Media Team or Office"
            width={600}
            height={400}
            className="object-cover w-full h-auto"
            data-ai-hint="team office"
          />
        </div>
      </section>

      <section>
        <h2 className="font-headline text-3xl font-bold text-center mb-8 text-primary">Our Core Principles</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              <Target className="h-12 w-12 text-primary mb-3" />
              <CardTitle className="font-headline text-xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-center text-foreground/80">
                To empower businesses with cutting-edge media and software solutions that drive growth, enhance brand presence, and create lasting impact.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              <Eye className="h-12 w-12 text-primary mb-3" />
              <CardTitle className="font-headline text-xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-center text-foreground/80">
                To be a leading force in digital innovation, recognized for our creativity, technical excellence, and unwavering commitment to client success.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              <Zap className="h-12 w-12 text-primary mb-3" />
              <CardTitle className="font-headline text-xl">Our Approach</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-center text-foreground/80">
                We combine strategic thinking with creative execution and technical expertise, ensuring every project is tailored to meet specific objectives and deliver outstanding results.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="font-headline text-3xl font-bold text-center mb-8 text-primary">Why Partner With Us?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Lightbulb, title: 'Innovative Solutions', description: 'We stay ahead of the curve, leveraging the latest technologies and trends to deliver forward-thinking solutions.' },
            { icon: ShieldCheck, title: 'Quality & Reliability', description: 'Our commitment to excellence ensures high-quality deliverables and dependable service you can trust.' },
            { icon: Handshake, title: 'Client-Centric Approach', description: 'We prioritize your needs, fostering collaborative partnerships and ensuring your vision is at the heart of everything we do.' },
            { icon: Users, title: 'Experienced Team', description: 'Our diverse team of experts brings a wealth of knowledge and experience to every project.' },
            { icon: Target, title: 'Results-Driven', description: 'We focus on delivering measurable outcomes that contribute to your business success and growth.' },
            { icon: Zap, title: 'Comprehensive Services', description: 'From concept to completion, we offer a full spectrum of media and software services under one roof.' },
          ].map((item, index) => (
            <Card key={index} className="bg-card border-border/70 shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center mb-3">
                  <item.icon className="h-7 w-7 text-primary mr-3" />
                  <h3 className="font-headline text-lg font-semibold">{item.title}</h3>
                </div>
                <p className="text-sm text-foreground/80">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
