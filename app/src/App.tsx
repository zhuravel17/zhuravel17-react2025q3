import { MainPage } from './components/Main/Main';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CharacterDetails } from './components/CharacterDetails/CharacterDetails';
import { NotFound } from './components/NotFound/NotFound';
import { About } from './components/About/About';
import { ReactElement } from 'react';

export function App(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/1" replace />} />
      <Route path="/about" element={<About />} />
      <Route path="/:page" element={<MainPage />}>
        <Route path=":detailsId" element={<CharacterDetails />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
