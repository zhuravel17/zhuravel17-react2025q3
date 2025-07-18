import { Component, ReactNode } from 'react';
import './Loading.styles.css';

export class Loading extends Component {
  render(): ReactNode {
    return (
      <div
        className="loading-container"
        role="status"
        aria-label="Loading content"
      >
        <div className="spinner" aria-hidden="true" />
        <p className="loading-text">Loading...</p>
      </div>
    );
  }
}
