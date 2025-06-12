import PageHeader from '@/components/shared/PageHeader';
import ContactForm from './ContactForm';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContactPage() {
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
                <a href="mailto:info@sampro.media" className="text-primary hover:underline">
                  info@sampro.media
                </a>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <a href="tel:+1234567890" className="text-primary hover:underline">
                  +1 (234) 567-890
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
