import { render, screen, waitFor } from '@testing-library/react';
import { MainPage } from './Main';
import { baseCharacter } from '../../__tests__/mockData';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { useGetCharactersQuery } from '../../api/apiSlice';

jest.mock('../../api/apiSlice', () => {
  const actual = jest.requireActual('../../api/apiSlice');
  return {
    __esModule: true,
    ...actual,
    useGetCharactersQuery: jest.fn(),
  };
});

describe('MainPage Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('calls fetchCharacters on mount with saved search term from localStorage', async () => {
    localStorage.setItem('search', 'rick');
    (useGetCharactersQuery as jest.Mock).mockReturnValue({
      data: { results: [baseCharacter], info: { pages: 1 } },
      isLoading: false,
      isFetching: false,
      isError: false,
      error: undefined,
      refetch: jest.fn(),
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/1']}>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/rick sanchez/i)).toBeInTheDocument();
    });
  });

  it('shows loading state while fetching', () => {
    (useGetCharactersQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isFetching: false,
      isError: false,
      error: undefined,
      refetch: jest.fn(),
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('handles API success response', async () => {
    (useGetCharactersQuery as jest.Mock).mockReturnValue({
      data: { results: [baseCharacter], info: { pages: 1 } },
      isLoading: false,
      isFetching: false,
      isError: false,
      error: undefined,
      refetch: jest.fn(),
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/1']}>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(baseCharacter.name)).toBeInTheDocument();
    });
  });

  it('handles API error response', async () => {
    (useGetCharactersQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isFetching: false,
      isError: true,
      error: { status: 400 },
      refetch: jest.fn(),
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Error:\s*400/i)).toBeInTheDocument();
    });
  });
});
