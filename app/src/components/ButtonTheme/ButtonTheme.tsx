import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toggleTheme } from '../../store/themeSlice';

export function ButtonTheme(): ReactElement {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleClick = (): void => {
    dispatch(toggleTheme());
  };
  return (
    <button onClick={handleClick}>{theme === 'light' ? '🌚' : '🌞'}</button>
  );
}
