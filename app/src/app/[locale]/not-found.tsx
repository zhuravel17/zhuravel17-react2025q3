import { getTranslations } from 'next-intl/server';
import { Link } from '../../i18n/navigation';
import { JSX } from 'react';

export default async function NotFound(): Promise<JSX.Element> {
  const t = await getTranslations('NotFound');
  return (
    <main style={{ padding: 24 }}>
      <h1>{t('title')}</h1>
      <p>{t('desc')}</p>
      <Link href="/">{t('back')}</Link>
    </main>
  );
}
