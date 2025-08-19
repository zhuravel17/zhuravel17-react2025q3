'use client';

import { ReactElement } from 'react';
import './Header.styles.css';
import { Link } from '../../i18n/navigation';
import { AppRoutes } from '../../enums/routes.enum';
import { ButtonTheme } from '../ButtonTheme/ButtonTheme';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';

export function Header(): ReactElement {
  return (
    <header className="header">
      <h1>Rick and Morty</h1>
      <nav>
        <Link href={AppRoutes.About}>About</Link>
      </nav>
      <ButtonTheme />
      <LanguageSwitcher />
    </header>
  );
}
