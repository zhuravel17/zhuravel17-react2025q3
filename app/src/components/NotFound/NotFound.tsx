import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.styles.css';

export function NotFound(): ReactElement {
  return (
    <div className="not-found-container">
      <h1>404 — Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="back-home-link">
        Go back to Home
      </Link>
    </div>
  );
}
