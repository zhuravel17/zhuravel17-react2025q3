'use client';

import { useEffect, useState } from 'react';

export function useLocalStorage(
  key: string,
  initialValue: string
): [string, (value: string) => void] {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        setValue(stored);
      }
    }
  }, [key]);

  const updateValue = (newValue: string): void => {
    setValue(newValue);
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, newValue);
    }
  };
  return [value, updateValue];
}
