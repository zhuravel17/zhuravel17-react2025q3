import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '../../../i18n/navigation';
import styles from './About.module.css';

const schoolLogo = '/school-logo.svg';

export default async function AboutPage() {
  const t = await getTranslations('About');

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
