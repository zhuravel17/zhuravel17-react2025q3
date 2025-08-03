import { MainPage } from './components/Main/Main';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CharacterDetails } from './components/CharacterDetails/CharacterDetails';
import { NotFound } from './components/NotFound/NotFound';
import { About } from './components/About/About';
import { ReactElement } from 'react';
import { AppRoutes } from './enums/routes.enum';
import { Header } from './components/Header/Header';
import { ThemeProvider } from './context/ThemeContext';

export function App(): ReactElement {
  return (
    <ThemeProvider>
      <Header />
      <Routes>
        <Route path={AppRoutes.Root} element={<Navigate to="/1" replace />} />
        <Route path={AppRoutes.About} element={<About />} />
        <Route path={AppRoutes.Page} element={<MainPage />}>
          <Route path={AppRoutes.Details} element={<CharacterDetails />} />
        </Route>
        <Route path={AppRoutes.NotFound} element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}
