import { useParams, useNavigate } from 'react-router-dom';
import { ReactElement } from 'react';
import { Loading } from '../Loading/Loading';
import './CharacterDetails.styles.css';
import { useGetCharacterByIdQuery } from '../../api/apiSlice';

export function CharacterDetails(): ReactElement {
  const { detailsId } = useParams();
  const navigate = useNavigate();

  const id = detailsId ? parseInt(detailsId, 10) : 0;
  const {
    data: character,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useGetCharacterByIdQuery(id);

  const handleClose = (): void => {
    navigate(`..`, { relative: 'path' });
  };

  return (
    <div className="details">
      {isLoading && <Loading />}
      {isFetching && <Loading />}
      {isError && <p>Character not found</p>}
      {character && !isLoading && (
        <div>
          <button onClick={handleClose}>Close</button>
          <button onClick={refetch}>Refresh</button>
          <h2>{character?.name}</h2>
          <img src={character?.image} alt={character?.name} />
          <p>Status: {character?.status}</p>
          <p>Location: {character?.location.name}</p>
        </div>
      )}
    </div>
  );
}
