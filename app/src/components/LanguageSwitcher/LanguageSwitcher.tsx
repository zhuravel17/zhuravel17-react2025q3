'use client';

import { usePathname, useRouter } from '../../i18n/navigation';
import { useLocale } from 'next-intl';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    router.replace({ pathname }, { locale: newLocale });
  };

  return (
    <select onChange={handleChange} value={locale}>
      <option value="en">English</option>
      <option value="ru">Русский</option>
    </select>
  );
}
