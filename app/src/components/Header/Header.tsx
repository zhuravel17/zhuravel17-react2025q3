import { Component, ReactNode } from 'react';
import './Header.styles.css';
export class Header extends Component {
  render(): ReactNode {
    return (
      <header className="header">
        <h1>Rick and Morty</h1>
        <div>You can serch</div>
      </header>
    );
  }
}
