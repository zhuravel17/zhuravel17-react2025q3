import { render, screen, waitFor } from '@testing-library/react';
import { MainPage } from './Main';
import fetchCharacters from '../../utils/fetchResults';
import { baseCharacter } from '../../__tests__/mockData';

jest.mock('../../utils/fetchResults');

describe('MainPage Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('calls fetchCharacters on mount with saved search term from localStorage', async () => {
    localStorage.setItem('search', 'rick');
    (fetchCharacters as jest.Mock).mockResolvedValueOnce([baseCharacter]);

    render(<MainPage />);

    await waitFor(() => {
      expect(fetchCharacters).toHaveBeenCalledWith('rick');
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('shows loading state while fetching', async () => {
    (fetchCharacters as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    render(<MainPage />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('handles API success response', async () => {
    (fetchCharacters as jest.Mock).mockResolvedValueOnce([baseCharacter]);

    render(<MainPage />);

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });
  });

  it('handles API error response', async () => {
    (fetchCharacters as jest.Mock).mockRejectedValueOnce(
      new Error('API Error')
    );

    render(<MainPage />);

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});
