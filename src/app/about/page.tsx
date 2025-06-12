import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            About Propero
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground/80">
            Revolutionizing property management with smart, intuitive solutions for landlords, tenants, and workers.
          </p>
        </div>

        <div className="mt-16 space-y-12">
          <section>
            <h2 className="font-headline text-2xl font-semibold text-primary mb-4">Our Mission</h2>
            <p className="text-foreground/80 leading-relaxed">
              At Propero, our mission is to simplify the complexities of property management. We aim to create a seamless, transparent, and efficient ecosystem where landlords can effortlessly manage their properties, tenants can enjoy convenient living, and workers can perform their duties effectively. We believe in leveraging technology to foster better communities and enhance the quality of life for everyone involved in the property sector.
            </p>
          </section>

          <section className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="font-headline text-2xl font-semibold text-primary mb-4">Our Vision</h2>
              <p className="text-foreground/80 leading-relaxed">
                We envision a future where property management is no longer a source of stress but a streamlined process empowered by intelligent tools. Propero strives to be the leading platform in property technology, continuously innovating to meet the evolving needs of the market and setting new standards for convenience, security, and user experience. Our goal is to build connected communities where technology enhances every aspect of property living.
              </p>
            </div>
            <div className="md:w-1/2">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Team working on Propero"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
                data-ai-hint="team collaboration"
              />
            </div>
          </section>

          <section>
            <h2 className="font-headline text-2xl font-semibold text-primary mb-4">Why Choose Propero?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg shadow">
                <h3 className="font-headline text-lg font-semibold text-primary mb-2">Comprehensive Solution</h3>
                <p className="text-sm text-foreground/70">From tenant onboarding to payment processing and service requests, Propero covers all aspects of property management.</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow">
                <h3 className="font-headline text-lg font-semibold text-primary mb-2">User-Centric Design</h3>
                <p className="text-sm text-foreground/70">Our platform is built with the user in mind, offering intuitive dashboards and easy-to-navigate features for all roles.</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow">
                <h3 className="font-headline text-lg font-semibold text-primary mb-2">Security First</h3>
                <p className="text-sm text-foreground/70">We prioritize the security of your data with robust measures, ensuring a safe and trustworthy environment.</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow">
                <h3 className="font-headline text-lg font-semibold text-primary mb-2">Future-Ready Technology</h3>
                <p className="text-sm text-foreground/70">Propero is built on a modern, scalable architecture, ready to adapt to future needs and integrate innovative features like AI-powered assistance.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
