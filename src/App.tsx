import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CountriesListView from './views/CountriesListView';
import CountriesSearchView from './views/CountriesSearchView';
import Layout from './views/Layout';
import { DefinedRoutes } from './rulesets/navigation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={DefinedRoutes.HOME} element={<Layout />}>
          <Route index element={<CountriesListView />} />
          <Route
            path={DefinedRoutes.SEARCH}
            element={<CountriesSearchView />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
