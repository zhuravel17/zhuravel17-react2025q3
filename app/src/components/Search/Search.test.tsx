import { render, screen } from '@testing-library/react';
import { Search } from './Search';
import userEvent from '@testing-library/user-event';

describe('Search component', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it('renders search input and search button', () => {
    render(<Search onSearch={jest.fn()} isLoading={false} />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('shows empty input when no saved term exists', () => {
    render(<Search onSearch={jest.fn()} isLoading={false} />);

    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
    expect((input as HTMLInputElement).value).toBe('');
  });

  it('displays previously saved search term from localStorage on mount', () => {
    localStorage.setItem('search', 'rick');
    render(<Search onSearch={jest.fn()} isLoading={false} />);

    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
    expect((input as HTMLInputElement).value).toBe('rick');
  });

  it('updates input value when user types', async () => {
    render(<Search onSearch={jest.fn()} isLoading={false} />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Morty');

    expect((input as HTMLInputElement).value).toBe('Morty');
  });

  it('saves trimmed search term to localStorage and calls onSearch', async () => {
    const mockSearch = jest.fn();
    render(<Search onSearch={mockSearch} isLoading={false} />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, '  Rick  ');
    await userEvent.click(button);

    expect(localStorage.getItem('search')).toBe('Rick');
    expect(mockSearch).toHaveBeenCalledWith('Rick');
  });

  it('does not call onSearch if input is empty', async () => {
    const mockSearch = jest.fn();
    render(<Search onSearch={mockSearch} isLoading={false} />);

    const button = screen.getByRole('button', { name: /search/i });
    await userEvent.click(button);

    expect(mockSearch).toHaveBeenCalledWith('');
    expect(localStorage.getItem('search')).toBe('');
  });

  it('retrieves saved search term on component mount', () => {
    localStorage.setItem('search', 'Rick');
    render(<Search onSearch={jest.fn()} isLoading={false} />);

    const input = screen.getByRole('textbox');
    expect((input as HTMLInputElement).value).toBe('Rick');
  });

  it('overwrites existing localStorage value when new search is performed', async () => {
    localStorage.setItem('search', 'rick');
    const mockSearch = jest.fn();

    render(<Search onSearch={mockSearch} isLoading={false} />);

    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, 'morty');

    const button = screen.getByRole('button', { name: /search/i });
    await userEvent.click(button);

    expect(localStorage.getItem('search')).toBe('morty');
    expect(mockSearch).toHaveBeenCalledWith('morty');
  });
});
