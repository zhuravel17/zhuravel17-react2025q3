import { render, screen } from '@testing-library/react';
import { Card } from './Card';
import { baseCharacter } from '../../__tests__/mockData';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';

describe('Card component', () => {
  it('displays character name, status and location correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card item={baseCharacter} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('img')).toHaveAttribute('src', baseCharacter.image);
    expect(screen.getByRole('img')).toHaveAttribute('alt', baseCharacter.name);
    expect(screen.getByText(baseCharacter.name)).toBeInTheDocument();
    expect(screen.getByText(/status:/i)).toHaveTextContent(
      `Status: ${baseCharacter.status}`
    );
    expect(screen.getByText(/location:/i)).toHaveTextContent(
      `Location: ${baseCharacter.location.name}`
    );
  });
});
