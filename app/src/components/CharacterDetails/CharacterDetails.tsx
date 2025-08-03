import { useParams, useNavigate } from 'react-router-dom';
import { ReactElement, useEffect, useState } from 'react';
import { Character } from '../../types/character';
import { Loading } from '../Loading/Loading';
import './CharacterDetails.styles.css';

export function CharacterDetails(): ReactElement {
  const { detailsId } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!detailsId) return;

    fetch(`https://rickandmortyapi.com/api/character/${detailsId}`)
      .then((res) => res.json())
      .then((data) => {
        setCharacter(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [detailsId]);

  const handleClose = (): void => {
    navigate(`..`, { relative: 'path' });
  };

  return (
    <div className="details">
      {loading && <Loading />}
      {!character && <p>Character not found</p>}
      {character && !loading && (
        <div>
          <button onClick={handleClose}>Close</button>
          <h2>{character?.name}</h2>
          <img src={character?.image} alt={character?.name} />
          <p>Status: {character?.status}</p>
          <p>Location: {character?.location.name}</p>
        </div>
      )}
    </div>
  );
}
