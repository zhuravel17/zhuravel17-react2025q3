'use client';

import { NextIntlClientProvider } from 'next-intl';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { ThemeProvider } from '../../context/ThemeContext';

interface Props {
  children: React.ReactNode;
  locale: string;
}

export default function Providers({ children, locale }: Props) {
  return (
    <NextIntlClientProvider locale={locale}>
      <Provider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
      </Provider>
    </NextIntlClientProvider>
  );
}
