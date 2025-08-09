import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { CharacterDetails } from './CharacterDetails';
import { MemoryRouter } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { baseCharacter } from '../../__tests__/mockData';
import { store } from '../../store';
import { Provider } from 'react-redux';
import { useGetCharacterByIdQuery } from '../../api/apiSlice';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock('../../api/apiSlice', () => ({
  ...jest.requireActual('../../api/apiSlice'),
  useGetCharacterByIdQuery: jest.fn(),
}));

describe('CharacterDetails component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ detailsId: '1' });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  it('shows loading initially', async () => {
    (useGetCharacterByIdQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      isFetching: false,
      refetch: jest.fn(),
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CharacterDetails />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders character data on successful fetch', async () => {
    (useGetCharacterByIdQuery as jest.Mock).mockReturnValue({
      data: baseCharacter,
      isLoading: false,
      isError: false,
      isFetching: false,
      refetch: jest.fn(),
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CharacterDetails />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Status: Alive')).toBeInTheDocument();
      expect(screen.getByText('Location: Earth (C-137)')).toBeInTheDocument();
    });
  });

  it('shows error message on fetch failure', async () => {
    (useGetCharacterByIdQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      isFetching: false,
      refetch: jest.fn(),
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CharacterDetails />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/character not found/i)).toBeInTheDocument();
    });
  });

  it('navigates back when close is clicked', async () => {
    (useGetCharacterByIdQuery as jest.Mock).mockReturnValue({
      data: baseCharacter,
      isLoading: false,
      isError: false,
      isFetching: false,
      refetch: jest.fn(),
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CharacterDetails />
        </MemoryRouter>
      </Provider>
    );

    const closeButton = await screen.findByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith('..', { relative: 'path' });
  });
});
