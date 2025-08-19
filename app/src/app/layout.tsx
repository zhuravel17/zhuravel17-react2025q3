import { ReactNode } from 'react';
import './globals.css';

type Props = {
  children: ReactNode;
};

//TODO: export metadata
export default function RootLayout({ children }: Props): ReactNode {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
