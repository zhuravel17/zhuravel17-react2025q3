import { Component, ReactNode } from 'react';
import { Search } from './components/Search/Search';
import { fetchCharacters } from './utils/fetchResults';
import { Header } from './components/Header/Header';

interface AppState {
  results: boolean[];
  loading: boolean;
  error: string | null;
}

export class App extends Component<object, AppState> {
  state: AppState = {
    results: [],
    loading: false,
    error: null,
  };

  componentDidMount(): void {
    const saved = localStorage.getItem('search') || '';
    this.fetchResults(saved);
  }

  fetchResults = (term: string): void => {
    this.setState({ loading: true, error: null });

    fetchCharacters(term)
      .then((results) => {
        this.setState({ results, loading: false });
        console.log(results);
      })
      .catch((err) => {
        console.error(err);
        this.setState({ error: 'Something went wrong', loading: false });
      });
  };

  render(): ReactNode {
    const { loading, error } = this.state;

    return (
      <div>
        <Header />
        <Search onSearch={this.fetchResults} isLoading={loading} />
        <div style={{ padding: '16px' }}>
          {error && (
            <div style={{ color: 'red', fontWeight: 'bold' }}>{error}</div>
          )}
          {loading && <p>Loading...</p>}
        </div>
      </div>
    );
  }
}
