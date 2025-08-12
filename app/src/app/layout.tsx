import type { Metadata } from 'next';
import './global.css';
import { ReactElement } from 'react';

export const metadata: Metadata = {
  title: 'Rick and Morty',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
