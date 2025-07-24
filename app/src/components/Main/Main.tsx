import { ReactElement, useEffect, useState } from 'react';
import { Search } from '../Search/Search';
import fetchCharacters from '../../utils/fetchResults';
import { Header } from '../Header/Header';
import { CardList } from '../CardList/CardList';
import { Character } from '../../types/character';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { ErrorButton } from '../ErrorButton/ErrorButton';
import { Loading } from '../Loading/Loading';

export function MainPage(): ReactElement {
  const [results, setResults] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('search') || '';
    fetchResults(saved);
  }, []);

  const fetchResults = (term: string): void => {
    setLoading(true);
    setError(null);

    fetchCharacters(term)
      .then((results) => {
        setResults(results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError('Something went wrong');
        setLoading(false);
      });
  };

  return (
    <div>
      <Header />
      <ErrorBoundary
        search={<Search onSearch={fetchResults} isLoading={loading} />}
      >
        <Search onSearch={fetchResults} isLoading={loading} />
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
