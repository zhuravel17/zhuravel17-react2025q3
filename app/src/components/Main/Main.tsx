import { ReactElement } from 'react';
import { Search } from '../Search/Search';
import { useGetCharactersQuery } from '../../api/apiSlice';
import { CardList } from '../CardList/CardList';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { Loading } from '../Loading/Loading';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Pagination } from '../Paginaion/Pagination';
import { NotFound } from '../NotFound/NotFound';
import { SelectedFlyout } from '../SelectedFlyout/SelectedFlyout';
import './Main.styles.css';

export function MainPage(): ReactElement {
  const { page = '1', detailsId } = useParams();
  const navigate = useNavigate();
  const name = localStorage.getItem('search') || '';
  const currentPage = parseInt(page, 10);
  const isInvalidPage = !page || isNaN(currentPage);

  const { data, error, isLoading, isFetching, isError, refetch } =
    useGetCharactersQuery({
      name,
      page: currentPage,
    });
  const results = data?.results ?? [];
  const totalPages = data?.info?.pages ?? 1;
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
        search={<Search onSearch={handleSearch} isLoading={isLoading} />}
      >
        <div style={{ padding: '16px', backgroundColor: 'var(--bg-color)' }}>
          <Search onSearch={handleSearch} isLoading={isLoading} />
          <button onClick={() => refetch()} disabled={isLoading}>
            Refresh
          </button>

          {isError && (
            <div style={{ color: 'red', fontWeight: 'bold' }}>
              Error:{' '}
              {typeof error === 'object' && 'status' in error
                ? error.status
                : 'Something went wrong'}
            </div>
          )}
          {isFetching && <Loading />}
          {isLoading && <Loading />}
          {!isLoading && !isError && (
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
