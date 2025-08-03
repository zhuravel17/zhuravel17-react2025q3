import { ReactElement, useEffect, useState } from 'react';
import { Search } from '../Search/Search';
import fetchCharacters from '../../utils/fetchCharacters';
import { CardList } from '../CardList/CardList';
import { Character } from '../../types/character';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { Loading } from '../Loading/Loading';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Pagination } from '../Paginaion/Pagination';
import './Main.styles.css';
import { NotFound } from '../NotFound/NotFound';
import { SelectedFlyout } from '../SelectedFlyout/SelectedFlyout';

export function MainPage(): ReactElement {
  const [results, setResults] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { page = '1', detailsId } = useParams();
  const navigate = useNavigate();
  const name = localStorage.getItem('search') || '';
  const currentPage = parseInt(page, 10);
  const isInvalidPage = !page || isNaN(currentPage);

  useEffect(() => {
    if (isInvalidPage) return;
    setLoading(true);
    setError(null);

    fetchCharacters(name, currentPage)
      .then((data) => {
        setResults(data.results);
        setTotalPages(data.pages);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError('Something went wrong');
        setResults([]);
        setTotalPages(1);
        setLoading(false);
      });
  }, [name, currentPage, isInvalidPage]);

  if (isInvalidPage) {
    return <NotFound />;
  }

  const handlePageChange = (newPage: number): void => {
    const newPath = detailsId ? `/${newPage}/${detailsId}` : `/${newPage}`;
    navigate(newPath);
  };

  const handleSearch = (term: string): void => {
    localStorage.setItem('search', term);
    navigate(`/1`);
  };

  return (
    <div>
      <ErrorBoundary
        search={<Search onSearch={handleSearch} isLoading={loading} />}
      >
        <div style={{ padding: '16px', backgroundColor: 'var(--bg-color)' }}>
          <Search onSearch={handleSearch} isLoading={loading} />

          {error && (
            <div style={{ color: 'red', fontWeight: 'bold' }}>{error}</div>
          )}
          {loading && <Loading />}
          {!loading && !error && (
            <div
              className={`character-container ${
                detailsId ? 'with-details' : ''
              }`}
            >
              <div className="left-panel">
                <CardList items={results} />
                <SelectedFlyout />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
              {detailsId && (
                <div className="right-panel">
                  <Outlet />
                </div>
              )}
            </div>
          )}
        </div>
      </ErrorBoundary>
    </div>
  );
}
