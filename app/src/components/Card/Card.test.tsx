import { render, screen } from '@testing-library/react';
import { Card } from './Card';
import { baseCharacter } from '../../__tests__/mockData';

describe('Card component', () => {
  it('displays character name, status and location correctly', () => {
    render(<Card item={baseCharacter} />);

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
