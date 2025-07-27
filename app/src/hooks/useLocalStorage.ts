import { useState } from 'react';

export function useLocalStorage(
  key: string,
  initialValue: string
): [string, (value: string) => void] {
  const stored = localStorage.getItem(key);
  const initial = stored !== null ? stored : initialValue;

  const [value, setValue] = useState<string>(initial);

  const updateValue = (newValue: string): void => {
    setValue(newValue);
    localStorage.setItem(key, newValue);
  };

  return [value, updateValue];
}
