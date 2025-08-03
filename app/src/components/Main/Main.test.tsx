import { render, screen, waitFor } from '@testing-library/react';
import { MainPage } from './Main';
import fetchCharacters from '../../utils/fetchCharacters';
import { baseCharacter } from '../../__tests__/mockData';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';

jest.mock('../../utils/fetchCharacters');

describe('MainPage Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('calls fetchCharacters on mount with saved search term from localStorage', async () => {
    localStorage.setItem('search', 'rick');
    (fetchCharacters as jest.Mock).mockResolvedValueOnce({
      results: [baseCharacter],
      pages: 1,
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/1']}>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(fetchCharacters).toHaveBeenCalledWith('rick', 1);
      expect(screen.getByText(/rick sanchez/i)).toBeInTheDocument();
    });
  });

  it('shows loading state while fetching', async () => {
    (fetchCharacters as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/1']}>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('handles API success response', async () => {
    (fetchCharacters as jest.Mock).mockResolvedValueOnce({
      results: [baseCharacter],
      pages: 1,
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/1']}>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('handles API error response', async () => {
    (fetchCharacters as jest.Mock).mockRejectedValueOnce(
      new Error('API Error')
    );

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/1']}>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});
