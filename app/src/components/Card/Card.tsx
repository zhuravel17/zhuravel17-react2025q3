import { ReactElement } from 'react';
import { Character } from '../../types/character';
import './Card.styles.css';

interface Props {
  item: Character;
}

export function Card({ item }: Props): ReactElement {
  return (
    <div className="card">
      <img src={item.image} alt={item.name} className="card__img" />
      <div className="card__info">
        <h3 className="card__name">{item.name}</h3>
        <p className="card__status">Status: {item.status}</p>
        <p className="card__location">Location: {item.location.name}</p>
      </div>
    </div>
  );
}
