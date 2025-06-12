import PageHeader from '@/components/shared/PageHeader';
import ContactForm from './ContactForm';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Custom WhatsApp icon component
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    <path d="M19.07 4.93A10 10 0 1 1 4.93 19.07" />
  </svg>
);


export default function ContactPage() {
  const whatsappLink = "https://wa.me/254111844321"; // Formatted for WhatsApp link

  return (
    <div>
      <PageHeader
        title="Get In Touch"
        subtitle="We're excited to hear about your project. Reach out to us using the form below or through our contact details."
        icon={Mail}
      />
      <div className="grid md:grid-cols-2 gap-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Our Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <a href="mailto:mediasampro@gmail.com" className="text-primary hover:underline">
                  mediasampro@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <a href="tel:+254111844321" className="text-primary hover:underline">
                  +254 111 844 321
                </a>
              </div>
            </div>
             <div className="flex items-start">
              <WhatsAppIcon className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold">WhatsApp</h3>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Chat with us on WhatsApp
                </a>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold">Address</h3>
                <p>123 Creative Lane, Tech City, ST 54321</p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Business Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday - Sunday: Closed</p>
            </div>
            <div className="mt-8">
              <h3 className="font-semibold mb-3 text-lg">Connect With Us</h3>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" asChild>
                  <Link href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                    <WhatsAppIcon className="h-5 w-5 text-primary" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <Facebook className="h-5 w-5 text-primary" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <Twitter className="h-5 w-5 text-primary" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Instagram className="h-5 w-5 text-primary" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5 text-primary" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
