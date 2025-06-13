import type { Metadata } from 'next';
import { Inter, PT_Sans, Source_Code_Pro } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const ptSans = PT_Sans({
  subsets: ['latin'],
  variable: '--font-pt-sans',
  display: 'swap',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code-pro',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Rentizzi - Smart Property Management',
  description: 'Effortless Property Management, Elevated Living.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${ptSans.variable} ${sourceCodePro.variable}`}>
      <head />
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
