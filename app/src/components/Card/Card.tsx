'use client';

import { ReactElement } from 'react';
import { Character } from '../../types/character';
import './Card.styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toggleItem } from '../../store/selectedSlice';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface Props {
  item: Character;
  onClick?: () => void;
}

export function Card({ item }: Props): ReactElement {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedItems = useSelector(
    (state: RootState) => state.selected.selected
  );
  const isSelected = Boolean(
    selectedItems.find((selected) => selected.id === item.id)
  );
  const handleCheckboxClick = (): void => {
    dispatch(toggleItem(item));
  };

  const handleClick = (): void => {
    const params = new URLSearchParams(searchParams);
    params.set('id', String(item.id));
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="card" onClick={handleClick}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxClick}
        onClick={(e) => e.stopPropagation()}
      />
      <Image src={item.image} alt={item.name} width={100} height={100} />
      <div className="card__info">
        <h3 className="card__name">{item.name}</h3>
        <p className="card__status">Status: {item.status}</p>
        <p className="card__location">Location: {item.location.name}</p>
      </div>
    </div>
  );
}
