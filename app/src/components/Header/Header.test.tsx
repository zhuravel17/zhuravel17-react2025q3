import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { ThemeProvider } from '../../context/ThemeContext';

describe('Header', () => {
  it('renders the header with title, about link and theme button', () => {
    render(
      <ThemeProvider>
        <Provider store={store}>
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </Provider>
      </ThemeProvider>
    );

    expect(screen.getByText(/Rick and Morty/i)).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: /About/i });
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
