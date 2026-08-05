import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Aarnav Anand - Software Engineer & System Designer',
  description:
    'Software engineer specializing in full-stack development, system design, and product architecture. Expert in building scalable applications with thoughtful design systems and production-grade code quality.',
  keywords: [
    'software engineer',
    'full-stack developer',
    'system design',
    'product design',
    'design systems',
    'MERN stack',
    'Next.js',
    'React',
    'Node.js',
    'web architecture',
    'software architecture',
  ],
  authors: [{ name: 'Aarnav Anand' }],
  creator: 'Aarnav Anand',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aarnavanand.dev',
    title: 'Aarnav Anand - Software Engineer & System Designer',
    description:
      'Software engineer with expertise in full-stack development, system architecture, design systems, and product design. Building scalable, thoughtfully designed applications.',
    siteName: 'Aarnav Anand',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Aarnav Anand - Software Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aarnav Anand - Software Engineer & System Designer',
    description:
      'Full-stack engineer with deep expertise in system architecture, design systems, and product design. Crafting production-grade applications.',
    images: ['/og-image.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#1a1a2e',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`font-sans bg-background text-foreground antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
