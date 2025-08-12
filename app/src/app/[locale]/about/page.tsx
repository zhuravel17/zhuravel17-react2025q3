import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '../../../i18n/navigation';
import styles from './About.module.css';
import { ReactElement } from 'react';

const schoolLogo = '/school-logo.svg';

export const dynamic = 'force-static';

export default function AboutPage(): ReactElement {
  const t = useTranslations('About');

  return (
    <div className={styles['about-container']}>
      <h1>{t('title')}</h1>

      <p>
        {t('by')}{' '}
        <a
          href="https://github.com/zhuravel17/"
          target="_blank"
          rel="noreferrer"
        >
          {t('author')}
        </a>{' '}
        {t('course')}
      </p>

      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noreferrer"
      >
        <Image src={schoolLogo} alt="RS School" width={160} height={160} />
      </a>

      <Link href="/">{t('back')}</Link>
    </div>
  );
}
