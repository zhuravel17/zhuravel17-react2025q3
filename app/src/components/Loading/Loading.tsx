import { Component, ReactNode } from 'react';
import './Loading.styles.css';

export class Loading extends Component {
  render(): ReactNode {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p className="loading-text">Loading...</p>
      </div>
    );
  }
}
