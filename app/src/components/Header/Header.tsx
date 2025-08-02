import { ReactElement } from 'react';
import './Header.styles.css';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../enums/routes.enum';

export function Header(): ReactElement {
  return (
    <header className="header">
      <h1>Rick and Morty</h1>
      <nav>
        <Link to={AppRoutes.About}>About</Link>
      </nav>
    </header>
  );
}
