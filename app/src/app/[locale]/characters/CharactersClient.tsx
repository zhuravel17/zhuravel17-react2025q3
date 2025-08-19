'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTransition, ReactElement } from 'react';
import { Search } from '../../../components/Search/Search';
import { CardList } from '../../../components/CardList/CardList';
import { Pagination } from '../../../components/Paginaion/Pagination';
import { SelectedFlyout } from '../../../components/SelectedFlyout/SelectedFlyout';
import CharacterDetails from '../../../components/CharacterDetails/CharacterDetails';
import styles from '../Main/Main.module.css';
import { Character } from '../../../types/character';

interface APIResponse {
  info: { pages: number };
  results: Character[];
}

interface CharactersClientProps {
  initialData: APIResponse;
  initialPage: number;
  initialName: string;
  selectedCharacter: Character | null;
}

export default function CharactersClient({
  initialData,
  initialPage,
  initialName,
  selectedCharacter,
}: CharactersClientProps): ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const id = searchParams.get('id') || undefined;

  const results = initialData?.results ?? [];
  const totalPages = initialData?.info?.pages ?? 1;

  const updateQuery = (params: {
    name?: string;
    page?: number;
    id?: string;
  }) => {
    const qs = new URLSearchParams();
    if (params.name) qs.set('name', params.name);
    if (params.page) qs.set('page', String(params.page));
    if (params.id) qs.set('id', params.id);
    startTransition(() => {
      router.push(`${pathname}?${qs.toString()}`);
    });
  };

  return (
    <div style={{ padding: '16px', backgroundColor: 'var(--bg-color)' }}>
      <Search
        onSearch={(term) => updateQuery({ name: term, page: 1 })}
        isLoading={isPending}
      />

      <div
        className={`${styles['character-container']} ${id ? styles.withDetails : ''}`}
      >
        <div className={styles['left-panel']}>
          <CardList items={results} />
          <SelectedFlyout />
          <Pagination
            currentPage={initialPage}
            totalPages={totalPages}
            onPageChange={(p) =>
              updateQuery({ name: initialName, page: p, id })
            }
          />
        </div>
        {selectedCharacter && (
          <div className={styles['right-panel']}>
            <CharacterDetails character={selectedCharacter} />
          </div>
        )}
      </div>
    </div>
  );
}
