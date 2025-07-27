import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { CharacterDetails } from './CharacterDetails';
import { MemoryRouter } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { baseCharacter } from '../../__tests__/mockData';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('CharacterDetails component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ detailsId: '1' });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  it('shows loading initially', async () => {
    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

    render(
      <MemoryRouter>
        <CharacterDetails />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders character data on successful fetch', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(baseCharacter),
      })
    ) as jest.Mock;

    render(
      <MemoryRouter>
        <CharacterDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Status: Alive')).toBeInTheDocument();
      expect(screen.getByText('Location: Earth (C-137)')).toBeInTheDocument();
    });
  });

  it('shows error message on fetch failure', async () => {
    global.fetch = jest.fn(() => Promise.reject('API error')) as jest.Mock;

    render(
      <MemoryRouter>
        <CharacterDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/character not found/i)).toBeInTheDocument();
    });
  });

  it('navigates back when close is clicked', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(baseCharacter),
      })
    ) as jest.Mock;

    render(
      <MemoryRouter>
        <CharacterDetails />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText('Close'));

    fireEvent.click(screen.getByText('Close'));
    expect(mockNavigate).toHaveBeenCalledWith('..', { relative: 'path' });
  });
});
