'use client';

import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../store';
import { ReactElement } from 'react';

const App = dynamic(() => import('../../App').then((m) => m.App), {
  ssr: false,
});

export default function ClientRoot(): ReactElement {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}
