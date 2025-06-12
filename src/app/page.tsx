import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Tv, Code, Briefcase } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24 bg-card rounded-lg shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="font-headline text-4xl md:text-6xl font-bold mb-6 text-primary">
            Crafting Digital Experiences
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-8">
            Sampro Media delivers innovative media services and cutting-edge software solutions to elevate your brand and streamline your operations.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/services">
                Explore Our Services <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Services/Portfolios Overview */}
      <section className="container mx-auto px-4">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
          What We Do
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <Tv className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="font-headline text-2xl text-center">Media Services</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center mb-4">
                Engaging video production, animation, and visual content that captivates your audience.
              </CardDescription>
              <Button asChild variant="link" className="w-full text-primary">
                <Link href="/media-portfolio">
                  View Media Portfolio <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <Code className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="font-headline text-2xl text-center">Software Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center mb-4">
                Custom web and mobile applications, and robust software to power your business.
              </CardDescription>
              <Button asChild variant="link" className="w-full text-primary">
                <Link href="/software-portfolio">
                  View Software Portfolio <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <Briefcase className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="font-headline text-2xl text-center">Comprehensive Services</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center mb-4">
                From initial concept to final delivery, we provide end-to-end solutions.
              </CardDescription>
              <Button asChild variant="link" className="w-full text-primary">
                <Link href="/services">
                  Learn More About Services <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="container mx-auto px-4 py-16 text-center">
         <Card className="bg-primary text-primary-foreground p-8 md:p-12 rounded-lg shadow-lg">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Next Project?
          </h2>
          <p className="text-lg md:text-xl max-w-xl mx-auto mb-8">
            Let's discuss how Sampro Media can help you achieve your goals.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/contact">
              Contact Us Today <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </Card>
      </section>
    </div>
  );
}
