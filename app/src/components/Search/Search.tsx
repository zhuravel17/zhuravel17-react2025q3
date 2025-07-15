import { Component, ChangeEvent, ReactNode } from 'react';
import './Search.styles.css';

interface SearchProps {
  onSearch: (term: string) => void;
  isLoading: boolean;
}

interface SearchState {
  searchItem: string;
}

export class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    const saved = localStorage.getItem('search') || '';
    this.state = {
      searchItem: saved,
    };
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchItem: e.target.value });
  };

  handleSearch = (): void => {
    const trimmed = this.state.searchItem.trim();
    localStorage.setItem('search', trimmed);
    this.props.onSearch(trimmed);
  };

  render(): ReactNode {
    const { isLoading } = this.props;

    return (
      <div className="search-container">
        <input
          type="text"
          value={this.state.searchItem}
          onChange={this.handleInputChange}
          className="search-input"
          placeholder="Search..."
        />
        <button
          onClick={this.handleSearch}
          disabled={isLoading}
          className="search-button"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    );
  }
}
