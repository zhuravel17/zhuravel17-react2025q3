import { render, screen } from '@testing-library/react';
import { CardList } from './CardList';
import { mockItems, incompleteCharacter } from '../../__tests__/mockData';

describe('CardList component', () => {
  it('renders correct number of items when data is provided', () => {
    render(<CardList items={mockItems} />);
    const renderedItems = screen.getAllByText(/rick|morty/i);
    expect(renderedItems).toHaveLength(2);
  });

  it('displays "no results" message when data array is empty', () => {
    render(<CardList items={[]} />);
    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });

  it('handles missing or undefined fields gracefully', () => {
    render(<CardList items={[incompleteCharacter]} />);
    expect(screen.getByText(/Birdperson/i)).toBeInTheDocument();
  });
});
