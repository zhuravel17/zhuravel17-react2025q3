import { Component, ReactNode } from 'react';
import { Character } from '../../types/character';
import { Card } from '../Card/Card';
import './CardList.styles.css';

interface CardListProps {
  items: Character[];
}

export class CardList extends Component<CardListProps> {
  render(): ReactNode {
    const { items } = this.props;
    if (items.length === 0) return <p>No results</p>;
    return (
      <div className="cardList">
        {items.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    );
  }
}
