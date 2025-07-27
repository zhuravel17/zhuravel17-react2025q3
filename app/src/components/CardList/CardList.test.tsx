import { render, screen } from '@testing-library/react';
import { CardList } from './CardList';
import { mockItems, incompleteCharacter } from '../../__tests__/mockData';
import { MemoryRouter } from 'react-router-dom';

describe('CardList component', () => {
  it('renders correct number of items when data is provided', () => {
    render(
      <MemoryRouter>
        <CardList items={mockItems} />
      </MemoryRouter>
    );
    const renderedItems = screen.getAllByText(/rick|morty/i);
    expect(renderedItems).toHaveLength(2);
  });

  it('displays "no results" message when data array is empty', () => {
    render(
      <MemoryRouter>
        <CardList items={[]} />
      </MemoryRouter>
    );
    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });

  it('handles missing or undefined fields gracefully', () => {
    render(
      <MemoryRouter>
        <CardList items={[incompleteCharacter]} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Birdperson/i)).toBeInTheDocument();
  });
});
