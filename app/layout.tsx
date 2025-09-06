import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { WhatsAppIcon } from '@/components/IconComponents';
import { PageTransitionProvider } from '@/components/Providers';

const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '700', '900'], display: 'swap' });

export const metadata: Metadata = {
  title: 'AWLAD MESHREKY GARAGE | Premium Auto Care',
  description: 'Premium automotive repair, maintenance, and detailing services in Ajman. Expert technicians, quality parts, and customer satisfaction guaranteed.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-dark text-secondary dark:text-gray-300 font-sans transition-colors duration-300`}>
        <Header />
        <main>
          <PageTransitionProvider>{children}</PageTransitionProvider>
        </main>
        <Footer />
        <a
          href="https://wa.me/971508361799"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-110"
        >
          <WhatsAppIcon />
        </a>

        {/* Third-party scripts */}
        <Script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}