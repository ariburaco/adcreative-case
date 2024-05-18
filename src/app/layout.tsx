import Providers from '@/providers';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AdCreative Case',
  description: 'A React-based application that allows users to search for characters from the "Rick and Morty" series using an autocomplete component.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(inter.className, {
          'px-4 py-20': true,
        })}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
