import { ReactElement } from 'react';
import './Header.styles.css';

export function Header(): ReactElement {
  return (
    <header className="header">
      <h1>Rick and Morty</h1>
    </header>
  );
}
