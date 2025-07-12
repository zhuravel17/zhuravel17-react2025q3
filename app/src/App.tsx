import { Component, ReactNode } from 'react';
import { Search } from './components/Search/Search';
import { fetchCharacters } from './utils/fetchResults';
import { Header } from './components/Header/Header';
import { CardList } from './components/CardList/CardList';
import { Character } from './types/character';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { ErrorButton } from './components/ErrorButton/ErrorButton';
import { Loading } from './components/Loading/Loading';

interface AppState {
  results: Character[];
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
    const { loading, error, results } = this.state;

    return (
      <div>
        <Header />
        <ErrorBoundary
          search={<Search onSearch={this.fetchResults} isLoading={loading} />}
        >
          <Search onSearch={this.fetchResults} isLoading={loading} />
          <div style={{ padding: '16px' }}>
            {error && (
              <div style={{ color: 'red', fontWeight: 'bold' }}>{error}</div>
            )}
            {loading && <Loading />}
            {!loading && !error && <CardList items={results} />}
          </div>
          <ErrorButton />
        </ErrorBoundary>
      </div>
    );
  }
}
