'use client';

import { ReactElement } from 'react';
import { Character } from '../../types/character';
import { Card } from '../Card/Card';
import './CardList.styles.css';

interface CardListProps {
  items: Character[];
}

export function CardList({ items }: CardListProps): ReactElement {
  if (items.length === 0) return <p>No results</p>;
  return (
    <div className="card-list">
      {items.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}
