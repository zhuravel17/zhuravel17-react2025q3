import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorButton } from '../ErrorButton/ErrorButton';

describe('ErrorButton component', () => {
  it('triggers error boundary fallback when button is clicked', async () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /throw error/i });
    await userEvent.click(button);

    expect(screen.getByText(/oops/i)).toBeInTheDocument();
  });
});
