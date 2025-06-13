
import PageHeader from '@/components/shared/PageHeader';
import { FileTextIcon } from 'lucide-react'; // Corrected icon import
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Terms of Service | Sampro Media',
  description: 'Read the Terms of Service for Sampro Media, governing the use of our website and services, including software development and media production in Kenya and globally.',
};

export default function TermsOfServicePage() {
  return (
    <div>
      <PageHeader
        title="Terms of Service"
        subtitle="Please read these terms carefully before using our services."
        icon={FileTextIcon} // Corrected icon usage
      />
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Agreement to Terms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-foreground/80">
          <p><strong>Last Updated: [Date]</strong></p>
          
          <section>
            <h2 className="font-semibold text-xl text-foreground mb-2">1. Introduction</h2>
            <p>
              These Terms of Service ("Terms") govern your access to and use of the website [Your Website URL] (the "Site") and the services offered by Sampro Media ("we", "us", or "our"), including but not limited to software development, media production, and consulting services (collectively, the "Services"). By accessing or using our Site and Services, you agree to be bound by these Terms.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-foreground mb-2">2. Use of Our Services</h2>
            <p>
              You agree to use our Services only for lawful purposes and in accordance with these Terms. You are prohibited from using our Services:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>In any way that violates any applicable national or international law or regulation.</li>
              <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
              <li>To impersonate or attempt to impersonate Sampro Media, a Sampro Media employee, another user, or any other person or entity.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-foreground mb-2">3. Intellectual Property Rights</h2>
            <p>
              The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of Sampro Media and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Sampro Media.
            </p>
          </section>
          
          <section>
            <h2 className="font-semibold text-xl text-foreground mb-2">4. User Accounts</h2>
            <p>
              If you create an account with us, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-foreground mb-2">5. Termination</h2>
            <p>
             We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-foreground mb-2">6. Limitation of Liability</h2>
            <p>
             In no event shall Sampro Media, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-foreground mb-2">7. Governing Law</h2>
            <p>
             These Terms shall be governed and construed in accordance with the laws of Kenya, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-foreground mb-2">8. Changes to Terms</h2>
            <p>
             We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-foreground mb-2">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at mediasampro@gmail.com.
            </p>
          </section>
          <p className="italic mt-6">
            <strong>Disclaimer:</strong> This is a general template for Terms of Service. It is not a substitute for legal advice. You should consult with a legal professional to ensure your Terms of Service are appropriate for your specific business (software and media services), jurisdiction (Kenya and global operations), and comply with all applicable laws. Remember to replace placeholders like "[Date]" and "[Your Website URL]".
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
