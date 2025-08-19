'use client';

import { ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './CharacterDetails.styles.css';

interface Character {
  id: number;
  name: string;
  status: string;
  image: string;
  location: { name: string };
}

interface CharacterDetailsProps {
  character: Character;
}

export default function CharacterDetails({
  character,
}: CharacterDetailsProps): ReactElement {
  const router = useRouter();

  const handleClose = (): void => {
    router.back();
  };

  return (
    <div className="details">
      <button onClick={handleClose}>Close</button>

      <h2>{character.name}</h2>
      <Image
        src={character.image}
        alt={character.name}
        width={300}
        height={300}
      />
      <p>Status: {character.status}</p>
      <p>Location: {character.location.name}</p>
    </div>
  );
}
