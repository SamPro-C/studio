
import PageHeader from '@/components/shared/PageHeader';
import { ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Privacy Policy | Sampro Media',
  description: 'Read the Privacy Policy for Sampro Media, detailing how we collect, use, and protect your personal information for our software and media services in Kenya and globally.',
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <PageHeader
        title="Privacy Policy"
        subtitle="Your privacy is important to us. This policy outlines how we handle your personal information."
        icon={ShieldAlert}
      />
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Our Commitment to Your Privacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-foreground/80">
          <p><strong>Last Updated: [Date]</strong></p>
          
          <section>
            <h2 className="font-semibold text-xl text-foreground mb-2">1. Introduction</h2>
            <p>
              Welcome to Sampro Media. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at mediasampro@gmail.com.
            </p>
            <p className="mt-2">
              This privacy notice describes how we might use your information if you visit our website at [Your Website URL], or otherwise engage with us (collectively, the "Services").
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-foreground mb-2">2. What Information Do We Collect?</h2>
            <p>
              <strong>Personal information you disclose to us:</strong> We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services (such as posting messages in our online forums or entering competitions, contests or giveaways) or otherwise when you contact us.
            </p>
            <p className="mt-2">
              The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make and the products and features you use. The personal information we collect may include the following: Name, Email Address, Phone Number, and any other information you choose to provide.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-foreground mb-2">3. How Do We Use Your Information?</h2>
            <p>
              We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
            </p>
             <ul className="list-disc list-inside mt-2 space-y-1">
                <li>To send administrative information to you.</li>
                <li>To protect our Services.</li>
                <li>To enforce our terms, conditions and policies for business purposes, to comply with legal and regulatory requirements or in connection with our contract.</li>
                <li>To respond to legal requests and prevent harm.</li>
                <li>To manage user accounts.</li>
                <li>To deliver and facilitate delivery of services to the user.</li>
                <li>To respond to user inquiries/offer support to users.</li>
             </ul>
          </section>
          
          <section>
            <h2 className="font-semibold text-xl text-foreground mb-2">4. Will Your Information Be Shared With Anyone?</h2>
            <p>
              We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
            </p>
          </section>

           <section>
            <h2 className="font-semibold text-xl text-foreground mb-2">5. How Long Do We Keep Your Information?</h2>
            <p>
             We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-foreground mb-2">6. How Do We Keep Your Information Safe?</h2>
            <p>
              We aim to protect your personal information through a system of organizational and technical security measures. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-foreground mb-2">7. What Are Your Privacy Rights?</h2>
            <p>
             In some regions (like the European Economic Area and the UK), you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-foreground mb-2">8. Updates To This Notice</h2>
            <p>
              We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-foreground mb-2">9. How Can You Contact Us About This Notice?</h2>
            <p>
              If you have questions or comments about this notice, you may email us at mediasampro@gmail.com or by post to:
            </p>
            <p className="mt-2">
              Sampro Media<br/>
              [Your Company Address, if applicable]<br/>
              Nairobi, Kenya
            </p>
          </section>
          <p className="italic mt-6">
            <strong>Note:</strong> This is a general template. You should consult with a legal professional to ensure your Privacy Policy is complete and compliant with all applicable laws and regulations for your specific business and jurisdiction(s), particularly concerning software and media services in Kenya and globally. Remember to replace placeholders like "[Date]" and "[Your Website URL]".
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
