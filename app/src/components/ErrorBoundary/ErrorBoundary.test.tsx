import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import { ReactElement } from 'react';

function BrokenComponent(): ReactElement | null {
  throw new Error('Component crash');
  return null;
}

describe('ErrorBoundary component', () => {
  const consoleErrorSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  afterEach(() => {
    consoleErrorSpy.mockClear();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('catches JavaScript error in child component and displays fallback UI', () => {
    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(screen.getByRole('heading', { name: /oops/i })).toBeInTheDocument();
    expect(screen.getByText(/please reload page/i)).toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('displays custom search prop if provided on error', () => {
    render(
      <ErrorBoundary search={<div>Search bar</div>}>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/search bar/i)).toBeInTheDocument();
  });

  it('renders children when no error is thrown', () => {
    render(
      <ErrorBoundary>
        <div>Safe content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText(/safe content/i)).toBeInTheDocument();
  });
});
