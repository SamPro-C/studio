import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container py-12 md:py-20">
        <article className="prose prose-slate mx-auto dark:prose-invert lg:prose-xl max-w-3xl">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl mb-8">
            Privacy Policy
          </h1>

          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <p>Propero ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Propero application and services (collectively, the "Service"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the service.</p>

          <h2 className="font-headline text-2xl font-semibold text-primary mt-8 mb-4">1. Information We Collect</h2>
          <p>We may collect information about you in a variety of ways. The information we may collect via the Service depends on the content and materials you use, and includes:</p>
          <h3 className="font-headline text-xl font-semibold text-primary mt-6 mb-2">Personal Data</h3>
          <p>Personally identifiable information, such as your name, email address, phone number, and demographic information (such as your age, gender, hometown, and interests), that you voluntarily give to us when you register with the Service or when you choose to participate in various activities related to the Service.</p>
          <p>For Landlords, this may include business details. For Tenants and Workers, this includes information provided by Landlords during registration and any additional information you provide.</p>
          <h3 className="font-headline text-xl font-semibold text-primary mt-6 mb-2">Derivative Data</h3>
          <p>Information our servers automatically collect when you access the Service, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Service.</p>
          <h3 className="font-headline text-xl font-semibold text-primary mt-6 mb-2">Financial Data</h3>
          <p>Financial information, such as data related to your payment method (e.g., valid M-Pesa details, credit card number, card brand, expiration date) that we may collect when you make payments through the Service. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processors, and you are encouraged to review their privacy policy and contact them directly for responses to your questions.</p>
          <h3 className="font-headline text-xl font-semibold text-primary mt-6 mb-2">Data from Service Requests and Media Uploads</h3>
          <p>If you submit service requests, we collect the information you provide, including descriptions and any images or videos you upload related to the request.</p>

          <h2 className="font-headline text-2xl font-semibold text-primary mt-8 mb-4">2. Use of Your Information</h2>
          <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Service to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Create and manage your account.</li>
            <li>Process your transactions and send you related information, including purchase confirmations and invoices.</li>
            <li>Manage service requests and facilitate communication between tenants, landlords, and workers.</li>
            <li>Email you regarding your account or order.</li>
            <li>Enable user-to-user communications (within the scope of service requests or landlord announcements).</li>
            <li>Notify you of updates to the Service.</li>
            <li>Monitor and analyze usage and trends to improve your experience with the Service.</li>
            <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
            <li>Comply with legal and regulatory requirements.</li>
          </ul>

          <h2 className="font-headline text-2xl font-semibold text-primary mt-8 mb-4">3. Disclosure of Your Information</h2>
          <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
          <h3 className="font-headline text-xl font-semibold text-primary mt-6 mb-2">By Law or to Protect Rights</h3>
          <p>If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</p>
          <h3 className="font-headline text-xl font-semibold text-primary mt-6 mb-2">Third-Party Service Providers</h3>
          <p>We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</p>
          <h3 className="font-headline text-xl font-semibold text-primary mt-6 mb-2">Between Users (as per Service Functionality)</h3>
          <p>Information such as your name, apartment details (for tenants), or assigned tasks/apartments (for workers) may be visible to other users (e.g., landlords, relevant tenants/workers) as necessary for the Service to function. We implement role-based access control to limit data visibility to only what is necessary for each role.</p>
          
          <h2 className="font-headline text-2xl font-semibold text-primary mt-8 mb-4">4. Security of Your Information</h2>
          <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

          <h2 className="font-headline text-2xl font-semibold text-primary mt-8 mb-4">5. Policy for Children</h2>
          <p>We do not knowingly solicit information from or market to children under the age of 13. If we learn that we have collected personal information from a child under age 13 without verification of parental consent, we will delete that information as quickly as possible. If you believe we might have any information from or about a child under 13, please contact us.</p>

          <h2 className="font-headline text-2xl font-semibold text-primary mt-8 mb-4">6. Your Rights</h2>
          <p>Depending on your jurisdiction, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. To exercise these rights, please contact us.</p>
          
          <h2 className="font-headline text-2xl font-semibold text-primary mt-8 mb-4">7. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>

          <h2 className="font-headline text-2xl font-semibold text-primary mt-8 mb-4">8. Contact Us</h2>
          <p>If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:privacy@propero.app" className="text-primary hover:underline">privacy@propero.app</a>.</p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
