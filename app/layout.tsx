import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Aarnav Anand - Full Stack Developer',
  description:
    'Full-stack developer crafting immersive digital experiences. Specializing in MERN stack, Next.js, and modern web technologies.',
  keywords: [
    'full-stack developer',
    'MERN stack',
    'Next.js',
    'React',
    'Node.js',
    'portfolio',
    'web development',
  ],
  authors: [{ name: 'Aarnav Anand' }],
  creator: 'Aarnav Anand',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aarnavanand.dev',
    title: 'Aarnav Anand - Full Stack Developer',
    description:
      'Full-stack developer crafting immersive digital experiences. Specializing in MERN stack, Next.js, and modern web technologies.',
    siteName: 'Aarnav Anand Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Aarnav Anand Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aarnav Anand - Full Stack Developer',
    description:
      'Full-stack developer crafting immersive digital experiences. Specializing in MERN stack, Next.js, and modern web technologies.',
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
