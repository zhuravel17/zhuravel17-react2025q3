import { ReactElement } from 'react';
import { useTheme } from '../../context/ThemeContext';

export function ButtonTheme(): ReactElement {
  const { toggleTheme, theme } = useTheme();
  return (
    <button onClick={toggleTheme}>{theme === 'light' ? '🌚' : '🌞'}</button>
  );
}
