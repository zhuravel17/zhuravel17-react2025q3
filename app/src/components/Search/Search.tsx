import { ChangeEvent, ReactElement } from 'react';
import './Search.styles.css';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface SearchProps {
  onSearch: (term: string) => void;
  isLoading: boolean;
}

export function Search({ onSearch, isLoading }: SearchProps): ReactElement {
  const [searchItem, setSearchItem] = useLocalStorage('search', '');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchItem(e.target.value);
  };

  const handleSearch = (): void => {
    const trimmed = searchItem.trim();
    setSearchItem(trimmed);
    onSearch(trimmed);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        className="search-input"
        placeholder="Search..."
      />
      <button
        onClick={handleSearch}
        disabled={isLoading}
        className="search-button"
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </div>
  );
}
