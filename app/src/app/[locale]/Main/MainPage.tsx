'use client';

import { useRouter, usePathname } from '../../../i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { Search } from '../../../components/Search/Search';
import { CardList } from '../../../components/CardList/CardList';
import { ErrorBoundary } from '../../../components/ErrorBoundary/ErrorBoundary';
import { Loading } from '../../../components/Loading/Loading';
import { Pagination } from '../../../components/Paginaion/Pagination';
import { SelectedFlyout } from '../../../components/SelectedFlyout/SelectedFlyout';
import styles from './Main.module.css';

interface APICharacter {
  id: number;
  name: string;
  status: string;
  image: string;
  location: { name: string; url: string };
}

interface APIResponse {
  info: {
    pages: number;
    count: number;
    next: string | null;
    prev: string | null;
  };
  results: APICharacter[];
}

export interface MainPageProps {
  initialData: APIResponse | null;
  initialPage: number;
  initialName: string;
  errorMessage: string | null;
}

export default function MainPage({
  initialData,
  initialPage,
  initialName,
  errorMessage,
}: MainPageProps) {
  console.log('client initialData', initialData);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initialId = searchParams.get('id') || undefined;

  const [isPending, startTransition] = useTransition();

  const results = initialData?.results ?? [];
  const totalPages = initialData?.info?.pages ?? 1;

  const updateQuery = (params: {
    name?: string;
    page?: number;
    id?: string;
  }) => {
    const qs = new URLSearchParams();
    if (params.name) qs.set('name', params.name);
    if (params.page !== undefined) qs.set('page', String(params.page));
    if (params.id) qs.set('id', params.id);
    startTransition(() => {
      router.push(`${pathname}?${qs}`);
    });
  };

  const handlePageChange = (newPage: number) => {
    updateQuery({ name: initialName, page: newPage, id: initialId });
  };

  const handleSearch = (term: string) => {
    updateQuery({ name: term, page: 1 });
  };

  return (
    <ErrorBoundary
      search={<Search onSearch={handleSearch} isLoading={isPending} />}
    >
      <div style={{ padding: '16px', backgroundColor: 'var(--bg-color)' }}>
        <Search onSearch={handleSearch} isLoading={isPending} />

        {errorMessage && (
          <div style={{ color: 'red', fontWeight: 'bold' }}>
            Error: {errorMessage}
          </div>
        )}

        {isPending && <Loading />}

        {!isPending && !errorMessage && (
          <div
            className={`${styles['character-container']} ${
              initialId ? styles.withDetails : ''
            }`}
          >
            <div className={styles['left-panel']}>
              <CardList items={results} />
              <SelectedFlyout />
              <Pagination
                currentPage={initialPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
