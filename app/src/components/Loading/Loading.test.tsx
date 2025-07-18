import { render, screen } from '@testing-library/react';
import { Loading } from './Loading';

describe('Loading component', () => {
  it('renders spinner and loading text', () => {
    render(<Loading />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    const spinner = document.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-hidden', 'true');
  });

  it('has correct accessibility attributes', () => {
    render(<Loading />);

    const container = screen.getByRole('status');

    expect(container).toHaveAttribute('aria-label', 'Loading content');
  });
});
