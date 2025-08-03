import { render, screen } from '@testing-library/react';
import { CardList } from './CardList';
import { mockItems, incompleteCharacter } from '../../__tests__/mockData';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';

describe('CardList component', () => {
  it('renders correct number of items when data is provided', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList items={mockItems} />
        </MemoryRouter>
      </Provider>
    );
    const renderedItems = screen.getAllByText(/rick|morty/i);
    expect(renderedItems).toHaveLength(2);
  });

  it('displays "no results" message when data array is empty', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList items={[]} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });

  it('handles missing or undefined fields gracefully', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList items={[incompleteCharacter]} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Birdperson/i)).toBeInTheDocument();
  });
});
