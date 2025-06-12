import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container py-12 md:py-20">
        <article className="prose prose-slate mx-auto dark:prose-invert lg:prose-xl max-w-3xl">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl mb-8">
            Terms of Service
          </h1>

          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <p>Welcome to Rentizzi! These Terms of Service ("Terms") govern your use of the Rentizzi application and services (collectively, the "Service") provided by Rentizzi ("we," "us," or "our"). By accessing or using our Service, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Service.</p>

          <h2 className="font-headline text-2xl font-semibold text-primary mt-8 mb-4">1. Use of Our Service</h2>
          <p>You must be at least 18 years old to use our Service. You agree to use the Service in compliance with all applicable local, state, national, and international laws, rules, and regulations.</p>
          <p>You are responsible for maintaining the confidentiality of your account information, including your password, and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.</p>

          <h2 className="font-headline text-2xl font-semibold text-primary mt-8 mb-4">2. User Roles and Responsibilities</h2>
          <p>Rentizzi provides distinct roles (Landlord, Tenant, Worker, Shop Manager, Admin). Your access to and use of features will depend on your assigned role. You agree not to misuse your access or attempt to access features not intended for your role.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Landlords:</strong> Are responsible for the accuracy of property information, tenant data, and worker assignments. They must ensure they have the legal right to manage the properties and individuals they register on the platform.</li>
            <li><strong>Tenants:</strong> Agree to provide accurate information as requested by their landlord and use the platform for its intended purposes, such as making payments and submitting service requests.</li>
            <li><strong>Workers:</strong> Agree to perform assigned tasks diligently and update their status accurately.</li>
          </ul>

          <h2 className="font-headline text-2xl font-semibold text-primary mt-8 mb-4">3. Content and Data</h2>
          <p>You retain ownership of any data or content you submit to the Service ("User Content"). However, by submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your User Content in connection with operating and providing the Service.</p>
          <p>We are not responsible for the accuracy, legality, or appropriateness of User Content. Landlords are particularly responsible for ensuring they have consent for any personal data they upload regarding tenants or workers.</p>

          <h2 className="font-headline text-2xl font-semibold text-primary mt-8 mb-4">4. Prohibited Activities</h2>
          <p>You agree not to engage in any of the following prohibited activities:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Using the Service for any illegal purpose or in violation of any local, state, national, or international law.</li>
            <li>Violating or encouraging others to violate the rights of third parties, including intellectual property rights.</li>
            <li>Posting, uploading, or distributing any content that is unlawful, defamatory, libelous, inaccurate, or that a reasonable person could deem to be objectionable, profane, indecent, pornographic, harassing, threatening, hateful, or otherwise inappropriate.</li>
            <li>Interfering with security-related features of the Service.</li>
            <li>Attempting to gain unauthorized access to the Service, other accounts, computer systems, or networks connected to the Service.</li>
          </ul>

          <h2 className="font-headline text-2xl font-semibold text-primary mt-8 mb-4">5. Termination</h2>
          <p>We may terminate or suspend your access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
          <p>Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or contact us.</p>

          <h2 className="font-headline text-2xl font-semibold text-primary mt-8 mb-4">6. Disclaimers and Limitation of Liability</h2>
          <p>The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, express or implied, regarding the Service.</p>
          <p>To the fullest extent permitted by law, in no event shall Rentizzi be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your access to or use of or inability to access or use the Service; (b) any conduct or content of any third party on the Service.</p>

          <h2 className="font-headline text-2xl font-semibold text-primary mt-8 mb-4">7. Governing Law</h2>
          <p>These Terms shall be governed and construed in accordance with the laws of Kenya, without regard to its conflict of law provisions.</p>

          <h2 className="font-headline text-2xl font-semibold text-primary mt-8 mb-4">8. Changes to Terms</h2>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
          <p>By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.</p>

          <h2 className="font-headline text-2xl font-semibold text-primary mt-8 mb-4">9. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at <a href="mailto:support@rentizzi.app" className="text-primary hover:underline">support@rentizzi.app</a>.</p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
