'use client';

import { Component, ReactNode } from 'react';
import './ErrorBoundary.styles.css';

interface ErrorBoundaryProps {
  children: ReactNode;
  search?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  handleReset = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <>
          {this.props.search}
          <div className="error-boundary">
            <h1>Oops!</h1>
            <p>Please reload page.</p>
            <button onClick={() => window.location.reload()}>Reload</button>
          </div>
        </>
      );
    }

    return this.props.children;
  }
}
