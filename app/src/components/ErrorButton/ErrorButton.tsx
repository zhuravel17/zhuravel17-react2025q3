import { ReactElement, useState } from 'react';
import './ErrorButton.styles.css';

export function ErrorButton(): ReactElement {
  const [shouldThrow, setShouldThrow] = useState<boolean>(false);

  if (shouldThrow) {
    throw new Error('Test error from ErrorButton');
  }
  const handleClick = (): void => {
    setShouldThrow(true);
  };

  return (
    <div className="button-container">
      <button className="error-button" onClick={handleClick}>
        Throw Error
      </button>
    </div>
  );
}
